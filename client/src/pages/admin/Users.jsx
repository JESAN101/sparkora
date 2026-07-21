import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";
import {
  getUsers,
  updateUserRole,
  toggleUserBlock,
  deleteUser,
} from "../../api/adminApi";
import AddUserModal from "../../components/admin/AddUserModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.users);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  const handleUserCreated = (newUser) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  const handleRole = async (id, role) => {
    try {
      const newRole = role === "admin" ? "user" : "admin";
      await updateUserRole(id, newRole);
      toast.success("Role Updated");
      loadUsers();
    } catch {
      toast.error("Failed");
    }
  };

  const handleBlock = async (id, blocked) => {
    try {
      await toggleUserBlock(id, !blocked);
      toast.success("Status Updated");
      loadUsers();
    } catch {
      toast.error("Failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      toast.success("User Deleted");
      loadUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FaUserPlus size={14} /> Add User
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-3">
                  {user.firstName} {user.lastName}
                </td>

                <td>{user.email}</td>

                <td>{user.phone}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      user.role === "admin"
                        ? "bg-purple-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                  {user.isBlocked ? (
                    <span className="text-red-600 font-semibold">
                      Blocked
                    </span>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      Active
                    </span>
                  )}
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleRole(user._id, user.role)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Change Role
                  </button>

                  <button
                    onClick={() => handleBlock(user._id, user.isBlocked)}
                    className={`px-3 py-1 text-white rounded ${
                      user.isBlocked
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No users found.
          </p>
        )}
      </div>

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onCreated={handleUserCreated}
        />
      )}
    </div>
  );
};

export default Users;