import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
   FaStore,
} from "react-icons/fa";

const AdminSidebar = () => {
  const menu = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin/dashboard",
    },
    {
      name: "Users",
      icon: <FaUsers />,
      path: "/admin/users",
    },
    {
      name: "Products",
      icon: <FaBoxOpen />,
      path: "/admin/products",
    },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
      path: "/admin/orders",
    },
    {
  name: "Seller Applications",
  icon: <FaStore  />,
  path: "/admin/seller-applications",
},
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">

      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Sparkora Admin
      </div>

      <nav className="p-4 space-y-2">

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}

      </nav>

    </aside>
  );
};

export default AdminSidebar;