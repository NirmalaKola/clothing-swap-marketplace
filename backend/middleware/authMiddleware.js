const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    // Check if Authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token is found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID (excluding password)
    req.user = await User.findById(decoded.id).select("-password");

    // Continue to the next middleware/controller
    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = { protect };