import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaBoxOpen,
  FaClipboardList,
  FaMoneyBillWave,
  FaHourglassHalf,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPlus,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { getSellerStats } from "../../services/sellerService";
import StatCard from "../../components/seller/StatCard";
import StatusBadge from "../../components/common/StatusBadge";

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getSellerStats();
        setStats(data.stats);
        setRecentOrders(data.recentOrders);
        setLowStockProducts(data.lowStockProducts);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Could not load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <p className="text-taupe text-sm">Loading dashboard...</p>;
  }

  if (!stats) return null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-charcoal">
            Overview
          </h1>
          <p className="text-taupe text-sm mt-1">
            Here's how your shop is doing, {user?.fullName?.split(" ")[0]}.
          </p>
        </div>
        <Link
          to="/seller/products/new"
          className="btn-luxury inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm uppercase tracking-widest"
        >
          <FaPlus size={12} /> Add Product
        </Link>
      </div>

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

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-luxury p-6 sm:p-7">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-medium text-charcoal">Recent Orders</h2>
            <Link to="/seller/orders" className="text-xs text-rose-dark font-medium uppercase tracking-widest">
              View All
            </Link>
          </div>

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
                    <p className="text-xs text-taupe">{order.buyer?.fullName}</p>
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

        <div className="card-luxury p-6 sm:p-7">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-medium text-charcoal">Stock Alerts</h2>
            <Link to="/seller/inventory" className="text-xs text-rose-dark font-medium uppercase tracking-widest">
              Manage
            </Link>
          </div>

          {lowStockProducts.length === 0 ? (
            <p className="text-taupe text-sm">All products are well stocked.</p>
          ) : (
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-3 pb-4 border-b border-line last:border-0 last:pb-0"
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-11 h-11 rounded-lg object-cover shrink-0"
                  />
                  <p className="text-sm text-charcoal flex-1 min-w-0 truncate">{product.name}</p>
                  <span
                    className={`flex items-center gap-1.5 text-xs font-semibold shrink-0 ${
                      product.stock === 0 ? "text-burgundy" : "text-gold"
                    }`}
                  >
                    <FaExclamationTriangle size={11} />
                    {product.stock === 0 ? "Out of stock" : `${product.stock} left`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
