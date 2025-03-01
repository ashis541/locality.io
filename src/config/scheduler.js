import {cron} from 'node-cron'
import {updateMonthlyOrders} from '../jobs/monthlyOrder.js'
import { updateWeeklyOrders } from '../jobs/weeklyOrder.js'

function scheduler() {
    console.log("✅ Cron jobs scheduled!");

    // Run daily at midnight (00:00)
    cron.schedule("0 0 * * *", async () => {
        console.log("⏳ Running daily aggregation jobs...");
        await updateWeeklyOrders();
        await updateMonthlyOrders();
        console.log("✅ Daily aggregation jobs completed!");
    });
}

module.exports = scheduler;