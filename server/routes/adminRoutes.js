import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  getAdminDashboard,
  getAllUsers,
  createUser,
  updateUserRole,
  toggleUserBlock,
  deleteUser,
  getAllProducts,
  deleteProductByAdmin,
  updateAnyProduct,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/adminController.js";

const router = express.Router();

/* ===========================
   Dashboard
=========================== */

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getAdminDashboard
);

/* ===========================
   User Management
=========================== */

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);

router.post(
  "/users",
  protect,
  adminOnly,
  createUser
);

router.put(
  "/users/:id/role",
  protect,
  adminOnly,
  updateUserRole
);

router.put(
  "/users/:id/block",
  protect,
  adminOnly,
  toggleUserBlock
);

router.delete(
  "/users/:id",
  protect,
  adminOnly,
  deleteUser
);

/* ===========================
   Product Management
=========================== */

router.get(
  "/products",
  protect,
  adminOnly,
  getAllProducts
);

router.delete(
  "/products/:id",
  protect,
  adminOnly,
  deleteProductByAdmin
);

router.put(
  "/products/:id",
  protect,
  adminOnly,
  upload.array("images", 5),
  updateAnyProduct
);

router.get(
  "/orders",
  protect,
  adminOnly,
  getAllOrders
);

router.get(
  "/orders/:id",
  protect,
  adminOnly,
  getSingleOrder
);

router.put(
  "/orders/:id/status",
  protect,
  adminOnly,
  updateOrderStatus
);

router.delete(
  "/orders/:id",
  protect,
  adminOnly,
  deleteOrder
);

export default router;