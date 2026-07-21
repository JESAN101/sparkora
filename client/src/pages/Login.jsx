import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineShieldCheck,
  HiOutlineBadgeCheck,
  HiOutlineTruck,
  HiOutlineGift,
} from "react-icons/hi";
import { FaHome } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { showError } from "../utils/toast";

import loginBg from "../assets/images/login-bg.jpg";

const Login = () => {
  const { login } = useAuth();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (searchParams.get("sessionExpired")) {
      showError("Your session has expired. Please log in again.");
    }
  }, [searchParams]);

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/profile");
    } catch (err) {
      showError(
        err?.response?.data?.message ||
          "Unable to sign in. Please try again."
      );
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 py-16 bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-5xl rounded-3xl border border-white/20 bg-white/15 backdrop-blur-xl shadow-2xl overflow-hidden fade-up">
        <div className="absolute top-6 right-6 z-20">
          <Link
            to="/"
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
              Your favourites, your orders, your story — all waiting
              right where you left them. Sign in to pick up your
              Sparkora journey.
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <HiOutlineBadgeCheck className="text-xl text-gold-light" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Certified Authenticity
                  </h3>
                  <p className="text-sm text-white/70 mt-1">
                    Every piece hallmark-certified and warrantied.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <HiOutlineTruck className="text-xl text-gold-light" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Insured Doorstep Delivery
                  </h3>
                  <p className="text-sm text-white/70 mt-1">
                    Fully insured shipping, tracked door to door.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <HiOutlineGift className="text-xl text-gold-light" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Lifetime Care
                  </h3>
                  <p className="text-sm text-white/70 mt-1">
                    Complimentary cleaning and resizing, always.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white/95 border-l border-white/30 p-10 lg:p-12">
            <div className="mb-8">
              <div className="flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gold shrink-0"
                >
                  <path
                    d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-[3px] text-gold-dark">
                  Member Sign In
                </span>
              </div>

              <h2 className="font-display text-4xl text-charcoal mt-3">
                Welcome Back
              </h2>

              <p className="text-taupe mt-2">
                Sign in to continue your luxury shopping journey.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              {/* Email */}
              <div>
                <label className="text-sm text-charcoal font-medium">
                  Email
                </label>

                <div className="relative mt-2">
                  <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-taupe" />

                  <input
                    type="email"
                    placeholder="name@eg.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className="w-full h-14 rounded-xl border border-line bg-white py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose-light/40 transition-all duration-300"
                  />
                </div>

                {errors.email && (
                  <p className="text-xs text-burgundy mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-charcoal font-medium">
                  Password
                </label>

                <div className="relative mt-2">
                  <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-taupe" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "At least 6 characters",
                      },
                    })}
                    className="w-full h-14 rounded-xl border border-line bg-white py-3 pl-12 pr-14 text-sm focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose-light/40 transition-all duration-300"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-taupe hover:text-rose-dark transition"
                  >
                    {showPassword ? (
                      <HiOutlineEyeOff className="text-xl" />
                    ) : (
                      <HiOutlineEye className="text-xl" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-xs text-burgundy mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-rose-dark hover:text-burgundy hover:underline transition"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-luxury w-full py-4 rounded-xl uppercase tracking-[3px] text-sm font-semibold shadow-xl transition-all duration-300 ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-[1.02] active:scale-95"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Create Account */}
              <p className="text-center text-sm text-taupe pt-2">
                New to Sparkora?{" "}
                <Link
                  to="/register"
                  className="text-rose-dark font-semibold hover:text-burgundy transition"
                >
                  Create Account
                </Link>
              </p>
            </form>

            {/* Footer */}
            <div className="mt-10 flex items-center justify-center gap-2 text-sm text-taupe">
              <HiOutlineShieldCheck className="text-lg text-rose-dark" />
              <span>Protected by Sparkora Secure Authentication</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;