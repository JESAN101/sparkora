import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaShieldAlt,
  FaGem,
  FaUndo,
  FaMoneyBillWave,
} from "react-icons/fa";

const trustItems = [
  {
    icon: FaGem,
    title: "Certified Purity",
    desc: "Hallmark verified on every piece",
  },
  {
    icon: FaShieldAlt,
    title: "Insured Shipping",
    desc: "Fully protected in transit",
  },
  {
    icon: FaUndo,
    title: "Easy Returns",
    desc: "7-day hassle-free exchange",
  },
];

const paymentBadges = [
  {
    icon: FaMoneyBillWave,
    label: "Cash on Delivery",
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-charcoal dark:bg-[#111114] text-ivory/90 pt-24 mt-32 border-t border-transparent dark:border-white/10 transition-colors duration-300">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #D9C07F 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative -top-24 mb-[-6rem]
          bg-ivory dark:bg-[#1c1c20]
          rounded-2xl
          border border-line dark:border-white/10
          shadow-2xl
          grid grid-cols-1 sm:grid-cols-3
          divide-y sm:divide-y-0 sm:divide-x
          divide-line dark:divide-white/10"
        >
          {trustItems.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group flex items-center gap-4 px-8 py-7 hover:-translate-y-0.5 transition"
            >
              <div className="w-11 h-11 rounded-full bg-rose/10 dark:bg-gold/10 flex items-center justify-center shrink-0">
                <Icon className="text-rose-dark dark:text-gold" size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-charcoal dark:text-white">
                  {title}
                </p>

                <p className="text-xs text-taupe dark:text-gray-400">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-8 pb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              className="font-display text-3xl font-semibold text-ivory dark:text-gold"
            >
              Sparkora
            </Link>

            <p className="text-sm text-ivory/50 dark:text-gray-400 mt-4 leading-relaxed max-w-[220px]">
              Fine jewelry, thoughtfully made — for the moments worth remembering.
            </p>

            <div className="flex gap-4 mt-6">
              {[FaInstagram, FaFacebookF, FaPinterestP].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 rounded-full border border-ivory/20 dark:border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gold mb-5">
              Shop
            </h4>

            <ul className="space-y-3 text-sm text-ivory/60 dark:text-gray-400">
              <li>
                <Link to="/shop" className="hover:text-gold transition">
                  All Jewelry
                </Link>
              </li>

              <li>
                <Link to="/shop?category=Rings" className="hover:text-gold transition">
                  Rings
                </Link>
              </li>

              <li>
                <Link to="/shop?category=Necklaces" className="hover:text-gold transition">
                  Necklaces
                </Link>
              </li>

              <li>
                <Link to="/shop?category=Earrings" className="hover:text-gold transition">
                  Earrings
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gold mb-5">
              Help
            </h4>

            <ul className="space-y-3 text-sm text-ivory/60 dark:text-gray-400">
              <li>
                <Link to="/wishlist" className="hover:text-gold transition">
                  Wishlist
                </Link>
              </li>

              <li>
                <Link to="/cart" className="hover:text-gold transition">
                  Shopping Bag
                </Link>
              </li>

              <li>
                <a href="#" className="hover:text-gold transition">
                  Shipping & Returns
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-gold transition">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gold mb-5">
              Company
            </h4>

            <ul className="space-y-3 text-sm text-ivory/60 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-gold transition">
                  About Sparkora
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-gold transition">
                  Contact Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-gold transition">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-gold transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-ivory/10 dark:border-white/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-ivory/40 dark:text-gray-500">

          <p>
            © {new Date().getFullYear()} Sparkora. All rights reserved.
          </p>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {paymentBadges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 border border-ivory/15 dark:border-white/10 rounded-full px-3 py-1 text-ivory/50 dark:text-gray-400"
              >
                <Icon size={11} className="text-gold" />
                {label}
              </span>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;