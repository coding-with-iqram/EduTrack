import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Quiz from "./Quiz";
import Notes from "./Notes";
import PreviousQuestions from "./PreviousQuestions";
import Navbar from "./Navbar";
import QuizAnswerReview from "./QuizAnswerReview";
import "./index.css";

export default function App() {
  useEffect(() => {
    fetch("https://exam-preparation.glitch.me").catch((err) =>
      console.log("Server wake-up failed", err)
    );
  }, []);

  return (
    <Router>
      {/* ✅ Navbar is now fixed */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <Navbar />
      </div>

      {/* ✅ Push content below the fixed navbar */}
      <div className="pt-[64px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/previous-questions" element={<PreviousQuestions />} />
          <Route path="/answers" element={<QuizAnswerReview />} />
        </Routes>
      </div>
    </Router>
  );
}