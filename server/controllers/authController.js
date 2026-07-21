import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import crypto from "crypto";
import { sendOTPEmail } from "../utils/sendOTP.js";

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      password,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phone ||
      !gender
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const nameRegex = /^[A-Za-z]+$/;

    if (!nameRegex.test(firstName)) {
      return res.status(400).json({
        success: false,
        message: "Invalid first name.",
      });
    }

    if (!nameRegex.test(lastName)) {
      return res.status(400).json({
        success: false,
        message: "Invalid last name.",
      });
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must contain exactly 10 digits.",
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = crypto.randomInt(100000, 999999).toString();

    const otpExpiry = new Date(
      Date.now() +
        Number(process.env.OTP_EXPIRE_MINUTES) * 60 * 1000
    );

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      gender,
      password: hashedPassword,
      emailOTP: otp,
      otpExpires: otpExpiry,
      isVerified: false,
    });

    await sendOTPEmail(
      user.email,
      `${user.firstName} ${user.lastName}`,
      otp
    );

    res.status(201).json({
      success: true,
      message: "OTP has been sent to your email.",
      email: user.email,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= VERIFY EMAIL OTP =================
export const verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account is already verified.",
      });
    }

    if (!user.emailOTP || user.emailOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (new Date() > user.otpExpires) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    // Verify account
    user.isVerified = true;
    user.emailOTP = null;
    user.otpExpires = null;

    await user.save();

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        role: user.role,
      },
    });
  } catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Server Error",
  });
}
};

// ================= RESEND OTP =================
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account is already verified.",
      });
    }

    // Generate new OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    user.emailOTP = otp;
    user.otpExpires = new Date(
      Date.now() +
        Number(process.env.OTP_EXPIRE_MINUTES) * 60 * 1000
    );

    await user.save();

    await sendOTPEmail(
      user.email,
      `${user.firstName} ${user.lastName}`,
      otp
    );

    res.status(200).json({
      success: true,
      message: "A new OTP has been sent to your email.",
    });
  } catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Server Error",
  });
}
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    user.resetOTP = otp;

user.resetOTPExpires = new Date(
  Date.now() +
  Number(process.env.OTP_EXPIRE_MINUTES) * 60 * 1000
);

    await user.save();

    await sendOTPEmail(
      user.email,
      user.firstName,
      otp
    );

    return res.status(200).json({
      success: true,
      message: "Password reset OTP has been sent to your email.",
      email: user.email,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= VERIFY RESET OTP =================
export const verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.resetOTP) {
      return res.status(400).json({
        success: false,
        message: "No reset OTP found.",
      });
    }

    if (user.resetOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (new Date() > user.resetOTPExpires) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
      email: user.email,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // Clear reset OTP
    user.resetOTP = null;
    user.resetOTPExpires = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password.",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const showSellerWelcome =
  user.role === "seller" &&
  !user.sellerApprovalNotified;

if (showSellerWelcome) {
  user.sellerApprovalNotified = true;
  await user.save();
}

res.status(200).json({
  success: true,
  message: "Login successful.",
  token,
  showSellerWelcome,
  user: {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    role: user.role,
  },
});
  } catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Server Error",
  });
}
};
