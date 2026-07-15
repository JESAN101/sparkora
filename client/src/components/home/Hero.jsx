import { Link } from "react-router-dom";
import heroImage from "../../assets/images/jewel1.jpg";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-rose-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>

            <p className="text-amber-600 font-semibold tracking-widest uppercase mb-4">
              Luxury Jewelry Collection
            </p>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900">
              Discover Timeless
              <span className="block text-pink-600">
                Elegance
              </span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg leading-8 max-w-lg">
              Discover handcrafted rings, necklaces,
              bracelets and earrings designed to make
              every moment unforgettable.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                to="/shop"
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full font-semibold transition"
              >
                Shop Now
              </Link>

              <Link
                to="/shop"
                className="border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-8 py-4 rounded-full font-semibold transition"
              >
                Explore Collection
              </Link>

            </div>

          </div>

          {/* Right Image */}
          <div className="flex justify-center">

            <img
              src={heroImage}
              alt="Luxury Jewelry"
              className="w-full max-w-md lg:max-w-lg object-contain"
            />

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;