const AddressForm = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-2xl font-bold mb-6">
        Shipping Address
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="text"
          placeholder="Province"
          className="border rounded-xl p-4"
        />

        <input
          type="text"
          placeholder="District"
          className="border rounded-xl p-4"
        />

        <input
          type="text"
          placeholder="City"
          className="border rounded-xl p-4"
        />

        <input
          type="text"
          placeholder="Postal Code"
          className="border rounded-xl p-4"
        />

      </div>

      <textarea
        rows="4"
        placeholder="Street Address"
        className="border rounded-xl p-4 mt-6 w-full"
      />

    </div>
  );
};

export default AddressForm;