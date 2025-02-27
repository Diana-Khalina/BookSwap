import React, { useState } from "react";
import "../App.css";
import BookSearch from "../components/BookSearch";
import BookSwapMap from "../components/BookSwapMap"; 
import { useNavigate } from "react-router-dom";

function App() {
  
 
  
  const [activeSection, setActiveSection] = useState("mySwaps"); // State to manage active section
  const navigate = useNavigate();

  // Sample book data
  const [books, setBooks] = useState(() => {
    // Load books from localStorage or use default books
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [
      { 
        id: 1, 
        title: "The Great Gatsby", 
        author: "F. Scott Fitzgerald", 
        summary: "A story of love and betrayal in the Jazz Age.", 
        cover: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg" 
      },
      { 
        id: 2, 
        title: "1984", 
        author: "George Orwell", 
        summary: "A dystopian novel about totalitarianism.", 
        cover: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg" 
      },
      { 
        id: 3, 
        title: "To Kill a Mockingbird", 
        author: "Harper Lee", 
        summary: "A powerful exploration of racial injustice.", 
        cover: "https://m.media-amazon.com/images/I/81aY1lxk+9L._AC_UF1000,1000_QL80_.jpg" 
      },
      { 
        id: 4, 
        title: "Pride and Prejudice", 
        author: "Jane Austen", 
        summary: "A classic romance about love and societal expectations.", 
        cover: "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg" 
      },
      { 
        id: 5, 
        title: "The Catcher in the Rye", 
        author: "J.D. Salinger", 
        summary: "A coming-of-age story about teenage rebellion.", 
        cover: "https://m.media-amazon.com/images/I/91HPG31dTwL._AC_UF1000,1000_QL80_.jpg" 
      },
    ];
    return savedBooks;
  });

  const [newBook, setNewBook] = useState({ title: "", author: "", summary: "", cover: "" });
  const [user, setUser] = useState({
    name: "Diana",
    zipCode: "34235",
  });
  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  // Handle adding a new book
  const handleAddBook = (e) => {
    e.preventDefault();
    if (newBook.title && newBook.author && newBook.summary && newBook.cover) {
      const updatedBooks = [...books, { id: books.length + 1, ...newBook }];
      setBooks(updatedBooks);
      localStorage.setItem('books', JSON.stringify(updatedBooks));
      setNewBook({ title: "", author: "", summary: "", cover: "" }); // Clear the form
    }
  };

  // Render different sections based on activeSection state
  const renderSection = () => {
    switch (activeSection) {
      case "mySwaps":
        return (
          <div className="bookshelf">
            <h2>My Swaps</h2>
            <BookSearch />
            
            <div className="shelf mt-3">
              {books.map((book) => (
                <div key={book.id} className="book">
                  <img src={book.cover} alt={book.title} className="book-cover" />
                  <div className="book-details">
                    <h3>{book.title}</h3>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Summary:</strong> {book.summary}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Book Form */}
            <form onSubmit={handleAddBook} className="add-book-form">
              <h3>Add a New Book</h3>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newBook.title}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={newBook.author}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="summary"
                placeholder="Summary"
                value={newBook.summary}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="cover"
                placeholder="Cover Image URL"
                value={newBook.cover}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Add Book</button>
            </form>
          </div>
        );
      case "booksNearby":
        return <BookSwapMap userZipCode={user.zipCode} />;
      
      default:
        return <h2>My Swaps</h2>;
    }
  };

  // Logout handler: remove token and redirect to home/login page
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Change the route as needed for your app
  };

  return (
    <div className="app">
      <header className="header">
        <img src="BookSwapLogo.png" alt="Company Logo" className="logo" />
        <h1>Book Swapping Platform</h1>
      </header>

      <nav className="side-nav">
        <ul>
          <li onClick={() => setActiveSection("mySwaps")}>My Swaps</li>
          <li onClick={() => setActiveSection("booksNearby")}>Books Near By</li>
          <li onClick={handleLogout}>Log Out</li>

        </ul>
      </nav>

      <main className="main-content">{renderSection()}</main>
    </div>
  );
}
export default App;

// const AddBook = () => {
//   const [title, setTitle] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
  
//     try {
//       await axios.post(
//         "http://localhost:5003/api/book", // Backend API endpoint
//         { title },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include JWT token for authentication
//           },
//         }
//       );
//       setMessage("Book added successfully!");
//       setTitle(""); // Reset the title after successful submission
//     } catch (error) {
//       console.error("Error adding book:", error);
//       setMessage("Failed to add book.");
//     }
//   };

//   return (
//     <div>
//       <h2>Add a Book</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Add Book</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default AddBook;