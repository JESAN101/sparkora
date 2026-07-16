import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem as removeWishlistItemApi,
} from "../services/wishlistService";

const WishlistContext = createContext();
const GUEST_WISHLIST_KEY = "wishlist";

// Backend wishlist items look like { product: {...fullProductDoc} }.
// Flatten that into the shape ProductCard/Wishlist page already expect.
const normalizeWishlistItem = (item) => {
  const product = item.product || {};
  return {
    ...product,
    id: product._id,
    image: product.images?.[0] || product.image || "",
  };
};

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem(GUEST_WISHLIST_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  // Guest (logged-out) wishlist stays mirrored to localStorage
  useEffect(() => {
    if (!user) {
      localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  // When a user logs in: push any guest-wishlist items into their backend
  // wishlist, then treat the backend wishlist as the source of truth.
  useEffect(() => {
    if (!user) return;

    const syncOnLogin = async () => {
      setLoading(true);
      try {
        const guestItems = JSON.parse(localStorage.getItem(GUEST_WISHLIST_KEY) || "[]");

        for (const item of guestItems) {
          try {
            await addWishlistItem(item.id);
          } catch (itemErr) {
            // Skip items that fail (e.g. stale/invalid ids) instead of
            // aborting the sync for every other item in the wishlist.
            console.error(`Skipping wishlist item ${item.id}:`, itemErr?.response?.data || itemErr);
          }
        }
        localStorage.removeItem(GUEST_WISHLIST_KEY);

        const data = await getWishlist();
        setWishlist(data.wishlist.items.map(normalizeWishlistItem));
      } catch (err) {
        console.error("Wishlist sync failed:", err?.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    syncOnLogin();
  }, [user]);

  const addToWishlist = async (product) => {
    const productId = product._id || product.id;

    const exists = wishlist.find((item) => item.id === productId);
    if (exists) {
      toast.error("Already in wishlist");
      return;
    }

    if (user) {
      try {
        const data = await addWishlistItem(productId);
        setWishlist(data.wishlist.items.map(normalizeWishlistItem));
        toast.success("Added to wishlist ❤️");
      } catch (err) {
        console.error("Add to wishlist failed:", err?.response?.data || err);
        toast.error("Couldn't add to wishlist");
      }
      return;
    }

    setWishlist([...wishlist, { ...product, id: productId }]);
    toast.success("Added to wishlist ❤️");
  };

  const removeFromWishlist = async (id) => {
    if (user) {
      try {
        const data = await removeWishlistItemApi(id);
        setWishlist(data.wishlist.items.map(normalizeWishlistItem));
        toast.success("Removed from wishlist");
      } catch (err) {
        console.error("Remove from wishlist failed:", err?.response?.data || err);
        toast.error("Couldn't remove from wishlist");
      }
      return;
    }

    setWishlist(wishlist.filter((item) => item.id !== id));
    toast.success("Removed from wishlist");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);