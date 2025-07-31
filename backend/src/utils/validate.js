const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const validateSignupData = async (data) => {
  if (!validator.isEmail(data.email)) {
    throw new Error("Invalid email");
  }

  const user = await User.findOne({ email: data.email });
  if (user) {
    throw new Error("Email already exists");
  }

  if (data?.role) {
    throw new Error("You are not allowed to assign roles");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  data.password = passwordHash;

  return data;
};

const validateLoginData = (email) => {
  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  }
};

const validateUpdatePassword = (newPassword) => {
  if(!validator.isStrongPassword(newPassword)){
    throw new Error("Password length must be at least 8 and include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.")
  }

}

module.exports = { validateSignupData, validateLoginData, validateUpdatePassword };
