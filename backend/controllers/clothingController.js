const Clothing = require("../models/Clothing");

// Add Clothing Item
const addClothing = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      size,
      condition,
      image,
    } = req.body;

    const clothing = await Clothing.create({
      title,
      description,
      category,
      size,
      condition,
      image,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Clothing item added successfully",
      clothing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addClothing,
};