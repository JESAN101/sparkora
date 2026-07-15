import { Link } from "react-router-dom";

const OfferBanner = () => {
  return (
    <section className="py-20 sm:py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto rounded-3xl bg-charcoal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #B4913F 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative py-16 sm:py-20 px-8 sm:px-16 text-center">
          <p className="text-gold uppercase tracking-[3px] text-sm font-semibold mb-4">
            Limited Time
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-ivory mb-5">
            Up to 20% Off <span className="italic text-gold-light">Gold Jewelry</span>
          </h2>
          <p className="text-ivory/60 max-w-lg mx-auto mb-9">
            A curated edit of rings, chains and bangles — priced for the season.
          </p>
          <Link
            to="/shop"
            className="btn-luxury inline-block px-10 py-4 rounded-full text-sm uppercase tracking-widest"
          >
            Shop the Offer
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;
