import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { normalizeProduct } from "../../utils/normalizeProduct";
import ProductCard from "./ProductCard";

const RelatedProducts = ({
  currentProduct,
}) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const data = await getProducts();
        const all = (data.products || data).map(normalizeProduct);

        const filtered = all
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