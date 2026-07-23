import API from "./axios";

// ==========================
// Dashboard
// ==========================
export const getDashboardStats = async () => {
  const { data } = await API.get("/admin/dashboard");
  return data;
};

// ==========================
// Users
// ==========================
export const getUsers = async () => {
  const { data } = await API.get("/admin/users");
  return data;
};

export const createUser = async (payload) => {
  const { data } = await API.post("/admin/users", payload);
  return data;
};

export const updateUserRole = async (id, role) => {
  const { data } = await API.put(`/admin/users/${id}/role`, { role });
  return data;
};

export const toggleUserBlock = async (id, isBlocked) => {
  const { data } = await API.put(`/admin/users/${id}/block`, { isBlocked });
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await API.delete(`/admin/users/${id}`);
  return data;
};

// ==========================
// Products
// ==========================
export const getAdminProducts = async () => {
  const { data } = await API.get("/admin/products");
  return data;
};

export const updateAdminProduct = async (id, formData) => {
  const { data } = await API.put(`/admin/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteAdminProduct = async (id) => {
  const { data } = await API.delete(`/admin/products/${id}`);
  return data;
};

// ==========================
// Orders
// ==========================
export const getAdminOrders = async () => {
  const { data } = await API.get("/admin/orders");
  return data;
};

export const getAdminOrder = async (id) => {
  const { data } = await API.get(`/admin/orders/${id}`);
  return data;
};

export const updateAdminOrderStatus = async (id, orderStatus) => {
  const { data } = await API.put(`/admin/orders/${id}/status`, { orderStatus });
  return data;
};

export const deleteAdminOrder = async (id) => {
  const { data } = await API.delete(`/admin/orders/${id}`);
  return data;
};

// ===========================
// Categories
// ===========================

// Get all categories
export const getCategories = async () => {
  const { data } = await API.get("/categories");
  return data;
};

// Create category
export const createCategory = async (formData) => {
  const { data } = await API.post(
    "/categories",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};


// Update category
export const updateCategory = async (id, formData) => {
  const { data } = await API.put(
    `/categories/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// Delete category
export const deleteCategory = async (id) => {
  const { data } = await API.delete(
    `/categories/${id}`
  );

  return data;
};

