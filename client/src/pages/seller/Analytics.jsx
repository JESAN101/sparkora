import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBoxOpen,
  FaClipboardList,
  FaMoneyBillWave,
  FaHourglassHalf,
  FaCheckCircle,
} from "react-icons/fa";

import { getSellerStats } from "../../services/sellerService";
import StatCard from "../../components/seller/StatCard";
import StatusBadge from "../../components/common/StatusBadge";

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getSellerStats();
        setStats(data.stats);
        setRecentOrders(data.recentOrders);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Could not load analytics");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <p className="text-taupe text-sm">Loading analytics...</p>;
  }

  if (!stats) return null;

  return (
    <div>
      <h1 className="font-display text-3xl sm:text-4xl font-medium text-charcoal mb-8">
        Analytics
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        <StatCard label="Total Products" value={stats.totalProducts} icon={FaBoxOpen} accent="rose" />
        <StatCard label="Total Orders" value={stats.totalOrders} icon={FaClipboardList} accent="gold" />
        <StatCard
          label="Revenue"
          value={`Rs. ${stats.revenue.toLocaleString()}`}
          icon={FaMoneyBillWave}
          accent="green"
        />
        <StatCard label="Pending Orders" value={stats.pendingOrders} icon={FaHourglassHalf} accent="burgundy" />
        <StatCard label="Delivered Orders" value={stats.deliveredOrders} icon={FaCheckCircle} accent="green" />
      </div>

      <div className="card-luxury p-6 sm:p-7">
        <h2 className="font-display text-xl font-medium text-charcoal mb-5">Recent Orders</h2>

        {recentOrders.length === 0 ? (
          <p className="text-taupe text-sm">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-line last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-charcoal">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-taupe">
                    {order.buyer?.fullName} &middot;{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-charcoal">
                    Rs. {order.mySubtotal.toLocaleString()}
                  </span>
                  {order.items[0] && <StatusBadge status={order.items[0].status} />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
