import API from "../api/axios";

export const placeOrder = async (orderData) => {
  const res = await API.post("/orders", orderData);
  return res.data;
};

export const getMyOrders = async () => {
  const res = await API.get("/orders/my-orders");
  return res.data;
};

export const getSellerOrders = async () => {
  const res = await API.get("/orders/seller-orders");
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await API.get(`/orders/${id}`);
  return res.data;
};

export const updateOrderItemStatus = async (orderId, itemId, status) => {
  const res = await API.put(`/orders/${orderId}/items/${itemId}/status`, { status });
  return res.data;
};

export const cancelOrder = async (id) => {
  const res = await API.put(`/orders/${id}/cancel`);
  return res.data;
};
