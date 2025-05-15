export const roleMiddleware=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.staus(403).json({sucess:false,msg:"Acess denied, insuffcient permission"})
        }
        next();
    }
}