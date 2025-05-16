import { MembershipPlan } from "../models/membership.model.js";

export const getAllMembershipPlans = async (req, res) => {
  try {
    const plans = await MembershipPlan.find({});
    res.status(200).send({ sucess: true, plans });
  } catch (err) {
    console.log("Internal Server error:", err.message);
    res.status(500).json({ sucess: false, msg: "Internal Server Error" });
  }
};

export const createMembership = async (req, res) => {
  try {
    const { name } = req.body;
    const exists = await MembershipPlan.findOne({ name });
    if (exists) {
      return res
        .status(400)
        .json({ sucess: false, message: "Plan Already Exists" });
    }
    const newPlan = new MembershipPlan({ name });
    newPlan.save();
    res
      .status(200)
      .json({ sucess: true, message: "New Plan Created", newPlan });
  } catch (err) {
    req.status(500).json({ sucess: false, message: "Internal Server Error" });
  }
};

export const updateMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const plan = await MembershipPlan.findById(id);
    if (!plan) {
      return res
        .status(404)
        .json({ Sucess: false, message: "Plan Not Found!" });
    }
    plan.name = name;
    plan.save();
    res.status(200).json({ Sucess: true, message: "Plan Updated Sucessfully" });
  } catch (err) {
    res.status(500).json({ sucess: false, message: "Interval Server Error" });
  }
};

export const deleteMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await MembershipPlan.findByIdAndDelete(id);
    if (!plan) {
      return res
        .status(404)
        .json({ Sucess: false, message: "Plan Not Found!" });
    }
    res.status(200).json({ Sucess: true, message: "Plan Deleted Sucesfully" });
  } catch (err) {
    res.status(500).json({ sucess: false, message: "Interval Server Error" });
  }
};
