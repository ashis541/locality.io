import mongoose, { Schema, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const messageSchema = new Schema({
  Message: {
    message_id:"string",
    sender_id: "string",
    receiver_id: "float",
    message_content: "float",
    timestamp: "datetime",
    read_status:"boolean"
  },
});
messageSchema.plugin(mongooseAggregatePaginate)
export const message = mongoose.model("location", messageSchema);
