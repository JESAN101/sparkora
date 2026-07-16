import API from "../api/axios";

export const getWishlist = async () => {
  const res = await API.get("/wishlist");
  return res.data;
};

export const addWishlistItem = async (productId) => {
  const res = await API.post("/wishlist", { productId });
  return res.data;
};

export const removeWishlistItem = async (productId) => {
  const res = await API.delete(`/wishlist/${productId}`);
  return res.data;
};

export const clearWishlistApi = async () => {
  const res = await API.delete("/wishlist");
  return res.data;
};