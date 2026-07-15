import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EmptyCart = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-md"
      >
        {/* Line-art open jewelry box — the empty state signature */}
        <svg
          width="120"
          height="90"
          viewBox="0 0 120 90"
          fill="none"
          className="mx-auto mb-8"
        >
          <path
            d="M10 45 L60 25 L110 45 L110 78 Q110 82 106 82 L14 82 Q10 82 10 78 Z"
            stroke="#B4913F"
            strokeWidth="1.4"
            fill="#F6E3DB"
          />
          <path
            d="M10 45 L60 63 L110 45"
            stroke="#B4913F"
            strokeWidth="1.4"
            fill="none"
          />
          <path
            d="M60 25 L60 63"
            stroke="#B4913F"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <path
            d="M30 33 L10 45 L36 51 L60 39 Z"
            stroke="#8F5A44"
            strokeWidth="1.2"
            fill="#FBF7F2"
          />
          <circle cx="60" cy="18" r="5.5" stroke="#B4913F" strokeWidth="1.4" fill="none" />
          <path d="M60 23.5 L60 33" stroke="#B4913F" strokeWidth="1.4" />
        </svg>

        <h2 className="font-display text-3xl md:text-4xl font-medium text-charcoal mb-3">
          Your box is empty
        </h2>
        <p className="text-taupe leading-relaxed mb-9">
          Nothing saved for later just yet. Explore the collection and
          find a piece worth keeping.
        </p>

        <Link
          to="/shop"
          className="btn-luxury inline-block px-10 py-4 rounded-full text-sm uppercase tracking-widest"
        >
          Discover the Collection
        </Link>
      </motion.div>
    </section>
  );
};

export default EmptyCart;
