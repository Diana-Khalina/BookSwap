const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
require("dotenv").config();
const path = require("path");
const axios = require("axios");
const bookRoutes = require("./routes/book");

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "frontend/build" directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// Import routes
const authRoutes = require("./routes/auth");

const authenticateToken = require("./middleware/authMiddleware");
console.log("Connecting to database:", process.env.DATABASE_URL);

// Use Auth routes
app.use("/api/auth", authRoutes);

// Use Book routes (for books functionality)
app.use("/api/book", bookRoutes);
app.use('/api', require('./routes/book'));

// Example of a protected route
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Catch-all route to serve index.html for any non-API route
// This will handle React Router or any other frontend routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// Sync database and start the server
sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => console.error("Database connection error:", err));
