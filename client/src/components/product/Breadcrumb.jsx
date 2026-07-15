import { Link } from "react-router-dom";

const Breadcrumb = ({ product }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">

      <Link
        to="/"
        className="hover:text-pink-600 transition"
      >
        Home
      </Link>

      <span>/</span>

      <Link
        to="/shop"
        className="hover:text-pink-600 transition"
      >
        Shop
      </Link>

      <span>/</span>

      <span>{product.category}</span>

      <span>/</span>

      <span className="text-gray-900 font-semibold">
        {product.name}
      </span>

    </nav>
  );
};

export default Breadcrumb;