const express = require("express");
const User = require("../models/user");
const { validateSignupData, validateLoginData } = require("../utils/validate");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

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
    res.status(400).json({ message: err.message });
  }
});

// POST /login API
authRouter.post("/login", async (req, res) => {
  try {
    validateLoginData(req.body);

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const plainPasswordFromUser = req.body.password;
    const hashPasswordFromDB = user.password;
    const isPasswordMatched = await bcrypt.compare(
      plainPasswordFromUser,
      hashPasswordFromDB
    );

    if (isPasswordMatched) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });

      const { _id, firstName, lastName, profilePhoto, email, role } = user;

      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 86400000),
      });

      res.json({
        message: "Login Successful!!",
        userData: {
          _id,
          firstName,
          lastName,
          profilePhoto,
          email,
          role,
        },
      });
    } else {
      throw new Error("Wrong Email and Password");
    }
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

module.exports = authRouter;
