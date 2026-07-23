import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(category.name)}`}
      className="group relative rounded-3xl overflow-hidden block h-[420px] shadow-lg ring-1 ring-black/5 hover:shadow-2xl hover:ring-gold/40 transition-all duration-500"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />

      {category.featured && (
        <span className="absolute top-5 left-5 text-[11px] uppercase tracking-[2px] font-semibold text-charcoal bg-gold px-3 py-1.5 rounded-full shadow">
          Featured
        </span>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-8">

        <h3 className="font-display text-3xl font-semibold text-white transition-all duration-500 group-hover:-translate-y-2">
          {category.name}
        </h3>

        <div className="mt-5 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/5 backdrop-blur-sm px-4 py-2 text-gold hover:bg-gold hover:text-charcoal transition-colors duration-300">
            <span className="uppercase tracking-[3px] text-xs font-medium">
              Explore Collection
            </span>
            <FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </div>

      </div>
    </Link>
  );
};

export default CategoryCard;