import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import SellerDashboardLayout from "../layouts/SellerDashboardLayout";
import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

// Public Pages
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import MyOrders from "../pages/MyOrders";
import OrderDetails from "../pages/OrderDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import VerifyOTP from "../pages/VerifyOTP";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyResetOTP from "../pages/VerifyResetOTP";
import ResetPassword from "../pages/ResetPassword";
import BecomeSeller from "../pages/BecomeSeller";

// Seller Pages
import DashboardHome from "../pages/seller/DashboardHome";
import MyProducts from "../pages/seller/MyProducts";
import AddProduct from "../pages/seller/AddProduct";
import EditProduct from "../pages/seller/EditProduct";
import SellerOrders from "../pages/seller/Orders";
import Inventory from "../pages/seller/Inventory";
import Analytics from "../pages/seller/Analytics";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Products from "../pages/admin/Products";
import Orders from "../pages/admin/Orders";
import AdminEditProduct from "../pages/admin/EditProduct";
import SellerApplications from "../pages/admin/SellerApplications";
import Categories from "../pages/admin/Categories";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/shop"
          element={
            <MainLayout>
              <Shop />
            </MainLayout>
          }
        />

        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />

        <Route
          path="/wishlist"
          element={
            <MainLayout>
              <Wishlist />
            </MainLayout>
          }
        />

        <Route
  path="/become-seller"
  element={
    <ProtectedRoute>
      <MainLayout>
        <BecomeSeller />
      </MainLayout>
    </ProtectedRoute>
  }
/>
        
        {/* ================= PROTECTED ================= */}

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Checkout />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <MainLayout>
                <OrderSuccess />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MyOrders />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <OrderDetails />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= OTP ================= */}

        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* ================= SELLER ================= */}

        <Route path="/seller" element={<SellerDashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<MyProducts />} />
          <Route path="products/new" element={<AddProduct />} />
          <Route path="products/:id/edit" element={<EditProduct />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* ================= ADMIN ================= */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id/edit" element={<AdminEditProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="categories" element={<Categories />} />
          <Route
  path="seller-applications"
  element={<SellerApplications />}
/>
        </Route>

        {/* ================= AUTH ================= */}

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
  path="/forgot-password"
  element={
    <PublicRoute>
      <ForgotPassword />
    </PublicRoute>
  }
/>

<Route
  path="/verify-reset-otp"
  element={
    <PublicRoute>
      <VerifyResetOTP />
    </PublicRoute>
  }
/>

<Route
  path="/reset-password"
  element={
    <PublicRoute>
      <ResetPassword />
    </PublicRoute>
  }
/>

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};



export default AppRoutes;