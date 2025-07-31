const express = require("express");
const User = require("../models/user");
const {
  validateSignupData,
  validateLoginData,
  validateUpdatePassword,
} = require("../utils/validate");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/userAuth");

// POST /signup API
userRouter.post("/signup", async (req, res) => {
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
userRouter.post("/login", async (req, res) => {
  try {
    validateLoginData(req.body.email);

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
        message: "Logged in Successfully",
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
    res.status(400).json({ message: err.message });
  }
});

userRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

userRouter.patch("/update/password", userAuth, async (req, res) => {
  try {
    const { user } = req;
    const newPassword = req.body?.newPassword;
    const currentPassword = req.body?.password;

    validateUpdatePassword(newPassword);

    const plainPasswordFromUser = currentPassword;
    const hashPasswordFromDB = user.password;
    const isPasswordMatched = await bcrypt.compare(
      plainPasswordFromUser,
      hashPasswordFromDB
    );

    if (!isPasswordMatched) {
      throw new Error("Password not matched");
    }
    
    const newHashPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ _id: user._id }, { password: newHashPassword });

    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
