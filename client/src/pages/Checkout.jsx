import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useCart } from "../context/CartContext";
import CustomerForm from "../components/checkout/CustomerForm";
import AddressForm from "../components/checkout/AddressForm";
import PaymentMethod from "../components/checkout/PaymentMethod";
import OrderSummary from "../components/checkout/OrderSummary";

const FREE_SHIPPING_THRESHOLD = 50000;
const DELIVERY_FEE = 150;

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.discountPrice * item.quantity,
    0
  );
  const delivery = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;

  const onSubmit = (data) => {
    setSubmitting(true);

    // No backend yet — simulate order placement so the flow is complete
    // end-to-end. Swap this for a real POST /api/orders call later.
    setTimeout(() => {
      const orderId = `SPK${Date.now().toString().slice(-8)}`;

      navigate("/order-success", {
        state: {
          orderId,
          customerName: data.fullName,
          total,
          itemCount: cartItems.length,
        },
      });

      clearCart();
      setSubmitting(false);
    }, 800);
  };

  if (cartItems.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h2 className="font-display text-3xl font-medium text-charcoal mb-3">
            Nothing to check out
          </h2>
          <p className="text-taupe mb-8">
            Your bag is empty — add a piece before checking out.
          </p>
          <Link
            to="/shop"
            className="btn-luxury inline-block px-9 py-4 rounded-full text-sm uppercase tracking-widest"
          >
            Browse Collection
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ivory min-h-screen py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-charcoal mb-12">
          Checkout
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-2 space-y-6">
              <CustomerForm register={register} errors={errors} />
              <AddressForm register={register} errors={errors} />
              <PaymentMethod register={register} />
            </div>

            <OrderSummary
              subtotal={subtotal}
              delivery={delivery}
              total={total}
              submitting={submitting}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
