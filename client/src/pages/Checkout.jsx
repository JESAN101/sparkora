import CustomerForm from "../components/checkout/CustomerForm";
import AddressForm from "../components/checkout/AddressForm";
import PaymentMethod from "../components/checkout/PaymentMethod";
import OrderSummary from "../components/checkout/OrderSummary";

const Checkout = () => {
  return (
    <section className="bg-gray-50 min-h-screen py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-12">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-8">

            <CustomerForm />

            <AddressForm />

            <PaymentMethod />

          </div>

          <div>

            <OrderSummary />

          </div>

        </div>

      </div>

    </section>
  );
};

export default Checkout;