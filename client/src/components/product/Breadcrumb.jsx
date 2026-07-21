import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const Breadcrumb = ({ product }) => {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm mb-10">

      <Link
        to="/"
        className="text-taupe hover:text-rose transition-colors"
      >
        Home
      </Link>

      <FaChevronRight
        size={10}
        className="text-line"
      />

      <Link
        to="/shop"
        className="text-taupe hover:text-rose transition-colors"
      >
        Shop
      </Link>

      <FaChevronRight
        size={10}
        className="text-line"
      />

      <span className="text-taupe">
        {product.category}
      </span>

      <FaChevronRight
        size={10}
        className="text-line"
      />

      <span className="font-semibold text-charcoal">
        {product.name}
      </span>

    </nav>
  );
};

export default Breadcrumb;