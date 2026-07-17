import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaPlusCircle,
  FaClipboardList,
  FaWarehouse,
  FaChartBar,
  FaStore,
} from "react-icons/fa";

const navItems = [
  { to: "/seller", label: "Overview", icon: FaTachometerAlt, end: true },
  { to: "/seller/products", label: "My Products", icon: FaBoxOpen },
  { to: "/seller/products/new", label: "Add Product", icon: FaPlusCircle },
  { to: "/seller/orders", label: "Orders", icon: FaClipboardList },
  { to: "/seller/inventory", label: "Inventory", icon: FaWarehouse },
  { to: "/seller/analytics", label: "Analytics", icon: FaChartBar },
];

const SellerSidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
      isActive
        ? "bg-rose text-ivory"
        : "text-charcoal/70 hover:bg-blush/60 hover:text-rose-dark"
    }`;

  return (
    <aside className="w-full lg:w-64 shrink-0 lg:h-[calc(100vh-1px)] lg:sticky lg:top-0 bg-white border-r border-line">
      <div className="px-6 py-7 border-b border-line">
        <p className="font-display text-2xl font-medium text-charcoal">Sparkora</p>
        <p className="text-xs uppercase tracking-widest text-taupe mt-0.5">Seller Dashboard</p>
      </div>

      <nav className="p-4 space-y-1.5">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={linkClass}>
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-line">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-taupe hover:text-rose-dark hover:bg-blush/60 transition-colors"
        >
          <FaStore size={16} />
          Back to Store
        </NavLink>
      </div>
    </aside>
  );
};

export default SellerSidebar;
