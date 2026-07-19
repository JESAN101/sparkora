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
  FaMobileAlt,
  FaWallet,
} from "react-icons/fa";

const trustItems = [
  { icon: FaGem, title: "Certified Purity", desc: "Hallmark verified on every piece" },
  { icon: FaShieldAlt, title: "Insured Shipping", desc: "Fully protected in transit" },
  { icon: FaUndo, title: "Easy Returns", desc: "7-day hassle-free exchange" },
];

const paymentBadges = [
  { icon: FaMoneyBillWave, label: "Cash on Delivery" },
];

const Footer = () => {
  return (
    <footer className="relative bg-charcoal text-ivory/90 pt-24 mt-32">
      {/* Faint dot pattern, matching the OfferBanner motif for cohesion */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #D9C07F 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Trust tray — sits half over the section above it, like pieces
            displayed on a jeweler's counter before checkout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative -top-24 mb-[-6rem] bg-ivory rounded-2xl border border-line shadow-2xl grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line"
        >
          {trustItems.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group flex items-center gap-4 px-8 py-7 hover:-translate-y-0.5 transition-transform duration-300"
            >
              <div className="w-11 h-11 rounded-full bg-rose/10 flex items-center justify-center shrink-0 group-hover:bg-rose/20 transition-colors">
                <Icon className="text-rose-dark" size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal">{title}</p>
                <p className="text-xs text-taupe">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-8 pb-14">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-3xl font-semibold text-ivory">
              Sparkora
            </Link>
            <p className="text-sm text-ivory/50 mt-4 leading-relaxed max-w-[220px]">
              Fine jewelry, thoughtfully made — for the moments worth remembering.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all">
                <FaInstagram size={14} />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all">
                <FaFacebookF size={14} />
              </a>
              <a href="#" aria-label="Pinterest" className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all">
                <FaPinterestP size={14} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gold mb-5">Shop</h4>
            <ul className="space-y-3 text-sm text-ivory/60">
              <li><Link to="/shop" className="hover:text-ivory transition-colors">All Jewelry</Link></li>
              <li><Link to="/shop?category=Rings" className="hover:text-ivory transition-colors">Rings</Link></li>
              <li><Link to="/shop?category=Necklaces" className="hover:text-ivory transition-colors">Necklaces</Link></li>
              <li><Link to="/shop?category=Earrings" className="hover:text-ivory transition-colors">Earrings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gold mb-5">Help</h4>
            <ul className="space-y-3 text-sm text-ivory/60">
              <li><Link to="/wishlist" className="hover:text-ivory transition-colors">Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-ivory transition-colors">Shopping Bag</Link></li>
              <li><a href="#" className="hover:text-ivory transition-colors">Shipping &amp; Returns</a></li>
              <li><a href="#" className="hover:text-ivory transition-colors">Size Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gold mb-5">Company</h4>
            <ul className="space-y-3 text-sm text-ivory/60">
              <li><a href="#" className="hover:text-ivory transition-colors">About Sparkora</a></li>
              <li><a href="#" className="hover:text-ivory transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-ivory transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-ivory transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ivory/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-ivory/40">
          <p>© {new Date().getFullYear()} Sparkora. All rights reserved.</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {paymentBadges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 border border-ivory/15 rounded-full px-3 py-1 text-ivory/50"
              >
                <Icon size={11} className="text-gold/70" />
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