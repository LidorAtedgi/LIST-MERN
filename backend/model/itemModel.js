import mongoose from "mongoose";

const itemScema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },
    acquired:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const Item = mongoose.model("Item",itemScema);

export default Item;