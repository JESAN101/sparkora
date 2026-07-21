import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { showError } from "../utils/toast";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHome,
} from "react-icons/fa";

import registerBg from "../assets/images/register-bg.jpg";

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength("");
      return;
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
      setPasswordStrength("Weak");
    } else if (score <= 4) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  };

  const onSubmit = async (data) => {
    try {
      await registerUser(data);

      navigate("/verify-otp", {
        state: {
          email: data.email,
        },
      });
    } catch (err) {
      console.error(err);

      const message = err?.response?.data?.message || "";

      if (message.toLowerCase().includes("already registered")) {
        showError("This email is already registered.");
      } else {
        showError(message || "Registration failed. Please try again.");
      }
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 py-16 bg-cover bg-center"
      style={{
        backgroundImage: `url(${registerBg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-5xl rounded-3xl border border-white/20 bg-white/15 backdrop-blur-xl shadow-2xl overflow-hidden fade-up">
        <div className="absolute top-6 right-6 z-20">
          <Link
            to="/login"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-rose bg-white text-rose-dark hover:bg-rose hover:text-white transition-all duration-300 shadow-lg"
          >
            <FaHome className="text-sm" />
            Home
          </Link>
        </div>

        <div className="grid lg:grid-cols-2">
          {/* Left Side */}
          <div className="hidden lg:flex flex-col justify-center p-14 text-white bg-gradient-to-br from-black/30 via-black/20 to-transparent">
            <h1 className="font-display text-7xl font-semibold tracking-wide">
              Sparkora
            </h1>

            <div className="w-32 h-1 bg-gradient-to-r from-gold to-gold-light rounded-full mt-5"></div>

            <p className="mt-10 text-lg leading-9 text-white/90">
              Discover handcrafted jewelry inspired by timeless elegance.
              Create your Sparkora account to save favourites,
              track every order, receive exclusive offers,
              and enjoy a luxury shopping experience.
            </p>

            <div className="mt-10 flex gap-6">
              <div>
                <h3 className="font-display text-3xl">1000+</h3>
                <p className="text-sm text-white/70">Premium Designs</p>
              </div>

              <div>
                <h3 className="font-display text-3xl">10K+</h3>
                <p className="text-sm text-white/70">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white/95 border-l border-white/30 p-10 lg:p-12">
            <div className="mb-8">
              <h2 className="font-display text-4xl text-charcoal">
                Create Account
              </h2>

              <p className="text-taupe mt-2">Join the Sparkora family today.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* First + Last */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-charcoal font-medium">
                    First Name
                  </label>

                  <div className="relative mt-2">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />

                    <input
                      type="text"
                      placeholder="e.g. Jesan"
                      {...register("firstName", {
                        required: "First name is required",
                        setValueAs: (value) => value.trim(),
                        pattern: {
                          value: /^[A-Za-z\s'-]+$/,
                          message: "Only letters are allowed",
                        },
                        onChange: (e) => {
                          e.target.value = e.target.value.replace(/[^A-Za-z\s'-]/g, "");
                        },
                      })}
                      className="w-full rounded-xl border border-line bg-white py-3 pl-11 pr-4 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose-light/40 transition-all duration-300"
                    />

                    {errors.firstName && (
                      <p className="text-xs text-burgundy mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-charcoal font-medium">
                    Last Name
                  </label>

                  <div className="relative mt-2">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />

                    <input
                      type="text"
                      placeholder="e.g. Bogati"
                      {...register("lastName", {
                        required: "Last name is required",
                        setValueAs: (value) => value.trim(),
                        pattern: {
                          value: /^[A-Za-z\s'-]+$/,
                          message: "Only letters are allowed",
                        },
                        onChange: (e) => {
                          e.target.value = e.target.value.replace(/[^A-Za-z\s'-]/g, "");
                        },
                      })}
                      className="w-full rounded-xl border border-line bg-white py-3 pl-11 pr-4 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose-light/40 transition-all duration-300"
                    />

                    {errors.lastName && (
                      <p className="text-xs text-burgundy mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-charcoal font-medium">
                    Email
                  </label>

                  <div className="relative mt-2">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />

                    <input
                      type="email"
                      placeholder="name@eg.com"
                      {...register("email", {
                        required: "Email is required",
                        setValueAs: (value) => value.trim().toLowerCase(),
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                      className="w-full rounded-xl border border-line bg-white py-3 pl-11 pr-4 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose-light/40 transition-all duration-300"
                    />

                    {errors.email && (
                      <p className="text-xs text-burgundy mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-charcoal font-medium">
                    Phone
                  </label>

                  <div className="relative mt-2">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />

                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="98xxxxxxxx"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Phone number must be exactly 10 digits",
                        },
                        onChange: (e) => {
                          e.target.value = e.target.value.replace(/\D/g, "");
                          if (e.target.value.length > 10) {
                            e.target.value = e.target.value.slice(0, 10);
                          }
                        },
                      })}
                      className="w-full rounded-xl border border-line bg-white py-3 pl-11 pr-4 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose-light/40 transition-all duration-300"
                    />

                    {errors.phone && (
                      <p className="text-xs text-burgundy mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="text-sm text-charcoal font-medium">
                  Gender
                </label>

                <div className="relative mt-2">
                  <FaVenusMars className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />

                 <select
  {...register("gender", {
    required: "Please select your gender",
  })}
  className="w-full rounded-xl border border-line bg-white py-3 pl-11 pr-4 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose-light/40 transition-all duration-300"
>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>

{errors.gender && (
  <p className="text-xs text-burgundy mt-1">
    {errors.gender.message}
  </p>
)}
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid md:grid-cols-2 gap-5">
                {/* Password */}
                <div>
                  <label className="text-sm text-charcoal font-medium">
                    Password
                  </label>

                  <div className="relative mt-2">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                          message:
                            "Password must contain uppercase, lowercase, number and special character",
                        },
                        onChange: (e) => checkPasswordStrength(e.target.value),
                      })}
                      className="w-full rounded-xl border border-line bg-white py-3 pl-11 pr-12 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose-light/40 transition-all duration-300"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-taupe hover:text-rose"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-xs text-burgundy mt-1">
                      {errors.password.message}
                    </p>
                  )}

                  {passwordStrength && (
                    <p
                      className={`text-xs mt-2 font-medium ${
                        passwordStrength === "Strong"
                          ? "text-green-600"
                          : passwordStrength === "Medium"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      Password Strength : {passwordStrength}
                    </p>
                  )}

                  <div className="mt-3 h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        passwordStrength === "Weak"
                          ? "w-1/3 bg-red-500"
                          : passwordStrength === "Medium"
                          ? "w-2/3 bg-yellow-500"
                          : passwordStrength === "Strong"
                          ? "w-full bg-green-500"
                          : "w-0"
                      }`}
                    />
                  </div>

                  {/* Password requirements checklist */}
                  <div className="mt-3 rounded-lg bg-cream border border-line p-3">
                    <p className="text-xs font-semibold text-charcoal mb-2">
                      Password must contain:
                    </p>

                    <ul className="space-y-1 text-xs">
                      <li
                        className={
                          watch("password")?.length >= 8 ? "text-green-600" : "text-taupe"
                        }
                      >
                        ✓ At least 8 characters
                      </li>

                      <li
                        className={
                          /[A-Z]/.test(watch("password") || "") ? "text-green-600" : "text-taupe"
                        }
                      >
                        ✓ One uppercase letter
                      </li>

                      <li
                        className={
                          /[a-z]/.test(watch("password") || "") ? "text-green-600" : "text-taupe"
                        }
                      >
                        ✓ One lowercase letter
                      </li>

                      <li
                        className={
                          /\d/.test(watch("password") || "") ? "text-green-600" : "text-taupe"
                        }
                      >
                        ✓ One number
                      </li>

                      <li
                        className={
                          /[^A-Za-z0-9]/.test(watch("password") || "")
                            ? "text-green-600"
                            : "text-taupe"
                        }
                      >
                        ✓ One special character
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-sm text-charcoal font-medium">
                    Confirm Password
                  </label>

                  <div className="relative mt-2">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...register("confirmPassword", {
                        required: "Confirm your password",
                        validate: (value) =>
                          value === watch("password") || "Passwords do not match",
                      })}
                      className="w-full rounded-xl border border-line bg-white py-3 pl-11 pr-4 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose-light/40 transition-all duration-300"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-taupe hover:text-rose"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="text-xs text-burgundy mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("terms", {
                    required: "Please accept Terms & Conditions",
                  })}
                  className="mt-1 accent-rose"
                />

                <label htmlFor="terms" className="text-sm text-taupe leading-6">
                  I agree to the
                  <span className="text-rose-dark font-semibold cursor-pointer">
                    {" "}
                    Terms & Conditions
                  </span>{" "}
                  and
                  <span className="text-rose-dark font-semibold cursor-pointer">
                    {" "}
                    Privacy Policy
                  </span>
                  .
                </label>
              </div>

              {errors.terms && (
                <p className="text-xs text-burgundy">{errors.terms.message}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-luxury w-full py-4 rounded-xl uppercase tracking-[3px] text-sm font-semibold shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 mt-2"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending OTP, Check your mail...
                  </div>
                ) : (
                  "Register & Send OTP"
                )}
              </button>

              {/* Login */}
              <p className="text-center text-sm text-taupe pt-2">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-rose-dark font-semibold hover:text-burgundy transition"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;