import { FaStar, FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Aarushi Sharma",
    role: "Verified Buyer",
    quote:
      "The ring I ordered looked even better in person. The packaging alone felt like a gift.",
    rating: 5,
  },
  {
    name: "Priyanka Thapa",
    role: "Verified Buyer",
    quote:
      "Fast delivery and the earrings are exactly as described — genuinely premium quality.",
    rating: 5,
  },
  {
    name: "Sneha Karki",
    role: "Verified Buyer",
    quote:
      "My go-to for gifting now. The necklace I bought for my mother made her whole month.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 sm:py-24 bg-cream/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-rose-dark font-semibold uppercase tracking-[3px] text-sm">
            Testimonials
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium mt-3 text-charcoal">
            Loved by Our Customers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card-luxury p-8 relative">
              <FaQuoteRight className="absolute top-6 right-6 text-blush" size={26} />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    size={13}
                    className={i < t.rating ? "text-gold" : "text-line"}
                  />
                ))}
              </div>

              <p className="text-charcoal/90 leading-relaxed mb-6">
                "{t.quote}"
              </p>

              <div>
                <p className="font-semibold text-charcoal text-sm">{t.name}</p>
                <p className="text-xs text-taupe">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
