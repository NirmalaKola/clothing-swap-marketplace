const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { addClothing } = require("../controllers/clothingController");

// Add Clothing (Protected)
router.post("/", protect, addClothing);

module.exports = router;