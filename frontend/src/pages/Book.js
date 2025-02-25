
// import React, { useState } from "react";
// import axios from "axios";


import React, { useState } from "react";
import "../App.css";
import BookSwapMap from "../components/BookSwapMap"; 

function App() {
  
 
  
  const [activeSection, setActiveSection] = useState("mySwaps"); // State to manage active section
  // Sample book data
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "1984", author: "George Orwell" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);
  const [user, setUser] = useState({
    name: "Diana",
    zipCode: "34235", // 
  });
  // Render different sections based on activeSection state
  const renderSection = () => {
    switch (activeSection) {
      case "mySwaps":
        return (
          <div className="bookshelf">
            <h2>My Swaps</h2>
            <div className="books">
              {books.map((book) => (
                <div key={book.id} className="book">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "booksNearby":
        return <BookSwapMap userZipCode={user.zipCode} />;

        
      case "explore":
        return <h2>Explore</h2>;
      default:
        return <h2>My Swaps</h2>;
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
