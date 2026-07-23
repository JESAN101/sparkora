import Category from "../models/Category.js";

// ======================================
// Create Category
// ======================================
export const createCategory = async (req, res) => {
  try {
    const {
  name,
  description,
  featured,
  displayOrder,
} = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const slug = name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

    // Cloudinary image
    const image = req.file ? req.file.path : "";

    const category = await Category.create({
  name: name.trim(),
  slug,
  image,
  description,

  featured:
    featured === "true" || featured === true,

  displayOrder:
    Number(displayOrder) || 0,
});

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// Get All Categories
// ======================================
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// Get Single Category
// ======================================
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// Update Category
// ======================================
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const {
  name,
  description,
  isActive,
  featured,
  displayOrder,
} = req.body;

    // Update name & slug
    if (name !== undefined) {
      category.name = name.trim();

      category.slug = name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
    }

    // Update description
    if (description !== undefined) {
      category.description = description;
    }

    // Update active status
    if (isActive !== undefined) {
      category.isActive =
        isActive === "true" || isActive === true;
    }

    if (featured !== undefined) {
  category.featured =
    featured === "true" || featured === true;
}

if (displayOrder !== undefined) {
  category.displayOrder =
    Number(displayOrder);
}

    // Upload new image if selected
    if (req.file) {
      category.image = req.file.path;
    }

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// Delete Category
// ======================================
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};