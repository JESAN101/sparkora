import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

// Rotates a short set of trust messages inside a slim, gold-lined ribbon —
// echoes the "engraved plaque" hairline motif used elsewhere on the site.
const MESSAGES = [
  "Free insured shipping on every order",
  "Lifetime exchange on all Sparkora pieces",
  "Hallmark-certified purity, guaranteed",
];

const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [dismissed]);

  return (
    <AnimatePresence initial={false}>
      {!dismissed && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden bg-charcoal text-ivory"
        >
          <div className="divider-gold opacity-60" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-10 h-9 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-[11px] sm:text-xs uppercase tracking-[2px] text-ivory/85 text-center"
              >
                {MESSAGES[index]}
              </motion.p>
            </AnimatePresence>

            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss announcement"
              className="absolute right-6 lg:right-10 text-ivory/50 hover:text-gold transition-colors"
            >
              <FaTimes size={11} />
            </button>
          </div>
          <div className="divider-gold opacity-60" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;