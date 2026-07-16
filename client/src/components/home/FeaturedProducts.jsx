import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productService";
import { normalizeProduct } from "../../utils/normalizeProduct";
import ProductCard from "../product/ProductCard";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        const normalized = data.products.map(normalizeProduct);
        setFeaturedProducts(normalized.filter((product) => product.featured));
      } catch (err) {
        setError("Failed to load featured products.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="py-20 sm:py-24 bg-cream/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-taupe">Loading featured pieces...</p>
        </div>
      </section>
    );
  }

  if (error || featuredProducts.length === 0) {
    return null; // fail quietly on the homepage rather than showing an empty/broken section
  }

  return (
    <section className="py-20 sm:py-24 bg-cream/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <span className="text-rose-dark uppercase tracking-[3px] font-semibold text-sm">
            Sparkora Collection
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-medium mt-3 text-charcoal">
            Featured Pieces
          </h2>
          <p className="text-taupe mt-5 max-w-xl mx-auto">
            Discover our handcrafted luxury jewelry, designed for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            to="/shop"
            className="btn-luxury-outline inline-block px-10 py-4 rounded-full text-sm uppercase tracking-widest font-medium"
          >
            View Full Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;