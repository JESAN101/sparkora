import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import TrendingNow from "../components/home/TrendingNow";
import WhyChooseUs from "../components/home/WhyChooseUs";
import NewArrivals from "../components/home/NewArrivals";
import OfferBanner from "../components/home/OfferBanner";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <TrendingNow />
      <FeaturedProducts />
      <WhyChooseUs />
      <NewArrivals />
      <OfferBanner />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;