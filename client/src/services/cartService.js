import API from "../api/axios";

export const getCart = async () => {
  const res = await API.get("/cart");
  return res.data;
};

export const addCartItem = async (productId, quantity = 1) => {
  const res = await API.post("/cart", { productId, quantity });
  return res.data;
};

export const updateCartItem = async (productId, quantity) => {
  const res = await API.put(`/cart/${productId}`, { quantity });
  return res.data;
};

export const removeCartItem = async (productId) => {
  const res = await API.delete(`/cart/${productId}`);
  return res.data;
};

export const clearCartApi = async () => {
  const res = await API.delete("/cart");
  return res.data;
};