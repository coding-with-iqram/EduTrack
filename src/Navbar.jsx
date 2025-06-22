// src/Navbar.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo linked to home */}
      <Link to="/" className="logo">
        <img
          src="/mortarboard.png"
          alt="EduTrack Logo"
          className="logo-icon"
        />
        <span className="logo-text">EduTrack</span>
      </Link>

      {/* Navigation Links */}
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/previous-questions">Previous Questions</Link>
      </div>
    </nav>
  );
};

export default Navbar;