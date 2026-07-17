import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createProduct } from "../../services/productService";
import ProductForm from "../../components/seller/ProductForm";

const AddProduct = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await createProduct(formData);
      toast.success("Product added successfully");
      navigate("/seller/products");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not add product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl sm:text-4xl font-medium text-charcoal mb-8">
        Add Product
      </h1>

      <ProductForm onSubmit={handleSubmit} submitting={submitting} submitLabel="Add Product" />
    </div>
  );
};

export default AddProduct;
