import Product from "../models/Product.js";
import mongoose from "mongoose";
// ==========================
// Create Product
// ==========================
export const createProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "No form data received",
      });
    }

    const {
      name,
      description,
      price,
      category,
      brand,
      stock,
    } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const images = req.files
      ? req.files.map(file => file.path)
      : [];

    const product = await Product.create({
      name,
      description,
      price,
      category,
      brand,
      stock,
      images,
      seller: req.user._id,
    });

    res.status(201).json({
      success: true,
      product,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success:false,
      message:err.message,
    });
  }
};
// ==========================
// Get All Products
// ==========================
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("seller", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Get Single Product
// ==========================
export const getProductById = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(req.params.id)
      .populate("seller", "fullName email");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Update Product
// ==========================
export const updateProduct = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Only seller can update
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this product",
      });
    }

    product.name = req.body.name || product.name;
    product.description =
      req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.stock = req.body.stock || product.stock;

    // Update uploaded images if new ones are provided
    if (req.files && req.files.length > 0) {
      product.images = req.files.map((file) => file.path);
    }

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Delete Product
// ==========================
export const deleteProduct = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Only seller can delete
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this product",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};