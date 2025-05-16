import express from "express";
import { createMembership , getUserMembership} from "../controllers/userMembershipController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const userMembershipRouter=express.Router();

userMembershipRouter.post('/',authMiddleware,createMembership);
userMembershipRouter.get('/:id',authMiddleware,getUserMembership);

export default userMembershipRouter;