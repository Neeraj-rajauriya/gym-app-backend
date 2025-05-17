import express from "express";
import { createPayment } from "../controllers/paymentContoller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
const paymentRouter=express.Router();

paymentRouter.post('/',authMiddleware,createPayment);


export default paymentRouter;
