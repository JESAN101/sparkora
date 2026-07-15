import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingBag, FaStar } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const inWishlist = wishlist.some((item) => item.id === product.id);
  const discount = Math.round(
    ((product.price - product.discountPrice) / product.price) * 100
  );

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group card-luxury overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-cream">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </Link>

        {discount > 0 && (
          <span className="absolute top-4 left-4 bg-burgundy text-ivory px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            −{discount}%
          </span>
        )}

        <button
          onClick={toggleWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:bg-rose hover:text-ivory transition-colors"
        >
          {inWishlist ? <FaHeart className="text-rose" size={15} /> : <FaRegHeart size={15} />}
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-taupe uppercase tracking-widest">
          {product.category}
        </p>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-xl font-medium mt-1.5 text-charcoal hover:text-rose-dark transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 mt-2 text-sm">
          <FaStar className="text-gold" size={13} />
          <span className="font-medium text-charcoal">{product.rating}</span>
          <span className="text-taupe">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-xl font-semibold text-charcoal">
            Rs. {product.discountPrice.toLocaleString()}
          </span>
          {discount > 0 && (
            <span className="text-sm text-taupe/70 line-through">
              Rs. {product.price.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex gap-3 mt-5 pt-1">
          <button
            onClick={() => addToCart(product)}
            className="btn-luxury flex-1 py-3 rounded-full flex items-center justify-center gap-2 text-sm font-medium"
          >
            <FaShoppingBag size={13} />
            Add to Bag
          </button>

          <Link
            to={`/product/${product.id}`}
            className="btn-luxury-outline px-5 rounded-full flex items-center text-sm font-medium"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
