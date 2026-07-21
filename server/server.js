import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import { sanitizeInput } from "./middleware/sanitizeMiddleware.js";
import { authLimiter, generalLimiter } from "./middleware/rateLimitMiddleware.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import adminSellerRoutes from "./routes/adminSellerRoutes.js";

connectDB();

const app = express();

// Allowed frontend origins. Set CLIENT_URL in production (e.g.
// https://sparkora.com); localhost origins stay available for development.
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (no Origin header) and any origin on
      // the allow-list.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(helmet());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(sanitizeInput);

// Rate limiting: tighter on auth, looser across the rest of the API.
app.use("/api/auth", authLimiter);
app.use("/api", generalLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminSellerRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Sparkora Backend Running 🚀",
  });
});

// Must come after all routes: 404 handler, then the generic error handler.
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});