const categories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];

const CategoryFilter = ({ category, setCategory }) => {
  return (
    <div className="card-luxury p-6 mb-6">
      <h2 className="font-display text-lg font-medium text-charcoal mb-4">
        Categories
      </h2>

      <div className="space-y-1">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`block w-full text-left text-sm py-2 px-1 transition-colors ${
              category === item
                ? "text-rose-dark font-semibold"
                : "text-taupe hover:text-rose-dark"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
