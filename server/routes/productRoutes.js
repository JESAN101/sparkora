import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

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

router.delete(
  "/:id",
  protect,
  deleteProduct
);

export default router;