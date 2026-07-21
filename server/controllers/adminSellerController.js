import SellerApplication from "../models/SellerApplication.js";
import User from "../models/User.js";

import {
  sendSellerApprovalEmail,
  sendSellerRejectionEmail,
} from "../utils/sendEmail.js";

/* ==========================================
   Get all seller applications
========================================== */

export const getSellerApplications = async (req, res) => {
  try {
    const applications = await SellerApplication.find()
      .populate("user", "firstName lastName email role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Approve Seller
========================================== */

export const approveSellerApplication = async (req, res) => {
  try {
    const application = await SellerApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Application already processed",
      });
    }

    application.status = "approved";
    await application.save();

    const user = await User.findById(application.user);

    user.role = "seller";
    user.sellerApprovalNotified = false;

// User has not yet seen the approval popup
user.sellerApprovalNotified = false;

await user.save();

    // Send approval email
    await sendSellerApprovalEmail({
      to: user.email,
      name: `${user.firstName} ${user.lastName}`,
      businessName: application.businessName,
    });

    res.json({
      success: true,
      message: "Seller approved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Reject Seller
========================================== */

export const rejectSellerApplication = async (req, res) => {
  try {
    const { reason } = req.body;

    const application = await SellerApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Application already processed",
      });
    }

    application.status = "rejected";
    application.rejectionReason = reason;

    await application.save();

    const user = await User.findById(application.user);

    // Send rejection email
    await sendSellerRejectionEmail({
      to: user.email,
      name: `${user.firstName} ${user.lastName}`,
      reason,
    });

    res.json({
      success: true,
      message: "Application rejected",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSellerApplication = async (req, res) => {
  try {
    const application = await SellerApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    await SellerApplication.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Seller application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};