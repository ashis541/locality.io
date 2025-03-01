import { weeklyOrder } from "../models/weeklyOrder.model.js";
import moment from "moment";
import { Sales } from "../models/sales.model.js";

async function updateWeeklyOrders() {
    try {
        const currentYear = moment().year();
        const currentWeek = moment().isoWeek();

        console.log(`Updating weekly orders for Year: ${currentYear}, Week: ${currentWeek}`);

        const aggregatedData = await Sales.aggregate([
            {
                $group: {
                    _id: {
                        year: { $isoWeekYear: "$orderDate" },
                        week: { $isoWeek: "$orderDate" },
                        branchId: "$branchId"
                    },
                    totalOrders: { $sum: 1 },
                },
            }
        ]);

        for (const data of aggregatedData) {
            await weeklyOrder.findOneAndUpdate(
                { year: data._id.year, week: data._id.week, branchId: data._id.branchId },
                { totalOrders: data.totalOrders },
                { upsert: true, new: true }
            );
        }

        console.log("✅ Weekly orders updated successfully!");
    } catch (error) {
        console.error("❌ Error updating weekly orders:", error);
    }
}

module.exports = updateWeeklyOrders;