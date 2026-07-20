import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  login as loginApi,
  register as registerApi,
  verifyOTP as verifyOTPApi,
  resendOTP as resendOTPApi,
  getProfile,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load, if a token exists, verify it and load the profile
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await getProfile();
        setUser(data.user);
      } catch (err) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async ({ email, password }) => {
    const data = await loginApi({ email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    toast.success(`Welcome back, ${data.user.firstName}`);
  };

  
  const register = async (data) => {
  return await registerApi(data);
};

const verifyOTP = async ({ email, otp }) => {
  const data = await verifyOTPApi({ email, otp });

  localStorage.setItem("token", data.token);

  setUser(data.user);

  toast.success("Email verified successfully.");

  return data;
};

const resendOTP = async (email) => {
  const data = await resendOTPApi({ email });

  toast.success(data.message);

  return data;
};

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
  value={{
    user,
    login,
    register,
    verifyOTP,
    resendOTP,
    logout,
    loading,
  }}
>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);