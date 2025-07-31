const express = require("express");
const User = require("../models/user");
const { validateSignupData, validateLoginData } = require("../utils/validate");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

// POST /signup API
authRouter.post("/signup", async (req, res) => {
  try {
    // Validate Data
    const data = req.body;
    const sanitizedData = await validateSignupData(data);

    // Registering the user on DB
    const user = new User(sanitizedData);
    const userData = await user.save();

    res.json({
      message: "User has been added to database. Next, Please login",
    });
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

module.exports = authRouter;
