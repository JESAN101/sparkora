import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaPinterestP, FaShieldAlt, FaGem, FaUndo } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-ivory/90 pt-16 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Trust strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-12 border-b border-ivory/10">
          <div className="flex items-center gap-3">
            <FaGem className="text-gold shrink-0" size={20} />
            <div>
              <p className="text-sm font-semibold">Certified Purity</p>
              <p className="text-xs text-ivory/50">Hallmark verified on every piece</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-gold shrink-0" size={20} />
            <div>
              <p className="text-sm font-semibold">Insured Shipping</p>
              <p className="text-xs text-ivory/50">Fully protected in transit</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaUndo className="text-gold shrink-0" size={20} />
            <div>
              <p className="text-sm font-semibold">Easy Returns</p>
              <p className="text-xs text-ivory/50">7-day hassle-free exchange</p>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-3xl font-semibold text-ivory">
              Sparkora
            </Link>
            <p className="text-sm text-ivory/50 mt-4 leading-relaxed max-w-[220px]">
              Fine jewelry, thoughtfully made — for the moments worth remembering.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <FaInstagram size={14} />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <FaFacebookF size={14} />
              </a>
              <a href="#" aria-label="Pinterest" className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
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

        <div className="border-t border-ivory/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-ivory/40">
          <p>© {new Date().getFullYear()} Sparkora. All rights reserved.</p>
          <p>Cash on Delivery · eSewa &amp; Khalti coming soon</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
