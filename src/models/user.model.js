import mongoose from 'mongoose';

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        phone:{
            type:Number,
            required:true,
        },
        password:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            required:true
        },
        gender:{
            type:String,
            enum:['male','female','others'],
            required:true
        },
        role:{
            type:String,
            enum:['admin','trainer','user'],
            default:"user"
        }
    }
)

export const user=mongoose.model("Users",userSchema);