import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

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

  const cartCount = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
  const wishlistCount = wishlist.length;

  const navLink =
    "relative text-[15px] tracking-wide text-charcoal/80 hover:text-rose-dark transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-rose after:transition-all hover:after:w-full";

  const mobileNavLink =
    "block py-3 text-[16px] tracking-wide text-charcoal/80 hover:text-rose-dark transition-colors border-b border-line/60";

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

  // Search shortcut: Cmd/Ctrl+K opens search, Esc closes it
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

  // Autofocus the search input once it opens
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

  return (
    <>
      <nav
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
            className={`font-display font-semibold tracking-wide text-charcoal transition-all duration-300 ${
              scrolled ? "text-2xl" : "text-3xl"
            }`}
          >
            Sparkora
          </Link>

          <div className="hidden md:flex items-center gap-9">
            <Link to="/" className={navLink}>Home</Link>
            <Link to="/shop" className={navLink}>Shop</Link>
            <Link to="/shop?category=new-arrivals" className={navLink}>New Arrivals</Link>
          </div>

          <div className="flex items-center gap-5 text-charcoal">
            {/* Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 text-charcoal/70 hover:text-rose-dark transition-colors"
              aria-label="Search"
            >
              <FaSearch size={17} />
              <span className="hidden lg:flex items-center gap-1 text-xs text-charcoal/40 border border-line rounded px-1.5 py-0.5">
                <span>⌘</span>K
              </span>
            </button>

            {/* User dropdown */}
            <div className="relative hidden sm:block" ref={userMenuRef}>
              {user ? (
                <>
                  <button
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className="flex items-center gap-2 hover:text-rose-dark transition-colors"
                    aria-label="Account menu"
                    aria-expanded={userMenuOpen}
                  >
                    <FaRegUser size={19} />
                    <span className="text-sm font-medium hidden lg:block">{user.name}</span>
                    <FaChevronDown
                      size={11}
                      className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-ivory border border-line rounded-lg shadow-lg py-2 animate-in fade-in slide-in-from-top-1">
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
                      <div className="my-1 border-t border-line" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-charcoal/80 hover:bg-rose/10 hover:text-rose-dark transition-colors"
                      >
                        <FaSignOutAlt size={13} /> Logout
                      </button>
                    </div>
                  )}
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
              <FaRegHeart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-burgundy text-ivory text-[10px] font-semibold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative hover:text-rose-dark transition-colors" aria-label="Cart">
              <FaShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose text-ivory text-[10px] font-semibold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
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
        <div
          className={`absolute top-0 right-0 h-full w-[78%] max-w-sm bg-ivory shadow-xl px-6 pt-24 pb-8 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Link to="/" onClick={() => setMobileOpen(false)} className={mobileNavLink}>Home</Link>
          <Link to="/shop" onClick={() => setMobileOpen(false)} className={mobileNavLink}>Shop</Link>
          <Link to="/shop?category=new-arrivals" onClick={() => setMobileOpen(false)} className={mobileNavLink}>New Arrivals</Link>
          <Link to="/wishlist" onClick={() => setMobileOpen(false)} className={mobileNavLink}>
            Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
          </Link>
          <Link to="/cart" onClick={() => setMobileOpen(false)} className={mobileNavLink}>
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>

          <div className="mt-6">
            {user ? (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className={mobileNavLink}>
                  My Profile
                </Link>
                <Link to="/orders" onClick={() => setMobileOpen(false)} className={mobileNavLink}>
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="mt-3 text-[15px] text-rose-dark font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="text-[15px] text-rose-dark font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4">
          <div
            className="absolute inset-0 bg-charcoal/40"
            onClick={() => setSearchOpen(false)}
          />
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full max-w-xl bg-ivory rounded-xl shadow-2xl border border-line p-4 flex items-center gap-3"
          >
            <FaSearch className="text-charcoal/50" size={18} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent outline-none text-[16px] text-charcoal placeholder:text-charcoal/40"
            />
            <kbd className="hidden sm:block text-xs text-charcoal/40 border border-line rounded px-1.5 py-0.5">
              Esc
            </kbd>
          </form>
        </div>
      )}
    </>
  );
};

export default Navbar;