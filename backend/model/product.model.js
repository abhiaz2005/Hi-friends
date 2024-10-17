import mongoose, { Schema } from "mongoose";
import User from "./user.model.js" ;
const productSchema = new mongoose.Schema({
    p_name:{
        type:String,
        required:true
    },
    p_price:{
        type:Number,
        required:true
    },
    p_image:{
        type:String,
        required:true
    },
    p_discount:{
        type:Number,
        required:true
    },
    p_category:{
        type:String,
        enum:["fashion","gadgets","home-items","grocery"],
        required:true
    },
    p_description:{
        type:String,
        required:true
    },
    p_address:{
        type:String,
        required:true
    },
    p_owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        default:null
    }
})

const Product = mongoose.model("Product",productSchema) ;

export default Product ;