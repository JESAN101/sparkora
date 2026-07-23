import { useEffect, useState } from "react";
import { getCategories } from "../../api/adminApi";

import AddCategoryModal from "../../components/admin/AddCategoryModal";
import EditCategoryModal from "../../components/admin/EditCategoryModal";
import DeleteCategoryModal from "../../components/admin/DeleteCategoryModal";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data = await getCategories();

      setCategories(data.categories);
    } catch (error) {
      console.error(error);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <p className="text-lg text-gray-500">
          Loading categories...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Category Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all jewelry categories
          </p>

        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          + Add Category
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500 text-sm">
            Total Categories
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {categories.length}
          </h2>

        </div>

        <div className="bg-green-50 rounded-xl shadow p-6">

          <p className="text-green-700 text-sm">
            Active Categories
          </p>

          <h2 className="text-3xl font-bold text-green-700 mt-2">
            {categories.filter((c) => c.isActive).length}
          </h2>

        </div>

        <div className="bg-red-50 rounded-xl shadow p-6">

          <p className="text-red-700 text-sm">
            Inactive Categories
          </p>

          <h2 className="text-3xl font-bold text-red-700 mt-2">
            {categories.filter((c) => !c.isActive).length}
          </h2>

        </div>

      </div>

      {/* Search */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">#</th>

              <th className="px-6 py-4 text-left">
                Image
              </th>

              <th className="px-6 py-4 text-left">
                Name
              </th>

              <th className="px-6 py-4 text-left">
  Featured
</th>

<th className="px-6 py-4 text-left">
  Order
</th>

              <th className="px-6 py-4 text-left">
                Slug
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Created
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredCategories.length === 0 ? (

              <tr>

                <td
                  colSpan={9}
                  className="text-center py-12 text-gray-500"
                >
                  No categories found.
                </td>

              </tr>

            ) : (

              filteredCategories.map((category, index) => (

                <tr
                  key={category._id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">

                    <img
                      src={
                        category.image ||
                        "https://placehold.co/60x60?text=No+Image"
                      }
                      alt={category.name}
                      className="w-14 h-14 rounded-lg object-cover border"
                    />

                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {category.name}
                  </td>

                  <td className="px-6 py-4">
  {category.featured ? (
    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">
      ⭐ Featured
    </span>
  ) : (
    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-sm">
      —
    </span>
  )}
</td>

<td className="px-6 py-4 font-semibold text-gray-700">
  {category.displayOrder}
</td>

                  <td className="px-6 py-4 text-gray-500">
                    {category.slug}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        category.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {category.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      category.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-center">

                    <button
                      onClick={() => openEditModal(category)}
                      className="text-blue-600 hover:text-blue-800 font-medium mr-4"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openDeleteModal(category)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Modals */}

      <AddCategoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchCategories}
      />

      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={selectedCategory}
        onSuccess={fetchCategories}
      />

      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        category={selectedCategory}
        onSuccess={fetchCategories}
      />

    </div>
  );
};

export default Categories;