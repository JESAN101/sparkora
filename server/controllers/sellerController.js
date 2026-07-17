import Product from "../models/Product.js";
import Order from "../models/Order.js";

// Products at or below this (but still > 0) are flagged "low stock"
export const LOW_STOCK_THRESHOLD = 5;

// ==========================
// Seller Dashboard Stats (Module 5 – Analytics, also powers the dashboard home)
// ==========================
export const getSellerStats = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const totalProducts = await Product.countDocuments({ seller: sellerId });
    const outOfStockCount = await Product.countDocuments({ seller: sellerId, stock: 0 });
    const lowStockCount = await Product.countDocuments({
      seller: sellerId,
      stock: { $gt: 0, $lte: LOW_STOCK_THRESHOLD },
    });

    const orders = await Order.find({ "items.seller": sellerId })
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    let totalOrders = 0;
    let pendingOrders = 0;
    let deliveredOrders = 0;
    let revenue = 0;

    const shapedOrders = orders.map((order) => {
      const myItems = order.items.filter(
        (item) => item.seller.toString() === sellerId.toString()
      );

      const mySubtotal = myItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const hasActiveItem = myItems.some((item) =>
        ["pending", "processing", "shipped"].includes(item.status)
      );
      const allDelivered = myItems.every((item) => item.status === "delivered");

      totalOrders += 1;
      if (hasActiveItem) pendingOrders += 1;
      if (allDelivered) deliveredOrders += 1;

      myItems.forEach((item) => {
        if (item.status === "delivered") {
          revenue += item.price * item.quantity;
        }
      });

      return {
        _id: order._id,
        buyer: order.user,
        customer: order.customer,
        createdAt: order.createdAt,
        items: myItems,
        mySubtotal,
      };
    });

    const lowStockProducts = await Product.find({
      seller: sellerId,
      stock: { $lte: LOW_STOCK_THRESHOLD },
    })
      .sort({ stock: 1 })
      .limit(5)
      .select("name stock images");

    res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        outOfStockCount,
        lowStockCount,
        totalOrders,
        pendingOrders,
        deliveredOrders,
        revenue,
      },
      recentOrders: shapedOrders.slice(0, 5),
      lowStockProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
