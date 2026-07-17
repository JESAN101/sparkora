import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaBoxOpen, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

import { getMyProducts, deleteProduct } from "../../services/productService";

const LOW_STOCK_THRESHOLD = 5;

const StockBadge = ({ stock }) => {
  if (stock === 0) {
    return (
      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#f3e0e5] text-burgundy">
        Out of Stock
      </span>
    );
  }
  if (stock <= LOW_STOCK_THRESHOLD) {
    return (
      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#eee7d5] text-gold">
        Low Stock ({stock})
      </span>
    );
  }
  return (
    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#e4ede4] text-[#3f6b4d]">
      In Stock ({stock})
    </span>
  );
};

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadProducts = async () => {
    try {
      const data = await getMyProducts();
      setProducts(data.products);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not load your products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;

    setDeletingId(id);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not delete product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-medium text-charcoal">
          My Products
        </h1>
        <Link
          to="/seller/products/new"
          className="btn-luxury inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm uppercase tracking-widest"
        >
          <FaPlus size={12} /> Add Product
        </Link>
      </div>

      {loading ? (
        <p className="text-taupe text-sm">Loading your products...</p>
      ) : products.length === 0 ? (
        <div className="card-luxury p-8 text-center">
          <FaBoxOpen className="text-taupe/40 mx-auto mb-4" size={36} />
          <h3 className="font-display text-xl font-medium text-charcoal mb-2">
            No products yet
          </h3>
          <p className="text-taupe text-sm mb-7">
            List your first piece to start selling on Sparkora.
          </p>
          <Link
            to="/seller/products/new"
            className="btn-luxury inline-block px-8 py-3.5 rounded-full text-sm uppercase tracking-widest"
          >
            Add Product
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="card-luxury p-5 sm:p-6 flex flex-wrap items-center gap-4"
            >
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover shrink-0"
              />

              <div className="flex-1 min-w-[180px]">
                <p className="text-sm font-medium text-charcoal">{product.name}</p>
                <p className="text-xs text-taupe">{product.category}</p>
              </div>

              <span className="text-sm font-medium text-charcoal w-24 shrink-0">
                Rs. {(product.discountPrice ?? product.price).toLocaleString()}
              </span>

              <StockBadge stock={product.stock} />

              <div className="flex items-center gap-2 ml-auto">
                <Link
                  to={`/seller/products/${product._id}/edit`}
                  className="p-2.5 rounded-lg border border-line text-charcoal/70 hover:text-rose-dark hover:border-rose transition-colors"
                  aria-label="Edit product"
                >
                  <FaEdit size={14} />
                </Link>
                <button
                  onClick={() => handleDelete(product._id, product.name)}
                  disabled={deletingId === product._id}
                  className="p-2.5 rounded-lg border border-line text-charcoal/70 hover:text-burgundy hover:border-burgundy transition-colors"
                  aria-label="Delete product"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
