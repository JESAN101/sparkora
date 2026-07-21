import express from "express";

import {
  getSellerApplications,
  approveSellerApplication,
  rejectSellerApplication,
  deleteSellerApplication,
} from "../controllers/adminSellerController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/seller-applications",
  protect,
  admin,
  getSellerApplications
);

router.put(
  "/seller-applications/:id/approve",
  protect,
  admin,
  approveSellerApplication
);

router.put(
  "/seller-applications/:id/reject",
  protect,
  admin,
  rejectSellerApplication
);

router.delete(
  "/seller-applications/:id",
  protect,
  admin,
  deleteSellerApplication
);

export default router;