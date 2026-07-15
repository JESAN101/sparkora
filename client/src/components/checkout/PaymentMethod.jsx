const options = [
  { value: "cod", label: "Cash on Delivery", disabled: false, note: "Pay when your order arrives" },
  { value: "esewa", label: "eSewa", disabled: true, note: "Coming soon" },
  { value: "khalti", label: "Khalti", disabled: true, note: "Coming soon" },
];

const PaymentMethod = ({ register }) => {
  return (
    <div className="card-luxury p-7 sm:p-8">
      <h2 className="font-display text-2xl font-medium text-charcoal mb-6">
        Payment Method
      </h2>

      <div className="space-y-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center justify-between gap-3 border rounded-xl p-4 cursor-pointer transition-colors ${
              opt.disabled
                ? "border-line text-taupe/50 cursor-not-allowed"
                : "border-line has-[:checked]:border-rose has-[:checked]:bg-blush/40"
            }`}
          >
            <span className="flex items-center gap-3">
              <input
                type="radio"
                value={opt.value}
                disabled={opt.disabled}
                defaultChecked={opt.value === "cod"}
                {...register("paymentMethod", { required: true })}
                className="accent-[#B3735A]"
              />
              <span className="text-sm font-medium text-charcoal">{opt.label}</span>
            </span>
            <span className="text-xs text-taupe">{opt.note}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
