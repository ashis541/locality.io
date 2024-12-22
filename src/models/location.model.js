import mongoose, { Schema, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { User } from "./user.model.js";

const locationSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: 'User'
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

locationSchema.plugin(mongooseAggregatePaginate);

// Static method to get user's latest location
locationSchema.statics.getUserLocation = async function(userId) {
  return this.findOne({ userId }).sort({ timestamp: -1 }).exec();
};

export const Location = mongoose.model("Location", locationSchema);
