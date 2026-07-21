import { FaStar, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const { user } = useAuth();

  const isOwner = user && review.user === user._id;
  const isAdmin = user?.role === "admin";
  const canManage = isOwner || isAdmin;

  return (
    <div className="card-luxury p-8">

      <div className="flex justify-between items-start gap-4">

        <div>

          <h3 className="font-display text-2xl font-semibold text-charcoal">
            {review.name}
          </h3>

          {review.verifiedPurchase && (
            <div className="flex items-center gap-2 mt-3 text-gold">

              <FaCheckCircle />

              <span className="text-sm font-medium">
                Verified Purchase
              </span>

            </div>
          )}

        </div>

        <span className="text-sm text-taupe whitespace-nowrap">
          {new Date(review.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>

      </div>

      {/* Rating */}

      <div className="flex items-center gap-1 mt-5">

        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={
              index < review.rating
                ? "text-gold"
                : "text-line"
            }
          />
        ))}

      </div>

      {/* Review */}

      <p className="mt-6 leading-8 text-taupe">
        {review.comment}
      </p>

      {/* Actions */}

      {canManage && (
        <div className="mt-8 flex items-center gap-6">

          {isOwner && (
            <button
              onClick={() => onEdit(review)}
              className="text-sm font-semibold text-rose hover:text-rose-dark transition-colors"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => onDelete(review._id)}
            className="text-sm font-semibold text-burgundy hover:opacity-80 transition-opacity"
          >
            Delete
          </button>

        </div>
      )}

    </div>
  );
};

export default ReviewCard;