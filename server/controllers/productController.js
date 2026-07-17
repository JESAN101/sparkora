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
  discountPrice,
  featured,
  newArrival,
  bestseller,
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
  discountPrice: discountPrice || price,
  featured: featured === "true" || featured === true,
  newArrival: newArrival === "true" || newArrival === true,
  bestseller: bestseller === "true" || bestseller === true,
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

    const {
      name,
      description,
      price,
      category,
      brand,
      stock,
      discountPrice,
      featured,
      newArrival,
      bestseller,
    } = req.body;

    // Use `!== undefined` checks (not `||`) so falsy-but-valid values like
    // stock: 0 or featured: false actually get applied instead of ignored.
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (brand !== undefined) product.brand = brand;
    if (stock !== undefined) product.stock = stock;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    if (featured !== undefined) product.featured = featured === "true" || featured === true;
    if (newArrival !== undefined) product.newArrival = newArrival === "true" || newArrival === true;
    if (bestseller !== undefined) product.bestseller = bestseller === "true" || bestseller === true;

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
// ==========================
// Get Products Belonging to the Logged-in Seller
// ==========================
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id }).sort({ createdAt: -1 });

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
// Quick Stock Update (Inventory management — seller only, own product only)
// ==========================
export const updateStock = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const { stock } = req.body;

    if (stock === undefined || stock === null || Number(stock) < 0) {
      return res.status(400).json({
        success: false,
        message: "A valid stock quantity is required",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this product",
      });
    }

    product.stock = Number(stock);
    await product.save();

    res.status(200).json({
      success: true,
      message: "Stock updated successfully",
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
