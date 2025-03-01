import mongoose from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
// Sales Schema
const saleSchema = new mongoose.Schema({
  branchId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref:'Branches'
  },
  salesDate: {
    type: Date,
    default: Date.now,
  },
  amount:{
    type:Number,
    required:true,

  },
});
// Add the plugin to the schema
// saleSchema.plugin(mongooseAggregatePaginate);
export const Sales = mongoose.model('Sales', saleSchema);