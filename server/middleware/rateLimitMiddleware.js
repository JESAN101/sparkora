import rateLimit from "express-rate-limit";

// Tight limit for login/register — the main brute-force / credential
// stuffing / spam-account target. Keyed by IP.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many attempts. Please try again in 15 minutes.",
  },
});

// Looser limit for the rest of the API, mainly to blunt scraping/DoS-style
// abuse without getting in the way of normal browsing.
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please slow down and try again shortly.",
  },
});