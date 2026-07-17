import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { cancelOrder, getOrderById } from "../services/orderService";
import StatusBadge from "../components/common/StatusBadge";

const OrderDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const loadOrder = async () => {
    try {
      const data = await getOrderById(id);
      setOrder(data.order);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not load this order");
      navigate("/orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleCancel = async () => {
    setCancelling(true);
    try {
      const data = await cancelOrder(id);
      setOrder(data.order);
      toast.success("Order cancelled");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not cancel order");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-ivory min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-taupe text-sm">Loading order...</p>
        </div>
      </section>
    );
  }

  if (!order) return null;

  return (
    <section className="py-14 sm:py-20 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-sm text-taupe hover:text-rose-dark transition-colors mb-6"
        >
          <FaArrowLeft size={12} /> Back to My Orders
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-charcoal">
            Order #{order._id.slice(-8).toUpperCase()}
          </h1>
          <StatusBadge status={order.orderStatus} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card-luxury p-6">
            <h2 className="font-display text-lg font-medium text-charcoal mb-4">
              Customer
            </h2>
            <p className="text-sm text-charcoal">{order.customer.fullName}</p>
            <p className="text-sm text-taupe">{order.customer.email}</p>
            <p className="text-sm text-taupe">{order.customer.phone}</p>
          </div>

          <div className="card-luxury p-6">
            <h2 className="font-display text-lg font-medium text-charcoal mb-4">
              Shipping Address
            </h2>
            <p className="text-sm text-charcoal">
              {order.shippingAddress.street}, {order.shippingAddress.city}
            </p>
            <p className="text-sm text-taupe">
              {order.shippingAddress.district}, {order.shippingAddress.province}
              {order.shippingAddress.postalCode ? ` – ${order.shippingAddress.postalCode}` : ""}
            </p>
          </div>
        </div>

        <div className="card-luxury p-6 sm:p-7 mb-8">
          <h2 className="font-display text-lg font-medium text-charcoal mb-5">Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 pb-4 border-b border-line last:border-0 last:pb-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-charcoal">{item.name}</p>
                  <p className="text-xs text-taupe">
                    Qty {item.quantity} &middot; Rs. {item.price.toLocaleString()} each
                  </p>
                </div>
                <StatusBadge status={item.status} />
                <span className="text-sm font-medium text-charcoal shrink-0 w-24 text-right">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="divider-gold my-5" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-taupe">
              <span>Subtotal</span>
              <span className="text-charcoal">Rs. {order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-taupe">
              <span>Delivery</span>
              <span className="text-charcoal">
                {order.deliveryFee === 0 ? "Free" : `Rs. ${order.deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-2">
              <span className="font-display text-lg text-charcoal">Total</span>
              <span className="font-display text-2xl font-semibold text-charcoal">
                Rs. {order.totalAmount.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-taupe pt-1 uppercase tracking-wide">
              Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}
            </p>
          </div>
        </div>

        {order.orderStatus === "pending" && (
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="btn-luxury-outline px-8 py-3.5 rounded-full text-sm uppercase tracking-widest"
          >
            {cancelling ? "Cancelling..." : "Cancel Order"}
          </button>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
