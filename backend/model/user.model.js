import mongoose, { Schema } from "mongoose";
import Product from "./product.model.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender:{
    type:String,
    enum:["male","female"],
    required:true
  },
  photo: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  category: {
    type: String,
    enum: ["seller", "customer"],
  },
  bio: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cart: [
    {
      type:Schema.Types.ObjectId,
      ref:"Product",
      default:[]
    }
  ],
  orders: [
    {
      type:Schema.Types.ObjectId,
      ref:"Product",
      default:[]
    }
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
