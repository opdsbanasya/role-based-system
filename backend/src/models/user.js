const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 25,
      minLength: 3,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 25,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password length must be at least 8 and include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
          );
        }
      },
    },

    role: {
      type: String,
      required: true,
    },

    profilePhoto: {
      type: String,
      default:
        "https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid URL");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
