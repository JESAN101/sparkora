import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../../assets/images/jewel1.jpg";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blush via-ivory to-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-rose-dark font-semibold tracking-[3px] uppercase mb-4 text-sm">
              Fine Jewelry Collection
            </p>

            <h1 className="font-display text-5xl lg:text-7xl font-medium leading-[1.05] text-charcoal">
              Discover Timeless
              <span className="block italic text-rose-dark">Elegance</span>
            </h1>

            <p className="mt-6 text-taupe text-lg leading-8 max-w-lg">
              Handcrafted rings, necklaces, bracelets and earrings —
              designed to make every moment unforgettable.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="btn-luxury px-9 py-4 rounded-full font-medium text-sm uppercase tracking-widest"
              >
                Shop Now
              </Link>
              <Link
                to="/shop"
                className="btn-luxury-outline px-9 py-4 rounded-full font-medium text-sm uppercase tracking-widest"
              >
                Explore Collection
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-6 rounded-full border border-gold/30" />
              <img
                src={heroImage}
                alt="Luxury Jewelry"
                className="w-full max-w-md lg:max-w-lg object-contain relative"
              />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="divider-gold" />
    </section>
  );
};

export default Hero;
