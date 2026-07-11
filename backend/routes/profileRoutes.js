const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { getProfile ,updateProfile,uploadProfileImage,} = require("../controllers/profileController");

// Get Logged-in User Profile
router.get("/", protect, getProfile);

// Update Profile
router.put("/", protect, updateProfile);

// Upload Profile Image
router.put(
  "/image",
  protect,
  upload.single("image"),
  uploadProfileImage
)

module.exports = router;