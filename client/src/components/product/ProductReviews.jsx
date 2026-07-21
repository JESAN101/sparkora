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
      } catch {
        toast.error("Could not load reviews");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [product.id, user]);

  const reviewCount = reviews.length;

  const avgRating =
    reviewCount === 0
      ? 0
      : Math.round(
          (reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount) * 10
        ) / 10;

  const handleSaved = (savedReview) => {
    setReviews((prev) => {
      const exists = prev.some((r) => r._id === savedReview._id);

      return exists
        ? prev.map((r) =>
            r._id === savedReview._id ? savedReview : r
          )
        : [savedReview, ...prev];
    });

    setEligibility({
      canReview: false,
      hasReviewed: true,
      review: savedReview,
    });

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

      setReviews((prev) =>
        prev.filter((r) => r._id !== reviewId)
      );

      if (eligibility?.review?._id === reviewId) {
        setEligibility({
          canReview: true,
          hasReviewed: false,
        });
      }

      toast.success("Review deleted");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Could not delete review"
      );
    }
  };

  return (
    <section className="mt-24">

      {/* Header Card */}
      <div className="card-luxury p-8 mb-10">

        <h2 className="font-display text-4xl font-semibold text-charcoal">
          Customer Reviews
        </h2>

        <div className="flex items-center gap-5 mt-6">

          <span className="text-5xl font-bold text-rose">
            {avgRating || "—"}
          </span>

          <div>

            <div className="flex text-gold text-xl gap-1">

              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.round(avgRating)
                      ? "text-gold"
                      : "text-line"
                  }
                />
              ))}

            </div>

            <p className="text-taupe mt-1">
              {reviewCount} Review
              {reviewCount !== 1 && "s"}
            </p>

          </div>

        </div>

        <div className="mt-8">

          {!user && (
            <p className="text-sm text-taupe">
              <Link
                to="/login"
                className="text-rose font-semibold hover:text-rose-dark"
              >
                Log in
              </Link>{" "}
              to write a review.
            </p>
          )}

          {user &&
            eligibility &&
            !eligibility.hasReviewed &&
            !eligibility.canReview && (
              <p className="text-sm text-taupe">
                You can review this product after it has been delivered.
              </p>
            )}

          {user &&
            eligibility?.canReview &&
            !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="btn-luxury px-8 py-3 rounded-full text-sm font-semibold"
              >
                Write a Review
              </button>
            )}

        </div>

      </div>

      {/* Review Form */}

      {showForm && (
        <div className="mb-10">
          <WriteReviewForm
            productId={product.id}
            editingReview={editingReview}
            onSaved={handleSaved}
            onCancel={() => {
              setShowForm(false);
              setEditingReview(null);
            }}
          />
        </div>
      )}

      {/* Reviews */}

      {loading ? (
        <div className="card-luxury p-8 text-center text-taupe">
          Loading reviews...
        </div>
      ) : reviews.length === 0 ? (
        <div className="card-luxury p-8 text-center">
          <h3 className="text-xl font-display text-charcoal">
            No Reviews Yet
          </h3>

          <p className="text-taupe mt-2">
            Be the first customer to share your experience.
          </p>
        </div>
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