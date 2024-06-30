import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      Types: String,
      require: true,
      unique: true,
    },
    email: {
      Types: String,
      require: true,
      unique: true,
    },
    password: {
      Types: String,
      require: true,
    },
    location: {
      Types: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const user = mongoose.model("user", userSchema);
