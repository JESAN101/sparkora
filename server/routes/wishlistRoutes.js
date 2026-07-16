import express from "express";
import {
  getWishlist,
  addItemToWishlist,
  removeWishlistItem,
  clearWishlist,
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Every wishlist route requires a logged-in user
router.get("/", protect, getWishlist);
router.post("/", protect, addItemToWishlist);
router.delete("/:productId", protect, removeWishlistItem);
router.delete("/", protect, clearWishlist);

export default router;