import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRedoAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { showSuccess, showError } from "../utils/toast";
import registerBg from "../assets/images/register-bg.jpg";

const OTP_TIMER_SECONDS = 60;
const getTimerStorageKey = (email) => `resetOtpTimerExpiry_${email}`;

const VerifyResetOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    verifyResetOTP,
    forgotPassword,
  } = useAuth();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const inputs = useRef([]);

  // Redirect if opened directly
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  // Persistent countdown
  useEffect(() => {
    if (!email) return;

    const key = getTimerStorageKey(email);

    let expiry = localStorage.getItem(key);

    if (!expiry) {
      expiry = (
        Date.now() +
        OTP_TIMER_SECONDS * 1000
      ).toString();

      localStorage.setItem(key, expiry);
    }

    const tick = () => {
      const remaining = Math.max(
        0,
        Math.round(
          (parseInt(localStorage.getItem(key), 10) -
            Date.now()) /
            1000
        )
      );

      setTimer(remaining);
    };

    tick();

    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [email]);

  // Verify Reset OTP
  const submitOtp = async (code) => {
    if (code.length !== 6) {
      showError("Please enter all 6 digits.");
      return;
    }

    try {
      setLoading(true);

      await verifyResetOTP({
        email,
        otp: code,
      });

      localStorage.removeItem(
        getTimerStorageKey(email)
      );

      showSuccess("OTP verified successfully.");

      navigate("/reset-password", {
        state: { email },
      });

    } catch (err) {
      showError(
        err?.response?.data?.message ||
          "OTP verification failed."
      );

      setOtp(["", "", "", "", "", ""]);

      inputs.current.forEach((input) => {
        if (input) input.value = "";
      });

      inputs.current[0]?.focus();

    } finally {
      setLoading(false);
    }
  };

  // OTP Input
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      submitOtp(newOtp.join(""));
    }
  };

  const handleBackspace = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .trim();

    if (!/^\d{6}$/.test(pasted)) return;

    const digits = pasted.split("");

    setOtp(digits);

    digits.forEach((digit, index) => {
      if (inputs.current[index]) {
        inputs.current[index].value = digit;
      }
    });

    inputs.current[5]?.focus();

    submitOtp(digits.join(""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitOtp(otp.join(""));
  };

    // Resend OTP
  const handleResend = async () => {
    try {
      setResending(true);

      await forgotPassword(email);

      showSuccess("A new verification code has been sent.");

      const expiry =
        Date.now() + OTP_TIMER_SECONDS * 1000;

      localStorage.setItem(
        getTimerStorageKey(email),
        expiry.toString()
      );

      setTimer(OTP_TIMER_SECONDS);

      setOtp(["", "", "", "", "", ""]);

      inputs.current.forEach((input) => {
        if (input) input.value = "";
      });

      inputs.current[0]?.focus();

    } catch (err) {
      showError(
        err?.response?.data?.message ||
          "Unable to resend OTP."
      );
    } finally {
      setResending(false);
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
            Verify Reset OTP
          </h1>

          <p className="text-taupe mt-4">
            Enter the 6-digit verification code sent to
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

          <button
            type="submit"
            disabled={loading}
            className={`btn-luxury w-full mt-8 py-4 rounded-xl uppercase tracking-[3px] text-sm font-semibold shadow-xl transition-all duration-300 ${
              loading
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

          <div className="flex flex-col items-center mt-8">
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
                disabled={resending}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-rose text-rose-dark font-semibold text-sm tracking-wide shadow-sm transition-all duration-300 ${
                  resending
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-rose hover:text-white hover:shadow-md active:scale-95"
                }`}
              >
                {resending ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-rose-dark border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaRedoAlt className="text-xs" />
                    Resend OTP
                  </>
                )}
              </button>
            )}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/forgot-password"
              className="text-sm text-taupe hover:text-charcoal transition"
            >
              ← Back
            </Link>
          </div>

        </form>

      </div>

    </section>
  );
};

export default VerifyResetOTP;