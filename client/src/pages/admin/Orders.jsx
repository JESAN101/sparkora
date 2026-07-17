import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import {
  getAdminOrders,
  updateAdminOrderStatus,
  deleteAdminOrder,
} from "../../api/adminApi";
import StatusBadge from "../../components/common/StatusBadge";

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getAdminOrders();
      setOrders(data.orders);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    try {
      const data = await updateAdminOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => (o._id === id ? data.order : o)));
      toast.success("Order status updated");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteAdminOrder(id);
      setOrders((prev) => prev.filter((o) => o._id !== id));
      toast.success("Order deleted");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3 text-left">Order</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Date</th>
              <th className="text-left">Total</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <Fragment key={order._id}>
                <tr className="border-b">
                  <td className="p-3 font-medium">#{order._id.slice(-8).toUpperCase()}</td>
                  <td>{order.customer?.fullName}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>Rs. {order.totalAmount.toLocaleString()}</td>
                  <td>
                    <select
                      value={order.orderStatus}
                      disabled={updatingId === order._id}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1.5 text-xs capitalize"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s} className="capitalize">
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="space-x-2 py-2">
                    <button
                      onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}
                      className="px-3 py-1 bg-slate-600 text-white rounded inline-flex items-center gap-1"
                    >
                      {expandedId === order._id ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                      Items
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      disabled={deletingId === order._id}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {expandedId === order._id && (
                  <tr className="bg-gray-50 border-b">
                    <td colSpan={6} className="p-4">
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item._id} className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded object-cover shrink-0"
                            />
                            <span className="flex-1">{item.name}</span>
                            <span className="text-gray-500">Qty {item.quantity}</span>
                            <span className="text-gray-500">Rs. {item.price.toLocaleString()}</span>
                            <StatusBadge status={item.status} />
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 mt-3">
                        Shipping: {order.shippingAddress?.street}, {order.shippingAddress?.city},{" "}
                        {order.shippingAddress?.district}, {order.shippingAddress?.province}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center text-gray-500 py-8">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;