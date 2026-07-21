import {
  FaCheckCircle,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";

const ProductHighlights = ({ product }) => {
  return (
    <div className="space-y-4 mt-8">

      <div className="card-luxury p-4 flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-rose/10 flex items-center justify-center">
          <FaCheckCircle className="text-rose text-lg" />
        </div>

        <div>
          <h4 className="font-semibold text-charcoal">
            Hallmark Certified
          </h4>

          <p className="text-sm text-taupe">
            Authentic and certified premium jewelry.
          </p>
        </div>
      </div>

      <div className="card-luxury p-4 flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center">
          <FaTruck className="text-gold text-lg" />
        </div>

        <div>
          <h4 className="font-semibold text-charcoal">
            Free Delivery
          </h4>

          <p className="text-sm text-taupe">
            Complimentary delivery anywhere in Nepal.
          </p>
        </div>
      </div>

      <div className="card-luxury p-4 flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-burgundy/10 flex items-center justify-center">
          <FaShieldAlt className="text-burgundy text-lg" />
        </div>

        <div>
          <h4 className="font-semibold text-charcoal">
            Warranty Protection
          </h4>

          <p className="text-sm text-taupe">
            {product.warranty} manufacturer warranty included.
          </p>
        </div>
      </div>

    </div>
  );
};

export default ProductHighlights;