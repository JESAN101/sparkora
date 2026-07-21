import { Navigate, Link } from "react-router-dom";
import {
  FaUserCircle,
  FaBoxOpen,
  FaSignOutAlt,
  FaHeart,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
  <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-ivory via-white to-rose-light/10 py-16">

    {/* Decorative Blur */}
    <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-rose/10 blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gold-light/10 blur-3xl"></div>

    <div className="relative z-10 max-w-6xl mx-auto px-6">

      {/* Heading */}
      <div className="mb-12">
        <p className="uppercase tracking-[4px] text-xs text-rose-dark font-semibold">
          My Account
        </p>

        <h1 className="font-display text-5xl text-charcoal mt-3">
          Welcome Back
        </h1>

        <p className="text-taupe mt-3 text-lg">
          Manage your profile, orders and account information.
        </p>
      </div>

      {/* ================= HERO CARD ================= */}

      <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/40 bg-white/80 backdrop-blur-xl">

        <div className="bg-gradient-to-r from-rose-dark via-rose to-gold px-10 py-12">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* Left */}

            <div className="flex items-center gap-6">

              <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-xl ring-4 ring-white/30">

                <FaUserCircle
                  size={90}
                  className="text-rose-dark"
                />

              </div>

              <div>

                <h2 className="font-display text-4xl text-white">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="text-white/90 mt-2 flex items-center gap-2">
                  {user.email}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">

                  <span className="px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-sm">
                    {user.role === "admin"
                      ? "Administrator"
                      : "Customer"}
                  </span>

                  <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-300/30 text-white text-sm">
                    Verified Member
                  </span>

                </div>

              </div>

            </div>

            {/* Logout */}

            <button
              onClick={logout}
              className="px-7 py-3 rounded-xl bg-white text-rose-dark font-semibold shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-3 self-start lg:self-center"
            >
              <FaSignOutAlt />

              Sign Out
            </button>

          </div>

        </div>

        {/* Bottom Information */}

        <div className="grid md:grid-cols-3 gap-8 p-10">

          <div>

            <p className="text-xs uppercase tracking-[3px] text-taupe">
              Full Name
            </p>

            <h3 className="mt-2 text-lg font-semibold text-charcoal">
              {user.firstName} {user.lastName}
            </h3>

          </div>

          <div>

            <p className="text-xs uppercase tracking-[3px] text-taupe">
              Email Address
            </p>

            <h3 className="mt-2 text-lg font-semibold text-charcoal break-all">
              {user.email}
            </h3>

          </div>

          <div>

            <p className="text-xs uppercase tracking-[3px] text-taupe">
              Account Status
            </p>

            <h3 className="mt-2 text-lg font-semibold text-emerald-600">
              Active & Verified
            </h3>

          </div>

        </div>

      </div>

      {/* ================= ACCOUNT STATS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">

        <div className="rounded-2xl bg-white p-7 shadow-lg border border-line hover:shadow-xl transition-all duration-300">

          <div className="flex items-center justify-between">
            <p className="text-taupe text-sm">
              Orders
            </p>
            <FaBoxOpen className="text-rose-dark/60 text-lg" />
          </div>

          <h3 className="font-display text-4xl text-charcoal mt-3">
            0
          </h3>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-lg border border-line hover:shadow-xl transition-all duration-300">

          <div className="flex items-center justify-between">
            <p className="text-taupe text-sm">
              Wishlist
            </p>
            <FaHeart className="text-rose-dark/60 text-lg" />
          </div>

          <h3 className="font-display text-4xl text-charcoal mt-3">
            0
          </h3>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-lg border border-line hover:shadow-xl transition-all duration-300">

          <div className="flex items-center justify-between">
            <p className="text-taupe text-sm">
              Reviews
            </p>
            <FaStar className="text-rose-dark/60 text-lg" />
          </div>

          <h3 className="font-display text-4xl text-charcoal mt-3">
            0
          </h3>
        </div>

      </div>

            {/* ================= QUICK ACTIONS ================= */}

      <div className="grid lg:grid-cols-2 gap-6 mt-10">

        {/* Orders */}

        <Link
          to="/orders"
          className="group rounded-3xl bg-white border border-line p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-16 h-16 rounded-2xl bg-rose-light/20 flex items-center justify-center mb-6">
            <FaBoxOpen
              size={28}
              className="text-rose-dark"
            />
          </div>

          <h3 className="font-display text-2xl text-charcoal">
            My Orders
          </h3>

          <p className="text-taupe mt-3 leading-7">
            Track your purchases, delivery status and
            view previous luxury orders.
          </p>

          <span className="inline-block mt-6 text-sm font-semibold text-rose-dark group-hover:translate-x-1 transition">
            View Orders →
          </span>
        </Link>

        {/* Wishlist */}

        <Link
          to="/wishlist"
          className="group rounded-3xl bg-white border border-line p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-16 h-16 rounded-2xl bg-gold-light/20 flex items-center justify-center mb-6">
            <FaHeart
              size={26}
              className="text-rose-dark"
            />
          </div>

          <h3 className="font-display text-2xl text-charcoal">
            Wishlist
          </h3>

          <p className="text-taupe mt-3 leading-7">
            Revisit the pieces you've saved and shop
            them whenever you're ready.
          </p>

          <span className="inline-block mt-6 text-sm font-semibold text-rose-dark group-hover:translate-x-1 transition">
            View Wishlist →
          </span>
        </Link>

      </div>

      {/* ================= SECURITY ================= */}

      <div className="mt-10 rounded-3xl bg-white border border-line p-8 shadow-lg">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <FaShieldAlt size={22} />
          </div>

          <div>

            <h3 className="font-display text-2xl text-charcoal">
              Your Account is Secure
            </h3>

            <p className="text-taupe mt-2">
              Your personal information is protected with
              encrypted authentication and secure account
              verification.
            </p>

          </div>

        </div>

      </div>

    </div>
  </section>
);
};

export default Profile;