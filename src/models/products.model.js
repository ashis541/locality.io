import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Products Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0, // Set default discount to 0
  },
  categories: {
    type: mongoose.Schema.ObjectId,
    ref: "Categories",
  },
  available: {
    type: Boolean,
    required: true,
  },
});

// Add the plugin to the schema
productSchema.plugin(mongooseAggregatePaginate);

export const Products = mongoose.model("Products", productSchema);
