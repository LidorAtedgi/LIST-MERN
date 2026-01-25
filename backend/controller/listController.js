import List from "../model/listModel.js"
import mongoose from "mongoose";
import User from "../model/userModel.js";

export const createList = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Invalid name" });
    }
    const exists = await List.findOne({
      name: name.trim(),
      owner: userId
    });

    if (exists) {
      return res.status(400).json({ error: "List name already exists" });
    }

    const newList = new List({
      name: name.trim(),
      owner: userId,
      participants: [{ user: userId }]
    });

    await newList.save();

    res.status(201).json(newList);

  } catch (error) {
    console.log("Error in createList controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateListName = async (req, res) => {
  try {
    const { listId } = req.params;
    const { newName } = req.body;

    if (!mongoose.Types.ObjectId.isValid(listId))
      return res.status(400).json({ error: "Invalid ID format" });

    if (!newName?.trim())
      return res.status(400).json({ error: "Invalid name" });

    const exists = await List.findOne({
      name: newName.trim(),
      owner: req.user._id
    });

    if (exists) {
      return res.status(400).json({ error: "List name already exists" });
    }
    const updatedList = await List.findOneAndUpdate(
      {
        _id: listId,
        owner: req.user._id  
      },
      {
        $set: { name: newName.trim() }
      },
      { new: true }
    );

    if (!updatedList)
      return res.status(403).json({ error: "Only owner can update list name" });

    res.status(200).json(updatedList);

  } catch (error) {
    console.log("updateListName", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteList = async (req,res) => {
    try {
        const {listId} = req.params;

        if(!listId) return res.status(400).json({error:"Invaild ID"});
        if(!mongoose.Types.ObjectId.isValid(listId)) return res.status(400).json({ error: "Invalid ID format" });

        await List.findByIdAndDelete(listId);

        res.status(200).json({message:"List deleted succsessfully!"})


    } catch (error) {
        console.log("Error in deleteList Listcontroller",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const addParticipant = async (req, res) => {
  try {
    const { listId, userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(listId) ||
        !mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ error: "Invalid ID" });

    // מביאים את הרשימה עם ה-owner
    const list = await List.findById(listId).select("owner participants");

    if (!list) return res.status(404).json({ error: "List not found" });

    // בדיקה: רק OWNER יכול להוסיף
    if (list.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Only owner can add participants" });

    // בדיקה אם המשתמש כבר קיים ברשימה
    const alreadyExists = list.participants.some(p => p.user.toString() === userId);
    if (alreadyExists)
      return res.status(400).json({ error: "User already in list" });

    // הוספת המשתמש
    list.participants.push({ user: userId });
    await list.save();

    res.status(200).json(list);

  } catch (error) {
    console.log("addParticipant", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const removeParticipant = async (req, res) => {
  try {
    const { listId, userId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(listId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const list = await List.findById(listId);
    if (!list) return res.status(404).json({ error: "List not found" });

    const isOwner = list.owner.toString() === req.user._id.toString();
    const isSelf = userId === req.user._id.toString();

    if (isOwner && isSelf) return res.status(400).json({ error: "Owner cannot be removed" });

    if (!isSelf && !isOwner) return res.status(403).json({ error: "Only owner can remove participants" });

    const updatedList = await List.findByIdAndUpdate(
      listId,
      { $pull: { participants: { user: userId } } },
      { new: true }
    );

    res.status(200).json(updatedList);

  } catch (error) {
    console.log("removeParticipant", error.message);
    res.status(500).json({ error: "Server error" });
  }
};


export const getListById = async (req, res) => {
  try {
    const { listId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(listId)) return res.status(400).json({ error: "Invalid ID" });

    const list = await List.findOne({
      _id: listId,
      "participants.user": req.user._id
    });

    if (!list) return res.status(404).json({ error: "List not found or no permission" });

    res.status(200).json(list);
  } catch (error) {
    console.log("getListById", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const getMyLists = async (req, res) => {
  try {
    const lists = await List.find(
      { "participants.user": req.user._id },
      { name: 1, owner: 1 } 
    ).sort({ updatedAt: -1 });

    if (lists.length === 0) return res.status(200).json([]);

    res.status(200).json(lists);
  } catch (error) {
    console.log("getMyLists", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const addItem = async (req, res) => {
  try {
    const { listId } = req.params;
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "Item name is required" });

    const list = await List.findOne({
      _id: listId,
      "participants.user": req.user._id
    });
     
    if (!list) return res.status(404).json({ error: "List not found or no permission" });

    const exists = await List.findOne({
      _id: listId,
      "items.name": name
    });

    if (exists) return res.status(400).json({ error: "Item already exists in this list" });

    const newItem = { name };

    const updatedList = await List.findByIdAndUpdate(
      listId,
      { $push: { items: newItem } },
      { new: true } 
    );

    res.status(201).json({
      message: "Item added successfully",
      items: updatedList.items 
    });

  } catch (error) {
    console.log("Error adding item:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { listId, itemId } = req.params;
    if (!itemId || !listId) 
      return res.status(400).json({ error: "No ID received." });

    if (!mongoose.Types.ObjectId.isValid(itemId) || !mongoose.Types.ObjectId.isValid(listId))
      return res.status(400).json({ error: "Invalid ID format" });

    const list = await List.findOne({
      _id: listId,
      "participants.user": req.user._id
    });

    if (!list) return res.status(404).json({ error: "List not found or no permission" });


    const updatedList = await List.findOneAndUpdate(
      { _id: listId, "items._id": itemId },
      { $pull: { items: { _id: itemId } } },
      { new: true } 
    );

    if (!updatedList) return res.status(404).json({ error: "Item not found" });


    res.status(200).json({
      message: "Item deleted successfully",
      items: updatedList.items
    });

  } catch (error) {
    console.log("Error in delete controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const toggleItem = async (req, res) => {
  try {
    const { listId, itemId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(listId) ||
      !mongoose.Types.ObjectId.isValid(itemId)
    ) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const list = await List.findOne({
      _id: listId,
      "participants.user": req.user._id,
      "items._id": itemId
    });

    if (!list) return res.status(404).json({ error: "Item not found or no permission" });

    const item = list.items.id(itemId);

    const updatedList = await List.findOneAndUpdate(
      { _id: listId, "items._id": itemId },
      { $set: { "items.$.acquired": !item.acquired } },
      { new: true }
    );

    res.status(200).json(updatedList);

  } catch (error) {
    console.log("toggleItem", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { listId, itemId } = req.params;
    const { newName, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(listId) || !mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const list = await List.findById(listId);
    if (!list) return res.status(404).json({ error: "List not found" });

    const item = list.items.id(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    // עדכון רק אם קיים
    if (newName !== undefined && newName !== null) item.name = String(newName).trim();
    if (quantity !== undefined && quantity !== null) item.quantity = quantity;

    await list.save();

    res.status(200).json(list);
  } catch (error) {
    console.log("updateItem", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsersNotInList = async (req, res) => {
  try {
    const { listId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(listId))
      return res.status(400).json({ error: "Invalid list ID" });

    const list = await List.findById(listId).select("participants");

    if (!list)
      return res.status(404).json({ error: "List not found" });

    const participantIds = list.participants.map(p => p.user);

    const users = await User.find({
      _id: { $nin: participantIds }
    }).select("_id username"); 

    res.status(200).json(users);

  } catch (error) {
    console.log("getUsersNotInList", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getListParticipantsWithoutOwner = async (req, res) => {
  try {
    const { listId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(listId)) {
      return res.status(400).json({ error: "Invalid list ID" });
    }

    const list = await List.findById(listId)
      .select("participants owner")
      .populate("participants.user", "username");

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }
    const ownerId = list.owner.toString();

    const users = list.participants
      .filter(p => {
        if (!p.user) return false;
        const userId = p.user._id.toString();
        return userId !== ownerId;
      })
      .map(p => ({
        _id: p.user._id,
        username: p.user.username
      }));

    res.status(200).json(users);
  } catch (error) {
    console.log("getListParticipantsWithoutOwner", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};