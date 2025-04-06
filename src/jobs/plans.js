// Hardcoded Plans (Industry Standard Response Format)
import { ApiResponse } from "../utils/apiResponse.js";
 const plans = [
    {
        planName: "basic",
        description: "Basic Plan - Limited features",
        amount: 5000,
        durationInDays: 30,
        currency: "INR"
    },
    {
        planName: "premium",
        description: "Premium Plan - Most popular",
        amount: 8000,
        durationInDays: 30,
        currency: "INR"
    },
    {
        planName: "advance",
        description: "Advance Plan - All features unlocked",
        amount: 10000,
        durationInDays: 30,
        currency: "INR"
    }
];

// Get All Plans API
export const getAllPlans = (req, res) => {
    res.status(200).json(new ApiResponse(200, plans, "All plans details"));
};

// Helper to get plan by id
export const getPlanById = (planId) => {
    return plans.find(plan => plan.planId === planId.toLowerCase());
};
