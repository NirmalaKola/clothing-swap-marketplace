const mongoose = require("mongoose");

const swapSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    requestedItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clothing",
      required: true,
    },

    offeredItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clothing",
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Swap", swapSchema);