const express = require("express");
const axios = require("axios");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const { Book } = require("../models/Book");

// Get books of the logged-in user
router.get("/books",  async (req, res) => {
  try {
    const { title } = req.query; // Get search query from request
    if (!title) {
      return res.status(400).json({ message: "Please provide a book title." });
    }

    // Fetch data from Open Library API
    const response = await axios.get(`https://openlibrary.org/search.json?q=${title}`);

    // Extract relevant book data
    const books = response.data.docs.map((book) => ({
      title: book.title,
      author: book.author_name ? book.author_name.join(", ") : "Unknown Author",
      publishYear: book.first_publish_year || "N/A",
      coverImage: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null,
      openLibraryKey: book.key, // Useful for linking to Open Library pages
    }));

    res.json(books);
  } catch (err) {
    console.error("Error fetching books from Open Library:", err);
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
