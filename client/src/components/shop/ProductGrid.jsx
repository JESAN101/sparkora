import ProductCard from "../product/ProductCard";

const ProductGrid = ({ products }) => {

  if (products.length === 0) {
    return (
      <h2 className="text-center text-2xl">
        No products found.
      </h2>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}

    </div>
  );
};

export default ProductGrid;