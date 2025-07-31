const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { adminAuth } = require("../middlewares/adminAuth");
const { validateSignupData } = require("../utils/validate");
const User = require("../models/user");
const userRouter = require("./userRouter");

const adminRouter = express.Router();

adminRouter.post("/user/create", userAuth, adminAuth, async (req, res) => {
  try {
    const data = req.body;
    console.log(data, req.isAdmin);
    const sanitizedData = await validateSignupData(data, req.isAdmin);
    console.log(sanitizedData);

    const user = new User(sanitizedData);
    const userData = await user.save();

    res.json({ message: "User Created Successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

adminRouter.delete("/user/delete", userAuth, adminAuth, async (req, res) => {
  try {
    const userId = req.body._id;

    await User.deleteOne({ _id: userId });

    res.json({ message: "User Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

adminRouter.patch("/user/update", userAuth, adminAuth, async (req, res) => {
  try {
    const data = req.body;

    const result = await User.updateOne({ _id: data._id }, { role: data.role });

    res.json({ message: "Role upadated" });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

adminRouter.get("/user/getlist", userAuth, adminAuth, async (req, res) => {
  try {
    const admin = req.user;
    const userList = await User.find({
      $and: [
        { $or: [{ role: "student" }, { role: "admin" }] },
        { id: { $ne: admin._id } },
      ],
    }).select("fisrtName lastName email role profilePhoto");
    

    res.json(userList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = adminRouter;
