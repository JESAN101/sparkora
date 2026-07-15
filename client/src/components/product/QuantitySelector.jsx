const QuantitySelector = ({
  quantity,
  setQuantity,
}) => {

  return (

    <div className="flex items-center gap-5 mt-8">

      <button
        onClick={() =>
          setQuantity(Math.max(1, quantity - 1))
        }
        className="w-10 h-10 rounded-full bg-gray-200"
      >
        -
      </button>

      <span className="text-xl font-bold">
        {quantity}
      </span>

      <button
        onClick={() =>
          setQuantity(quantity + 1)
        }
        className="w-10 h-10 rounded-full bg-gray-200"
      >
        +
      </button>

    </div>

  );

};

export default QuantitySelector;