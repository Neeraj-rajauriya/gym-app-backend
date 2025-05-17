import express from "express";
import { createPayment, updatePaymentStatus, getAllpayment } from "../controllers/paymentContoller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
const paymentRouter=express.Router();

paymentRouter.post('/',authMiddleware,createPayment);
paymentRouter.put('/:id',authMiddleware,updatePaymentStatus);
paymentRouter.get('/',authMiddleware,roleMiddleware("admin"),getAllpayment);



export default paymentRouter;
