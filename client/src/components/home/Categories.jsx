import categories from "../../data/categories";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">

          <p className="text-amber-600 font-semibold uppercase tracking-widest">
            Categories
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Shop by Category
          </h2>

          <p className="text-gray-500 mt-4">
            Discover our handcrafted collections.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}

        </div>

      </div>
    </section>
  );
};

export default Categories;