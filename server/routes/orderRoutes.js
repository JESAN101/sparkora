import express from "express";
import {
  placeOrder,
  getMyOrders,
  getSellerOrders,
  getOrderById,
  updateOrderItemStatus,
  cancelOrder,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Every order route requires a logged-in user.
// NOTE: specific routes ("/my-orders", "/seller-orders") must be declared
// before the "/:id" route, otherwise Express would treat them as an :id param.
router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/seller-orders", protect, getSellerOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/cancel", protect, cancelOrder);
router.put("/:id/items/:itemId/status", protect, updateOrderItemStatus);

export default router;
