import express from "express";
import {signup, login, logout,getMe,googleCallback,deleteMe} from "../controller/authController.js";
import protectRoute from "../middleware/protectRoute.js"
import passport from "passport";

const router = express.Router();

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.get("/me", protectRoute, getMe);
router.delete("/me", protectRoute, deleteMe);
router.get("/google", passport.authenticate("google", { scope:["profile"] }));

router.get("/google/callback",
  passport.authenticate("google", { session:false }),
  googleCallback
);

export default router;
