import mongoose from "mongoose";
import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

// Helper: find the logged-in user's wishlist, creating one if it doesn't exist yet
const getOrCreateWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, items: [] });
  }
  return wishlist;
};

const populatedWishlist = async (userId) => {
  return Wishlist.findOne({ user: userId }).populate("items.product");
};

// ==========================
// Get current user's wishlist
// ==========================
export const getWishlist = async (req, res) => {
  try {
    await getOrCreateWishlist(req.user._id);
    const wishlist = await populatedWishlist(req.user._id);

    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================
// Add item to wishlist
// ==========================
export const addItemToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "productId is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid productId" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const wishlist = await getOrCreateWishlist(req.user._id);
    const alreadyExists = wishlist.items.some(
      (item) => item.product.toString() === productId
    );

    if (!alreadyExists) {
      wishlist.items.push({ product: productId });
      await wishlist.save();
    }

    const wishlistWithProducts = await populatedWishlist(req.user._id);
    res.status(200).json({ success: true, wishlist: wishlistWithProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================
// Remove item from wishlist
// ==========================
export const removeWishlistItem = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid productId" });
    }

    const wishlist = await getOrCreateWishlist(req.user._id);
    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId
    );

    await wishlist.save();
    const wishlistWithProducts = await populatedWishlist(req.user._id);

    res.status(200).json({ success: true, wishlist: wishlistWithProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================
// Clear the entire wishlist
// ==========================
export const clearWishlist = async (req, res) => {
  try {
    const wishlist = await getOrCreateWishlist(req.user._id);
    wishlist.items = [];
    await wishlist.save();

    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};