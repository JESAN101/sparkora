import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaWarehouse, FaExclamationTriangle } from "react-icons/fa";

import { getMyProducts, updateStock } from "../../services/productService";

const LOW_STOCK_THRESHOLD = 5;

const stockBadgeClass = (stock) => {
  if (stock === 0) return "bg-[#f3e0e5] text-burgundy";
  if (stock <= LOW_STOCK_THRESHOLD) return "bg-[#eee7d5] text-gold";
  return "bg-[#e4ede4] text-[#3f6b4d]";
};

const stockLabel = (stock) => {
  if (stock === 0) return "Out of Stock";
  if (stock <= LOW_STOCK_THRESHOLD) return "Low Stock";
  return "In Stock";
};

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draftStock, setDraftStock] = useState({});
  const [savingId, setSavingId] = useState(null);

  const loadProducts = async () => {
    try {
      const data = await getMyProducts();
      // Surface the products that need attention first
      const sorted = [...data.products].sort((a, b) => a.stock - b.stock);
      setProducts(sorted);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD).length;

  const handleSaveStock = async (id) => {
    const newStock = draftStock[id];
    if (newStock === undefined || newStock === "") return;

    setSavingId(id);
    try {
      const data = await updateStock(id, Number(newStock));
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, stock: data.product.stock } : p))
      );
      setDraftStock((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      toast.success("Stock updated");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not update stock");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl sm:text-4xl font-medium text-charcoal mb-6">
        Inventory
      </h1>

      {(outOfStockCount > 0 || lowStockCount > 0) && (
        <div className="flex flex-wrap gap-4 mb-8">
          {outOfStockCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#f3e0e5] text-burgundy text-sm font-medium">
              <FaExclamationTriangle size={14} />
              {outOfStockCount} product{outOfStockCount > 1 ? "s" : ""} out of stock
            </div>
          )}
          {lowStockCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#eee7d5] text-gold text-sm font-medium">
              <FaExclamationTriangle size={14} />
              {lowStockCount} product{lowStockCount > 1 ? "s" : ""} running low
            </div>
          )}
        </div>
      )}

      {loading ? (
        <p className="text-taupe text-sm">Loading inventory...</p>
      ) : products.length === 0 ? (
        <div className="card-luxury p-8 text-center">
          <FaWarehouse className="text-taupe/40 mx-auto mb-4" size={36} />
          <h3 className="font-display text-xl font-medium text-charcoal">
            No products to manage yet
          </h3>
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
                className="w-14 h-14 rounded-lg object-cover shrink-0"
              />

              <div className="flex-1 min-w-[160px]">
                <p className="text-sm font-medium text-charcoal">{product.name}</p>
                <p className="text-xs text-taupe">{product.category}</p>
              </div>

              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${stockBadgeClass(
                  product.stock
                )}`}
              >
                {stockLabel(product.stock)}
              </span>

              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="number"
                  min="0"
                  value={draftStock[product._id] ?? product.stock}
                  onChange={(e) =>
                    setDraftStock((prev) => ({ ...prev, [product._id]: e.target.value }))
                  }
                  className="w-20 border border-line rounded-lg text-sm px-3 py-2 bg-ivory focus:outline-none focus:border-rose transition-colors"
                />
                <button
                  onClick={() => handleSaveStock(product._id)}
                  disabled={
                    savingId === product._id ||
                    draftStock[product._id] === undefined ||
                    Number(draftStock[product._id]) === product.stock
                  }
                  className="btn-luxury-outline px-4 py-2 rounded-lg text-xs uppercase tracking-widest"
                >
                  {savingId === product._id ? "Saving..." : "Update"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;
