import mongoose, { Schema, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const chatParticipantSchema = new Schema({
    ChatParticipant: {
    userId: "string",
    chatId: "float",
  },
});
chatParticipantSchema.plugin(mongooseAggregatePaginate)
export const chatParticipant = mongoose.model("chatParticipant", chatParticipantSchema);
