import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmailOTP,
  resendOTP,
} from "../controllers/authController.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Verify Email OTP
router.post("/verify-otp", verifyEmailOTP);

router.post("/resend-otp", resendOTP);

export default router;