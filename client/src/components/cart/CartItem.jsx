import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();

  const lineTotal = item.discountPrice * item.quantity;
  const hasDiscount = item.discountPrice < item.price;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3 }}
      className="card-luxury p-5 sm:p-6 flex flex-col sm:flex-row gap-6"
    >
      {/* Image */}
      <div className="w-full sm:w-32 h-40 sm:h-32 rounded-xl overflow-hidden bg-cream shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-rose-dark mb-1">
            {item.category}
          </p>
          <h3 className="font-display text-xl font-medium text-charcoal">
            {item.name}
          </h3>
          {item.purity && (
            <p className="text-sm text-taupe mt-1">
              {item.purity}
              {item.gemstone ? ` · ${item.gemstone}` : ""}
            </p>
          )}

          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-semibold text-charcoal">
              Rs. {item.discountPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-sm text-taupe/70 line-through">
                Rs. {item.price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4">
          {/* Quantity stepper */}
          <div className="flex items-center border border-line rounded-full overflow-hidden">
            <button
              onClick={() => decreaseQty(item.id)}
              disabled={item.quantity <= 1}
              className="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-cream transition-colors disabled:opacity-30"
              aria-label="Decrease quantity"
            >
              <FaMinus size={10} />
            </button>
            <span className="w-9 text-center font-semibold text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => increaseQty(item.id)}
              className="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-cream transition-colors"
              aria-label="Increase quantity"
            >
              <FaPlus size={10} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-display text-lg font-medium text-charcoal hidden sm:block">
              Rs. {lineTotal.toLocaleString()}
            </span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-taupe hover:text-burgundy transition-colors"
              aria-label={`Remove ${item.name} from cart`}
            >
              <FaTrashAlt size={15} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
