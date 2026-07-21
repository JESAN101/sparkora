import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ThemeProvider>
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <App />
          <Toaster
  position="top-right"
  reverseOrder={false}
  gutter={12}
  containerStyle={{
    top: 30,
    right: 30,
  }}
  toastOptions={{
    duration: 3500,

    style: {
      background: "#ffffff",
      color: "#2E2A27",
      border: "1px solid #E8DDD5",
      borderRadius: "16px",
      padding: "16px 20px",
      fontSize: "15px",
      fontWeight: "500",
      boxShadow:
        "0 15px 35px rgba(0,0,0,0.12)",
    },

    success: {
      iconTheme: {
        primary: "#B3735A",
        secondary: "#fff",
      },
    },

    error: {
      iconTheme: {
        primary: "#8A1C1C",
        secondary: "#fff",
      },
    },

    loading: {
      iconTheme: {
        primary: "#B3735A",
        secondary: "#fff",
      },
    },
  }}
/>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
