import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/product/ProductCard";

const Wishlist = () => {

    const { wishlist } = useWishlist();

    return (

        <div className="max-w-7xl mx-auto py-20 px-6">

            <h1 className="text-4xl font-bold mb-10">

                My Wishlist

            </h1>

            {wishlist.length === 0 ? (

                <p>Your wishlist is empty.</p>

            ) : (

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {wishlist.map(product => (

                        <ProductCard
                            key={product.id}
                            product={product}
                        />

                    ))}

                </div>

            )}

        </div>

    );

};

export default Wishlist;