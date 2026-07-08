const Clothing = require("../models/Clothing");
const Swap = require("../models/Swap");

// Get Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {

    // Total clothing uploaded by user
    const totalClothing = await Clothing.countDocuments({
      owner: req.user._id,
    });

    // Total swap requests sent
    const swapRequestsSent = await Swap.countDocuments({
      requester: req.user._id,
    });

    // Total swap requests received
    const swapRequestsReceived = await Swap.countDocuments({
      owner: req.user._id,

    });
    // Pending swaps
const pendingSwaps = await Swap.countDocuments({
  owner: req.user._id,
  status: "Pending",
});

// Accepted swaps
const acceptedSwaps = await Swap.countDocuments({
  owner: req.user._id,
  status: "Accepted",
});

// Rejected swaps
const rejectedSwaps = await Swap.countDocuments({
  owner: req.user._id,
  status: "Rejected",
});

    res.status(200).json({
      success: true,
      dashboard: {
        totalClothing,
        swapRequestsSent,
        swapRequestsReceived,
        pendingSwaps,
        acceptedSwaps,
        rejectedSwaps,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};