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

import "./index.css";
import OnboardingSurvey from "./OnboardingSurvey";
import InlineThankYou from "./InlineThankYou";

// ✅ SurveyWrapper → now accepts `onComplete` and stores its return value
const SurveyWrapper = ({ onComplete }) => {
  const navigate = useNavigate();

  const handleComplete = () => {
    localStorage.setItem("surveyCompleted", "true");

    // 🟡 Call the onComplete and get return value (data)
    const result = onComplete(); // ⬅️ get the data returned from parent
    console.log("Received from onComplete:", result);

    // তুমি চাইলে result data use করতে পারো এখানে

    navigate("/thank-you");
  };

  return <OnboardingSurvey onDone={handleComplete} />; // 🟢 assume survey calls this when done
};

function AppContent() {
  const location = useLocation();
  const [showThankYou, setShowThankYou] = useState(false);
  const [thankYouData, setThankYouData] = useState(null); // 🟡 store data from onComplete

  useEffect(() => {
    fetch("https://exam-preparation.glitch.me").catch((err) =>
      console.log("Server wake-up failed", err)
    );

    const isSurveyComplete = localStorage.getItem("surveyCompleted");
    if (!isSurveyComplete && location.pathname !== "/onboarding") {
      window.location.href = "/onboarding";
    }

    if (location.pathname === "/thank-you") {
      setShowThankYou(true);
    } else {
      setShowThankYou(false);
    }
  }, [location.pathname]);

  return (
    <>
      <div className="">
        <Routes>
          <Route
            path="/onboarding"
            element={
             <SurveyWrapper
  onComplete={(data) => {
    setShowThankYou(true);
    setThankYouData(data); // ✅ full form data
    return data;
  }}
/>

            }
          />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="notes" element={<Notes />} />
            <Route path="previous-questions" element={<PreviousQuestions />} />
            <Route path="answers" element={<QuizAnswerReview />} />
            <Route path="suggested-videos" element={<SuggestedVideo />} />
            <Route path="thank-you" element={<></>} />
          </Route>
        </Routes>
      </div>

      {/* ✅ Show Thank You modal with data */}
      {showThankYou && <InlineThankYou data={thankYouData} />}
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
