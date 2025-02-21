// src/pages/Book.js 
import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    try {
      await axios.post(
        "http://localhost:5003/api/book", // Backend API endpoint
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token for authentication
          },
        }
      );
      setMessage("Book added successfully!");
      setTitle(""); // Reset the title after successful submission
    } catch (error) {
      console.error("Error adding book:", error);
      setMessage("Failed to add book.");
    }
  };

  return (
    <div>
      <h2>Add a Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Book</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddBook;
