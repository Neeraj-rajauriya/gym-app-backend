import {  payment } from "../models/payment.model.js";
import { userMembership } from "../models/usermembership.model.js";
import {user} from "../models/user.model.js";

export const createPayment=async(req,res)=>{
    try{
        const userId=req.user._id;
        const {userMembershipId,amount}=req.body;
        const membership=await userMembership.findById(userMembershipId).populate("membershipPlanId");
        if(!membership){
            return res.status(404).json({Success:false,message:"Membership Not Found!"});
        }

        const planAmount=membership.membershipPlanId.price;
        if(amount !== planAmount){
            return res.status(400).json({Success:true,message:"Invalid amount"});
        }

        const payment=await payment.create({
            userId,
            userMembershipId,
            amount,
            status:"Pending"
        })
        res.status(201).json({Success:true,message:"Payment Initiated"},payment);
    }catch(err){
        console.log("Error",err.message);
        res.status(500).json({Success:false,message:"Internal Server Error"});
    }
}