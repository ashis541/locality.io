import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Branch } from "../models/branches.model.js";
import mongoose from "mongoose";

//create a new branch
const createNewBranch = asyncHandler(async (req, res) => {
  const { name, address, phoneNumber, email } = req.body;
  // Validate required fields
  if (!name || !email || !phoneNumber) {
    throw new ApiError(400, "All fields are required");
  }
  // Example: Save the new branch to the database
  try {
    const newBranch = await Branch.create({
      name,
      address,
      phoneNumber,
      email,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, newBranch, "User registered Successfully"));
  } catch (error) {
    throw new ApiError(500, "An error occurred while creating the branch");
  }
});
// Fetch all branches
const getAllBranch = asyncHandler(async (req, res) => {
    try {
      // Pagination options from query parameters (default to page 1 and limit 10)
      const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      };
  
      // Optional filter: Retrieve branches for a specific organization
      let filter = {};

      if (req.query.organization) {
        // Validate ObjectId format for organization
        if (mongoose.Types.ObjectId.isValid(req.query.organization)) {
          filter.organization = req.query.organization; // Set organization filter
        } else {
          // Handle invalid ObjectId gracefully, leaving filter empty
          console.warn('Invalid organization ObjectId provided');
        }
      }
  
      // Fetch branches with pagination and filtering
      console.log(filter);
      
      const branches = await Branch.aggregatePaginate(Branch.aggregate([]), options, options);
  
      // Send the response with the branches
      return res.status(200).json(new ApiResponse(200, branches, "All branches retrieved successfully"));
    } catch (error) {
      // Handle errors more explicitly
      console.error('Error fetching branches:', error);
      return res.status(500).json({
        success: false,
        message: 'Server Error: ' + error.message,  // Providing more detailed error message
      });
    }
  });

export { createNewBranch,getAllBranch };
