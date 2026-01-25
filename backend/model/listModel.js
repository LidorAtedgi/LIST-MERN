import mongoose from "mongoose";


const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  acquired: { type: Boolean, default: false },
  quantity: { type: Number, default: 1 }
}, { timestamps: true });



const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  participants: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
  items: [itemSchema] 
}, { timestamps: true }); 

const List = mongoose.model("List", listSchema);
export default List;
