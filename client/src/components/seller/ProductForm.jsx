import { useState } from "react";
import { useForm } from "react-hook-form";

const CATEGORIES = ["Rings", "Necklaces", "Earrings", "Bracelets"];

const inputClass =
  "w-full border border-line rounded-xl p-3.5 text-sm bg-ivory focus:outline-none focus:border-rose transition-colors";

const ProductForm = ({
  defaultValues,
  existingImages = [],
  onSubmit,
  submitting,
  submitLabel = "Save Product",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [previews, setPreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("discountPrice", data.discountPrice || data.price);
    formData.append("category", data.category);
    formData.append("brand", data.brand || "");
    formData.append("stock", data.stock);
    formData.append("featured", data.featured || false);
    formData.append("newArrival", data.newArrival || false);
    formData.append("bestseller", data.bestseller || false);

    const files = data.images && data.images.length ? Array.from(data.images) : [];
    files.forEach((file) => formData.append("images", file));

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="space-y-6">
      <div className="card-luxury p-7 sm:p-8">
        <h2 className="font-display text-2xl font-medium text-charcoal mb-6">
          Product Details
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Product Name"
              {...register("name", { required: "Product name is required" })}
              className={inputClass}
            />
            {errors.name && <p className="text-xs text-burgundy mt-1.5">{errors.name.message}</p>}
          </div>

          <div className="md:col-span-2">
            <textarea
              rows="4"
              placeholder="Description"
              {...register("description", { required: "Description is required" })}
              className={inputClass}
            />
            {errors.description && (
              <p className="text-xs text-burgundy mt-1.5">{errors.description.message}</p>
            )}
          </div>

          <div>
            <select
              {...register("category", { required: "Category is required" })}
              className={inputClass}
              defaultValue=""
            >
              <option value="" disabled>
                Select Category
              </option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs text-burgundy mt-1.5">{errors.category.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Brand"
              {...register("brand")}
              className={inputClass}
            />
          </div>

          <div>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Price (Rs.)"
              {...register("price", { required: "Price is required", min: 0 })}
              className={inputClass}
            />
            {errors.price && <p className="text-xs text-burgundy mt-1.5">{errors.price.message}</p>}
          </div>

          <div>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Discount Price (optional)"
              {...register("discountPrice", { min: 0 })}
              className={inputClass}
            />
          </div>

          <div>
            <input
              type="number"
              min="0"
              placeholder="Stock Quantity"
              {...register("stock", { required: "Stock quantity is required", min: 0 })}
              className={inputClass}
            />
            {errors.stock && <p className="text-xs text-burgundy mt-1.5">{errors.stock.message}</p>}
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mt-6">
          <label className="flex items-center gap-2 text-sm text-charcoal cursor-pointer">
            <input type="checkbox" {...register("featured")} className="accent-[#B3735A]" />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm text-charcoal cursor-pointer">
            <input type="checkbox" {...register("newArrival")} className="accent-[#B3735A]" />
            New Arrival
          </label>
          <label className="flex items-center gap-2 text-sm text-charcoal cursor-pointer">
            <input type="checkbox" {...register("bestseller")} className="accent-[#B3735A]" />
            Bestseller
          </label>
        </div>
      </div>

      <div className="card-luxury p-7 sm:p-8">
        <h2 className="font-display text-2xl font-medium text-charcoal mb-2">Images</h2>
        <p className="text-taupe text-sm mb-5">
          Upload up to 5 images. Uploading new images replaces the existing ones.
        </p>

        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          multiple
          {...register("images")}
          onChange={handleImageChange}
          className="text-sm text-charcoal"
        />

        {(previews.length > 0 || existingImages.length > 0) && (
          <div className="flex flex-wrap gap-3 mt-5">
            {(previews.length > 0 ? previews : existingImages).map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Product preview"
                className="w-20 h-20 rounded-lg object-cover border border-line"
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-luxury px-9 py-4 rounded-full text-sm uppercase tracking-widest"
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};

export default ProductForm;
