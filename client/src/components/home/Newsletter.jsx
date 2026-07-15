import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Newsletter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    toast.success("You're on the list — welcome to Sparkora.");
    reset();
  };

  return (
    <section className="py-20 sm:py-24 bg-blush">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal mb-3">
          Stay in the Sparkle
        </h2>
        <p className="text-taupe mb-9">
          New arrivals, early access to sales, and jewelry care tips — no spam.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          noValidate
        >
          <div className="flex-1 text-left">
            <input
              type="email"
              placeholder="Your email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
              className="w-full border border-line rounded-full px-5 py-3.5 text-sm bg-white focus:outline-none focus:border-rose transition-colors"
            />
            {errors.email && (
              <p className="text-xs text-burgundy mt-1.5 pl-2">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn-luxury px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-widest shrink-0"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
