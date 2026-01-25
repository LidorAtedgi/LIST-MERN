import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import connectToMongo from "./database/connectToMongo.js";
import passport from "passport";
import "./config/passport.js";

const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/list", listRoutes);

// Serve Vite build
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// Catch-all for React Router
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Optional test route
app.get("/test", (req,res)=>res.send("WORK!"));

app.listen(PORT, () => {
    connectToMongo();
    console.log(`Server running on PORT ${PORT}`);
});
