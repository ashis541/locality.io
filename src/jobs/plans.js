// Hardcoded Plans (Industry Standard Response Format)
import { ApiResponse } from "../utils/apiResponse";
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
exports.getAllPlans = (req, res) => {
    res.status(200).json(new ApiResponse(200, plans, "All plans details"));
};

// Helper to get plan by id
exports.getPlanById = (planId) => {
    return plans.find(plan => plan.planId === planId.toLowerCase());
};
