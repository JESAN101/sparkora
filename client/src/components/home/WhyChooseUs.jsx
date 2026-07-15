import { FaGem, FaShieldAlt, FaHandsHelping, FaSyncAlt } from "react-icons/fa";

const points = [
  {
    icon: FaGem,
    title: "Certified Purity",
    desc: "Every piece is hallmark-verified, so you always know exactly what you're wearing.",
  },
  {
    icon: FaHandsHelping,
    title: "Handcrafted Excellence",
    desc: "Shaped by skilled artisans, each design is finished by hand, not mass-produced.",
  },
  {
    icon: FaShieldAlt,
    title: "Insured Shipping",
    desc: "Every order is fully insured from our workshop to your door.",
  },
  {
    icon: FaSyncAlt,
    title: "Lifetime Exchange",
    desc: "Trade up or exchange your Sparkora pieces at any time, for life.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 sm:py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="text-rose-dark font-semibold uppercase tracking-[3px] text-sm">
            Why Sparkora
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium mt-3 text-charcoal">
            Crafted to Be Trusted
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {points.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-blush flex items-center justify-center mb-5">
                <Icon className="text-rose-dark" size={22} />
              </div>
              <h3 className="font-display text-xl font-medium text-charcoal mb-2">
                {title}
              </h3>
              <p className="text-sm text-taupe leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
