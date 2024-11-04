import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs"

export const signupUser = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Email format validation
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Check if username exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username is already taken" });
        }

        // Check if email exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email is already taken" });
        }

        // Password length validation
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        // Hash the password and create a new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
        });

        // Save user and generate token
        await newUser.save();
        generateTokenAndSetCookie(newUser._id, res);

        // Send success response
        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email,
            followers: newUser.followers,
            following: newUser.following,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg,
        });
        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        // Handle server error
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const signinUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password || "");
        if (!isPasswordCorrect) {
            return res.status(404).json({ error: "Password incorrect" });
        }

        generateTokenAndSetCookie(user._id, res);
        await user.save();

        const { password: _, ...userWithoutPassword } = user.toObject();
        return res.status(200).json({ user: userWithoutPassword });
        
    } catch (error) {
        console.log("Error in signin controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const logoutUser = async (req, res)=>{
    try {
        res.cookie("jwt", "", {maxAge:0});
        return res.status(200).json({message:"Logout Succesfully"});
    } catch (error) {
        console.log("Error in logout controller", error.messege)
        return res.status(500).json({error:"Internal Server Error"})
    }
}

export const getMe = async(req, res)=>{
    try {
        const user = await User.findById(req.user._id).select("-password");
        if(!user){
            return res.status(400).json({error:"You have to Logged in First"})
        }

        return res.status(200).json(user);

    } catch (error) {
        console.log("Error in getMe", error.messege)
return res.status(500).json({error:"Internal Server Error"})
    }
}
