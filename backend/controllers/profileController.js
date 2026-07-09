const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const User = require("../models/User");

// Get Logged-in User Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Logged-in User Profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Upload Profile Image
const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile-images",
    });

    // Delete temporary file
    fs.unlinkSync(req.file.path);

    // Update user's profile image
    const user = await User.findById(req.user._id);

    user.profileImage = result.secure_url;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      profileImage: user.profileImage,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,updateProfile,uploadProfileImage,
};