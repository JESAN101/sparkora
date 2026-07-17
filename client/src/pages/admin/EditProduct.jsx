import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getProduct } from "../../services/productService";
import { updateAdminProduct } from "../../api/adminApi";
import ProductForm from "../../components/seller/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data.product);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Could not load product");
        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await updateAdminProduct(id, formData);
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not update product");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (!product) return null;

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      <ProductForm
        defaultValues={{
          name: product.name,
          description: product.description,
          price: product.price,
          discountPrice: product.discountPrice,
          category: product.category,
          brand: product.brand,
          stock: product.stock,
          featured: product.featured,
          newArrival: product.newArrival,
          bestseller: product.bestseller,
        }}
        existingImages={product.images || []}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitLabel="Save Changes"
      />
    </div>
  );
};

export default EditProduct;