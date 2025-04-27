import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Branch } from "../models/branches.model.js";
import { Organization } from "../models/organization.model.js";
import mongoose from "mongoose";

//create a new branch
const createNewBranch = asyncHandler(async (req, res) => {
  const { name, address, phoneNumber, password,email,organisation} = req.body;
  // Validate required fields
  if (!name || !email || !phoneNumber) {
    throw new ApiError(400, "All fields are required");
  }
  // Example: Save the new branch to the database
  try {
    const newBranch = await Branch.create({
      name,
      address,
      password,
      phoneNumber,
      email,
      organisation,
    });

    // Update Organization to add this Branch ID
    const updatedOrganization = await Organization.findByIdAndUpdate(
      organisation, // organization id
      { $push: { branches: newBranch._id } }, // push new branch ID into branches array
      { new: true } // return the updated document
    );

    if (!updatedOrganization) {
      throw new ApiError(404, "Organization not found");
    }

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
      const organizationId = req.params.organizationId; // Get organization ID from request parameters
      if (!organizationId) {
        return res.status(400).json({ message: "organizationId is required" });
      }
      const allBranch = await Branch.find({ organisation: organizationId }).select('name email address');; // Fetch branches for the specified organization
  
      // Send the response with the branches
      return res.status(200).json(new ApiResponse(200, allBranch, "All branches retrieved successfully"));
    } catch (error) {
      throw new ApiError(500, error?.message || "server error");
    }
  });

export { createNewBranch,getAllBranch };
