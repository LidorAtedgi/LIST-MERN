import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    minlength:3,
    maxlength:20
  },

  password:{
    type:String,
    minlength:6
  },

  googleId:{
    type:String,
    unique:true,
    sparse:true   
  },


},{timestamps:true});

const User = mongoose.model("User", userSchema);
export default User;
