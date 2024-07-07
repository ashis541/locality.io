import mongoose, { Schema, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const locationSchema = new Schema({
  UserLocation: {
    userId: "string",
    latitude: "float",
    longitude: "float",
    timestamp: "datetime",
  },
});
locationSchema.plugin(mongooseAggregatePaginate)
export const location = mongoose.model("location", locationSchema);
