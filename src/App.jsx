// ✅ App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

// ✅ Page components
import Home from "./Home";
import Quiz from "./Quiz";
import Notes from "./Notes";
import PreviousQuestions from "./PreviousQuestions";
import QuizAnswerReview from "./QuizAnswerReview";
import SuggestedVideo from "./SuggestedVideo";
import Layout from "./Layout";
import Navbar from "./Navbar";
// import OnboardingSurvey from "./OnboardingSurvey";
// import InlineThankYou from "./InlineThankYou";
import "./index.css";

/* const SurveyWrapper = ({ onComplete }) => {
  const navigate = useNavigate();
  const handleComplete = () => {
    localStorage.setItem("surveyCompleted", "true");
    onComplete();
    navigate("/thank-you");
  };
  return <OnboardingSurvey onComplete={handleComplete} />;
}; */

function AppContent() {
  const location = useLocation();
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    fetch("https://exam-preparation.glitch.me").catch((err) =>
      console.log("Server wake-up failed", err)
    );

    // const isSurveyComplete = localStorage.getItem("surveyCompleted");
    // if (!isSurveyComplete && location.pathname !== "/onboarding") {
    //   window.location.href = "/onboarding";
    // }

    // if (location.pathname === "/thank-you") {
    //   setShowThankYou(true);
    // } else {
    //   setShowThankYou(false);
    // }
  }, [location.pathname]);

  return (
    <>
      {/* 🟣 Thank you modal এর জন্য blur effect বন্ধ */}
      <div className="">
        <Routes>
          {/* <Route path="/onboarding" element={<SurveyWrapper onComplete={() => setShowThankYou(true)} />} /> */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="notes" element={<Notes />} />
            <Route path="previous-questions" element={<PreviousQuestions />} />
            <Route path="answers" element={<QuizAnswerReview />} />
            <Route path="suggested-videos" element={<SuggestedVideo />} />
            {/* <Route path="thank-you" element={<></>} /> */}
          </Route>
        </Routes>
      </div>

      {/* {showThankYou && <InlineThankYou />} */}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}