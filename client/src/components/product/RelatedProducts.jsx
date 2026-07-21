import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { normalizeProduct } from "../../utils/normalizeProduct";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ currentProduct }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const data = await getProducts();

        const allProducts = (data.products || data).map(normalizeProduct);

        const filtered = allProducts
          .filter(
            (item) =>
              item.category === currentProduct.category &&
              item.id !== currentProduct.id
          )
          .slice(0, 4);

        setRelated(filtered);
      } catch (err) {
        console.error("Failed to load related products:", err);
      }
    };

    if (currentProduct?.category) {
      fetchRelated();
    }
  }, [currentProduct]);

  if (related.length === 0) return null;

  return (
    <section className="mt-28">

      {/* Section Header */}

      <div className="text-center mb-14">

        <p className="uppercase tracking-[0.35em] text-xs text-gold font-medium">
          You May Also Like
        </p>

        <h2 className="font-display text-5xl text-charcoal mt-3">
          Related Products
        </h2>

        <div className="divider-gold mt-6 max-w-xs mx-auto" />

      </div>

      {/* Products */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">

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