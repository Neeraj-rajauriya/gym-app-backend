import express, { urlencoded } from 'express';
import dotenv from "dotenv";
import  {connectDB}  from './src/config/db.js';

dotenv.config();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDB();

app.get('/',(req,res)=>{
    res.send("Gym Application Server is Running fine!");
})

app.listen(process.env.PORT,()=>{
    console.log("Server is running on Port number",process.env.PORT);
})
