import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { login as loginApi, register as registerApi, getProfile } from "../services/authService";

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
    toast.success(`Welcome back, ${data.user.fullName}`);
  };

  const register = async ({ name, email, password, phone }) => {
    await registerApi({ fullName: name, email, password, phone });
    // auto-login right after registering
    await login({ email, password });
    toast.success(`Welcome to Sparkora, ${name.split(" ")[0]}`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);