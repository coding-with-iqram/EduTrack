import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Quiz from "./Quiz";
import "./styles.css";
import Notes from "./Notes";
import PreviousQuestions from "./PreviousQuestions";
import InstallPrompt from "./InstallPrompt";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/previous-questions">Previous Questions</Link>
        <div>
          <InstallPrompt/>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/previous-questions" element={<PreviousQuestions />} />
      </Routes>
    </Router>
  );
}
