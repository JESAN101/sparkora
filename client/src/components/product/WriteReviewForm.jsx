import { useState } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

import {
  createReview,
  updateReview,
} from "../../services/reviewService";

const WriteReviewForm = ({
  productId,
  editingReview,
  onSaved,
  onCancel,
}) => {
  const [rating, setRating] = useState(
    editingReview?.rating || 0
  );

  const [hoverRating, setHoverRating] = useState(0);

  const [comment, setComment] = useState(
    editingReview?.comment || ""
  );

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const isEditing = Boolean(editingReview);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!rating) {
      setError("Please select a star rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write your review.");
      return;
    }

    setSubmitting(true);

    try {
      const data = isEditing
        ? await updateReview(
            productId,
            editingReview._id,
            {
              rating,
              comment,
            }
          )
        : await createReview(productId, {
            rating,
            comment,
          });

      toast.success(
        isEditing
          ? "Review updated successfully"
          : "Review submitted successfully"
      );

      onSaved(data.review);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to submit review."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card-luxury p-8 mb-10"
    >
      {/* Heading */}

      <div className="mb-8">

        <p className="uppercase tracking-[0.3em] text-xs text-gold font-medium">
          Customer Feedback
        </p>

        <h3 className="font-display text-3xl text-charcoal mt-2">
          {isEditing
            ? "Edit Your Review"
            : "Write a Review"}
        </h3>

        <div className="divider-gold mt-5" />

      </div>

      {/* Rating */}

      <div className="mb-8">

        <p className="text-sm text-taupe mb-4">
          Your Rating
        </p>

        <div className="flex gap-2">

          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() =>
                setHoverRating(star)
              }
              onMouseLeave={() =>
                setHoverRating(0)
              }
              className="transition-transform hover:scale-110"
            >
              <FaStar
                size={28}
                className={
                  star <=
                  (hoverRating || rating)
                    ? "text-gold"
                    : "text-line"
                }
              />
            </button>
          ))}

        </div>

      </div>

      {/* Review */}

      <div>

        <label className="block text-sm text-taupe mb-3">
          Share Your Experience
        </label>

        <textarea
          rows="6"
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          placeholder="Tell other customers what you loved about this jewelry..."
          className="
            w-full
            rounded-2xl
            border
            border-line
            bg-cream
            p-5
            text-charcoal
            placeholder:text-taupe
            resize-none
            outline-none
            focus:border-rose
            transition
          "
        />

      </div>

      {/* Error */}

      {error && (
        <p className="mt-4 text-sm text-red-500">
          {error}
        </p>
      )}

      {/* Buttons */}

      <div className="flex flex-wrap gap-4 mt-8">

        <button
          type="submit"
          disabled={submitting}
          className="btn-luxury rounded-full px-8 py-3 disabled:opacity-60"
        >
          {submitting
            ? "Saving..."
            : isEditing
            ? "Save Changes"
            : "Submit Review"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-luxury-outline rounded-full px-8 py-3"
          >
            Cancel
          </button>
        )}

      </div>

    </form>
  );
};

export default WriteReviewForm;