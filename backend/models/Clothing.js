const mongoose = require("mongoose");

const clothingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
  type: String,
  required: true,
  trim: true,
},
category: {
  type: String,
  required: true,
  enum: [
    "Shirt",
    "T-Shirt",
    "Jeans",
    "Dress",
    "Jacket",
    "Sweater",
    "Hoodie",
    "Shoes",
    "Other",
  ],
},
    size: {
      type: String,
      required: true,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },

    condition: {
      type: String,
      required: true,
      enum: ["New", "Like New", "Good", "Fair"],
    },

    image: {
      type: String,
      default: "",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Clothing", clothingSchema);