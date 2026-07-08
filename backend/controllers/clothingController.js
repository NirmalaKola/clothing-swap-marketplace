const Clothing = require("../models/Clothing");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// Add Clothing Item

// Add Clothing Item
const addClothing = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      size,
      condition,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "clothing-swap",
    });

    // Delete temporary file
    fs.unlinkSync(req.file.path);

    // Save clothing item
    const clothing = await Clothing.create({
      title,
      description,
      category,
      size,
      condition,
      image: result.secure_url,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Clothing item added successfully",
      clothing,
    });
  } catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
    error,
  });
}
};

// Get All Clothing Items
const getAllClothing = async (req, res) => {
  try {
    const clothings = await Clothing.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: clothings.length,
      clothings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Single Clothing Item
const getClothingById = async (req, res) => {
  try {
    const clothing = await Clothing.findById(req.params.id)
      .populate("owner", "name email");

    if (!clothing) {
      return res.status(404).json({
        success: false,
        message: "Clothing item not found",
      });
    }

    res.status(200).json({
      success: true,
      clothing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Clothing Item
const updateClothing = async (req, res) => {
  try {
    const clothing = await Clothing.findById(req.params.id);

    if (!clothing) {
      return res.status(404).json({
        success: false,
        message: "Clothing item not found",
      });
    }

    // Check ownership
    if (clothing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this item",
      });
    }

    const updatedClothing = await Clothing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("owner", "name email");

    res.status(200).json({
      success: true,
      message: "Clothing item updated successfully",
      clothing: updatedClothing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Clothing Item
const deleteClothing = async (req, res) => {
  try {
    const clothing = await Clothing.findById(req.params.id);

    if (!clothing) {
      return res.status(404).json({
        success: false,
        message: "Clothing item not found",
      });
    }

    // Check ownership
    if (clothing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this item",
      });
    }

    await Clothing.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Clothing item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addClothing,getAllClothing,getClothingById,updateClothing,deleteClothing,
};