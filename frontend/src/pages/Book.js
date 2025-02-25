
import React, { useState } from "react";
import "../App.css";



function App() {
  const [activeSection, setActiveSection] = useState("mySwaps"); 

  // Sample book data
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "1984", author: "George Orwell" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);

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
        return <h2>Books Near By</h2>;
      case "explore":
        return <h2>Explore</h2>;
      default:
        return <h2>My Swaps</h2>;
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <img src="logo.png" alt="Company Logo" className="logo" />
        <h1>Book Swapping Platform</h1>
      </header>

      {/* Side Navigation */}
      <nav className="side-nav">
        <ul>
          <li onClick={() => setActiveSection("mySwaps")}>My Swaps</li>
          <li onClick={() => setActiveSection("booksNearby")}>Books Near By</li>
          <li onClick={() => setActiveSection("explore")}>Explore</li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">{renderSection()}</main>
    </div>
  );
}

export default App;
