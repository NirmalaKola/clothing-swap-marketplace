const Swap = require("../models/Swap");
const Clothing = require("../models/Clothing");

// Send Swap Request
const createSwapRequest = async (req, res) => {
  try {
    const { requestedItem, offeredItem } = req.body;

    // Check if requested clothing exists
    const clothing = await Clothing.findById(requestedItem);

    if (!clothing) {
      return res.status(404).json({
        success: false,
        message: "Requested clothing item not found",
      });
    }

    // Prevent users from requesting their own item
    if (clothing.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot swap your own clothing item",
      });
    }

    // Create swap request
    const swap = await Swap.create({
      requester: req.user._id,
      owner: clothing.owner,
      requestedItem,
      offeredItem,
    });

    res.status(201).json({
      success: true,
      message: "Swap request sent successfully",
      swap,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Swap Requests
const getMySwapRequests = async (req, res) => {
  try {

    const swaps = await Swap.find({
      $or: [
        { requester: req.user._id },
        { owner: req.user._id }
      ]
    })
      .populate("requester", "name email")
      .populate("owner", "name email")
      .populate("requestedItem", "title image category size condition")
      .populate("offeredItem", "title image category size condition")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: swaps.length,
      swaps,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Accept Swap Request
const acceptSwapRequest = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({
        success: false,
        message: "Swap request not found",
      });
    }

    // Only the owner can accept
    if (swap.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to accept this swap request",
      });
    }

    // Check if already processed
    if (swap.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "This swap request has already been processed",
      });
    }

    swap.status = "Accepted";

    await swap.save();

    res.status(200).json({
      success: true,
      message: "Swap request accepted successfully",
      swap,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reject Swap Request
const rejectSwapRequest = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({
        success: false,
        message: "Swap request not found",
      });
    }

    // Only owner can reject
    if (swap.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to reject this swap request",
      });
    }

    // Check if already processed
    if (swap.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "This swap request has already been processed",
      });
    }

    swap.status = "Rejected";

    await swap.save();

    res.status(200).json({
      success: true,
      message: "Swap request rejected successfully",
      swap,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSwapRequest,getMySwapRequests,acceptSwapRequest,rejectSwapRequest,
};