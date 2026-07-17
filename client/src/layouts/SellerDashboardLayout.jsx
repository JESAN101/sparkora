import { Navigate, Outlet } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import SellerSidebar from "../components/seller/SellerSidebar";

// Wraps every /seller/* route. Sparkora doesn't have a dedicated "seller"
// role — any logged-in user can list products (see Product.seller) — so the
// only gate here is authentication, matching how productController already
// scopes create/update/delete to req.user._id.
const SellerDashboardLayout = () => {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <p className="text-taupe text-sm">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col lg:flex-row">
      <SellerSidebar />

      <div className="flex-1 min-w-0">
        <header className="flex items-center justify-between gap-4 px-6 sm:px-8 py-4 bg-white border-b border-line">
          <div>
            <p className="text-sm text-taupe">Welcome back,</p>
            <p className="font-display text-lg font-medium text-charcoal">{user.fullName}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-charcoal/70">
              <FaUserCircle size={22} />
              <span className="text-sm">{user.email}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm font-medium text-rose-dark hover:text-burgundy transition-colors"
            >
              <FaSignOutAlt size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerDashboardLayout;
