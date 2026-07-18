import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts,
  updateStock,
} from "../controllers/productController.js";
import {
  getProductReviews,
  getReviewEligibility,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// NOTE: "/seller/my-products" is declared before "/:id" purely for clarity —
// it's a two-segment path so it can never collide with the single-segment
// ":id" pattern, but keeping specific routes above generic ones avoids
// any future confusion.
router.get("/seller/my-products", protect, getMyProducts);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post(
  "/",
  protect,
  upload.array("images", 5),
  createProduct
);

router.put(
  "/:id",
  protect,
  upload.array("images", 5),
  updateProduct
);

router.patch("/:id/stock", protect, updateStock);

router.delete(
  "/:id",
  protect,
  deleteProduct
);

/* ===========================
   Reviews (nested under a product)
=========================== */

router.get("/:id/reviews", getProductReviews);
router.get("/:id/reviews/eligibility", protect, getReviewEligibility);
router.post("/:id/reviews", protect, createReview);
router.put("/:id/reviews/:reviewId", protect, updateReview);
router.delete("/:id/reviews/:reviewId", protect, deleteReview);

export default router;