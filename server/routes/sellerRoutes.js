import express from "express";
import { getSellerStats } from "../controllers/sellerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, getSellerStats);

export default router;
