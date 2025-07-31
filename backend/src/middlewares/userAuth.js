const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Token is not pressent" });
    }

    const decodedMessage = jwt.verify(token, process.env.SECRET_KEY);
    const { _id } = decodedMessage;

    if (!_id) {
      return res.status(400).json({ message: "Invalid token, Please login" });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;

    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };
