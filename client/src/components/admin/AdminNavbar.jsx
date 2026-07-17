import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const AdminNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600 hidden sm:inline">Welcome, {user?.fullName}</span>
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          {user?.fullName?.charAt(0).toUpperCase()}
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
        >
          <FaSignOutAlt size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;