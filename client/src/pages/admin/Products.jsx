import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getAdminProducts, deleteAdminProduct } from "../../api/adminApi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAdminProducts();
      setProducts(data.products);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await deleteAdminProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="text-left">Seller</th>
              <th className="text-left">Category</th>
              <th className="text-left">Price</th>
              <th className="text-left">Stock</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-10 h-10 rounded object-cover shrink-0"
                    />
                    <span>{product.name}</span>
                  </div>
                </td>
                <td>{product.seller?.fullName || "—"}</td>
                <td>{product.category}</td>
                <td>Rs. {(product.discountPrice ?? product.price).toLocaleString()}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      product.stock === 0
                        ? "bg-red-600"
                        : product.stock <= 5
                        ? "bg-yellow-500"
                        : "bg-green-600"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="space-x-2 py-2">
                  <Link
                    to={`/admin/products/${product._id}/edit`}
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 inline-block"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id, product.name)}
                    disabled={deletingId === product._id}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center text-gray-500 py-8">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;