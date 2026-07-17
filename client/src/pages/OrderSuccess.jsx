import { Link, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const OrderSuccess = () => {
  const { state } = useLocation();

  // Reached directly without placing an order — send back to shop
  if (!state) {
    return <Navigate to="/shop" replace />;
  }

  const { orderId, customerName, total, itemCount } = state;
  const shortOrderId = orderId ? orderId.toString().slice(-8).toUpperCase() : "";

  return (
    <section className="min-h-[75vh] flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-lg"
      >
        <div className="w-16 h-16 rounded-full bg-blush flex items-center justify-center mx-auto mb-7">
          <FaCheck className="text-rose-dark" size={22} />
        </div>

        <p className="text-rose-dark uppercase tracking-[3px] text-sm font-semibold mb-3">
          Order Confirmed
        </p>
        <h1 className="font-display text-4xl font-medium text-charcoal mb-4">
          Thank you{customerName ? `, ${customerName.split(" ")[0]}` : ""}
        </h1>
        <p className="text-taupe mb-10 leading-relaxed">
          Your order has been placed and will be prepared with care. We'll
          reach out to confirm delivery details shortly.
        </p>

        <div className="card-luxury p-6 text-left mb-10">
          <div className="flex justify-between py-2 border-b border-line">
            <span className="text-taupe text-sm">Order ID</span>
            <span className="font-semibold text-charcoal text-sm">#{shortOrderId}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-line">
            <span className="text-taupe text-sm">Items</span>
            <span className="font-semibold text-charcoal text-sm">{itemCount}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-taupe text-sm">Amount Due (COD)</span>
            <span className="font-display text-lg font-semibold text-charcoal">
              Rs. {total.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={`/orders/${orderId}`}
            className="btn-luxury-outline inline-block px-10 py-4 rounded-full text-sm uppercase tracking-widest"
          >
            View Order
          </Link>
          <Link
            to="/shop"
            className="btn-luxury inline-block px-10 py-4 rounded-full text-sm uppercase tracking-widest"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default OrderSuccess;
