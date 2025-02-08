import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
// Employes Schema
const employeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
// Add the plugin to the schema
employeSchema.plugin(mongooseAggregatePaginate);
export const Employes = mongoose.model('Employes', employeSchema);