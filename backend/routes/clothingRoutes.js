const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { addClothing , getAllClothing,getClothingById,updateClothing,deleteClothing,} = require("../controllers/clothingController");

// Add Clothing (Protected)
router.post("/", protect, addClothing);

// Get All Clothing Items (Public)
router.get("/", getAllClothing);

// Get Single Clothing Item
router.get("/:id", getClothingById);

// Update Clothing Item (Protected)
router.put("/:id", protect, updateClothing);

// Delete Clothing Item (Protected)
router.delete("/:id", protect, deleteClothing);

module.exports = router;