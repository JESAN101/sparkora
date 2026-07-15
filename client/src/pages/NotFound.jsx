import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-[75vh] flex items-center justify-center px-6 text-center">
      <div>
        <p className="font-display text-8xl font-medium text-rose-light mb-2">404</p>
        <h1 className="font-display text-3xl font-medium text-charcoal mb-3">
          This page has slipped away
        </h1>
        <p className="text-taupe mb-9 max-w-sm mx-auto">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link
          to="/"
          className="btn-luxury inline-block px-9 py-4 rounded-full text-sm uppercase tracking-widest"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
