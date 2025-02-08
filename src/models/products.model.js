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
  },
  categories: {
    type: mongoose.Schema.ObjectId,
    ref: "product",
  },
  available: {
    type: Boolean,
    require: true,
  },
});
// Add the plugin to the schema
productSchema.plugin(mongooseAggregatePaginate);
export const Products = mongoose.model("Products", productSchema);
