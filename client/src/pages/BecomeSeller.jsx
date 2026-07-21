import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import {
  FaStore,
  FaChartLine,
  FaBoxOpen,
  FaShippingFast,
  FaShieldAlt,
  FaArrowRight,
  FaChevronDown,
  FaTimes,
  FaBuilding,
  FaLayerGroup,
  FaPhoneAlt,
  FaIdCard,
  FaMapMarkerAlt,
  FaCity,
  FaMap,
  FaMailBulk,
  FaAlignLeft,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { showError } from "../utils/toast";
import {
  applySeller,
  getMySellerApplication,
  resetSellerApplication,
} from "../services/sellerService";

/* -------------------------------------------------------------------- */
/*  Static content — kept outside the component so it isn't re-created  */
/*  on every render                                                     */
/* -------------------------------------------------------------------- */

const BENEFITS = [
  {
    icon: FaChartLine,
    iconBg: "bg-rose-light/20",
    iconColor: "text-rose-dark",
    title: "Grow Your Business",
    desc: "Reach thousands of customers looking for premium jewellery.",
  },
  {
    icon: FaBoxOpen,
    iconBg: "bg-gold-light/20",
    iconColor: "text-rose-dark",
    title: "Manage Products",
    desc: "Easily add, edit and organize your jewellery catalogue.",
  },
  {
    icon: FaShippingFast,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    title: "Order Management",
    desc: "Process orders, track deliveries and keep customers happy.",
  },
  {
    icon: FaShieldAlt,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Secure Platform",
    desc: "Sell confidently with secure authentication and protected transactions.",
  },
];

const FORM_SECTIONS = [
  {
    title: "Business Details",
    fields: [
      { name: "businessName", label: "Business Name", icon: FaBuilding, placeholder: "e.g. Himalayan Gems Co." },
      { name: "businessType", label: "Business Type", icon: FaLayerGroup, placeholder: "e.g. Sole Proprietorship" },
    ],
  },
  {
    title: "Contact & Identity",
    fields: [
      { name: "phone", label: "Phone Number", icon: FaPhoneAlt, placeholder: "98XXXXXXXX", type: "tel" },
      { name: "citizenshipNumber", label: "Citizenship Number", icon: FaIdCard, placeholder: "XX-XX-XX-XXXXX" },
    ],
  },
  {
    title: "Location",
    fields: [
      { name: "address", label: "Address", icon: FaMapMarkerAlt, placeholder: "Street, ward, locality", span: true },
      { name: "city", label: "City", icon: FaCity, placeholder: "e.g. Bhaktapur" },
      { name: "province", label: "Province", icon: FaMap, placeholder: "e.g. Bagmati" },
      { name: "postalCode", label: "Postal Code", icon: FaMailBulk, placeholder: "e.g. 44800" },
    ],
  },
];

const EMPTY_FORM = {
  businessName: "",
  businessType: "",
  phone: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  description: "",
  citizenshipNumber: "",
};

/* -------------------------------------------------------------------- */
/*  Small presentational helpers                                        */
/* -------------------------------------------------------------------- */

const FormField = ({ icon: Icon, label, name, value, onChange, span, ...rest }) => (
  <label className={`group block ${span ? "md:col-span-2" : ""}`}>
    <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-taupe">
      <Icon className="text-rose-dark/70 text-[13px]" />
      {label}
    </span>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-line bg-white/80 px-4 py-3.5 text-charcoal placeholder:text-taupe/60 outline-none transition-all duration-200 focus:border-rose focus:ring-4 focus:ring-rose/10 group-hover:border-rose/40"
      required
      {...rest}
    />
  </label>
);

const BenefitCard = ({ icon: Icon, iconBg, iconColor, title, desc }) => (
  <div className="rounded-3xl bg-white p-8 shadow-lg border border-line hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
    <div className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center mb-6`}>
      <Icon className={`${iconColor} text-2xl`} />
    </div>
    <h3 className="font-display text-2xl text-charcoal">{title}</h3>
    <p className="text-taupe mt-4 leading-7">{desc}</p>
  </div>
);

/* -------------------------------------------------------------------- */
/*  Main component                                                      */
/* -------------------------------------------------------------------- */

const BecomeSeller = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [application, setApplication] = useState(null);
  const [checkingApplication, setCheckingApplication] = useState(true);
  const [resettingApplication, setResettingApplication] = useState(false);

  const [formData, setFormData] = useState(EMPTY_FORM);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setShowForm((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await applySeller(formData);
      // The backend creates the application with status "pending", so once
      // `application` is set below, the pending-status branch further down
      // takes over rendering — there's no separate "submitted" state to track.
      setApplication(data.application);
      setFormData(EMPTY_FORM);
setShowForm(false);
    } catch (err) {
      showError(err?.response?.data?.message || "Unable to submit application.");
    } finally {
      setLoading(false);
    }
  };

  const loadApplication = async () => {
    try {
  const data = await getMySellerApplication();
  setApplication(data.application);
} catch (err) {
  if (err.response?.status !== 404) {
    console.error(err);
  }
} finally {
  setCheckingApplication(false);
}
  };

  useEffect(() => {
    loadApplication();
  }, []);

  // A rejected application still exists in the database, so simply clearing
  // local state isn't enough — the next `loadApplication()` (e.g. on refresh)
  // would just bring it right back. This calls the backend to actually
  // delete/reset it before letting the user see a fresh form.
  const handleApplyAgain = async () => {
  try {
    await resetSellerApplication();

    setApplication(null);

    setFormData(EMPTY_FORM);

    setShowForm(true);

  } catch (err) {
    showError(
      err?.response?.data?.message ||
      "Unable to start a new application."
    );
  }
};
<button
  onClick={handleApplyAgain}
  className="w-full mt-10 py-4 rounded-xl bg-rose-dark text-white font-semibold hover:bg-rose transition"
>
  Apply Again
</button>

  /* ---------------------------- Early returns --------------------------- */
  // All conditional exits happen here, before the single JSX return below —
  // React doesn't allow `if` statements inside a return()'s JSX.

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (checkingApplication) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="flex items-center gap-3 text-taupe">
          <div className="w-5 h-5 border-2 border-rose-dark border-t-transparent rounded-full animate-spin" />
          <span className="text-lg font-medium">Loading application...</span>
        </div>
      </div>
    );
  }

  if (user.role === "seller" || application?.status === "approved") {
    return <Navigate to="/seller" replace />;
  }

  if (application?.status === "pending") {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory via-white to-rose-light/10 px-6">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-line p-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gold-light/20 flex items-center justify-center mb-6">
            <FaHourglassHalf className="text-rose-dark text-2xl" />
          </div>

          <h1 className="font-display text-4xl text-charcoal">
            Application Under Review
          </h1>

          <p className="mt-5 text-taupe leading-8">
            Thank you for applying to become a Sparkora Seller.
          </p>

          <div className="mt-8 rounded-2xl bg-gold-light/10 border border-gold/20 p-6 text-left space-y-3">
            <p className="text-charcoal">
              <span className="font-semibold">Business:</span>{" "}
              {application.businessName}
            </p>
            <p className="text-charcoal flex items-center gap-2">
              <span className="font-semibold">Status:</span>
              <span className="px-3 py-1 rounded-full bg-gold-light/30 text-rose-dark text-sm font-semibold">
                Pending
              </span>
            </p>
          </div>

          <p className="mt-8 text-taupe">
            Our team is reviewing your application.
            <br />
            You'll receive an email once a decision has been made.
          </p>
        </div>
      </section>
    );
  }

  if (application?.status === "rejected") {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory via-white to-rose-light/10 px-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-line p-10">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-5">
              <FaTimesCircle className="text-red-500 text-2xl" />
            </div>

            <h1 className="font-display text-4xl text-charcoal">
              Application Rejected
            </h1>

            <p className="mt-4 text-taupe">
              Unfortunately your seller application wasn't approved.
            </p>
          </div>

          <div className="mt-10 rounded-2xl bg-red-50 border border-red-200 p-6">
            <h3 className="font-semibold text-red-700">Rejection Reason</h3>
            <p className="mt-3 text-gray-700">{application.rejectionReason}</p>
          </div>

          <button
            onClick={handleApplyAgain}
            disabled={resettingApplication}
            className={`w-full mt-10 py-4 rounded-xl text-white font-semibold uppercase tracking-wider transition ${
              resettingApplication
                ? "bg-rose/60 cursor-not-allowed"
                : "bg-rose-dark hover:bg-rose"
            }`}
          >
            {resettingApplication ? "Preparing new application..." : "Apply Again"}
          </button>
        </div>
      </section>
    );
  }

  /* ------------------------------ Main view ------------------------------ */

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-ivory via-white to-rose-light/10 py-16">
      {/* Decorative Background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-rose/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gold-light/10 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-rose-light/20 border border-rose/20 text-rose-dark text-sm font-semibold tracking-wide">
            <FaStore />
            Become a Sparkora Seller
          </div>

          <h1 className="font-display text-6xl text-charcoal mt-8">
            Start Selling Luxury Jewellery
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-taupe leading-8">
            Open your own jewellery store on Sparkora and reach customers
            across the country. Manage products, orders and earnings from
            one powerful seller dashboard.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {BENEFITS.map((b) => (
            <BenefitCard key={b.title} {...b} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-[32px] bg-gradient-to-r from-rose-dark via-rose to-gold p-12 text-center shadow-2xl">
          <h2 className="font-display text-5xl text-white">
            Ready to Start Selling?
          </h2>

          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-5 leading-8">
            It only takes a single click to activate your seller account.
            Start listing products, receive orders and grow your jewellery business.
          </p>

          <button
            onClick={handleToggle}
            disabled={loading}
            aria-expanded={showForm}
            className={`mt-10 inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-rose-dark font-semibold uppercase tracking-[3px] shadow-xl transition-all duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105 active:scale-95"
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-rose-dark border-t-transparent rounded-full animate-spin" />
                Activating...
              </>
            ) : showForm ? (
              <>
                Close Form
                <FaTimes />
              </>
            ) : (
              <>
                Become a Seller
                <FaChevronDown className="transition-transform duration-300" />
              </>
            )}
          </button>

          {/* Animated expand/collapse wrapper — CSS grid trick gives a
              smooth height transition without measuring the DOM */}
          <div
            className={`grid transition-all duration-700 ease-in-out ${
              showForm ? "grid-rows-[1fr] opacity-100 mt-12" : "grid-rows-[0fr] opacity-0 mt-0"
            }`}
          >
            <div className="overflow-hidden">
              <div
                className={`rounded-3xl bg-white shadow-2xl border border-line p-10 text-left transition-all duration-500 ${
                  showForm ? "translate-y-0 scale-100" : "-translate-y-4 scale-[0.98]"
                }`}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display text-4xl text-charcoal">
                    Seller Application
                  </h2>
                  <button
                    type="button"
                    onClick={handleToggle}
                    aria-label="Close application form"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-taupe hover:bg-rose-light/20 hover:text-rose-dark transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  {FORM_SECTIONS.map((section) => (
                    <div key={section.title}>
                      <h3 className="text-xs font-bold uppercase tracking-[2px] text-rose-dark/70 mb-5 pb-2 border-b border-line">
                        {section.title}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {section.fields.map((field) => (
                          <FormField
                            key={field.name}
                            {...field}
                            value={formData[field.name]}
                            onChange={handleChange}
                          />
                        ))}
                      </div>
                    </div>
                  ))}

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[2px] text-rose-dark/70 mb-5 pb-2 border-b border-line">
                      About Your Business
                    </h3>
                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-taupe">
                        <FaAlignLeft className="text-rose-dark/70 text-[13px]" />
                        Description
                      </span>
                      <textarea
                        name="description"
                        rows="5"
                        placeholder="Tell us about your jewellery business — what you make, your style, and your experience..."
                        className="w-full rounded-xl border border-line bg-white/80 px-4 py-3.5 text-charcoal placeholder:text-taupe/60 outline-none transition-all duration-200 focus:border-rose focus:ring-4 focus:ring-rose/10 resize-none"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-semibold uppercase tracking-[2px] text-white transition-all duration-300 ${
                      loading
                        ? "bg-rose/60 cursor-not-allowed"
                        : "bg-rose-dark hover:bg-rose hover:shadow-lg hover:-translate-y-0.5"
                    }`}
                  >
                    {loading ? "Submitting..." : "Submit Seller Application"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeSeller;