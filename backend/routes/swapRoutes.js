const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createSwapRequest,getMySwapRequests,acceptSwapRequest,rejectSwapRequest,
} = require("../controllers/swapController");

// Send Swap Request
router.post("/", protect, createSwapRequest);

// Get My Swap Requests
router.get("/", protect, getMySwapRequests);

// Accept Swap Request
router.put("/:id/accept", protect, acceptSwapRequest);

// Reject Swap Request
router.put("/:id/reject", protect, rejectSwapRequest);


module.exports = router;