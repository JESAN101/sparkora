import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStore } from "react-icons/fa";

import { getSellerOrders, updateOrderItemStatus } from "../../services/orderService";
import StatusBadge from "../../components/common/StatusBadge";
import TrackingTimeline from "../../components/seller/TrackingTimeline";

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"];

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingItemId, setUpdatingItemId] = useState(null);

  const loadOrders = async () => {
    try {
      const data = await getSellerOrders();
      setOrders(data.orders);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, itemId, status) => {
    setUpdatingItemId(itemId);
    try {
      await updateOrderItemStatus(orderId, itemId, status);
      toast.success("Status updated");
      await loadOrders();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not update status");
    } finally {
      setUpdatingItemId(null);
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl sm:text-4xl font-medium text-charcoal mb-8">
        Orders
      </h1>

      {loading ? (
        <p className="text-taupe text-sm">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="card-luxury p-8 text-center">
          <FaStore className="text-taupe/40 mx-auto mb-4" size={36} />
          <h3 className="font-display text-xl font-medium text-charcoal mb-2">
            No orders yet
          </h3>
          <p className="text-taupe text-sm">
            Orders containing your products will show up here as customers buy them.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="card-luxury p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-5 border-b border-line">
                <div>
                  <p className="font-semibold text-charcoal text-sm mb-1">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-taupe">
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    &middot; {order.customer.fullName} &middot; {order.customer.phone}
                  </p>
                  <p className="text-xs text-taupe mt-1">
                    Ship to: {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                    {order.shippingAddress.district}
                  </p>
                </div>
                <span className="font-display text-lg font-semibold text-charcoal">
                  Rs. {order.mySubtotal.toLocaleString()}
                </span>
              </div>

              <div className="space-y-5">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-wrap items-center gap-4 pb-5 border-b border-line last:border-0 last:pb-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-[160px]">
                      <p className="text-sm text-charcoal">{item.name}</p>
                      <p className="text-xs text-taupe">
                        Qty {item.quantity} &middot; Rs. {item.price.toLocaleString()} each
                      </p>
                    </div>

                    <TrackingTimeline status={item.status} />

                    <StatusBadge status={item.status} />

                    <select
                      value={item.status}
                      disabled={updatingItemId === item._id}
                      onChange={(e) => handleStatusChange(order._id, item._id, e.target.value)}
                      className="border border-line rounded-lg text-sm px-3 py-2 bg-ivory focus:outline-none focus:border-rose transition-colors capitalize"
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option} className="capitalize">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
