const adminAuth = (req, res, next) => {
  if (req.user.role != "admin") {
    return res.status(401).json({ message: "Unauthorized User" });
  } else req.isAdmin = true;

  next();
};

module.exports = { adminAuth };
