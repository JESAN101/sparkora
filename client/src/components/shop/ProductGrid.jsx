import ProductCard from "../product/ProductCard";
import EmptyProducts from "./EmptyProducts";

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return <EmptyProducts />;
  }

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
