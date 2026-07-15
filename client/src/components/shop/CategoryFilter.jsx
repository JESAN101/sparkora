const categories = [
  "All",
  "Rings",
  "Necklaces",
  "Earrings",
  "Bracelets",
];

const CategoryFilter = ({
  category,
  setCategory,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">

      <h2 className="font-bold mb-5 text-xl">
        Categories
      </h2>

      <div className="space-y-3">

        {categories.map((item) => (

          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`block w-full text-left transition ${
              category === item
                ? "text-pink-600 font-semibold"
                : "hover:text-pink-600"
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