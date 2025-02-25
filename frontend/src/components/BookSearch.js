import React, { useState } from "react";
import axios from "axios";

const BookSearch = () => {
    const [title, setTitle] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchBooks = async () => {
        if (!title.trim()) {
            setError("Please enter a book title.");
            return;
        }
        setError("");  // Clear previous errors
        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:5004/api/books?title=${encodeURIComponent(title)}`);
            setBooks(response.data);
        } catch (err) {
            console.error("Error fetching books:", err);
            setError("Failed to fetch books. Try again later.");
        } finally {
            setLoading(false);
        }
       
    };

    return (
        <div className="BookSearch">
            <h2>Search for Books</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
            />
            <button onClick={searchBooks} disabled={loading}>
                {loading ? "Searching..." : "Search"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            {/* Display Results */}
            <div className="BookList">  
                      {books.length > 0 ? (
                    <ul>
                        {books.map((book, index) => (
                            <li key={index} className="book-item">
                                {/* Book Cover */}
                                {book.coverImage ? (
                                    <img src={book.coverImage} alt={book.title} className="book-cover" />
                                ) : (
                                    <div className="placeholder-cover">No Image</div>
                                )}
                                {/* Book Details */}
                                <div>
                                    <h3>{book.title}</h3>
                                    <p><strong>Author:</strong> {book.author}</p>
                                    <p><strong>Published:</strong> {book.publishYear}</p>
                                    {/* Link to Open Library */}
                                    <a href={`https://openlibrary.org${book.openLibraryKey}`} target="_blank" rel="noopener noreferrer">
                                        View on Open Library
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No books found. Try a different title.</p>
                )}
            </div>
        </div>
    );
};

export default BookSearch;
