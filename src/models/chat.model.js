import mongoose, { Schema, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const chatSchema = new Schema({
  Chat: {
    chatId:"string",
    createdAt: "string",
  },
});

chatSchema.plugin(mongooseAggregatePaginate)
export const chat = mongoose.model("chat", chatSchema);
