import API from "../api/axios";

export const getSellerStats = async () => {
  const res = await API.get("/seller/stats");
  return res.data;
};
