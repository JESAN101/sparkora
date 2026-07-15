import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";

const Cart = () => {

  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.discountPrice * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 150 : 0;

  const total = subtotal + delivery;

  if (cartItems.length === 0) {
    return (
      <section className="py-24 text-center">

        <h2 className="text-4xl font-bold">
          Your Cart is Empty
        </h2>

        <Link
          to="/shop"
          className="inline-block mt-8 bg-pink-600 text-white px-8 py-3 rounded-xl"
        >
          Continue Shopping
        </Link>

      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-10">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-6">

            {cartItems.map((item) => (

              <CartItem
                key={item.id}
                item={item}
              />

            ))}

          </div>

          <div className="bg-white rounded-2xl shadow p-8 h-fit">

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
                <span>
                  Rs. {total.toLocaleString()}
                </span>
              </div>

            </div>

            <Link
              to="/checkout"
              className="block mt-8 text-center bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl"
            >
              Proceed to Checkout
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Cart;