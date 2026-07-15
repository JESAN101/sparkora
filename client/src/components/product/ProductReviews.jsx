import reviews from "../../data/reviews";
import ReviewCard from "./ReviewCard";

const ProductReviews = ({ product }) => {

  const productReviews = reviews.filter(
    review => review.productId === product.id
  );


  <div className="bg-white rounded-3xl shadow-md p-8 mb-10">

    <h2 className="text-4xl font-bold">
        Customer Reviews
    </h2>

    <div className="flex items-center gap-4 mt-5">

        <span className="text-5xl font-bold">
            {product.rating}
        </span>

        <div>

            <div className="text-yellow-500 text-xl">
                ★★★★★
            </div>

            <p className="text-gray-500">
                {product.reviews} Reviews
            </p>

        </div>

    </div>

</div>

  return (
    <section className="mt-24">

      <h2 className="text-4xl font-bold mb-10">
        Customer Reviews
      </h2>

      {productReviews.length === 0 ? (

        <p>No reviews yet.</p>

      ) : (

        <div className="space-y-6">

          {productReviews.map(review => (

            <ReviewCard
              key={review.id}
              review={review}
            />

          ))}

        </div>

      )}

    </section>
  );
};

export default ProductReviews;