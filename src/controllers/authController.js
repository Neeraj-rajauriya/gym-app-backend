import { user } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, age, gender, role } = req.body;
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      res.status(200).json({ sucess: false, msg: "User Already Exist" });
    }
    const newPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      name,
      email,
      phone,
      password: newPassword,
      age,
      gender,
      role,
    });
    return res.status(200).send({ sucess: true, newUser });
  } catch (err) {
    console.log("Error is", err.message);
    res.status(400).json({ sucess: false, msg: "Invalid Data" });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log("Function calling!");
    const { email, password } = req.body;
    const existingUser = await user.findOne({ email });
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ sucess: false, msg: "Invalid Crendentials" });
    }
    const token=jwt.sign({userId:existingUser._id,role:existingUser.role},process.env.JWT_SECRET,{expiresIn:"1h"});
    res.status(200).send({ sucess: true, msg: "Login Sucessfull",token });
  } catch (err) {
    console.log("Internal Server Error", err.message);
    return res
      .status(401)
      .json({ sucess: false, msg: "Invalid email or password" });
  }
};
