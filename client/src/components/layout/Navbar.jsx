import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-3xl font-bold text-pink-600"
        >
          Sparkora
        </Link>

        <div className="flex gap-6">

          <Link to="/">Home</Link>

          <Link to="/shop">Shop</Link>

          <Link to="/wishlist">Wishlist</Link>

          <Link to="/cart" className="relative">

  <FaShoppingBag size={24} />

  {cartItems.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
      {cartItems.length}
    </span>
  )}

</Link>

          <Link to="/login">Login</Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;