import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { showError } from "../utils/toast";
import registerBg from "../assets/images/register-bg.jpg";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { resetPassword } = useAuth();

  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  // Redirect if opened directly
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!password || !confirmPassword) {
      showError("Please fill all fields.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      showError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
      );
      return false;
    }

    if (password !== confirmPassword) {
      showError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) return;

    try {
      setLoading(true);

      await resetPassword({
        email,
        password,
        confirmPassword,
      });

      navigate("/login");

    } catch (error) {
      // Toast handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

    return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-6 py-16"
      style={{
        backgroundImage: `url(${registerBg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-xl w-full">

        <div className="text-center">
          <h1 className="font-display text-5xl text-charcoal">
            Reset Password
          </h1>

          <p className="text-taupe mt-4">
            Create a strong password for your Sparkora account.
          </p>

          <p className="font-semibold text-rose-dark mt-2 break-all">
            {email}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          {/* New Password */}

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl border border-line bg-white px-5 py-4 pr-14 text-charcoal placeholder:text-taupe focus:border-rose focus:ring-2 focus:ring-rose-light/40 outline-none transition"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-5 top-1/2 -translate-y-1/2 text-taupe hover:text-rose-dark"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          {/* Confirm Password */}

          <div className="relative">

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-line bg-white px-5 py-4 pr-14 text-charcoal placeholder:text-taupe focus:border-rose focus:ring-2 focus:ring-rose-light/40 outline-none transition"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-5 top-1/2 -translate-y-1/2 text-taupe hover:text-rose-dark"
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          {/* Password Rules */}

          <div className="bg-cream rounded-xl p-4 border border-line">

            <p className="text-sm font-semibold text-charcoal mb-2">
              Password Requirements
            </p>

            <ul className="text-sm text-taupe space-y-1">
              <li>• Minimum 8 characters</li>
              <li>• One uppercase letter</li>
              <li>• One lowercase letter</li>
              <li>• One number</li>
              <li>• One special character</li>
            </ul>

          </div>

          {/* Button */}

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
                Resetting...
              </div>
            ) : (
              "Reset Password"
            )}
          </button>

          {/* Back */}

          <div className="text-center pt-4">
            <Link
              to="/login"
              className="text-sm text-taupe hover:text-charcoal transition"
            >
              ← Back to Login
            </Link>
          </div>

        </form>

      </div>

    </section>
  );
};

export default ResetPassword;