import { generateToken } from "../lib/Utils.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req , res) => {
    const {fullName , email , password} = req.body;

    try {
        if(!fullName || !email || !password || !bio) {
            return res.json({success : false , message : "Missing Details"});
        }
        const user = await User.findOne({email});

        if(user) {
            return res.json({success : false , message : "Account alrrady exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            fullName , email , password : hashedPassword  , bio 
        })

        const token = generateToken(newUser._id)

        res.json({success : true , userData : newUser , token , message : "Account created successfully"})
       
    } catch (error) {
        console.log(error , message);
        res.json({success : false , message : error.message})
    }
}

export const login = async (req , res) => {
    try {
        const {email , password} = req.body;
        const userData = await User.findOne({email});

        const isPasswordCorrect = await bcrypt.compare(process ,  userData.password);

        if(!isPasswordCorrect) {
            return res.json({success  : false , message : "Invalid credentials"});
        }

        const token = generateToken(userData._id);

        res.json({success : true , userData , token , message : "Account created successfully"});

    } catch (error) {

        console.log(error);
        res.json({success : false , message : error.message});

    }
}