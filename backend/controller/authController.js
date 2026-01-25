import User from "../model/userModel.js";
import bcryptjs from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req,res) => {
    try {
       const {username,password,confirmPassword} = req.body;

        if (!username || !password || !confirmPassword) return res.status(400).json({ error: "All fields are required" });

       if(password!=confirmPassword) return res.status(400).json({error:"Password don't match"});
       
       const user = await User.findOne({username:username.toLowerCase().trim()});

       if(user) return res.status(400).json({error:"Username already exists"});

       const salt = await bcryptjs.genSalt(10);
       const hashPassword = await bcryptjs.hash(password,salt);



       const newUser = new User({
        username:username.toLowerCase().trim(),
        password:hashPassword
       })
        
       if(newUser){
       generateTokenAndSetCookie(newUser._id,res);
       await newUser.save();

       res.status(201).json({
        _id:newUser._id,
        username:newUser.username
       });
    }else{
        res.status(400).json({error:"Invaild user data"});
    }
    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const login = async (req,res) => {
    try {
       const {username,password} = req.body;

       if (!username || !password) return res.status(400).json({ error: "All fields are required" });

       const user = await User.findOne({username:username.toLowerCase().trim()});
       const isPasswordCorrect = await bcryptjs.compare(password,user?.password || "");

       if(!user || !isPasswordCorrect)
        return res.status(400).json({error:"Invaild username or password"});
       
       generateTokenAndSetCookie(user._id,res);

       res.status(200).json({
        _id: user._id,
        username: user.username
       });

    } catch (error) {
        console.log("Error in Login controller",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const logout = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge: 0});
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const getMe = (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not authenticated" });

    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const googleCallback = (req, res) => {
  try {
    generateTokenAndSetCookie(req.user._id, res);
    res.redirect(`${process.env.CLIENT_URL}/auth/redirect`);
  } catch (error) {
    res.redirect(`${process.env.CLIENT_URL}/login`);
  }
};
