import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import products from "../../data/products";
import ProductCard from "../product/ProductCard";

const NewArrivals = () => {
  const newArrivals = products.filter((product) => product.newArrival);

  if (newArrivals.length === 0) return null;

  return (
    <section className="py-20 sm:py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-rose-dark font-semibold uppercase tracking-[3px] text-sm">
            Just In
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium mt-3 text-charcoal">
            New Arrivals
          </h2>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={24}
          slidesPerView={1.15}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4 },
          }}
          className="!pb-2 !px-1 new-arrivals-swiper"
          style={{ "--swiper-navigation-color": "#B3735A", "--swiper-navigation-size": "20px" }}
        >
          {newArrivals.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewArrivals;
