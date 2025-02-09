import { Products } from "../models/Products.js";
import { Categories } from "../models/Categories.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, discount, categories, available } = req.body;
    const product = await Products.create({ name, price, discount, categories, available });

    if (categories) {
      await Categories.findByIdAndUpdate(categories, { $push: { products: product._id } });
    }

    return res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Server error");
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Products.find().populate("categories");
    return res.status(200).json(new ApiResponse(200, products, "All products"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Server error");
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id).populate("categories");
    if (!product) throw new ApiError(404, "Product not found");
    return res.status(200).json(new ApiResponse(200, product, "Product retrieved successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Server error");
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(new ApiResponse(200, product, "Product updated successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Server error");
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    return res.status(200).json(new ApiResponse(200, null, "Product deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Server error");
  }
};

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Categories.create({ name });
    return res.status(201).json(new ApiResponse(201, category, "Category created successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Server error");
  }
};

// Get all categories with products
export const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find().populate("products");
    return res.status(200).json(new ApiResponse(200, categories, "All categories"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Server error");
  }
};

// Get single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id).populate("products");
    if (!category) throw new ApiError(404, "Category not found");
    return res.status(200).json(new ApiResponse(200, category, "Category retrieved successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Server error");
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const category = await Categories.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(new ApiResponse(200, category, "Category updated successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Server error");
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    await Categories.findByIdAndDelete(req.params.id);
    return res.status(200).json(new ApiResponse(200, null, "Category deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Server error");
  }
};
