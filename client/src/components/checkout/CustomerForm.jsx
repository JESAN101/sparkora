const CustomerForm = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-2xl font-bold mb-6">
        Customer Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="text"
          placeholder="Full Name"
          className="border rounded-xl p-4"
        />

        <input
          type="email"
          placeholder="Email"
          className="border rounded-xl p-4"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="border rounded-xl p-4"
        />

      </div>

    </div>
  );
};

export default CustomerForm;