import API from "../api/axios";

export const getProducts = async () => {
  const res = await API.get("/products");
  return res.data;
};

export const getProduct = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (formData) => {
  const res = await API.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateProduct = async (id, formData) => {
  const res = await API.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await API.delete(`/products/${id}`);
  return res.data;
};

export const getMyProducts = async () => {
  const res = await API.get("/products/seller/my-products");
  return res.data;
};

export const updateStock = async (id, stock) => {
  const res = await API.patch(`/products/${id}/stock`, { stock });
  return res.data;
};