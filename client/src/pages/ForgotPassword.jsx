import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { showError } from "../utils/toast";
import forgotPasswordbg from "../assets/images/forgotpassword-bg.jpg";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      showError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      await forgotPassword(email);

      navigate("/verify-reset-otp", {
        state: { email },
      });
    } catch (err) {
      // Error handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-6 py-16"
      style={{
        backgroundImage: `url(${forgotPasswordbg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-xl w-full">

        <div className="text-center">

          <h1 className="font-display text-5xl text-charcoal">
            Forgot Password
          </h1>

          <p className="text-taupe mt-5 leading-8">
            Enter your registered email address.
            <br />
            We'll send you a verification code to reset your password.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          <div>

            <label className="block text-sm font-semibold text-charcoal mb-2">
              Email Address
            </label>

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-rose-light bg-white"
              />

            </div>

          </div>

                    <button
            type="submit"
            disabled={loading}
            className={`btn-luxury w-full py-4 rounded-xl uppercase tracking-[3px] text-sm font-semibold shadow-xl transition-all duration-300 ${
              loading
                ? "opacity-60 cursor-not-allowed"
                : "hover:scale-[1.02] active:scale-95"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending OTP...
              </div>
            ) : (
              "Send Verification Code"
            )}
          </button>

          <div className="text-center pt-4">
            <Link
              to="/login"
              className="text-sm text-taupe hover:text-charcoal transition duration-300"
            >
              ← Back to Login
            </Link>
          </div>

        </form>

      </div>

    </section>
  );
};

export default ForgotPassword;