const CategoryFilter = ({
  category,
  setCategory,
  categories = [],
}) => {
  return (
    <div className="card-luxury p-6 mb-6">
      <h2 className="font-display text-lg font-medium text-charcoal mb-4">
        Categories
      </h2>

      <div className="space-y-1">
        <button
          onClick={() => setCategory("All")}
          className={`block w-full text-left text-sm py-2 px-1 transition-colors ${
            category === "All"
              ? "text-rose-dark font-semibold"
              : "text-taupe hover:text-rose-dark"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setCategory(cat.name)}
            className={`block w-full text-left text-sm py-2 px-1 transition-colors ${
              category === cat.name
                ? "text-rose-dark font-semibold"
                : "text-taupe hover:text-rose-dark"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;