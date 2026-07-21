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
        <span className="inline-block bg-rose/10 text-rose-dark px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
          Luxury Collection
        </span>

        <p className="text-taupe mt-3 uppercase tracking-widest">
          {product.category}
        </p>
      </div>

      {/* Product Name */}
      <div>
        <h1 className="font-display text-5xl font-semibold text-charcoal">
          {product.name}
        </h1>

        <div className="flex items-center gap-3 mt-4">
          {product.reviews > 0 ? (
            <>
              <FaStar className="text-gold" />

              <span className="font-semibold text-charcoal">
                {product.rating}
              </span>

              <span className="text-taupe">
                ({product.reviews} Reviews)
              </span>
            </>
          ) : (
            <span className="text-taupe text-sm uppercase tracking-wide">
              No reviews yet
            </span>
          )}
        </div>
      </div>

      {/* Price */}
      <div>
        <div className="flex flex-wrap items-center gap-5">
          <span className="text-5xl font-bold text-rose">
            Rs. {product.discountPrice.toLocaleString()}
          </span>

          <span className="text-2xl text-taupe line-through">
            Rs. {product.price.toLocaleString()}
          </span>
        </div>

        <div className="mt-4">
          <span className="bg-gold/10 text-gold px-4 py-2 rounded-full font-semibold">
            Save Rs. {savedAmount.toLocaleString()} ({discountPercentage}% OFF)
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-taupe leading-8 text-lg">
        {product.description}
      </p>

      {/* Quick Info */}
      <div className="grid grid-cols-2 gap-4">

        <div className="card-luxury p-4 flex items-center gap-3">
          <FaGem className="text-rose text-xl" />

          <div>
            <p className="text-sm text-taupe">
              Material
            </p>

            <p className="font-semibold text-charcoal">
              {product.material}
            </p>
          </div>
        </div>

        <div className="card-luxury p-4 flex items-center gap-3">
          <FaCertificate className="text-gold text-xl" />

          <div>
            <p className="text-sm text-taupe">
              Purity
            </p>

            <p className="font-semibold text-charcoal">
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
          <span className="inline-block bg-green-500/15 text-green-600 px-4 py-2 rounded-full font-semibold">
            ✓ In Stock
          </span>
        ) : product.stock > 0 ? (
          <span className="inline-block bg-yellow-500/15 text-yellow-600 px-4 py-2 rounded-full font-semibold">
            Only {product.stock} Left
          </span>
        ) : (
          <span className="inline-block bg-red-500/15 text-red-500 px-4 py-2 rounded-full font-semibold">
            Out of Stock
          </span>
        )}

      </div>

      {/* Delivery */}
      <div className="card-luxury p-5">
        <h3 className="font-semibold text-lg text-charcoal">
          🚚 Estimated Delivery
        </h3>

        <p className="text-taupe mt-2">
          {product.delivery}
        </p>
      </div>

      {/* Quantity */}
      <div>

        <h3 className="font-semibold text-lg mb-4 text-charcoal">
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
          className={`w-full py-4 rounded-xl flex justify-center items-center gap-3 text-lg font-semibold transition ${
            product.stock === 0
              ? "bg-line text-taupe cursor-not-allowed"
              : "btn-luxury"
          }`}
        >
          <FaShoppingCart />
          Add To Cart
        </button>

        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={() => addToWishlist(product)}
            className="btn-luxury-outline rounded-xl py-4 flex justify-center items-center gap-2"
          >
            <FaHeart />
            Wishlist
          </button>

          <button
            onClick={handleBuyNow}
            className="bg-charcoal hover:bg-burgundy text-ivory rounded-xl py-4 flex justify-center items-center gap-2 transition-colors duration-300"
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