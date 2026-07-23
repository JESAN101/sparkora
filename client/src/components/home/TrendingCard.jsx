import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaStar,
  FaFire,
  FaShoppingCart,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const TrendingCard = ({ product, rank }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
  };

  const handleCart = () => {
    addToCart(product);
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.35 }}
      className="group flex flex-col h-full overflow-hidden rounded-3xl bg-white border border-line shadow hover:shadow-2xl transition-all duration-500"
    >
      {/* Image Section */}

      <div className="relative">

        {/* Trending Badge */}

        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full shadow-lg">
          <FaFire size={12} />
          <span className="text-xs font-semibold">
            #{rank} Trending
          </span>
        </div>

        {/* Wishlist */}

        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow hover:bg-rose hover:text-white transition"
        >
          <FaHeart size={14} />
        </button>

        <Link to={`/product/${product._id}`}>
          <div className="overflow-hidden">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-[340px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </Link>
      </div>

      {/* Content */}

      <div className="flex flex-col flex-1 p-6">

        {/* Rating */}

        <div className="flex items-center justify-between mb-3">

          <div className="flex items-center gap-1 text-gold">
            <FaStar size={13} />
            <span className="text-sm font-medium">
              {Number(product.rating || 0).toFixed(1)}
            </span>
          </div>

          <span className="text-xs text-taupe">
            {product.reviews || 0} Reviews
          </span>

        </div>

        {/* Product Name */}

        <Link to={`/product/${product._id}`}>

          <h3
            className="
              font-display
              text-2xl
              text-charcoal
              group-hover:text-rose-dark
              transition
              leading-snug
              h-[72px]
              overflow-hidden
            "
          >
            {product.name}
          </h3>

        </Link>

        {/* Price */}

        <div className="mt-4 flex items-center gap-3 min-h-[34px]">

          <span className="text-2xl font-semibold text-charcoal">
            Rs. {product.discountPrice}
          </span>

          {product.discountPrice !== product.price && (
            <span className="line-through text-taupe">
              Rs. {product.price}
            </span>
          )}

        </div>

        {/* Bottom Stats */}

        <div className="flex items-center justify-between mt-6 mb-6">

          <span className="text-xs uppercase tracking-[2px] text-taupe">
            {product.purchaseCount || 0} Sold
          </span>

          <span className="text-xs uppercase tracking-[2px] text-orange-600 font-semibold">
            🔥 Trending
          </span>

        </div>

        {/* Push Button to Bottom */}

        <div className="mt-auto">

          <button
            onClick={handleCart}
            className="w-full flex items-center justify-center gap-2 rounded-full border border-charcoal py-3 uppercase tracking-[2px] text-sm hover:bg-charcoal hover:text-white transition"
          >
            <FaShoppingCart />
            Add to Cart
          </button>

        </div>

      </div>
    </motion.div>
  );
};

export default TrendingCard;