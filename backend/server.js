const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5004;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");

const authenticateToken = require("./middleware/authMiddleware");

// Use Auth routes
app.use("/api/auth", authRoutes);

// Use Book routes (for books functionality)
app.use("/api/book", bookRoutes);

// Example of a protected route
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Sync database and start the server
sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => console.error("Database connection error:", err));
