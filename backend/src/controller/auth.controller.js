import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
    try{
        const{name,email,password}=req.body;
        const user = await User.findOne({email})
        if(user){
            return res.status(409).json({message:"User already exist please login",success:false})
        }else{
            const userData = new User({name,email,password})
            userData.password = await bcrypt.hash(password,10)
            await userData.save()
            res.status(201).json({message:"successfully signed up",success:true});
        }

    }catch(err){
        res.status(500).json({message:"signup error",success:false});
    }
}

const login = async (req, res) => {
    try{
        const{email,password}=req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(403).json({message:"auth failed",success:false})
        }else{
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if(isPasswordMatch){
                const jwtToken =jwt.sign({email:user.email,_id:user._id},process.env.JWT_SECRET,{expiresIn:"24h"})
                res.status(200).json({message:"successfully logged up",success:true ,jwtToken,email:user.email,name:user.name});
            }else{
                return res.status(403).json({message:"auth failed password",success:false});
            }
        }

    }catch(err){
        res.status(500).json({message:"login error",success:false});
    }
}

export{signup,login}