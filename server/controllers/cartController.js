import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Helper: find the logged-in user's cart, creating one if it doesn't exist yet,
// and populate product details so the frontend gets full product info per item.
const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

const populatedCart = async (userId) => {
  return Cart.findOne({ user: userId }).populate("items.product");
};

// ==========================
// Get current user's cart
// ==========================
export const getCart = async (req, res) => {
  try {
    await getOrCreateCart(req.user._id);
    const cart = await populatedCart(req.user._id);

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================
// Add item to cart (or bump quantity if it already exists)
// ==========================
export const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

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

    const cart = await getOrCreateCart(req.user._id);
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
  existingItem.quantity += Number(quantity);
} else {
  cart.items.push({
    product: productId,
    quantity: Number(quantity),
  });

  product.cartCount += 1;
  await product.save();
}

    await cart.save();
    const cartWithProducts = await populatedCart(req.user._id);

    res.status(200).json({ success: true, cart: cartWithProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================
// Update quantity of a specific item
// ==========================
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid productId" });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
    }

    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.find((item) => item.product.toString() === productId);

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    item.quantity = Number(quantity);
    await cart.save();

    const cartWithProducts = await populatedCart(req.user._id);
    res.status(200).json({ success: true, cart: cartWithProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================
// Remove one item from cart
// ==========================
export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid productId",
      });
    }

    const cart = await getOrCreateCart(req.user._id);

    const existed = cart.items.some(
      (item) => item.product.toString() === productId
    );

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    if (existed) {
      const product = await Product.findById(productId);

      if (product) {
        product.cartCount = Math.max(
          product.cartCount - 1,
          0
        );

        await product.save();
      }
    }

    const cartWithProducts = await populatedCart(req.user._id);

    res.status(200).json({
      success: true,
      cart: cartWithProducts,
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
// Clear the entire cart
// ==========================
// ==========================
// Clear the entire cart
// ==========================
export const clearCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user._id);

    // Decrease cartCount for every product currently in the cart
    for (const item of cart.items) {
      const product = await Product.findById(item.product);

      if (product) {
        product.cartCount = Math.max(product.cartCount - 1, 0);
        await product.save();
      }
    }

    // Empty the cart
    cart.items = [];

    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
    
