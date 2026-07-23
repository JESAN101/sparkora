import { useState } from "react";
import { createCategory } from "../../api/adminApi";

const AddCategoryModal = ({ open, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [featured, setFeatured] = useState(false);
const [displayOrder, setDisplayOrder] = useState(0);

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("isActive", isActive);
      formData.append("featured", featured);
formData.append("displayOrder", displayOrder);

      if (image) {
        formData.append("image", image);
      }

      await createCategory(formData);

      onSuccess();

      setName("");
      setDescription("");
      setImage(null);
      setIsActive(true);
      setFeatured(false);
setDisplayOrder(0);

      onClose();

    } catch (err) {
      console.error(err);
      alert("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Add New Category
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium">
              Category Name
            </label>

            <input
              required
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="4"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Image
            </label>

            <input
              type="file"
              onChange={(e)=>setImage(e.target.files[0])}
            />

          </div>

          <div className="grid grid-cols-2 gap-5">

  <div className="flex items-center gap-3">
    <input
      type="checkbox"
      checked={featured}
      onChange={(e) => setFeatured(e.target.checked)}
      className="w-5 h-5"
    />

    <span className="font-medium">
      Featured Category
    </span>
  </div>

  <div>
    <label className="block mb-2 font-medium">
      Display Order
    </label>

    <input
      type="number"
      min="0"
      value={displayOrder}
      onChange={(e) => setDisplayOrder(e.target.value)}
      className="w-full border rounded-lg px-4 py-3"
    />
  </div>

</div>

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={isActive}
              onChange={(e)=>setIsActive(e.target.checked)}
            />

            <span>Active Category</span>

          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              {loading ? "Creating..." : "Create"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddCategoryModal;