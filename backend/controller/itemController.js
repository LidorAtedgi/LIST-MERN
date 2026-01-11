import Item from "../model/itemModel.js";
import mongoose from "mongoose";

export const create = async (req,res) => {
    try {
        const {name} = req.body;
        
        if(!name) return res.status(400).json({error:"Invalid name"});

        const item = await Item.findOne({name});

        if(item) return res.status(400).json({error:"Item already exists"});

        const newItem = new Item({
            name
        });

        if(newItem){
            await newItem.save();
            res.status(201).json({
                _id: newItem._id,
                name:newItem.name
            });
        }else{
            res.status(400).json({error:"Creation error"})
        }
    } catch (error) {
        console.log("Error in create controller",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }

};

export const getAll = async (req,res) => {
    try {
        const items = await Item.find();

        if(!items) res.status(404).json({error:"No items"});

        res.status(200).json(items);
    } catch (error) {
        console.log("Error in getAll controller",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const getById = async (req,res) => {
   try {
        const {id} = req.params;
        
        if(!id) return res.status(400).json({error:"No ID received."});

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID format" });

        const item = await Item.findById(id);

        if(!item) return res.status(404).json({error:"Item not found"});

        res.status(200).json(item);
   } catch (error) {
        console.log("Error in getById controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
   }
}

export const updateName = async (req,res) => {
    try {
        const {id} = req.params;
        const {newName} = req.body;

        if(!id) return res.status(400).json({error:"No ID received."});
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID format" });
        if(!newName) return res.status(400).json({error:"No Name received."});

        const updatedItem = await Item.findByIdAndUpdate(id,{name:newName},{new:true});

        if(!updatedItem) return res.status(404).json({error:"Item not found"});

        res.status(200).json(updatedItem);
    } catch (error) {
        console.log("Error in update controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }

}

export const toggleAcquired = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "No ID received." });
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID format" });

    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.acquired = !item.acquired;
    await item.save();

    res.status(200).json(item);
  } catch (error) {
    console.log("Error in toggleAcquired controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteById = async (req,res) => {
    try {
        const {id} = req.params;
        if(!id) return res.status(400).json({error:"No ID received."});
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID format" });

        const deleteItem = await Item.findByIdAndDelete(id);

        if(!deleteItem) return res.status(404).json({error:"Item not found"});

        res.status(200).json(deleteItem.name,{message:"Item deleted successfully"});
    } catch (error) {
        console.log("Error in delete controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}