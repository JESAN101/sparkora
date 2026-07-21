import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaShoppingBag,
  FaRegHeart,
  FaRegUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaSignOutAlt,
  FaBoxOpen,
  FaStore,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import BrandMark from "./BrandMark";

const searchSuggestions = [
  { label: "New Arrivals", to: "/shop?category=new-arrivals" },
  { label: "Rings", to: "/shop?category=Rings" },
  { label: "Necklaces", to: "/shop?category=Necklaces" },
  { label: "Earrings", to: "/shop?category=Earrings" },
  { label: "Bracelets", to: "/shop?category=Bracelets" },
];

const Navbar = () => {
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const userMenuRef = useRef(null);
  const searchInputRef = useRef(null);
  const navRef = useRef(null);

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const wishlistCount = wishlist.length;

  const navLink =
    "relative text-[15px] tracking-wide text-charcoal/80 hover:text-rose-dark transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-rose after:transition-all hover:after:w-full";

  const mobileNavLink =
    "flex items-center gap-3 py-3 text-[16px] tracking-wide text-charcoal/80 hover:text-rose-dark transition-colors border-b border-line/60";

  // Sticky-on-scroll: toggle a compact/shadowed state once the user scrolls
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close search panel on outside click (anywhere outside the <nav>)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchOpen && navRef.current && !navRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  // Search shortcut: Cmd/Ctrl+K or "/" opens search, Esc closes it — lets
  // people jump to search from anywhere on the page without the mouse
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isTypingField =
        e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA";

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
      } else if (e.key === "/" && !isTypingField) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Autofocus the search input once the panel opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    logout?.();
    navigate("/");
  };

  const mobileMenuVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  };
  const mobileItemVariants = {
    hidden: { opacity: 0, x: 16 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`sticky top-0 z-50 bg-ivory/95 backdrop-blur border-b border-line transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Link
            to="/"
            className={`flex items-center gap-2 font-display font-semibold tracking-wide text-charcoal transition-all duration-300 ${
              scrolled ? "text-2xl" : "text-3xl"
            }`}
          >
            <BrandMark size={scrolled ? 20 : 24} className="text-gold shrink-0" />
            Sparkora
          </Link>

          <div className="hidden md:flex items-center gap-9">
            <Link to="/" className={navLink}>Home</Link>
            <Link to="/shop" className={navLink}>Shop</Link>
            <Link to="/shop?sort=Latest" className={navLink}>New Arrivals</Link>
          </div>

          <div className="flex items-center gap-5 text-charcoal">
            {/* Search trigger */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setSearchOpen((o) => !o)}
              className={`hidden sm:flex items-center gap-2 transition-colors ${
                searchOpen ? "text-rose-dark" : "text-charcoal/70 hover:text-rose-dark"
              }`}
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <FaSearch size={18} />
              <span
                title="Press Cmd/Ctrl + K to search from anywhere"
                className="hidden lg:flex items-center gap-1 text-xs text-charcoal/40 border border-line rounded px-1.5 py-0.5"
              >
                <span>⌘</span>K
              </span>
            </motion.button>

            {/* User dropdown */}
            <div className="relative hidden sm:block" ref={userMenuRef}>
              {user ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className="flex items-center gap-2 hover:text-rose-dark transition-colors"
                    aria-label="Account menu"
                    aria-expanded={userMenuOpen}
                  >
                    <FaRegUser size={19} />
                    <span className="text-sm font-medium hidden lg:block">
                      Hi, {user.firstName?.split(" ")[0]}
                    </span>
                    <FaChevronDown
                      size={11}
                      className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-48 bg-ivory border border-line rounded-lg shadow-lg py-2"
                      >
                        <Link
                          to="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal/80 hover:bg-rose/10 hover:text-rose-dark transition-colors"
                        >
                          <FaRegUser size={13} /> My Profile
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal/80 hover:bg-rose/10 hover:text-rose-dark transition-colors"
                        >
                          <FaBoxOpen size={13} /> My Orders
                        </Link>
                        <Link
                          to="/become-seller"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal/80 hover:bg-rose/10 hover:text-rose-dark transition-colors"
                        >
                          <FaStore size={13} /> Be a Seller
                        </Link>
                        <div className="my-1 border-t border-line" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-charcoal/80 hover:bg-rose/10 hover:text-rose-dark transition-colors"
                        >
                          <FaSignOutAlt size={13} /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 hover:text-rose-dark transition-colors"
                  aria-label="Login"
                >
                  <FaRegUser size={19} />
                </Link>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative hover:text-rose-dark transition-colors" aria-label="Wishlist">
              <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.94 }} className="block">
                <FaRegHeart size={24} />
              </motion.span>
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    key={wishlistCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="absolute -top-2 -right-2 bg-burgundy text-ivory text-[11px] font-semibold min-w-[19px] h-[19px] px-1 rounded-full flex items-center justify-center"
                  >
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative hover:text-rose-dark transition-colors" aria-label="Cart">
              <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.94 }} className="block">
                <FaShoppingBag size={24} />
              </motion.span>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="absolute -top-2 -right-2 bg-rose text-ivory text-[11px] font-semibold min-w-[19px] h-[19px] px-1 rounded-full flex items-center justify-center"
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden text-charcoal hover:text-rose-dark transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
        <div className="divider-gold" />

        {/* Search panel — full-width, anchored right under Home / Shop / New Arrivals */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden bg-ivory border-b border-line shadow-lg"
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
                  <FaSearch className="text-charcoal/40 shrink-0" size={20} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search rings, necklaces, earrings..."
                    className="flex-1 bg-transparent outline-none text-xl font-display text-charcoal placeholder:text-charcoal/30"
                  />
                  <kbd className="hidden sm:block text-xs text-charcoal/40 border border-line rounded px-1.5 py-0.5 shrink-0">
                    Esc
                  </kbd>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    aria-label="Close search"
                    className="text-charcoal/40 hover:text-rose-dark transition-colors shrink-0"
                  >
                    <FaTimes size={18} />
                  </button>
                </form>

                <div className="flex items-center gap-3 mt-5 flex-wrap">
                  <span className="text-xs uppercase tracking-widest text-taupe">Popular:</span>
                  {searchSuggestions.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setSearchOpen(false)}
                      className="text-sm text-charcoal/70 border border-line rounded-full px-3.5 py-1.5 hover:border-rose hover:text-rose-dark transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-charcoal/40"
          onClick={() => setMobileOpen(false)}
        />
        <motion.div
          variants={mobileMenuVariants}
          initial="hidden"
          animate={mobileOpen ? "visible" : "hidden"}
          className={`absolute top-0 right-0 h-full w-[78%] max-w-sm bg-ivory shadow-xl px-6 pt-24 pb-8 transition-transform duration-300 overflow-y-auto ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {user && (
            <motion.p variants={mobileItemVariants} className="text-lg font-display text-charcoal mb-2">
              Hi, {user.firstName?.split(" ")[0]}
            </motion.p>
          )}
          <motion.div variants={mobileItemVariants}>
            <Link to="/" onClick={() => setMobileOpen(false)} className={mobileNavLink}>Home</Link>
          </motion.div>
          <motion.div variants={mobileItemVariants}>
            <Link to="/shop" onClick={() => setMobileOpen(false)} className={mobileNavLink}>Shop</Link>
          </motion.div>
          <motion.div variants={mobileItemVariants}>
            <Link to="/shop?sort=Latest" onClick={() => setMobileOpen(false)} className={mobileNavLink}>New Arrivals</Link>
          </motion.div>
          <motion.div variants={mobileItemVariants}>
            <Link to="/wishlist" onClick={() => setMobileOpen(false)} className={mobileNavLink}>
              <FaRegHeart size={16} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
          </motion.div>
          <motion.div variants={mobileItemVariants}>
            <Link to="/cart" onClick={() => setMobileOpen(false)} className={mobileNavLink}>
              <FaShoppingBag size={16} /> Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
          </motion.div>

          <motion.div variants={mobileItemVariants} className="mt-6">
            {user ? (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className={mobileNavLink}>
                  <FaRegUser size={14} /> My Profile
                </Link>
                <Link to="/orders" onClick={() => setMobileOpen(false)} className={mobileNavLink}>
                  <FaBoxOpen size={14} /> My Orders
                </Link>
                <Link to="/seller" onClick={() => setMobileOpen(false)} className={mobileNavLink}>
                  <FaStore size={14} /> Seller
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="mt-3 flex items-center gap-2 text-[15px] text-rose-dark font-medium"
                >
                  <FaSignOutAlt size={14} /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-[15px] text-rose-dark font-medium"
              >
                <FaRegUser size={14} /> Login
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Navbar;