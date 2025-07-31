const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { adminAuth } = require("../middlewares/adminAuth");
const { validateSignupData } = require("../utils/validate");
const User = require("../models/user");

const adminRouter = express.Router();

adminRouter.post("/create/user", userAuth, adminAuth, async (req, res) => {
  try {
    const data = req.body;
    console.log(data, req.isAdmin);
    const sanitizedData = await validateSignupData(data, req.isAdmin);
    console.log(sanitizedData);

    const user = new User(sanitizedData);
    const userData = await user.save();

    res.json({message: "User Created Successfully"});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = adminRouter;
