import API from "../api/axios";

export const login = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const register = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const verifyOTP = async (data) => {
  const res = await API.post("/auth/verify-otp", data);
  return res.data;
};

export const resendOTP = async (data) => {
  const res = await API.post("/auth/resend-otp", data);
  return res.data;
};

export const getProfile = async () => {
  const res = await API.get("/users/profile");
  return res.data;
};