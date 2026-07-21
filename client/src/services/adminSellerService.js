import API from "../api/axios";

export const getSellerApplications = async () => {
  const res = await API.get("/admin/seller-applications");
  return res.data;
};

export const approveSellerApplication = async (id) => {
  const res = await API.put(
    `/admin/seller-applications/${id}/approve`
  );

  return res.data;
};

export const rejectSellerApplication = async (id, reason) => {
  const res = await API.put(
    `/admin/seller-applications/${id}/reject`,
    { reason }
  );

  return res.data;
};

export const deleteSellerApplication = async (id) => {
  const { data } = await api.delete(
    `/admin/seller-applications/${id}`
  );

  return data;
};