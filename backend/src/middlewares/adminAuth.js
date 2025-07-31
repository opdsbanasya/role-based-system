const adminAuth = (req, res, next) => {
  if (req.user.role != "admin") {
    return res.status(401).json("Unauthorized");
  }
  req.isAdmin = true;
  
  next();
};

module.exports = { adminAuth };
