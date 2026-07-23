import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Mousewheel } from "swiper/modules";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";

import { getProducts } from "../../services/productService";
import { normalizeProduct } from "../../utils/normalizeProduct";

import TrendingCard from "./TrendingCard";
import TrendingHeroCard from "./TrendingHeroCard";

const TrendingNow = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  const fetchTrendingProducts = async () => {
    try {
      const data = await getProducts();

      const trendingProducts = data.products
        .map(normalizeProduct)
        .slice(0, 10);

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
    <section className="relative py-24 bg-gradient-to-b from-white to-ivory overflow-hidden">

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-gold/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ================= Section Heading ================= */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-sm px-5 py-2 text-[11px] uppercase tracking-[4px] font-semibold text-gold">
            🔥 Trending Collection
          </span>

          <h2 className="mt-6 font-display text-5xl lg:text-6xl text-charcoal leading-tight">
            Our Finest Selections

            <span className="block text-rose-dark">
              Crafted to Impress
            </span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-taupe leading-8">
            Explore our most admired creations, ranked by customer
            purchases, wishlists, reviews, and popularity. Each piece
            is handcrafted to celebrate timeless elegance and modern
            luxury.
          </p>
        </motion.div>

        {/* ================= Content ================= */}

        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">

          {/* Hero Card */}

          <TrendingHeroCard image={products[0]?.images?.[0]} />

          {/* Slider */}

          <div className="lg:flex-1 min-w-0 overflow-hidden">

            <Swiper
              modules={[Navigation, Autoplay, Mousewheel]}
              spaceBetween={20}
              slidesPerView={1}
              slidesPerGroup={1}
              speed={700}
              loop={products.length > 3}
              mousewheel={{ forceToAxis: true }}
              autoplay={{
                delay: 2800,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  slidesPerGroup: 1,
                },
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 1,
                },
              }}
              className="h-[420px]"
            >
              {products.map((product, index) => (
                <SwiperSlide
                  key={product._id}
                  className="h-full"
                >
                  <TrendingCard
                    product={product}
                    rank={index + 1}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}

            <div className="flex items-center justify-end gap-3 mt-6">

              <button
                ref={prevRef}
                aria-label="Previous"
                className="w-10 h-10 rounded-full border border-charcoal/20 text-charcoal flex items-center justify-center hover:bg-charcoal hover:text-white hover:border-charcoal transition"
              >
                <FiArrowLeft size={15} />
              </button>

              <button
                ref={nextRef}
                aria-label="Next"
                className="w-10 h-10 rounded-full border border-charcoal/20 text-charcoal flex items-center justify-center hover:bg-charcoal hover:text-white hover:border-charcoal transition"
              >
                <FiArrowRight size={15} />
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default TrendingNow;