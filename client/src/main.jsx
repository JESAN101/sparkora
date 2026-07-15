import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <App />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2500,
              style: {
                background: "#251d20",
                color: "#fbf7f2",
                fontFamily: "Manrope, sans-serif",
                fontSize: "14px",
                borderRadius: "10px",
                padding: "12px 18px",
              },
            }}
          />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  </React.StrictMode>
);
