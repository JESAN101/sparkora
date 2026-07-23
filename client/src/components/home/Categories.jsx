import { useEffect, useRef, useState } from "react";
import { getCategories } from "../../api/adminApi";
import CategoryCard from "./CategoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();

      const activeCategories = data.categories
        .filter((cat) => cat.isActive)
        .sort((a, b) => {
          // Featured categories first
          if (a.featured !== b.featured) {
            return b.featured - a.featured;
          }

          // Then by display order
          return a.displayOrder - b.displayOrder;
        })
        .slice(0, 10);

      setCategories(activeCategories);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-[420px] rounded-3xl bg-charcoal/5 animate-pulse"
              />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-taupe">
            No categories available.
          </p>
        ) : (
          <div className="relative">
            {/* Custom navigation — replaces Swiper's default (near-invisible) arrows */}
            <div className="flex items-center justify-end gap-3 mb-6">
              <button
                ref={prevRef}
                aria-label="Previous categories"
                className="w-11 h-11 rounded-full bg-charcoal text-ivory flex items-center justify-center shadow-md hover:bg-rose-dark transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <FiArrowLeft size={18} />
              </button>
              <button
                ref={nextRef}
                aria-label="Next categories"
                className="w-11 h-11 rounded-full bg-charcoal text-ivory flex items-center justify-center shadow-md hover:bg-rose-dark transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <FiArrowRight size={18} />
              </button>
            </div>

            <div
              className="category-swiper
                [&_.swiper-pagination]:!relative [&_.swiper-pagination]:!mt-10
                [&_.swiper-pagination-bullet]:bg-charcoal/25 [&_.swiper-pagination-bullet]:opacity-100
                [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300
                [&_.swiper-pagination-bullet-active]:bg-gold [&_.swiper-pagination-bullet-active]:w-6
                [&_.swiper-pagination-bullet-active]:rounded-full"
            >
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={24}
                loop={categories.length > 4}
                autoplay={{
                  delay: 3000,
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
                pagination={{ clickable: true }}
                breakpoints={{
                  320: {
                    slidesPerView: 1.2,
                  },
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  1280: {
                    slidesPerView: 4,
                  },
                }}
              >
                {categories.map((category) => (
                  <SwiperSlide key={category._id}>
                    <CategoryCard category={category} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;