import { monthlyOrder } from "../models/monthlyOrder.Model.js";
import moment from "moment";
import { Sales } from "../models/sales.model.js";

async function updateMonthlyOrders() {
    try {
        const currentYear = moment().year();
        const currentMonth = moment().month() + 1;

        console.log(`Updating monthly orders for ${currentYear}-${currentMonth}`);

        const aggregatedData = await Sales.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$orderDate" },
                        month: { $month: "$orderDate" },
                        branchId: "$branchId"
                    },
                    totalOrders: { $sum: 1 },
                },
            }
        ]);

        for (const data of aggregatedData) {
            await monthlyOrder.findOneAndUpdate(
                { year: data._id.year, month: data._id.month, branchId: data._id.branchId },
                { totalOrders: data.totalOrders },
                { upsert: true, new: true }
            );
        }

        console.log("✅ Monthly orders updated successfully!");
    } catch (error) {
        console.error("❌ Error updating monthly orders:", error);
    }
}

module.exports = updateMonthlyOrders;