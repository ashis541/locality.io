import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
// Sales Schema
const saleSchema = new mongoose.Schema({
  totalSale: {
    type: Number,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});
// Add the plugin to the schema
saleSchema.plugin(mongooseAggregatePaginate);
export const Sales = mongoose.model('Sales', saleSchema);