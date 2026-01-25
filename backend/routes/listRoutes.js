import express from 'express';
import { createList,
    addItem,
    deleteItem,
    updateListName ,
    deleteList ,addParticipant,
    removeParticipant,toggleItem,updateItem,getListById,
    getMyLists,getUsersNotInList,getListParticipantsWithoutOwner } from '../controller/listController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post("/create", protectRoute, createList);
router.put("/update/:listId", protectRoute, updateListName);
router.put("/participant/add/:listId/:userId", protectRoute, addParticipant);
router.delete("/delete/:listId", protectRoute, deleteList);
router.delete("/participant/delete/:listId/:userId",protectRoute,removeParticipant);
router.get("/getListbyId/:listId",protectRoute,getListById);
router.get("/getLists",protectRoute,getMyLists);

router.post("/addItem/:listId", protectRoute, addItem);
router.delete("/delete/:listId/:itemId", protectRoute, deleteItem);
router.put("/toggle/:listId/:itemId",protectRoute,toggleItem);
router.put("/update/:listId/:itemId",protectRoute,updateItem);
router.get("/non-participants/:listId",protectRoute,getUsersNotInList);
router.get("/participants/:listId",protectRoute,getListParticipantsWithoutOwner);


export default router;