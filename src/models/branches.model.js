import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
// Branch Schema
const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true
  },
  productsCategories:[{
    type:mongoose.Schema.ObjectId,
    ref:'categories'
  }],
  employes:[{
    type:mongoose.Schema.ObjectId,
    ref:"employes"
  }],
  sales:[
    {
      type:mongoose.Schema.ObjectId,
      ref:"sales",
    }
  ],
  organizaton: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Add the plugin to the schema
branchSchema.plugin(mongooseAggregatePaginate);
export const Branch = mongoose.model('Branch', branchSchema);