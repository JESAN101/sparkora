import { useCart } from "../../context/CartContext";

const OrderSummary = () => {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.discountPrice * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 150 : 0;
  const total = subtotal + delivery;

  return (
    <div className="bg-white rounded-2xl shadow p-8 sticky top-24">

      <h2 className="text-2xl font-bold mb-6">
        Order Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>Rs. {delivery}</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-xl">
          <span>Total</span>
          <span>Rs. {total.toLocaleString()}</span>
        </div>

      </div>

      <button className="w-full mt-8 bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl transition">
        Place Order
      </button>

    </div>
  );
};

export default OrderSummary;