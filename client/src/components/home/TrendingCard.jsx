import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaFire,
  FaShoppingCart,
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const TrendingCard = ({ product, rank }) => {
  const { addToCart } = useCart();

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  const inWishlist = wishlist.some(
    (item) => item.id === product.id
  );

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleCart = () => {
    addToCart(product);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      className="group flex flex-col h-full overflow-hidden rounded-3xl bg-white border border-line shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Image Section */}

      <div className="relative shrink-0">

        {/* Trending Badge */}

        <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-charcoal/75 backdrop-blur-md border border-gold/30 text-gold px-2.5 py-1 rounded-full shadow-lg">
          <FaFire size={11} />
          <span className="text-[11px] font-semibold tracking-wide">
            #{rank} Trending
          </span>
        </div>

        {/* Wishlist */}

        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/70 backdrop-blur-md border border-white/50 flex items-center justify-center shadow hover:bg-rose hover:text-white hover:border-rose transition"
        >
          {inWishlist ? (
            <FaHeart
              size={13}
              className="text-rose"
            />
          ) : (
            <FaRegHeart
              size={13}
              className="text-charcoal"
            />
          )}
        </button>

        <Link to={`/product/${product._id}`} className="relative block">
          <div className="overflow-hidden">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-[200px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

          <div className="absolute bottom-3 left-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-charcoal text-[11px] font-medium uppercase tracking-[1.5px]">
              Quick View
              <FiArrowRight size={12} />
            </span>
          </div>
        </Link>
      </div>

      {/* Content */}

      <div className="flex flex-col flex-1 min-h-0 p-5">

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-gold">
            <FaStar size={12} />
            <span className="text-sm font-medium text-charcoal">
              {Number(product.rating || 0).toFixed(1)}
            </span>
          </div>

          <span className="text-xs text-taupe">
            {product.reviews || 0} Reviews
          </span>
        </div>

        <Link to={`/product/${product._id}`}>
          <h3 className="font-display text-lg text-charcoal group-hover:text-rose-dark group-hover:-translate-y-0.5 transition leading-snug h-[26px] overflow-hidden">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2.5 flex items-center gap-3 min-h-[28px]">
          <span className="text-lg font-semibold text-charcoal">
            Rs. {product.discountPrice}
          </span>

          {product.discountPrice !== product.price && (
            <span className="line-through text-taupe text-sm">
              Rs. {product.price}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 mb-3">
          <span className="text-[11px] uppercase tracking-[2px] text-taupe">
            {product.purchaseCount || 0} Sold
          </span>

          <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[2px] text-rose-dark font-semibold">
            <FaFire size={10} />
            Trending
          </span>
        </div>

        <div className="mt-auto">
          <button
            onClick={handleCart}
            className="w-full flex items-center justify-center gap-2 rounded-full border border-charcoal py-2.5 uppercase tracking-[2px] text-xs hover:bg-charcoal hover:text-white transition"
          >
            <FaShoppingCart size={13} />
            Add to Cart
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default TrendingCard;