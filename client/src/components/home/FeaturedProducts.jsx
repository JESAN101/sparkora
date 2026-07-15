import products from "../../data/products";
import ProductCard from "../product/ProductCard";

const FeaturedProducts = () => {

  const featuredProducts = products.filter(
    (product) => product.featured
  );

  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <span className="text-pink-600 uppercase tracking-[5px] font-semibold">
            Sparkora Collection
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Featured Products
          </h2>

          <p className="text-gray-500 mt-5 max-w-xl mx-auto">
            Discover our handcrafted luxury jewelry designed for every occasion.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturedProducts;