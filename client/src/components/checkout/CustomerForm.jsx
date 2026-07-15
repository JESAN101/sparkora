const CustomerForm = ({ register, errors }) => {
  return (
    <div className="card-luxury p-7 sm:p-8">
      <h2 className="font-display text-2xl font-medium text-charcoal mb-6">
        Customer Information
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName", { required: "Full name is required" })}
            className="w-full border border-line rounded-xl p-3.5 text-sm bg-ivory focus:outline-none focus:border-rose transition-colors"
          />
          {errors.fullName && (
            <p className="text-xs text-burgundy mt-1.5">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
            })}
            className="w-full border border-line rounded-xl p-3.5 text-sm bg-ivory focus:outline-none focus:border-rose transition-colors"
          />
          {errors.email && (
            <p className="text-xs text-burgundy mt-1.5">{errors.email.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <input
            type="tel"
            placeholder="Phone Number"
            {...register("phone", {
              required: "Phone number is required",
              pattern: { value: /^[0-9+\s-]{7,15}$/, message: "Enter a valid phone number" },
            })}
            className="w-full border border-line rounded-xl p-3.5 text-sm bg-ivory focus:outline-none focus:border-rose transition-colors"
          />
          {errors.phone && (
            <p className="text-xs text-burgundy mt-1.5">{errors.phone.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
