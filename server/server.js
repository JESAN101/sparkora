import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req,res)=>{
    res.json({
        success:true,
        message:"Sparkora Backend Running 🚀"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`🚀 Server running on port ${PORT}`);
});