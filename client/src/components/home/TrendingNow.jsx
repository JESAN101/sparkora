import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getProducts } from "../../services/productService";
import { normalizeProduct } from "../../utils/normalizeProduct";

import TrendingCard from "./TrendingCard";

const TrendingNow = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  const fetchTrendingProducts = async () => {
    try {
      const data = await getProducts();

      // Backend already sorts by trend score
      const trendingProducts = data.products
        .map(normalizeProduct)
        .slice(0, 8);

      setProducts(trendingProducts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  if (!products.length) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-white to-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[5px] text-rose-dark font-semibold text-sm">
            Trending Now
          </p>

          <h2 className="font-display text-5xl text-charcoal mt-4">
            Most Loved Jewelry
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-taupe">
            Ranked automatically using customer activity,
            purchases, ratings, wishlists and popularity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: .2 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {products.map((product, index) => (
            <TrendingCard
              key={product._id}
              product={product}
              rank={index + 1}
            />
          ))}
        </motion.div>

        <div className="flex justify-center mt-16">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-charcoal hover:bg-charcoal hover:text-white transition"
          >
            View All Jewelry

            <span className="group-hover:translate-x-2 transition-transform">
              →
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TrendingNow;