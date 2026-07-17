import { Navigate, Link } from "react-router-dom";
import { FaUserCircle, FaBoxOpen, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="py-14 sm:py-20 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-charcoal mb-10">
          My Account
        </h1>

        <div className="card-luxury p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-rose" size={52} />
            <div>
              <p className="font-display text-xl font-medium text-charcoal">{user.fullname}</p>
              <p className="text-sm text-taupe">{user.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="btn-luxury-outline px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 self-start sm:self-auto"
          >
            <FaSignOutAlt size={13} />
            Log Out
          </button>
        </div>

        <div className="card-luxury p-8 text-center">
          <FaBoxOpen className="text-taupe/40 mx-auto mb-4" size={36} />
          <h3 className="font-display text-xl font-medium text-charcoal mb-2">
            Order History
          </h3>
          <p className="text-taupe text-sm mb-7">
            View everything you've ordered and track delivery status.
          </p>
          <Link
            to="/orders"
            className="btn-luxury inline-block px-8 py-3.5 rounded-full text-sm uppercase tracking-widest"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Profile;
