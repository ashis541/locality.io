import { Categories } from "../models/Categories.js";
import { Products } from "../models/Products.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Categories.create({ name });
    return res.status(200).json(new ApiResponse(200, category, "categories created successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "server error");
  }
};

// Get all categories with products
export const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find().populate("products");
    return res.status(200).json(new ApiResponse(200, categories, "all categories"));
  } catch (error) {
    throw new ApiError(500, error?.message || "server error");
  }
};

// Get single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id).populate("products");
    if (!category) return  ApiError(404, "categories not found");
    return res.status(200).json(new ApiResponse(200, category, "categories created successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "server error");
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const category = await Categories.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(new ApiResponse(200, category, "categories update successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "server error");
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    await Categories.findByIdAndDelete(req.params.id);
    return res.status(200).json(new ApiResponse(200, '', "deleted successfully"));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
