const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const clothingRoutes = require("./routes/clothingRoutes");
const swapRoutes = require("./routes/swapRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication Routes
app.use("/api/auth", authRoutes);

//Clothing Routes
app.use("/api/clothing", clothingRoutes);

//swap Routes
app.use("/api/swaps", swapRoutes);

//dashboard
app.use("/api/dashboard", dashboardRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});