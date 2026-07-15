const Field = ({ children }) => <div>{children}</div>;

const inputClass =
  "w-full border border-line rounded-xl p-3.5 text-sm bg-ivory focus:outline-none focus:border-rose transition-colors";

const AddressForm = ({ register, errors }) => {
  return (
    <div className="card-luxury p-7 sm:p-8">
      <h2 className="font-display text-2xl font-medium text-charcoal mb-6">
        Shipping Address
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        <Field>
          <input
            type="text"
            placeholder="Province"
            {...register("province", { required: "Province is required" })}
            className={inputClass}
          />
          {errors.province && (
            <p className="text-xs text-burgundy mt-1.5">{errors.province.message}</p>
          )}
        </Field>

        <Field>
          <input
            type="text"
            placeholder="District"
            {...register("district", { required: "District is required" })}
            className={inputClass}
          />
          {errors.district && (
            <p className="text-xs text-burgundy mt-1.5">{errors.district.message}</p>
          )}
        </Field>

        <Field>
          <input
            type="text"
            placeholder="City"
            {...register("city", { required: "City is required" })}
            className={inputClass}
          />
          {errors.city && (
            <p className="text-xs text-burgundy mt-1.5">{errors.city.message}</p>
          )}
        </Field>

        <Field>
          <input
            type="text"
            placeholder="Postal Code"
            {...register("postalCode")}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-5">
        <textarea
          rows="3"
          placeholder="Street Address"
          {...register("street", { required: "Street address is required" })}
          className={`${inputClass} w-full`}
        />
        {errors.street && (
          <p className="text-xs text-burgundy mt-1.5">{errors.street.message}</p>
        )}
      </div>
    </div>
  );
};

export default AddressForm;
