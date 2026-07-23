import { useState } from "react";
import toast from "react-hot-toast";

import { deleteCategory } from "../../api/adminApi";

const DeleteCategoryModal = ({
  isOpen,
  onClose,
  category,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !category) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteCategory(category._id);

      toast.success("Category deleted successfully");

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to delete category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">

        <div className="p-6">

          <h2 className="text-2xl font-bold text-red-600">
            Delete Category
          </h2>

          <p className="text-gray-600 mt-4">
            Are you sure you want to delete
          </p>

          <p className="font-bold text-lg mt-2">
            {category.name} ?
          </p>

          <p className="text-sm text-gray-500 mt-4">
            This action cannot be undone.
          </p>

        </div>

        <div className="border-t p-5 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteCategoryModal;