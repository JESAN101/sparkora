import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    registerUser(data);
    navigate("/profile");
  };

  return (
    <section className="min-h-screen bg-ivory flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="font-display text-3xl font-semibold text-charcoal">
            Sparkora
          </Link>
          <h1 className="font-display text-2xl font-medium text-charcoal mt-6">
            Create Your Account
          </h1>
          <p className="text-taupe text-sm mt-2">
            Join Sparkora for a faster checkout and saved favorites.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card-luxury p-8 space-y-5" noValidate>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-line rounded-xl p-3.5 text-sm bg-ivory focus:outline-none focus:border-rose transition-colors"
            />
            {errors.name && <p className="text-xs text-burgundy mt-1.5">{errors.name.message}</p>}
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
            {errors.email && <p className="text-xs text-burgundy mt-1.5">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              className="w-full border border-line rounded-xl p-3.5 text-sm bg-ivory focus:outline-none focus:border-rose transition-colors"
            />
            {errors.password && <p className="text-xs text-burgundy mt-1.5">{errors.password.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === watch("password") || "Passwords don't match",
              })}
              className="w-full border border-line rounded-xl p-3.5 text-sm bg-ivory focus:outline-none focus:border-rose transition-colors"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-burgundy mt-1.5">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-luxury w-full py-3.5 rounded-full text-sm font-medium uppercase tracking-widest"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-taupe mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-rose-dark font-medium hover:text-burgundy">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
