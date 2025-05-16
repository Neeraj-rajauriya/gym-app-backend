import { userMembership } from "../models/usermembership.model.js";
import { MembershipPlan } from "../models/membership.model.js";

export const createMembership=async(req,res)=>{
 try{
        const {membershipPlanId}=req.body;
        const userId=req.user._id;
        const plan=await MembershipPlan.findById(membershipPlanId);
        if(!plan){
            return res.status(404).json({Success:"false",messge:"Plan Not found!"})
        }
        const startDate=new Date();
        const endDate=new Date();
        endDate.setMonth(startDate.getMonth()+plan.duration);

        console.log("Start Date is:",startDate);
        console.log("End Date:",endDate);
        const membership=new userMembership({
            userId,
            membershipPlanId,
            paymentStatus:"Success",
            startDate,
            endDate
        })
        await membership.save();
        res.status(200).json({Success:true,message:"Membership Created Successfully",membership})
 }catch(err){
    console.log(err.message);
    res.status(500).json({Success:false,msg:"Internal server error"})
 }
}

export const getUserMembership=async(req,res)=>{
    try{
        const userId = req.user._id;
        const membership=await userMembership.findOne({userId}).populate("membershipPlanId","name duration price benefits");
        if(!membership){
            return res.status(404).json({Success:"false",messge:"Membership Not found!"});
        }
        res.status(200).json({Success:true,membership})
    }catch(err){
        console.log(err.message);
        res.status(500).json({Success:false,message:"Internal Server Error"});
    }
}