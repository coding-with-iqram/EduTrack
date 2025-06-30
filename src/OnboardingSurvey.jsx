// ✅ OnboardingSurvey.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// const questions = [
//   {
//     name: "level",
//     label: "1. What is your current level/class?",
//     options: ["Admission Test", "Mid Exam", "Diploma Exam"],
//   },
//   {
//     name: "favoriteSubject",
//     label: "2. What is your favorite subject?",
//     options: ["App Development", "Cyber Security", "English", "Microproccessor"],
//   },
//   {
//     name: "mainGoal",
//     label: "3. What is your main goal for using this app?",
//     options: [
//       "To do well in board exams",
//       "Admission test preparation",
//       "Job exam preparation",
//       "For general learning",
//       "Others",
//     ],
//   },
//   {
//     name: "studyHours",
//     label: "5. How many hours do you study daily?",
//     options: ["Less than 1 hour", "1–2 hours", "2–4 hours", "More than 4 hours"],
//   },
//   {
//     name: "learningStyle",
//     label: "7. What is your preferred learning style?",
//     options: [
//       "Quizzes / Model Tests",
//       "Notes / Flashcards",
//       "Video Tutorials",
//       "End-of-chapter revision",
//     ],
//   },
//   {
//     name: "contentPreference",
//     label: "8. What type of content do you prefer?",
//     options: [
//       "Text-based (notes/eBooks)",
//       "Video tutorials",
//       "Audio lectures",
//       "Interactive quizzes/games",
//       "Live classes or webinars",
//     ],
//   },
//   {
//     name: "helpfulSupport",
//     label: "9. Which kind of help would benefit your preparation the most?",
//     options: [
//       "Study timetable or planner",
//       "Regular quizzes and mock tests",
//       "Revision notes and flashcards",
//       "Expert feedback",
//       "Study group or discussion forum",
//     ],
//   },
//   {
//     name: "improvementAreas",
//     label: "10. Which areas do you want to improve the most?",
//     options: [
//       "Concept clarity",
//       "Problem-solving skills",
//       "Time management during exams",
//       "Speed and accuracy",
//     ],
//   },
//   {
//     name: "preparationLevel",
//     label: "11. How would you rate your current preparation level?",
//     options: [
//       "I’m just getting started",
//       "I have some experience",
//       "I’m at an intermediate level",
//       "I’m quite experienced",
//       "I want to improve with regular practice",
//     ],
//   },
//   {
//     name: "studyTime",
//     label: "12. When do you usually study?",
//     options: ["Morning", "Afternoon", "Evening", "Night", "No fixed time"],
//   },
// ];

const OnboardingSurvey = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const containerRef = useRef(null);

  // const currentQuestion = questions[currentStep];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentStep]);

  const handleOptionClick = (value) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    // setFormData((prev) => ({
    //   ...prev,
    //   [currentQuestion.name]: selectedOption,
    // }));

    const nextStep = currentStep + 1;

    // if (nextStep < questions.length) {
    //   setCurrentStep(nextStep);
    //   setSelectedOption("");
    // } else {
    localStorage.setItem("surveyCompleted", "true");
    if (onComplete) onComplete();
    navigate("/thank-you");
    // }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 to-purple-100 text-gray-900 flex flex-col items-center justify-center">
      {/* Survey Content removed */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-indigo-700">Survey Disabled</h1>
        <button
          onClick={handleNext}
          className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700"
        >
          Continue to App
        </button>
      </div>
    </div>
  );
};

export default OnboardingSurvey;
