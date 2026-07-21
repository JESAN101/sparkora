import API from "../api/axios";

/* ==========================
   Seller Dashboard
========================== */

export const getSellerStats = async () => {
  const res = await API.get("/seller/stats");
  return res.data;
};

/* ==========================
   Seller Application
========================== */

export const applySeller = async (formData) => {
  const res = await API.post("/seller/apply", formData);
  return res.data;
};

export const getMySellerApplication = async () => {
  const res = await API.get("/seller/application");
  return res.data;
};

export const resetSellerApplication = async () => {
  const { data } = await API.delete("/seller/application/reset");
  return data;
};
