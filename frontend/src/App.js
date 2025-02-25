import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import AddBook from "./pages/Book"; // Assuming this is where the form is
import Navbar from "./components/Navbar";
import React from 'react';
import BookSearch from './components/BookSearch';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<AddBook />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

function Search() {
  return (
    <div className="Search">
      <h1>Open Library Book Search</h1>
      <p>test message to see if search is rendering</p>
      <BookSearch />
    </div>
  );
}


export { Search };
export default App;