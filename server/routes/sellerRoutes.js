import express from "express";
import {
  getSellerStats,
  becomeSeller,
  applySeller,
  getMySellerApplication,
  resetSellerApplication,
} from "../controllers/sellerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put(
  "/become-seller",
  protect,
  becomeSeller
);

router.post(
  "/apply",
  protect,
  applySeller
);

router.get(
  "/application",
  protect,
  getMySellerApplication
);

router.get("/stats", protect, getSellerStats);

router.delete(
  "/application/reset",
  protect,
  resetSellerApplication
);

export default router;
