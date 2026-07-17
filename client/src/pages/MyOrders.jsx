import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaBoxOpen, FaChevronRight } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { getMyOrders } from "../services/orderService";
import StatusBadge from "../components/common/StatusBadge";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data.orders);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Could not load your orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="py-14 sm:py-20 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-charcoal mb-10">
          My Orders
        </h1>

        {loading ? (
          <p className="text-taupe text-sm">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <div className="card-luxury p-8 text-center">
            <FaBoxOpen className="text-taupe/40 mx-auto mb-4" size={36} />
            <h3 className="font-display text-xl font-medium text-charcoal mb-2">
              No orders yet
            </h3>
            <p className="text-taupe text-sm mb-7">
              Your order history will appear here once you place your first order.
            </p>
            <Link
              to="/shop"
              className="btn-luxury inline-block px-8 py-3.5 rounded-full text-sm uppercase tracking-widest"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="card-luxury p-6 sm:p-7 flex items-center justify-between gap-4 hover:border-rose transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <span className="font-semibold text-charcoal text-sm">
                      #{order._id.slice(-8).toUpperCase()}
                    </span>
                    <StatusBadge status={order.orderStatus} />
                  </div>
                  <p className="text-taupe text-sm">
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    &middot; {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-display text-lg font-semibold text-charcoal">
                    Rs. {order.totalAmount.toLocaleString()}
                  </span>
                  <FaChevronRight className="text-taupe" size={14} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyOrders;
