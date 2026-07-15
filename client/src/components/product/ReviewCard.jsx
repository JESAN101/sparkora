import {
  FaStar,
  FaCheckCircle,
  FaThumbsUp,
} from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md border p-8">

      <div className="flex justify-between">

        <div>

          <h3 className="font-bold text-xl">
            {review.name}
          </h3>

          {review.verified && (
            <div className="flex items-center gap-2 mt-2 text-green-600">

              <FaCheckCircle />

              <span className="text-sm">
                Verified Purchase
              </span>

            </div>
          )}

        </div>

        <span className="text-gray-500">
          {review.date}
        </span>

      </div>

      <div className="flex gap-1 mt-5">

        {[...Array(review.rating)].map((_, i) => (
          <FaStar
            key={i}
            className="text-yellow-400"
          />
        ))}

      </div>

      <p className="mt-6 leading-8 text-gray-600">
        {review.comment}
      </p>

      <button className="mt-6 flex items-center gap-2 text-gray-500 hover:text-pink-600 transition">

        <FaThumbsUp />

        Helpful ({review.helpful})

      </button>

    </div>
  );
};

export default ReviewCard;