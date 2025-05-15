import express, { urlencoded } from 'express';
import dotenv from "dotenv";
import  {connectDB}  from './src/config/db.js';
import router from './src/routes/authRoutes.js';

dotenv.config();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDB();

app.use("/api/auth",router);

app.listen(process.env.PORT,()=>{
    console.log("Server is running on Port number",process.env.PORT);
})
