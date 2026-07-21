import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmailOTP,
  resendOTP,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Verify Email OTP
router.post("/verify-otp", verifyEmailOTP);

// Resend otp
router.post("/resend-otp", resendOTP);

// Forgot Password
router.post("/forgot-password", forgotPassword);

//verify reset otp
router.post("/verify-reset-otp", verifyResetOTP);

// reset password
router.post("/reset-password", resetPassword);

export default router;