import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCartApi,
} from "../services/cartService";

const CartContext = createContext();
const GUEST_CART_KEY = "sparkora-cart";

// Backend cart items look like { product: {...fullProductDoc}, quantity }.
// Flatten that into the shape CartItem/CartSummary/ProductCard already expect.
const normalizeCartItem = (item) => {
  const product = item.product || {};
  return {
    ...product,
    id: product._id,
    image: product.images?.[0] || "",
    quantity: item.quantity,
  };
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(GUEST_CART_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  // Guest (logged-out) cart stays mirrored to localStorage
  useEffect(() => {
    if (!user) {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  // When a user logs in: push any guest-cart items into their backend cart,
  // then treat the backend cart as the source of truth from then on.
  useEffect(() => {
    if (!user) return;

    const syncOnLogin = async () => {
      setLoading(true);
      try {
        const guestItems = JSON.parse(
  localStorage.getItem(GUEST_CART_KEY) || "[]"
);

// Get current server cart first
const serverCart = await getCart();

const serverIds = serverCart.cart.items.map(
  (item) => item.product._id
);

// Only add products that don't already exist
for (const item of guestItems) {
  if (!serverIds.includes(item.id)) {
    try {
      await addCartItem(item.id, item.quantity);
    } catch (itemErr) {
      console.error(itemErr);
    }
  }
}

// Clear guest cart after merging
localStorage.removeItem(GUEST_CART_KEY);

// Reload latest cart
const updatedCart = await getCart();

setCartItems(
  updatedCart.cart.items.map(normalizeCartItem)
);
      } catch (err) {
        console.error("Cart sync failed:", err?.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    syncOnLogin();
  }, [user]);

  const addToCart = async (product) => {
    const productId = product._id || product.id;

    if (user) {
      const data = await addCartItem(productId, 1);
      setCartItems(data.cart.items.map(normalizeCartItem));
      return;
    }

    const exists = cartItems.find((item) => item.id === productId);
    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, id: productId, quantity: 1 }]);
    }
  };

  const removeFromCart = async (id) => {
    if (user) {
      const data = await removeCartItem(id);
      setCartItems(data.cart.items.map(normalizeCartItem));
      return;
    }
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const increaseQty = async (id) => {
    if (user) {
      const current = cartItems.find((item) => item.id === id);
      const data = await updateCartItem(id, (current?.quantity || 1) + 1);
      setCartItems(data.cart.items.map(normalizeCartItem));
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = async (id) => {
    if (user) {
      const current = cartItems.find((item) => item.id === id);
      const nextQty = Math.max(1, (current?.quantity || 1) - 1);
      const data = await updateCartItem(id, nextQty);
      setCartItems(data.cart.items.map(normalizeCartItem));
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    );
  };

  const clearCart = async () => {
    if (user) {
      await clearCartApi();
    }
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);