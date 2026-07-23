import mongoose from "mongoose";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const FREE_SHIPPING_THRESHOLD = 50000;
const DELIVERY_FEE = 150;

const ITEM_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

// Recompute the order-level status from its items' statuses:
// - all items delivered/cancelled -> delivered (or cancelled if every item is cancelled)
// - any item shipped -> shipped
// - any item processing -> processing
// - otherwise -> pending
const rollUpOrderStatus = (order) => {
  const statuses = order.items.map((item) => item.status);

  if (statuses.every((s) => s === "cancelled")) {
    order.orderStatus = "cancelled";
  } else if (statuses.every((s) => s === "delivered" || s === "cancelled")) {
    order.orderStatus = "delivered";
  } else if (statuses.some((s) => s === "shipped")) {
    order.orderStatus = "shipped";
  } else if (statuses.some((s) => s === "processing")) {
    order.orderStatus = "processing";
  } else {
    order.orderStatus = "pending";
  }
};

// ==========================
// Place Order (checkout)
// ==========================
export const placeOrder = async (req, res) => {
  try {
    const { customer, shippingAddress} = req.body;

    if (!customer?.fullName || !customer?.email || !customer?.phone) {
      return res.status(400).json({
        success: false,
        message: "Customer full name, email and phone are required",
      });
    }

    if (
      !shippingAddress?.province ||
      !shippingAddress?.district ||
      !shippingAddress?.city ||
      !shippingAddress?.street
    ) {
      return res.status(400).json({
        success: false,
        message: "Complete shipping address is required",
      });
    }
    

    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Your cart is empty" });
    }

    // Build order items from the cart, pricing everything from the DB —
    // never trust prices sent from the client.
    const orderItems = [];
    for (const cartItem of cart.items) {
      const product = cartItem.product;

      if (!product) {
        return res.status(400).json({
          success: false,
          message: "One of the items in your cart no longer exists",
        });
      }

      if (product.stock < cartItem.quantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} unit(s) of "${product.name}" left in stock`,
        });
      }

      orderItems.push({
        product: product._id,
        seller: product.seller,
        name: product.name,
        image: product.images?.[0] || "",
        price: product.discountPrice ?? product.price,
        quantity: cartItem.quantity,
        status: "pending",
      });
    }

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DELIVERY_FEE;
    const totalAmount = subtotal + deliveryFee;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      customer: {
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
      },
      shippingAddress: {
        province: shippingAddress.province,
        district: shippingAddress.district,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode || "",
        street: shippingAddress.street,
      },
      subtotal,
      deliveryFee,
      totalAmount,
    });

   // Update product statistics after purchase
await Promise.all(
  orderItems.map((item) =>
    Product.findByIdAndUpdate(item.product, {
      $inc: {
        stock: -item.quantity,
        purchaseCount: item.quantity,
      },
    })
  )
);
    // Order placed — empty the cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================
// My Orders (buyer's own order list)
// ==========================
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================
// Order History / Order Details (single order)
// Accessible by the buyer who placed it, or a seller with an item in it.
// ==========================
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid order ID" });
    }

    const order = await Order.findById(id).populate("items.product", "name images");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const userId = req.user._id.toString();
    const isOwner = order.user.toString() === userId;
    const isItemSeller = order.items.some((item) => item.seller.toString() === userId);

    if (!isOwner && !isItemSeller) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this order",
      });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================
// Seller Orders (orders containing at least one of this seller's products)
// Only that seller's own items are exposed, alongside shared order/shipping info.
// ==========================
export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const orders = await Order.find({ "items.seller": sellerId })
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    const sellerOrders = orders.map((order) => {
      const myItems = order.items.filter(
        (item) => item.seller.toString() === sellerId.toString()
      );
      const mySubtotal = myItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return {
        _id: order._id,
        buyer: order.user,
        customer: order.customer,
        shippingAddress: order.shippingAddress,
        isPaid: order.isPaid,
        createdAt: order.createdAt,
        items: myItems,
        mySubtotal,
      };
    });

    res.status(200).json({ success: true, count: sellerOrders.length, orders: sellerOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================
// Update the status of a single order item (seller-only, own items only)
// ==========================
export const updateOrderItemStatus = async (req, res) => {
  try {
    const { id, itemId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ success: false, message: "Invalid order or item ID" });
    }

    if (!ITEM_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const item = order.items.id(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: "Order item not found" });
    }

    if (item.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this item",
      });
    }

    item.status = status;
    rollUpOrderStatus(order);

    await order.save();

    res.status(200).json({ success: true, message: "Order item status updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================
// Cancel Order (buyer-only, only while still pending)
// ==========================
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid order ID" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this order",
      });
    }

    if (order.orderStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending orders can be cancelled",
      });
    }

    order.items.forEach((item) => {
      item.status = "cancelled";
    });
    order.orderStatus = "cancelled";
    await order.save();

    // Restock every cancelled item
    await Promise.all(
      order.items.map((item) =>
        Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } })
      )
    );

    res.status(200).json({ success: true, message: "Order cancelled", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
