import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/product/ProductCard";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <section className="py-14 sm:py-20 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-charcoal mb-10">
          My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="font-display text-2xl text-charcoal mb-3">
              Your wishlist is empty
            </h3>
            <p className="text-taupe mb-8">
              Save the pieces you love and come back to them anytime.
            </p>
            <Link
              to="/shop"
              className="btn-luxury inline-block px-9 py-4 rounded-full text-sm uppercase tracking-widest"
            >
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
