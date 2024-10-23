import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { location } from "../models/location.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const nearBylocation = asyncHandler(async (req, res) => {
  const { userId } = req.user; // Assuming userId is available in req.user after login
  const { latitude, longitude, radius } = req.body; // Assuming latitude, longitude, and radius are provided in the request body

  if (!latitude || !longitude || !radius) {
    throw new ApiError(400, "Latitude, longitude, and radius are required");
  }

  const nearbyUsers = await location.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: [longitude, latitude] },
        distanceField: "dist.calculated",
        maxDistance: radius,
        spherical: true
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails"
      }
    },
    {
      $unwind: "$userDetails"
    },
    {
      $project: {
        _id: 0,
        userId: 1,
        latitude: 1,
        longitude: 1,
        timestamp: 1,
        "userDetails.fullName": 1,
        "userDetails.email": 1,
        "userDetails.username": 1
      }
    }
  ]);

  return res.status(200).json(new ApiResponse(200, nearbyUsers, "Nearby users fetched successfully"));
});