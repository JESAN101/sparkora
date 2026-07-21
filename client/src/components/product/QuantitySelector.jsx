import { FaMinus, FaPlus } from "react-icons/fa";

const QuantitySelector = ({
  quantity,
  setQuantity,
}) => {
  return (
    <div className="flex items-center gap-5">

      {/* Minus */}

      <button
        onClick={() =>
          setQuantity(Math.max(1, quantity - 1))
        }
        className="w-11 h-11 rounded-full border border-line bg-cream text-charcoal hover:bg-rose hover:text-ivory transition-all duration-300 flex items-center justify-center shadow-sm"
      >
        <FaMinus size={12} />
      </button>

      {/* Quantity */}

      <div className="min-w-[70px] h-11 rounded-full border border-line bg-cream flex items-center justify-center">

        <span className="text-lg font-semibold text-charcoal">
          {quantity}
        </span>

      </div>

      {/* Plus */}

      <button
        onClick={() => setQuantity(quantity + 1)}
        className="w-11 h-11 rounded-full border border-line bg-cream text-charcoal hover:bg-rose hover:text-ivory transition-all duration-300 flex items-center justify-center shadow-sm"
      >
        <FaPlus size={12} />
      </button>

    </div>
  );
};

export default QuantitySelector;