import express from 'express';
import {create,getAll,getById,updateName,deleteById,toggleAcquired} from "../controller/itemController.js"
import protectRoute from "../middleware/protectRoute.js"

const router = express.Router();


router.post("/create", protectRoute, create);
router.get("/", protectRoute, getAll);
router.put("/:id/updateAcquired", protectRoute, toggleAcquired);
router.put("/:id/updateName", protectRoute, updateName);
router.get("/:id/delete", protectRoute, deleteById);
router.get("/:id", protectRoute, getById);



export default router;