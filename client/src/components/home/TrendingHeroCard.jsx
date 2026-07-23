import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const TrendingHeroCard = ({ image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative shrink-0 w-[260px] lg:w-[300px] h-[420px] rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5 group"
    >
      {image ? (
        <img
          src={image}
          alt="Trending jewelry"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-charcoal to-taupe" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

      <div className="absolute inset-0 flex flex-col justify-end p-7">
        <p className="uppercase tracking-[4px] text-gold font-semibold text-xs">
          Trending Now
        </p>

        <h2 className="font-display text-3xl text-white mt-3 leading-tight">
          Most Loved Jewelry
        </h2>

        <p className="mt-3 text-white/70 text-sm leading-relaxed">
          Ranked automatically from activity, purchases, ratings and
          wishlists.
        </p>

        <Link
          to="/shop"
          className="group/link inline-flex items-center gap-2 mt-6 text-gold text-xs uppercase tracking-[2px] font-medium"
        >
          View Collection
          <FiArrowRight
            size={14}
            className="group-hover/link:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </motion.div>
  );
};

export default TrendingHeroCard;