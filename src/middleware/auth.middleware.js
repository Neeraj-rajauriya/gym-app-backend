import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import user from "../models/user.model.js"
dotenv.config();

export const authMiddleware=async (req,res,next)=>{
    const token=req.headers.authrization?.split(' ')[1];
    if(!token){
        res.status(401).json({sucess:false,msg:"Acess denied. No token Provided"});
    }
    try{
          const decoded=jwt.verify(token,process.env.JWT_SECRET);
          const currentUser=await user.findById(decoded.userId).select("-password");
          req.user=currentUser;
          next();
    }catch(err){
        return res.status(400).json({sucess:false,msg:"Invalid Token"});
    }
}