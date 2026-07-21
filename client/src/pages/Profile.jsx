import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  FaUserCircle,
  FaBoxOpen,
  FaSignOutAlt,
  FaHeart,
  FaShieldAlt,
  FaStar,
  FaStore,
  FaCog,
  FaCalendarAlt,
  FaMedal,
  FaLock,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { getMyOrders } from "../services/orderService";
import { getProductReviews } from "../services/reviewService";
import { getProducts } from "../services/productService";

const Profile = () => {
  const { user, logout } = useAuth();

  const { wishlist } = useWishlist();

  const [orderCount, setOrderCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const orderData = await getMyOrders();

        const orders = orderData.orders || [];

        setOrderCount(orders.length);
        setRecentOrders(orders.slice(0, 3));

        // Count reviews written by this user.
        // NOTE: this loops over every product and fires one request per
        // product to fetch its reviews - fine for now, but will not scale.
        // Once you have a `GET /reviews/my-reviews` endpoint, replace this
        // whole block with a single call:
        //   const reviews = await getMyReviews();
        //   setReviewCount(reviews.length);
        const productData = await getProducts();

        const products = productData.products || [];

        let reviews = 0;

        for (const product of products) {
          try {
            const data = await getProductReviews(product._id);

            reviews += data.reviews.filter(
              (review) => review.user === user._id
            ).length;
          } catch {
            // ignore
          }
        }

        setReviewCount(reviews);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingStats(false);
      }
    };

    if (user) {
      loadProfileData();
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <section className="relative min-h-screen overflow-hidden bg-ivory py-16 transition-colors duration-300">
      {/* Decorative Background */}
      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-rose/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-gold-light/10 blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-12">
          <p className="uppercase tracking-[4px] text-xs font-semibold text-rose-dark">
            My Account
          </p>

          <h1 className="font-display text-5xl text-charcoal mt-3">
            Welcome Back
          </h1>

          <p className="text-taupe mt-3 text-lg max-w-2xl">
            Manage your profile, orders, wishlist and account
            preferences from your Sparkora dashboard.
          </p>

          <div className="divider-gold mt-8"></div>
        </div>

        {/* ================= HERO CARD ================= */}
        <div className="card-luxury overflow-hidden">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-rose-dark via-rose to-gold px-10 py-12">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
              {/* Left Side */}
              <div className="flex items-center gap-6">
                <div className="h-28 w-28 rounded-full bg-white flex items-center justify-center shadow-xl">
                  <FaUserCircle size={88} className="text-rose-dark" />
                </div>

                <div>
                  <h2 className="font-display text-4xl text-white">
                    {user.firstName} {user.lastName}
                  </h2>

                  <p className="text-white/90 mt-2">{user.email}</p>

                  <div className="flex flex-wrap gap-3 mt-5">
                    <span className="rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm text-white">
                      {user.role === "admin" ? "Administrator" : "Customer"}
                    </span>

                    <span className="rounded-full border border-white/30 bg-emerald-500/20 px-4 py-2 text-sm text-white flex items-center gap-2">
                      <FaMedal />
                      Verified Member
                    </span>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={logout}
                className="btn-luxury-outline rounded-xl bg-white px-7 py-3 flex items-center gap-3 self-start xl:self-center"
              >
                <FaSignOutAlt />
                Sign Out
              </button>
            </div>
          </div>

          {/* Bottom Information */}
          <div className="grid lg:grid-cols-4 gap-8 p-10">
            {/* Full Name */}
            <div>
              <p className="uppercase tracking-[3px] text-xs text-taupe">
                Full Name
              </p>
              <h3 className="mt-2 text-lg font-semibold text-charcoal">
                {user.firstName} {user.lastName}
              </h3>
            </div>

            {/* Email */}
            <div>
              <p className="uppercase tracking-[3px] text-xs text-taupe">
                Email
              </p>
              <h3 className="mt-2 font-semibold text-charcoal break-all">
                {user.email}
              </h3>
            </div>

            {/* Member Since */}
            <div>
              <p className="uppercase tracking-[3px] text-xs text-taupe">
                Member Since
              </p>
              <h3 className="mt-2 font-semibold text-charcoal flex items-center gap-2">
                <FaCalendarAlt className="text-gold" />
                {memberSince}
              </h3>
            </div>

            {/* Status */}
            <div>
              <p className="uppercase tracking-[3px] text-xs text-taupe">
                Account Status
              </p>
              <h3 className="mt-2 font-semibold text-green-600">
                Active & Verified
              </h3>
            </div>
          </div>
        </div>

        {/* ================= ACCOUNT STATISTICS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* Orders */}
          <div className="card-luxury p-7 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <p className="text-taupe text-sm">Total Orders</p>
              <div className="h-12 w-12 rounded-xl bg-rose/10 flex items-center justify-center">
                <FaBoxOpen className="text-rose-dark text-xl" />
              </div>
            </div>
            <h3 className="font-display text-5xl mt-5 text-charcoal">
              {loadingStats ? (
                <span className="inline-block h-10 w-16 rounded-lg bg-line animate-pulse" />
              ) : (
                orderCount
              )}
            </h3>
          </div>

          {/* Wishlist */}
          <div className="card-luxury p-7 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <p className="text-taupe text-sm">Wishlist Items</p>
              <div className="h-12 w-12 rounded-xl bg-gold-light/20 flex items-center justify-center">
                <FaHeart className="text-rose-dark text-xl" />
              </div>
            </div>
            <h3 className="font-display text-5xl mt-5 text-charcoal">
              {loadingStats ? (
                <span className="inline-block h-10 w-16 rounded-lg bg-line animate-pulse" />
              ) : (
                wishlist.length
              )}
            </h3>
          </div>

          {/* Reviews */}
          <div className="card-luxury p-7 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <p className="text-taupe text-sm">Reviews Written</p>
              <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <FaStar className="text-gold text-xl" />
              </div>
            </div>
            <h3 className="font-display text-5xl mt-5 text-charcoal">
              {loadingStats ? (
                <span className="inline-block h-10 w-16 rounded-lg bg-line animate-pulse" />
              ) : (
                reviewCount
              )}
            </h3>
          </div>
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="grid lg:grid-cols-2 gap-6 mt-10">
          {/* Orders */}
          <Link
            to="/orders"
            className="card-luxury p-8 group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-rose/10 flex items-center justify-center mb-6">
              <FaBoxOpen size={28} className="text-rose-dark" />
            </div>

            <h3 className="font-display text-3xl text-charcoal">
              My Orders
            </h3>

            <p className="text-taupe mt-4 leading-7">
              View your order history, delivery status and invoices.
            </p>

            <span className="inline-block mt-6 text-sm font-semibold text-rose-dark group-hover:translate-x-1 transition">
              View Orders →
            </span>
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="card-luxury p-8 group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-gold-light/20 flex items-center justify-center mb-6">
              <FaHeart size={28} className="text-rose-dark" />
            </div>

            <h3 className="font-display text-3xl text-charcoal">
              Wishlist
            </h3>

            <p className="text-taupe mt-4 leading-7">
              Browse all your saved jewellery and purchase them anytime.
            </p>

            <span className="inline-block mt-6 text-sm font-semibold text-rose-dark group-hover:translate-x-1 transition">
              Open Wishlist →
            </span>
          </Link>
        </div>

        {/* ================= RECENT ORDERS ================= */}
        <div className="card-luxury mt-10 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl text-charcoal">
              Recent Orders
            </h2>

            <Link
              to="/orders"
              className="text-rose-dark font-semibold hover:underline"
            >
              View All
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-taupe">No orders yet.</p>
          ) : (
            <div className="space-y-5">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex justify-between border-b border-line pb-5"
                >
                  <div>
                    <h4 className="font-semibold">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h4>

                    <p className="text-sm text-taupe">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      {/* Verify this matches your Order model - some
                          schemas use totalAmount instead of totalPrice */}
                      Rs. {order.totalPrice}
                    </p>

                    <span className="text-green-600">
                      {/* Verify this matches your Order model - some
                          schemas use orderStatus instead of status */}
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= WISHLIST PREVIEW ================= */}
        <div className="grid lg:grid-cols-2 gap-6 mt-10">
          {/* Wishlist Preview */}
          <div className="card-luxury p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-3xl text-charcoal">
                Wishlist Preview
              </h2>

              <Link
                to="/wishlist"
                className="text-rose-dark font-semibold hover:underline"
              >
                View All
              </Link>
            </div>

            {wishlist.length === 0 ? (
              <p className="text-taupe">Your wishlist is empty.</p>
            ) : (
              <div className="space-y-5">
                {wishlist.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b border-line pb-4"
                  >
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>

                      <p className="text-sm text-taupe">{item.brand}</p>
                    </div>

                    <span className="font-semibold text-rose-dark">
                      Rs. {item.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Become Seller */}
          <Link
            to="/become-seller"
            className="card-luxury p-8 group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-gold-light/20 flex items-center justify-center mb-6">
              <FaStore size={28} className="text-gold" />
            </div>

            <h2 className="font-display text-3xl text-charcoal">
              Become a Seller
            </h2>

            <p className="text-taupe mt-4 leading-7">
              Join Sparkora Marketplace and start selling your handcrafted
              luxury jewellery.
            </p>

            <span className="inline-block mt-6 text-sm font-semibold text-rose-dark group-hover:translate-x-1 transition">
              Apply Now →
            </span>
          </Link>
        </div>

        {/* ================= SETTINGS ================= */}
        <div className="grid lg:grid-cols-2 gap-6 mt-10">
          {/* Account Settings - intentionally disabled for now, no route
              exists yet, so this is a static card rather than a Link */}
          <div
            aria-disabled="true"
            className="card-luxury p-8 relative cursor-not-allowed opacity-60 select-none"
          >
            <span className="absolute top-6 right-6 flex items-center gap-1.5 rounded-full bg-line px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-taupe">
              <FaLock size={10} />
              Coming Soon
            </span>

            <div className="w-16 h-16 rounded-2xl bg-rose/10 flex items-center justify-center mb-6">
              <FaCog size={28} className="text-rose-dark" />
            </div>

            <h3 className="font-display text-3xl text-charcoal">
              Account Settings
            </h3>

            <p className="text-taupe mt-4 leading-7">
              Update your personal information, password and preferences.
            </p>

            <span className="inline-block mt-6 text-sm font-semibold text-taupe">
              Manage Settings
            </span>
          </div>

          {/* Security */}
          <div className="card-luxury p-8">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <FaShieldAlt size={26} className="text-green-600" />
              </div>

              <div>
                <h3 className="font-display text-3xl text-charcoal">
                  Your Account is Secure
                </h3>

                <p className="text-taupe mt-4 leading-8">
                  Sparkora protects your personal information with encrypted
                  authentication, secure payment gateways and modern
                  security standards.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="divider-gold mb-8"></div>

          <p className="text-taupe">Thank you for choosing</p>

          <h2 className="font-display text-5xl text-charcoal mt-3">
            Sparkora
          </h2>

          <p className="text-taupe mt-4">
            Luxury Jewellery • Timeless Elegance • Crafted With Love
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;