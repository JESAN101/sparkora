import { useCart } from "../../context/CartContext";

const OrderSummary = ({ subtotal, delivery, total, submitting }) => {
  const { cartItems } = useCart();

  return (
    <div className="card-luxury p-7 sm:p-8 h-fit lg:sticky lg:top-28">
      <h2 className="font-display text-2xl font-medium text-charcoal mb-6">
        Order Summary
      </h2>

      <div className="space-y-3 max-h-56 overflow-y-auto pr-1 mb-5">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 rounded-lg object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-charcoal truncate">{item.name}</p>
              <p className="text-xs text-taupe">Qty {item.quantity}</p>
            </div>
            <span className="text-sm font-medium text-charcoal shrink-0">
              Rs. {(item.discountPrice * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="divider-gold mb-5" />

      <div className="space-y-3 text-[15px]">
        <div className="flex justify-between text-taupe">
          <span>Subtotal</span>
          <span className="text-charcoal">Rs. {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-taupe">
          <span>Delivery</span>
          <span className="text-charcoal">{delivery === 0 ? "Free" : `Rs. ${delivery}`}</span>
        </div>

        <div className="divider-gold my-2" />

        <div className="flex justify-between items-baseline">
          <span className="font-display text-lg text-charcoal">Total</span>
          <span className="font-display text-2xl font-semibold text-charcoal">
            Rs. {total.toLocaleString()}
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-luxury w-full mt-7 py-4 rounded-full text-sm uppercase tracking-widest"
      >
        {submitting ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default OrderSummary;
