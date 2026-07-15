const PaymentMethod = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-2xl font-bold mb-6">
        Payment Method
      </h2>

      <div className="space-y-4">

        <label className="flex items-center gap-3 cursor-pointer">

          <input
            type="radio"
            checked
            readOnly
          />

          Cash on Delivery

        </label>

        <label className="flex items-center gap-3 text-gray-400">

          <input
            type="radio"
            disabled
          />

          eSewa (Coming Soon)

        </label>

        <label className="flex items-center gap-3 text-gray-400">

          <input
            type="radio"
            disabled
          />

          Khalti (Coming Soon)

        </label>

      </div>

    </div>
  );
};

export default PaymentMethod;