import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";

const Cart = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + item.discountPrice * item.quantity,
    0
  );

  return (
    <section className="py-14 sm:py-20 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="text-sm text-taupe mb-2">
          <Link to="/" className="hover:text-rose-dark">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">Shopping Bag</span>
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-charcoal mb-10">
          Your Shopping Bag
        </h1>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-2 space-y-5">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </AnimatePresence>

            <Link
              to="/shop"
              className="inline-block text-sm font-medium text-rose-dark hover:text-burgundy transition-colors pt-2"
            >
              ← Continue Shopping
            </Link>
          </div>

          <CartSummary subtotal={subtotal} itemCount={cartItems.length} />
        </div>
      </div>
    </section>
  );
};

export default Cart;
