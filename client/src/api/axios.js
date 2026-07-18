import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// A 401 means the token itself no longer authenticates the user (expired,
// invalid, or the account has since been blocked — see authMiddleware.js).
// That's distinct from a 403, which means "you're logged in, but not
// allowed to do this specific thing" (e.g. viewing someone else's order) —
// we deliberately don't clear the session on 403, only on 401.
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && localStorage.getItem("token")) {
      localStorage.removeItem("token");
      window.location.href = "/login?sessionExpired=1";
    }

    return Promise.reject(error);
  }
);

export default API;