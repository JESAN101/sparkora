import { Link } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaShoppingBag,
  FaStar,
} from "react-icons/fa";

import { motion } from "framer-motion";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  const inWishlist = wishlist.some(
    (item) => item.id === product.id
  );

  const discount = Math.round(
    ((product.price - product.discountPrice) /
      product.price) *
      100
  );

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
      group
      card-luxury
      overflow-hidden
      flex
      flex-col
      hover:border-gold
      hover:shadow-2xl
      duration-300
      "
    >
      {/* Image */}

      <div className="relative overflow-hidden bg-cream">

        <Link to={`/product/${product.id}`}>

          <img
            src={product.image}
            alt={product.name}
            className="
            w-full
            h-72
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
            "
          />

        </Link>

        {discount > 0 && (
          <span
            className="
            absolute
            top-4
            left-4
            px-3
            py-1

            rounded-full

            bg-burgundy
            text-ivory

            text-xs
            font-semibold
            tracking-wider

            shadow-lg
            "
          >
            -{discount}%
          </span>
        )}

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={toggleWishlist}
          aria-label="Wishlist"
          className="
          absolute
          top-4
          right-4

          w-11
          h-11

          rounded-full

          wishlist-button bg-white/85 backdrop-blur-md

          flex
          items-center
          justify-center

          shadow-md
          "
        >
          {inWishlist ? (
            <FaHeart
              className="text-rose"
              size={16}
            />
          ) : (
            <FaRegHeart
              className="text-charcoal"
              size={16}
            />
          )}
        </motion.button>
      </div>

      {/* Content */}

      <div className="flex flex-col flex-1 p-6">

        <p className="text-xs uppercase tracking-[0.25em] text-taupe">
          {product.category}
        </p>

        <Link to={`/product/${product.id}`}>

          <h3
            className="
            mt-2

            font-display
            text-2xl

            text-charcoal

            transition-colors

            group-hover:text-rose-dark
            "
          >
            {product.name}
          </h3>

        </Link>

        <div className="flex items-center gap-2 mt-3">

          {product.reviews > 0 ? (
            <>
              <FaStar
                className="text-gold"
                size={13}
              />

              <span className="font-semibold text-charcoal">
                {product.rating}
              </span>

              <span className="text-sm text-taupe">
                ({product.reviews})
              </span>
            </>
          ) : (
            <span className="text-xs uppercase text-taupe">
              No Reviews
            </span>
          )}

        </div>

        <div className="mt-4 flex items-center gap-3">

          <span className="text-2xl font-semibold text-charcoal">
            Rs. {product.discountPrice.toLocaleString()}
          </span>

          {discount > 0 && (
            <span className="text-taupe line-through">
              Rs. {product.price.toLocaleString()}
            </span>
          )}

        </div>

        <div className="mt-auto pt-6 flex gap-3">

          <button
            onClick={() => addToCart(product)}
            className="
            btn-luxury

            flex-1

            py-3

            rounded-full

            flex
            items-center
            justify-center
            gap-2
            "
          >
            <FaShoppingBag />

            Add to Bag
          </button>

          <Link
            to={`/product/${product.id}`}
            className="
            btn-luxury-outline

            px-6

            rounded-full

            flex
            items-center
            justify-center
            "
          >
            View
          </Link>

        </div>

      </div>
    </motion.div>
  );
};

export default ProductCard;