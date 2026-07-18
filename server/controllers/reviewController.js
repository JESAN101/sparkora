import mongoose from "mongoose";
import Review from "../models/Review.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// Recomputes a product's aggregate rating/review count from its Review
// documents. Called after every create/update/delete so Product.rating and
// Product.reviews never drift from the underlying reviews.
const recalculateProductRating = async (productId) => {
  const stats = await Review.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  const avgRating = stats.length > 0 ? stats[0].avgRating : 0;
  const count = stats.length > 0 ? stats[0].count : 0;

  await Product.findByIdAndUpdate(productId, {
    rating: Math.round(avgRating * 10) / 10, // round to 1 decimal place
    reviews: count,
  });
};

// A buyer can review a product once they have an order item for it that has
// been marked "delivered" — this is what backs the "Verified Purchase" badge.
const hasDeliveredPurchase = async (userId, productId) => {
  const order = await Order.findOne({
    user: userId,
    items: {
      $elemMatch: {
        product: productId,
        status: "delivered",
      },
    },
  });

  return Boolean(order);
};

// ==========================
// Get Reviews for a Product (public)
// ==========================
export const getProductReviews = async (req, res) => {
  try {
    const { id: productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const reviews = await Review.find({ product: productId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================
// Check Review Eligibility (logged-in user, for this product)
// Lets the frontend decide whether to show the "Write a Review" form.
// ==========================
export const getReviewEligibility = async (req, res) => {
  try {
    const { id: productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id,
    });

    if (existingReview) {
      return res.status(200).json({
        success: true,
        canReview: false,
        hasReviewed: true,
        review: existingReview,
      });
    }

    const purchased = await hasDeliveredPurchase(req.user._id, productId);

    res.status(200).json({
      success: true,
      canReview: purchased,
      hasReviewed: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================
// Create a Review (buyer-only, must have a delivered order for this product)
// ==========================
export const createReview = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const ratingNum = Number(rating);
    if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    if (!comment || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: "A comment is required",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    const purchased = await hasDeliveredPurchase(req.user._id, productId);
    if (!purchased) {
      return res.status(403).json({
        success: false,
        message: "You can only review products from a delivered order",
      });
    }

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      name: req.user.fullName,
      rating: ratingNum,
      comment: comment.trim(),
      verifiedPurchase: true,
    });

    await recalculateProductRating(productId);

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    // Duplicate key error from the unique (product, user) index — a
    // safety net in case of a race condition past the check above.
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================
// Update a Review (author-only)
// ==========================
export const updateReview = async (req, res) => {
  try {
    const { id: productId, reviewId } = req.params;
    const { rating, comment } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(productId) ||
      !mongoose.Types.ObjectId.isValid(reviewId)
    ) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const review = await Review.findOne({ _id: reviewId, product: productId });
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own review",
      });
    }

    if (rating !== undefined) {
      const ratingNum = Number(rating);
      if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
        return res.status(400).json({
          success: false,
          message: "Rating must be between 1 and 5",
        });
      }
      review.rating = ratingNum;
    }

    if (comment !== undefined) {
      if (!comment.trim()) {
        return res.status(400).json({ success: false, message: "Comment cannot be empty" });
      }
      review.comment = comment.trim();
    }

    await review.save();
    await recalculateProductRating(productId);

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================
// Delete a Review (author or admin)
// ==========================
export const deleteReview = async (req, res) => {
  try {
    const { id: productId, reviewId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(productId) ||
      !mongoose.Types.ObjectId.isValid(reviewId)
    ) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const review = await Review.findOne({ _id: reviewId, product: productId });
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    const isAuthor = review.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this review",
      });
    }

    await review.deleteOne();
    await recalculateProductRating(productId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};