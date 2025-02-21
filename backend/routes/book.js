const express = require("express");
const { Book } = require("../models/Book");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

// Get books of the logged-in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const books = await Book.findAll({ where: { userId: req.user.userId } });
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

// Add a new book
router.post("/", authenticateToken, async (req, res) => {
    const { title } = req.body;
    try {
      const newBook = await Book.create({
        title,
        userId: req.user.userId, // Make sure you're correctly sending user ID from the token
      });
      res.status(201).json(newBook);
    } catch (err) {
      console.error("Error adding book:", err);
      res.status(500).json({ message: "Error adding book" });
    }
  });

module.exports = router;
