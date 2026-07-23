import API from "../api/axios";

export const getCategories = async () => {
  const res = await API.get("/categories");
  return res.data;
};