import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useCart } from "../../context/CartContext";



const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const discount = Math.round(
    ((product.price - product.discountPrice) / product.price) * 100
  );

  return (
    <div className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">

      {/* Product Image */}
      <div className="relative overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Discount Badge */}
        <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          -{discount}%
        </span>

        {/* Wishlist */}
        <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow hover:bg-pink-600 hover:text-white transition">
          <FaHeart />
        </button>

      </div>

      {/* Content */}
      <div className="p-5">

        <p className="text-sm text-gray-500 uppercase">
          {product.category}
        </p>

        <h3 className="text-xl font-semibold mt-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">

          <FaStar className="text-yellow-400" />

          <span className="font-medium">
            {product.rating}
          </span>

          <span className="text-gray-400">
            ({product.reviews})
          </span>

        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-4">

          <span className="text-2xl font-bold text-pink-600">
            Rs. {product.discountPrice.toLocaleString()}
          </span>

          <span className="line-through text-gray-400">
            Rs. {product.price.toLocaleString()}
          </span>

        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">

          <button
  onClick={() => addToCart(product)}
  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition"
>
  <FaShoppingCart />
  Add to Cart
</button>

          <Link
            to={`/product/${product.id}`}
            className="px-5 border rounded-xl flex items-center hover:bg-gray-100 transition"
          >
            View
          </Link>

        </div>

      </div>
    </div>
  );
};

export default ProductCard;