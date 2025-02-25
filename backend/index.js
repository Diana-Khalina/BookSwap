const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API route to fetch books from Open Library
app.get('/api/books', async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const response = await axios.get(`https://openlibrary.org/search.json?q=${title}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
