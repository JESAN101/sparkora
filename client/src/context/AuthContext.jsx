import { createContext, useContext, useEffect, useState } from "react";
import { showSuccess } from "../utils/toast";
import {
  login as loginApi,
  register as registerApi,
  verifyOTP as verifyOTPApi,
  resendOTP as resendOTPApi,
  forgotPassword as forgotPasswordApi,
  verifyResetOTP as verifyResetOTPApi,
  resetPassword as resetPasswordApi,
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

  // Show seller approval message only once
  if (data.showSellerWelcome) {
    showSuccess(
      "🎉 Congratulations! Your seller application has been approved. You can now access the Seller Dashboard."
    );
  } else {
    showSuccess(`Welcome back, ${data.user.firstName}`);
  }

  return data;
};

  
  const register = async (data) => {
  return await registerApi(data);
};

const verifyOTP = async ({ email, otp }) => {
  const data = await verifyOTPApi({ email, otp });

  localStorage.setItem("token", data.token);

  setUser(data.user);

  showSuccess("Email verified successfully.");

  return data;
};

const resendOTP = async (email) => {
  const data = await resendOTPApi({ email });

  showSuccess(data.message);

  return data;
};

const forgotPassword = async (email) => {
  const data = await forgotPasswordApi({ email });

  showSuccess(data.message);

  return data;
};

const verifyResetOTP = async ({ email, otp }) => {
  const data = await verifyResetOTPApi({
    email,
    otp,
  });

  showSuccess(data.message);

  return data;
};

const resetPassword = async ({
  email,
  password,
  confirmPassword,
}) => {
  const data = await resetPasswordApi({
    email,
    password,
    confirmPassword,
  });

  showSuccess(data.message);

  return data;
};

const refreshUser = async () => {
  try {
    const data = await getProfile();
    setUser(data.user);
  } catch (err) {
    console.error(err);
  }
};


  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    showSuccess("Logged out");
  };

  return (
    <AuthContext.Provider
  value={{
  user,
  login,
  register,
  verifyOTP,
  resendOTP,

  forgotPassword,
  verifyResetOTP,
  resetPassword,
  refreshUser,

  logout,
  loading,
}}
>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);