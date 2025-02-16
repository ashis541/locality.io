import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Categories Schema
const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: [{
    type: mongoose.Schema.ObjectId,
    ref: "Products", 
  }],
});
// Add the plugin to the schema
categoriesSchema.plugin(mongooseAggregatePaginate);
export const Categories = mongoose.model("Categories", categoriesSchema);
