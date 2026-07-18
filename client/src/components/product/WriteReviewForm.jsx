import { useState } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

import { createReview, updateReview } from "../../services/reviewService";

const WriteReviewForm = ({ productId, editingReview, onSaved, onCancel }) => {
  const [rating, setRating] = useState(editingReview?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState(editingReview?.comment || "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(editingReview);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!rating) {
      setError("Please select a star rating");
      return;
    }
    if (!comment.trim()) {
      setError("Please write a comment");
      return;
    }

    setSubmitting(true);
    try {
      const data = isEditing
        ? await updateReview(productId, editingReview._id, { rating, comment })
        : await createReview(productId, { rating, comment });

      toast.success(isEditing ? "Review updated" : "Review submitted");
      onSaved(data.review);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-md border p-8 mb-8">
      <h3 className="text-xl font-bold mb-5">
        {isEditing ? "Edit Your Review" : "Write a Review"}
      </h3>

      <div className="flex items-center gap-1 mb-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="text-2xl"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            <FaStar
              className={star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-300"}
            />
          </button>
        ))}
      </div>

      <textarea
        rows="4"
        placeholder="Share your experience with this product..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border border-gray-300 rounded-xl p-4 text-sm focus:outline-none focus:border-pink-500"
      />

      {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

      <div className="flex items-center gap-3 mt-5">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-pink-600 text-white rounded-full text-sm font-semibold hover:bg-pink-700 disabled:opacity-60"
        >
          {submitting ? "Saving..." : isEditing ? "Save Changes" : "Submit Review"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default WriteReviewForm;