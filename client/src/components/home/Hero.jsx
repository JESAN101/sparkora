import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../../assets/images/jewel1.jpg";

const MotionLink = motion(Link);

// Flowing wavy line paths (viewBox 0 0 900 620) — mirrors organic contour-line reference
const WAVE_PATHS = [
  {
    d: "M0,25 C120,120 220,40 330,55 C430,70 520,40 650,30 C760,40 820,90 850,60",
    width: 1,
    opacity: 0.32,
    soft: true,
  },
  {
    d: "M0,520 C180,540 330,495 470,525 C710,645 720,480 850,535",
    width: 1,
    opacity: 0.32,
    soft: true,
  },
];

// Tiny floating luxury decorations (sparkles / diamond particles)
const SPARKLES = [
  { top: "12%", left: "8%", size: 5, delay: 0 },
  { top: "22%", left: "88%", size: 4, delay: 0.6 },
  { top: "68%", left: "5%", size: 3, delay: 1.2 },
  { top: "80%", left: "92%", size: 5, delay: 0.3 },
  { top: "48%", left: "95%", size: 3, delay: 1.6 },
];

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blush via-ivory to-cream dark:from-[#090909] dark:via-[#0d0d0d] dark:to-[#111111] overflow-hidden transition-colors duration-700">
      {/* ================= AMBIENT LUXURY BACKGROUND ================= */}
      <div className="hero-bg-mask pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 900 620"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="heroBeamGradient" x1="0" y1="0" x2="0" y2="1">

    <stop offset="0%" stopColor="rgba(255,255,255,0)" />

    <stop offset="35%" stopColor="rgba(255,248,220,.15)" />

    <stop offset="48%" stopColor="rgba(255,255,255,.95)" />

    <stop offset="50%" stopColor="rgba(255,245,190,1)" />

    <stop offset="52%" stopColor="rgba(255,255,255,.95)" />

    <stop offset="65%" stopColor="rgba(255,248,220,.15)" />

    <stop offset="100%" stopColor="rgba(255,255,255,0)" />

</linearGradient>
            <filter id="heroWaveSoftBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.8" />
            </filter>
            <mask id="heroWaveMask" maskUnits="userSpaceOnUse" x="0" y="0" width="900" height="620">
              <rect width="900" height="620" fill="black" />
              {WAVE_PATHS.map((p, i) => (
                <path
                  key={i}
                  d={p.d}
                  stroke="white"
                  strokeWidth={p.width + 3}
                  fill="none"
                  strokeLinecap="round"
                />
              ))}
            </mask>
          </defs>

          {/* Base static wavy lines — always visible */}
          {WAVE_PATHS.map((p, i) => (
            <path
              key={i}
              className="hero-wave-line"
              d={p.d}
              stroke="rgba(212,175,55,.45)"
              filter="url(#heroWaveSoftBlur)"
              strokeWidth={p.width}
              strokeLinecap="round"
              fill="none"
              filter={p.soft ? "url(#heroWaveSoftBlur)" : undefined}
              style={{ "--line-opacity": p.opacity }}
            />
          ))}

          {/* Flowing light sweeping top to bottom, masked to the wave shapes */}
          <g mask="url(#heroWaveMask)">
            <rect
              className="hero-wave-beam"
              x="0"
              y="-620"
              width="900"
              height="620"
              fill="url(#heroBeamGradient)"
            />
            <rect
              className="hero-wave-beam hero-wave-beam--delay"
              x="0"
              y="-620"
              width="900"
              height="620"
              fill="url(#heroBeamGradient)"
            />
          </g>
        </svg>

        {/* Soft radial glow center-right, behind the jewelry image */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.28)_0%,_rgba(212,175,55,0)_70%)] dark:bg-[radial-gradient(circle,_rgba(212,175,55,0.22)_0%,_rgba(212,175,55,0)_70%)] blur-2xl" />
        <div className="absolute top-1/2 right-[14%] -translate-y-1/2 w-[18rem] h-[18rem] rounded-full bg-[radial-gradient(circle,_rgba(255,241,199,0.22)_0%,_rgba(255,241,199,0)_70%)] dark:bg-[radial-gradient(circle,_rgba(255,241,199,0.14)_0%,_rgba(255,241,199,0)_70%)] blur-xl" />

        {/* Floating sparkles / diamond particles */}
        {SPARKLES.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gold/70 dark:bg-gold/60"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.delay,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "1px" }}
              animate={{ opacity: 1, letterSpacing: "3px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="text-rose-dark dark:text-gold font-semibold tracking-[3px] uppercase mb-4 text-sm"
            >
              Fine Jewelry Collection
            </motion.p>

            <h1 className="font-display text-5xl lg:text-7xl font-medium leading-[1.05] text-charcoal dark:text-ivory transition-colors duration-700">
              Discover Timeless
              <span className="hero-shimmer-text block italic">Elegance</span>
            </h1>

            <p className="mt-6 text-taupe dark:text-taupe/80 text-lg leading-8 max-w-lg">
              Handcrafted rings, necklaces, bracelets and earrings. <br></br>
              Designed to make every moment unforgettable.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <MotionLink
                to="/shop"
                whileHover={{ scale: 1.045, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="btn-luxury relative overflow-hidden group px-9 py-4 rounded-full font-medium text-sm uppercase tracking-widest border border-gold/40 shadow-[0_8px_30px_rgba(212,175,55,0.18)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.35)] transition-shadow duration-500"
              >
                <span className="relative z-10">Shop Now</span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </MotionLink>

              <MotionLink
                to="/shop"
                whileHover={{ scale: 1.045, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="btn-luxury-outline relative overflow-hidden group px-9 py-4 rounded-full font-medium text-sm uppercase tracking-widest border border-gold/50 hover:border-gold dark:border-gold/40 dark:hover:border-gold transition-colors duration-500"
              >
                <span className="relative z-10">Explore Collection</span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
              </MotionLink>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Rotating thin circular gold border */}
              <motion.div
                className="absolute -inset-8 rounded-full border border-gold/30 dark:border-gold/25"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full border border-dashed border-gold/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
              />

              {/* Glass circle backdrop */}
              <div className="absolute -inset-6 rounded-full bg-white/30 dark:bg-white/[0.03] backdrop-blur-xl border border-gold/20 shadow-[0_0_60px_rgba(212,175,55,0.15)]" />

              <div className="absolute -inset-6 rounded-full border border-gold/30" />

              {/* Floating image */}
              <motion.img
                src={heroImage}
                alt="Luxury Jewelry"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full max-w-md lg:max-w-lg object-contain relative drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_25px_45px_rgba(212,175,55,0.12)]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= LUXURY DIVIDER ================= */}
      <div className="relative flex items-center justify-center gap-4 pb-14">
        <span className="h-px w-24 sm:w-40 bg-gradient-to-r from-transparent via-gold/60 to-gold" />
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          className="text-gold drop-shadow-[0_0_6px_rgba(212,175,55,0.5)]"
          fill="currentColor"
        >
          <path d="M7 0L9.5 4.5L14 7L9.5 9.5L7 14L4.5 9.5L0 7L4.5 4.5L7 0Z" />
        </svg>
        <span className="h-px w-24 sm:w-40 bg-gradient-to-l from-transparent via-gold/60 to-gold" />
      </div>

      <style>{`
        .hero-bg-mask {
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 12%,
            black 88%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 12%,
            black 88%,
            transparent 100%
          );
        }
        .hero-wave-line {
          opacity: var(--line-opacity, 0.35);
          transition: opacity 0.6s ease;
        }
        .dark .hero-wave-line {
          opacity: calc(var(--line-opacity, 0.35) * 1.6);
          stroke: rgba(212, 175, 55, 0.95);
        }
        .hero-wave-beam {
          animation:hero-wave-flow 12s cubic-bezier(.22,.61,.36,1) infinite;

    filter:
        blur(10px)
        drop-shadow(0 0 12px rgba(255,240,180,.8))
        drop-shadow(0 0 30px rgba(212,175,55,.55));

    mix-blend-mode:screen;

}
        .hero-wave-beam--delay {
          animation-delay: -4s;
        }
        .dark .hero-wave-beam {
          filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.6));
        }
        @keyframes hero-wave-flow{

    0%{

        transform:translateY(-620px);

        opacity:0;

    }

    12%{

        opacity:.15;

    }

    22%{

        opacity:.9;

    }

    50%{

        opacity:1;

        transform:translateY(620px);

    }

    78%{

        opacity:.9;

    }

    90%{

        opacity:.15;

    }

    100%{

        transform:translateY(1240px);

        opacity:0;

    }

}
        .hero-shimmer-text {
          background: linear-gradient(
            100deg,
            #b8860b 0%,
            #f2d98a 25%,
            #d4af37 50%,
            #f2d98a 75%,
            #b8860b 100%
          );
          background-size: 250% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: hero-shimmer 5s linear infinite;
        }
        @keyframes hero-shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 250% center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-wave-beam,
          .hero-shimmer-text {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;