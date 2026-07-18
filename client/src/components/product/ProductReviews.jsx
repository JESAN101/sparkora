import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import {
  getProductReviews,
  getReviewEligibility,
  deleteReview,
} from "../../services/reviewService";
import ReviewCard from "./ReviewCard";
import WriteReviewForm from "./WriteReviewForm";

const ProductReviews = ({ product }) => {
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eligibility, setEligibility] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const reviewsData = await getProductReviews(product.id);
        setReviews(reviewsData.reviews);

        if (user) {
          const eligibilityData = await getReviewEligibility(product.id);
          setEligibility(eligibilityData);
        }
      } catch (err) {
        toast.error("Could not load reviews");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [product.id, user]);

  // Compute the average/count from what's actually loaded so a newly
  // submitted review reflects instantly, without waiting on a product refetch.
  const reviewCount = reviews.length;
  const avgRating =
    reviewCount === 0
      ? 0
      : Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount) * 10) / 10;

  const handleSaved = (savedReview) => {
    setReviews((prev) => {
      const exists = prev.some((r) => r._id === savedReview._id);
      return exists
        ? prev.map((r) => (r._id === savedReview._id ? savedReview : r))
        : [savedReview, ...prev];
    });
    setEligibility({ canReview: false, hasReviewed: true, review: savedReview });
    setShowForm(false);
    setEditingReview(null);
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setShowForm(true);
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await deleteReview(product.id, reviewId);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));

      const wasOwnReview = eligibility?.review?._id === reviewId;
      if (wasOwnReview) {
        setEligibility({ canReview: true, hasReviewed: false });
      }

      toast.success("Review deleted");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not delete review");
    }
  };

  return (
    <section className="mt-24">
      <div className="bg-white rounded-3xl shadow-md p-8 mb-10">
        <h2 className="text-4xl font-bold">Customer Reviews</h2>

        <div className="flex items-center gap-4 mt-5">
          <span className="text-5xl font-bold">{avgRating || "—"}</span>

          <div>
            <div className="text-yellow-500 text-xl flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.round(avgRating) ? "" : "text-gray-300"} />
              ))}
            </div>
            <p className="text-gray-500">{reviewCount} Review{reviewCount === 1 ? "" : "s"}</p>
          </div>
        </div>

        <div className="mt-6">
          {!user && (
            <p className="text-sm text-gray-500">
              <Link to="/login" className="text-pink-600 font-medium">
                Log in
              </Link>{" "}
              to write a review.
            </p>
          )}

          {user && eligibility && !eligibility.hasReviewed && !eligibility.canReview && (
            <p className="text-sm text-gray-500">
              You can review this product once it's been delivered to you.
            </p>
          )}

          {user && eligibility?.canReview && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-pink-600 text-white rounded-full text-sm font-semibold hover:bg-pink-700"
            >
              Write a Review
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <WriteReviewForm
          productId={product.id}
          editingReview={editingReview}
          onSaved={handleSaved}
          onCancel={() => {
            setShowForm(false);
            setEditingReview(null);
          }}
        />
      )}

      {loading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductReviews;