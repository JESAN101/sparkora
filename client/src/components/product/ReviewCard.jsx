import { FaStar, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const { user } = useAuth();

  const isOwner = user && review.user === user._id;
  const isAdmin = user?.role === "admin";
  const canManage = isOwner || isAdmin;

  return (
    <div className="bg-white rounded-3xl shadow-md border p-8">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-xl">{review.name}</h3>

          {review.verifiedPurchase && (
            <div className="flex items-center gap-2 mt-2 text-green-600">
              <FaCheckCircle />
              <span className="text-sm">Verified Purchase</span>
            </div>
          )}
        </div>

        <span className="text-gray-500 text-sm">
          {new Date(review.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      <div className="flex gap-1 mt-5">
        {[...Array(review.rating)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
      </div>

      <p className="mt-6 leading-8 text-gray-600">{review.comment}</p>

      {canManage && (
        <div className="mt-6 flex items-center gap-4">
          {isOwner && (
            <button
              onClick={() => onEdit(review)}
              className="text-sm font-medium text-gray-500 hover:text-pink-600 transition"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => onDelete(review._id)}
            className="text-sm font-medium text-gray-500 hover:text-red-600 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;