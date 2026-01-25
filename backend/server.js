import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import listRoutes from "./routes/listRoutes.js"
import connectToMongo from "./database/connectToMongo.js"
import passport from "passport";
import path from "path"
import "./config/passport.js";

const PORT = process.env.PORT || 8000;
const app = express();

const __dirname = path.resolve();


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/list",listRoutes);
app.use(passport.initialize());
app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get(/.*/,(req,res) => {
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
});

app.get("/",(req,res) => {res.send("WORK!")})

app.listen(PORT, () => {
    connectToMongo();
    console.log(`Server running on PORT ${PORT}`)
});

