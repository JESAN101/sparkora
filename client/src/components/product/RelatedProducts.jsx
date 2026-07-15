import products from "../../data/products";
import ProductCard from "./ProductCard";

const RelatedProducts = ({
  currentProduct,
}) => {

  const related = products
    .filter(
      (item) =>
        item.category === currentProduct.category &&
        item.id !== currentProduct.id
    )
    .slice(0, 4);

  return (

    <section className="mt-24">

      <h2 className="text-4xl font-bold mb-10">

        Related Products

      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {related.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>

  );

};

export default RelatedProducts;