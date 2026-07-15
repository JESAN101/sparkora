import categories from "../../data/categories";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  return (
    <section className="py-20 sm:py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-rose-dark font-semibold uppercase tracking-[3px] text-sm">
            Categories
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium mt-3 text-charcoal">
            Shop by Category
          </h2>
          <p className="text-taupe mt-4">
            Discover our handcrafted collections.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
