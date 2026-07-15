import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaShieldAlt, FaGem, FaTruck, FaTag } from "react-icons/fa";

const FREE_SHIPPING_THRESHOLD = 50000;
const DELIVERY_FEE = 150;

// Demo coupon codes — will move to a real validation endpoint once
// the backend is in place.
const COUPONS = {
  SPARKORA10: 10,
  FIRSTBUY: 15,
};

const CartSummary = ({ subtotal, itemCount }) => {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(null);

  const handleApply = (e) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    const percent = COUPONS[trimmed];
    if (percent) {
      setApplied({ code: trimmed, percent });
      toast.success(`"${trimmed}" applied — ${percent}% off`);
    } else {
      toast.error("That code isn't valid");
    }
    setCode("");
  };

  const discount = applied ? Math.round((subtotal * applied.percent) / 100) : 0;
  const delivery = subtotal === 0 ? 0 : subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal - discount + delivery;
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - (subtotal - discount);

  return (
    <div className="card-luxury p-7 sm:p-8 h-fit lg:sticky lg:top-28">
      <h2 className="font-display text-2xl font-medium text-charcoal mb-1">
        Order Summary
      </h2>
      <p className="text-sm text-taupe mb-6">
        {itemCount} {itemCount === 1 ? "item" : "items"}
      </p>

      {remainingForFreeShipping > 0 && (
        <p className="text-xs text-rose-dark bg-blush rounded-lg px-3 py-2 mb-6">
          Add Rs. {remainingForFreeShipping.toLocaleString()} more for free shipping
        </p>
      )}

      {/* Coupon */}
      <form onSubmit={handleApply} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <FaTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-taupe/50" size={13} />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Coupon code"
            className="w-full pl-9 pr-3 py-2.5 rounded-full border border-line text-sm bg-ivory focus:outline-none focus:border-rose transition-colors"
          />
        </div>
        <button
          type="submit"
          className="btn-luxury-outline px-5 rounded-full text-sm font-medium shrink-0"
        >
          Apply
        </button>
      </form>

      <div className="space-y-3 text-[15px]">
        <div className="flex justify-between text-taupe">
          <span>Subtotal</span>
          <span className="text-charcoal">Rs. {subtotal.toLocaleString()}</span>
        </div>

        {applied && (
          <div className="flex justify-between text-rose-dark">
            <span>Discount ({applied.code})</span>
            <span>− Rs. {discount.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between text-taupe">
          <span>Delivery</span>
          <span className="text-charcoal">
            {delivery === 0 ? "Free" : `Rs. ${delivery}`}
          </span>
        </div>

        <div className="divider-gold my-2" />

        <div className="flex justify-between items-baseline">
          <span className="font-display text-lg text-charcoal">Total</span>
          <span className="font-display text-2xl font-semibold text-charcoal">
            Rs. {total.toLocaleString()}
          </span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="btn-luxury block text-center mt-7 py-4 rounded-full text-sm uppercase tracking-widest"
      >
        Proceed to Checkout
      </Link>

      <div className="flex items-center justify-between mt-7 pt-6 border-t border-line text-taupe">
        <div className="flex flex-col items-center gap-1.5 text-center flex-1">
          <FaShieldAlt size={16} />
          <span className="text-[11px] leading-tight">Insured Shipping</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center flex-1">
          <FaGem size={16} />
          <span className="text-[11px] leading-tight">Certified Purity</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center flex-1">
          <FaTruck size={16} />
          <span className="text-[11px] leading-tight">Cash on Delivery</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
