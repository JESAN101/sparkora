import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const addToWishlist = (product) => {

    const exists = wishlist.find(
      item => item.id === product.id
    );

    if (exists) {
      toast.error("Already in wishlist");
      return;
    }

    setWishlist([...wishlist, product]);

    toast.success("Added to wishlist ❤️");

  };

  const removeFromWishlist = (id) => {

    setWishlist(
      wishlist.filter(item => item.id !== id)
    );

    toast.success("Removed from wishlist");

  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );

};

export const useWishlist = () =>
  useContext(WishlistContext);