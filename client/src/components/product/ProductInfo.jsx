import { useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaBolt,
  FaGem,
  FaCertificate,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import QuantitySelector from "./QuantitySelector";
import ProductSpecifications from "./ProductSpecifications";
import ProductHighlights from "./ProductHighlights";

const ProductInfo = ({ product }) => {
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const savedAmount = product.price - product.discountPrice;

  const discountPercentage = Math.round(
    (savedAmount / product.price) * 100
  );

  return (
    <div className="space-y-8">

      {/* Category */}
      <div>

        <span className="inline-block bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
          Luxury Collection
        </span>

        <p className="text-gray-500 mt-3 uppercase tracking-widest">
          {product.category}
        </p>

      </div>

      {/* Product Name */}
      <div>

        <h1 className="text-5xl font-bold text-gray-900">
          {product.name}
        </h1>

        <div className="flex items-center gap-3 mt-4">

          <FaStar className="text-yellow-400" />

          <span className="font-semibold">
            {product.rating}
          </span>

          <span className="text-gray-500">
            ({product.reviews} Reviews)
          </span>

        </div>

      </div>

      {/* Price */}
      <div>

        <div className="flex flex-wrap items-center gap-5">

          <span className="text-5xl font-bold text-pink-600">
            Rs. {product.discountPrice.toLocaleString()}
          </span>

          <span className="text-2xl text-gray-400 line-through">
            Rs. {product.price.toLocaleString()}
          </span>

        </div>

        <div className="mt-4">

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            Save Rs. {savedAmount.toLocaleString()} ({discountPercentage}% OFF)
          </span>

        </div>

      </div>

      {/* Description */}
      <p className="text-gray-600 leading-8 text-lg">
        {product.description}
      </p>

      {/* Quick Info */}
      <div className="grid grid-cols-2 gap-4">

        <div className="bg-white shadow rounded-xl p-4 flex items-center gap-3">

          <FaGem className="text-pink-600 text-xl" />

          <div>

            <p className="text-sm text-gray-500">
              Material
            </p>

            <p className="font-semibold">
              {product.material}
            </p>

          </div>

        </div>

        <div className="bg-white shadow rounded-xl p-4 flex items-center gap-3">

          <FaCertificate className="text-yellow-500 text-xl" />

          <div>

            <p className="text-sm text-gray-500">
              Purity
            </p>

            <p className="font-semibold">
              {product.purity}
            </p>

          </div>

        </div>

      </div>

      {/* Highlights */}
      <ProductHighlights product={product} />

      {/* Stock */}
      <div>

        {product.stock > 10 ? (
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            ✓ In Stock
          </span>
        ) : product.stock > 0 ? (
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold">
            Only {product.stock} Left
          </span>
        ) : (
          <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
            Out of Stock
          </span>
        )}

      </div>

      {/* Delivery */}
      <div className="bg-pink-50 border border-pink-200 rounded-2xl p-5">

        <h3 className="font-semibold text-lg">
          🚚 Estimated Delivery
        </h3>

        <p className="text-gray-600 mt-2">
          {product.delivery}
        </p>

      </div>

      {/* Quantity */}
      <div>

        <h3 className="font-semibold text-lg mb-4">
          Quantity
        </h3>

        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
        />

      </div>

      {/* Buttons */}
      <div className="space-y-4">

        <button
          disabled={product.stock === 0}
          onClick={handleAddToCart}
          className={`w-full py-4 rounded-xl flex justify-center items-center gap-3 text-lg font-semibold transition
          ${
            product.stock === 0
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-pink-600 hover:bg-pink-700 text-white"
          }`}
        >
          <FaShoppingCart />

          Add To Cart

        </button>

        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={() => addToWishlist(product)}
            className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white rounded-xl py-4 flex justify-center items-center gap-2 transition"
          >
            <FaHeart />

            Wishlist

          </button>

          <button
            onClick={handleBuyNow}
            className="bg-gray-900 hover:bg-black text-white rounded-xl py-4 flex justify-center items-center gap-2 transition"
          >
            <FaBolt />

            Buy Now

          </button>

        </div>

      </div>

      {/* Specifications */}
      <ProductSpecifications product={product} />

    </div>
  );
};

export default ProductInfo;