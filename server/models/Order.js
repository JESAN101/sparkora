import mongoose from "mongoose";

// Sparkora is a multi-seller marketplace (see Product.seller), so a single
// order can contain items from several different sellers. Each item tracks
// its own fulfillment status so a seller can only see/manage their own
// items, while the buyer still sees the whole order as one unit.
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Snapshot the name/image/price at the time of purchase so the order
  // stays accurate even if the product is later edited or deleted.
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [orderItemSchema],
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: "An order must contain at least one item",
      },
    },

    customer: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },

    shippingAddress: {
      province: { type: String, required: true },
      district: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, default: "" },
      street: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "esewa", "khalti"],
      default: "cod",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },

    subtotal: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },

    // Rolled up from the individual items' statuses — see orderController.
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
