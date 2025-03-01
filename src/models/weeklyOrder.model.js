import mongoose from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const weeklyOrderSchema=new mongoose.Schema({
    year: Number,
    month: Number,
    branchId: String,
    totalOrders: Number,
}, { timestamps: true })

// weeklyOrderSchema.plugin(mongooseAggregatePaginate)
export const weeklyOrder=mongoose.model('weeklyOrder',weeklyOrderSchema)