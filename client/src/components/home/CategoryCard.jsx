import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(category.name)}`}
      className="group relative rounded-2xl overflow-hidden block h-80"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-display text-2xl font-medium text-ivory">
          {category.name}
        </h3>
        <span className="text-xs uppercase tracking-widest text-ivory/70 group-hover:text-gold-light transition-colors">
          Shop Now →
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
