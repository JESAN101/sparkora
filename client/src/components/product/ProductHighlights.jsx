import {
  FaCheckCircle,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";

const ProductHighlights = ({ product }) => {
  return (
    <div className="space-y-4 mt-8">

      <div className="flex items-center gap-3">
        <FaCheckCircle className="text-green-600 text-lg" />
        <span>Hallmark Certified</span>
      </div>

      <div className="flex items-center gap-3">
        <FaTruck className="text-pink-600 text-lg" />
        <span>Free Delivery in Nepal</span>
      </div>

      <div className="flex items-center gap-3">
        <FaShieldAlt className="text-blue-600 text-lg" />
        <span>{product.warranty} Warranty</span>
      </div>

    </div>
  );
};

export default ProductHighlights;