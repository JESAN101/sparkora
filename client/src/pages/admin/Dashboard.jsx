import { useEffect, useState } from "react";
import DashboardCard from "../../components/admin/DashboardCard";
import { getDashboardStats } from "../../api/adminApi";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return (
      <p className="text-center mt-10">
        Loading Dashboard...
      </p>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <DashboardCard
          title="Users"
          value={stats.totalUsers}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Products"
          value={stats.totalProducts}
          color="bg-green-600"
        />

        <DashboardCard
          title="Orders"
          value={stats.totalOrders}
          color="bg-yellow-500"
        />

        <DashboardCard
          title="Pending Orders"
          value={stats.pendingOrders}
          color="bg-red-500"
        />

        <DashboardCard
          title="Delivered"
          value={stats.deliveredOrders}
          color="bg-purple-600"
        />

        <DashboardCard
          title="Revenue"
          value={`Rs. ${stats.revenue}`}
          color="bg-pink-600"
        />

      </div>

    </div>
  );
};

export default Dashboard;