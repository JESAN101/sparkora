import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import registerBg from "../assets/images/register-bg.jpg";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { verifyOTP, resendOTP } = useAuth();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  const inputs = useRef([]);

  // Redirect if user comes directly
  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  // Countdown timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // OTP input
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Move to next box
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    // Auto verify when all digits entered
    if (newOtp.every((digit) => digit !== "")) {
      document.getElementById("otp-form")?.requestSubmit();
    }
  };

  // Backspace
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // Paste OTP
  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(pasted)) return;

    const digits = pasted.split("");

    setOtp(digits);

    digits.forEach((digit, index) => {
      if (inputs.current[index]) {
        inputs.current[index].value = digit;
      }
    });

    inputs.current[5]?.focus();

    // Auto verify
    setTimeout(() => {
      document.getElementById("otp-form")?.requestSubmit();
    }, 100);
  };

  // Verify OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      toast.error("Please enter all 6 digits.");
      return;
    }

    try {
      setLoading(true);

      await verifyOTP({
        email,
        otp: code,
      });

      toast.success("Email verified successfully!");

      navigate("/profile");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "OTP verification failed."
      );

      // Clear boxes
      setOtp(["", "", "", "", "", ""]);

      inputs.current.forEach((input) => {
        if (input) input.value = "";
      });

      inputs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      await resendOTP(email);

      toast.success("A new OTP has been sent.");

      setTimer(60);

      setOtp(["", "", "", "", "", ""]);

      inputs.current.forEach((input) => {
        if (input) input.value = "";
      });

      inputs.current[0]?.focus();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Unable to resend OTP."
      );
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
            Verify Email
          </h1>

          <p className="text-taupe mt-4">
            We've sent a 6-digit verification code to
          </p>

          <p className="font-semibold text-rose-dark mt-2 break-all">
            {email}
          </p>
        </div>

        <form
          id="otp-form"
          onSubmit={handleSubmit}
          className="mt-10"
        >
          {/* OTP Inputs */}

          <div
            className="flex justify-center gap-3"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) =>
                  handleBackspace(e, index)
                }
                className="w-14 h-16 text-center text-2xl font-bold rounded-xl border border-line bg-white focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose-light/40 transition-all duration-300"
              />
            ))}
          </div>

          {/* Verify Button */}

          <button
            type="submit"
            disabled={loading || otp.join("").length !== 6}
            className={`btn-luxury w-full mt-8 py-4 rounded-xl uppercase tracking-[3px] text-sm font-semibold shadow-xl transition-all duration-300 ${
              loading || otp.join("").length !== 6
                ? "opacity-60 cursor-not-allowed"
                : "hover:scale-[1.02] active:scale-95"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </div>
            ) : (
              "Verify OTP"
            )}
          </button>

          {/* Timer */}

          <div className="text-center mt-8">
            {timer > 0 ? (
              <p className="text-sm text-taupe">
                Resend OTP in{" "}
                <span className="font-semibold text-charcoal">
                  {timer}s
                </span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-rose-dark font-semibold hover:text-burgundy transition"
              >
                Resend OTP
              </button>
            )}
          </div>

          {/* Back */}

          <div className="text-center mt-8">
            <Link
              to="/register"
              className="text-sm text-taupe hover:text-charcoal transition"
            >
              ← Back to Register
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default VerifyOTP;