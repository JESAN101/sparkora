import Product from "../models/Product.js";
import Order from "../models/Order.js";
import SellerApplication from "../models/SellerApplication.js";

// Products at or below this (but still > 0) are flagged "low stock"
export const LOW_STOCK_THRESHOLD = 5;

// ==========================
// Seller Dashboard Stats
// ==========================
export const getSellerStats = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const totalProducts = await Product.countDocuments({
      seller: sellerId,
    });

    const outOfStockCount = await Product.countDocuments({
      seller: sellerId,
      stock: 0,
    });

    const lowStockCount = await Product.countDocuments({
      seller: sellerId,
      stock: {
        $gt: 0,
        $lte: LOW_STOCK_THRESHOLD,
      },
    });

    const orders = await Order.find({
      "items.seller": sellerId,
    })
      .populate("user", "fullName email")
      .sort({
        createdAt: -1,
      });

    let totalOrders = 0;
    let pendingOrders = 0;
    let deliveredOrders = 0;
    let revenue = 0;

    const shapedOrders = orders.map((order) => {
      const myItems = order.items.filter(
        (item) =>
          item.seller.toString() ===
          sellerId.toString()
      );

      const mySubtotal = myItems.reduce(
        (sum, item) =>
          sum + item.price * item.quantity,
        0
      );

      const hasActiveItem = myItems.some((item) =>
        ["pending", "processing", "shipped"].includes(
          item.status
        )
      );

      const allDelivered = myItems.every(
        (item) => item.status === "delivered"
      );

      totalOrders++;

      if (hasActiveItem) pendingOrders++;

      if (allDelivered) deliveredOrders++;

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
      stock: {
        $lte: LOW_STOCK_THRESHOLD,
      },
    })
      .sort({
        stock: 1,
      })
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

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Apply for Seller Account
// ==========================
export const applySeller = async (req, res) => {
  try {
    const user = req.user;

    // Admin cannot apply
    if (user.role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Admin cannot apply as seller.",
      });
    }

    // Already a seller
    if (user.role === "seller") {
      return res.status(400).json({
        success: false,
        message: "You are already a seller.",
      });
    }

    // Check existing application
    const existing = await SellerApplication.findOne({
      user: user._id,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message:
          "You have already submitted a seller application.",
      });
    }

    const application = await SellerApplication.create({
      user: user._id,

      businessName: req.body.businessName,
      businessType: req.body.businessType,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      province: req.body.province,
      postalCode: req.body.postalCode,
      description: req.body.description,
      citizenshipNumber: req.body.citizenshipNumber,

      status: "pending",
    });

    res.status(201).json({
      success: true,
      message:
        "Seller application submitted successfully.",
      application,
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
// Become Seller
// ==========================

export const becomeSeller = async (req, res) => {
  try {
    const user = req.user;

    if (user.role === "seller") {
      return res.status(400).json({
        success: false,
        message: "You are already a seller.",
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Admin account cannot become a seller.",
      });
    }

    user.role = "seller";

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Congratulations! Your seller account is ready.",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getMySellerApplication = async (req, res) => {
  try {
    const application = await SellerApplication.findOne({
      user: req.user._id,
    });

    if (!application) {
      return res.json({
        success: true,
        application: null,
      });
    }

    res.json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetSellerApplication = async (req, res) => {
  try {
    const application = await SellerApplication.findOne({
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    if (application.status !== "rejected") {
      return res.status(400).json({
        success: false,
        message: "Only rejected applications can be reset.",
      });
    }

    await SellerApplication.findByIdAndDelete(application._id);

    res.json({
      success: true,
      message: "Application reset successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};