import Category from "../model/categoryModel.js";

// CREATE Category
export const createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// GET All Categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found." });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};