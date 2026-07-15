import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

// Frontend-only mock auth so Login / Register / Profile work end-to-end
// before the backend exists. Swap login()/register() for real API calls
// (and store the JWT instead of a plain user object) once /api/auth is live.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("sparkora-user");
    return saved ? JSON.parse(saved) : null;
  });

  const persist = (userData) => {
    localStorage.setItem("sparkora-user", JSON.stringify(userData));
    setUser(userData);
  };

  const login = ({ email }) => {
    const userData = { name: email.split("@")[0], email };
    persist(userData);
    toast.success(`Welcome back, ${userData.name}`);
  };

  const register = ({ name, email }) => {
    const userData = { name, email };
    persist(userData);
    toast.success(`Welcome to Sparkora, ${name.split(" ")[0]}`);
  };

  const logout = () => {
    localStorage.removeItem("sparkora-user");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
