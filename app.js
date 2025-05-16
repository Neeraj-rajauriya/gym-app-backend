import express, { urlencoded } from 'express';
import dotenv from "dotenv";
import  {connectDB}  from './src/config/db.js';
import authRouter from './src/routes/authRoutes.js';
import membershipRouter  from './src/routes/membershipRoutes.js';
import userMembershipRouter from './src/routes/userMembership.routes.js';

dotenv.config();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDB();

app.use("/api/auth",authRouter);
app.use("/api/membership",membershipRouter);
app.use("/api/userMembership",userMembershipRouter);

app.listen(process.env.PORT,()=>{
    console.log("Server is running on Port number",process.env.PORT);
})
