import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const {
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  return (
    <div className="flex gap-6 items-center bg-white rounded-2xl shadow p-5">

      <img
        src={item.image}
        alt={item.name}
        className="w-28 h-28 object-cover rounded-xl"
      />

      <div className="flex-1">

        <h2 className="text-xl font-semibold">
          {item.name}
        </h2>

        <p className="text-gray-500">
          {item.category}
        </p>

        <p className="mt-2 font-bold text-pink-600">
          Rs. {item.discountPrice.toLocaleString()}
        </p>

      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={() => decreaseQty(item.id)}
          className="bg-gray-200 p-2 rounded"
        >
          <FaMinus />
        </button>

        <span className="font-bold">
          {item.quantity}
        </span>

        <button
          onClick={() => increaseQty(item.id)}
          className="bg-gray-200 p-2 rounded"
        >
          <FaPlus />
        </button>

      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 text-xl"
      >
        <FaTrash />
      </button>

    </div>
  );
};

export default CartItem;