import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateCategory } from "../../api/adminApi";

const EditCategoryModal = ({
  isOpen,
  onClose,
  category,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
  name: "",
  description: "",
  image: null,
  isActive: true,
  featured: false,
  displayOrder: 0,
});

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
     setFormData({
  name: category.name || "",
  description: category.description || "",
  image: null,
  isActive: category.isActive,
  featured: category.featured || false,
  displayOrder: category.displayOrder || 0,
});

      setPreview(category.image || "");
    }
  }, [category]);

  if (!isOpen || !category) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setLoading(true);

      const submitData = new FormData();

      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("isActive", formData.isActive);
      submitData.append("featured", formData.featured);
submitData.append("displayOrder", formData.displayOrder);

      if (formData.image) {
        submitData.append("image", formData.image);
      }

      await updateCategory(category._id, submitData);

      toast.success("Category updated successfully");

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">

        {/* Header */}

        <div className="border-b px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Category
          </h2>

          <p className="text-gray-500 mt-1">
            Update category information
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* Name */}

          <div>
            <label className="block mb-2 font-medium">
              Category Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Category name"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Description */}

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Category description"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Image */}

          <div>
            <label className="block mb-2 font-medium">
              Category Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Preview */}

          {preview && (
            <div>
              <p className="mb-2 text-sm text-gray-500">
                Image Preview
              </p>

              <img
                src={preview}
                alt="Category"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-5">

  <div className="flex items-center gap-3">

    <input
      id="featured"
      type="checkbox"
      name="featured"
      checked={formData.featured}
      onChange={handleChange}
      className="w-5 h-5"
    />

    <label htmlFor="featured">
      Featured Category
    </label>

  </div>

  <div>

    <label className="block mb-2 font-medium">
      Display Order
    </label>

    <input
      type="number"
      min="0"
      name="displayOrder"
      value={formData.displayOrder}
      onChange={handleChange}
      className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
    />

  </div>

</div>

          {/* Active */}

          <div className="flex items-center gap-3">
            <input
              id="isActive"
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-5 h-5"
            />

            <label htmlFor="isActive">
              Active Category
            </label>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditCategoryModal;