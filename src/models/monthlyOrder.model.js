import mongoose from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const monthlyOrderSchema=new mongoose.Schema({
    year: Number,
    month: Number,
    branchId: String,
    totalOrders: Number,
}, { timestamps: true })

// monthlyOrderSchema.plugin(mongooseAggregatePaginate)
export const monthlyOrder=mongoose.model('monthlyOrder',monthlyOrderSchema)