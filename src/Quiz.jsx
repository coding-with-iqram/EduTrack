import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [animateQuestion, setAnimateQuestion] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const res = await fetch("https://exam-preparation.glitch.me/api/quizzes");
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error("Quiz load failed:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuiz();
  }, []);

  useEffect(() => {
    if (showScore) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  }, [showScore]);

  useEffect(() => {
    if (showScore || isLoading || questions.length === 0) return;
    const timer = setTimeout(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleAnswer(null);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showScore, isLoading, currentQuestion]);

  useEffect(() => {
    const previous = answers[currentQuestion]?.selected || null;
    setSelectedOption(previous);
  }, [currentQuestion]);

  const handleAnswer = (selected) => {
    const currentQ = questions[currentQuestion];
    const isCorrect =
      selected &&
      selected.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();

    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = {
        question: currentQ.question,
        selected,
        correct: currentQ.correctAnswer,
      };
      return updated;
    });

    if (isCorrect) {
      const alreadyCorrect =
        answers[currentQuestion]?.selected?.trim().toLowerCase() ===
        currentQ.correctAnswer.trim().toLowerCase();
      if (!alreadyCorrect) setScore((prev) => prev + 1);
    }

    setSelectedOption(null);
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setTimeout(() => {
        setCurrentQuestion(next);
        setTimeLeft(10);
        setAnimateQuestion(true);
      }, 300);
    } else {
      setTimeout(() => setShowScore(true), 300);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setAnswers([]);
    setSelectedOption(null);
    setTimeLeft(10);
    setAnimateQuestion(true);
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = !!answers[currentQuestion]?.selected;
  const progress = ((currentQuestion + (isAnswered ? 1 : 0)) / questions.length) * 100;
  const timerProgress = (timeLeft / 10) * 100;

  if (isLoading || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-blue-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full font-sans">
        {!showScore && (
          <div className="w-full h-2 bg-gray-300 rounded mt-[80px] mb-4">
            <div
              className="h-full"
              style={{
                width: `${progress}%`,
                backgroundColor: "#3b82f6",
                transition: "width 0.5s ease",
              }}
            />
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.15)]">
          {showScore ? (
            <>
              <div className="flex justify-center">
                <img
                  src="/icon.jpg"
                  alt="Score Icon"
                  className="w-60 sm:w-72 mb-4 rounded-lg"
                />
              </div>

              <div className="w-full max-w-[120px] mx-auto bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg shadow-md px-2.5 py-2 text-center mb-6 border border-purple-400">
                <p className="text-xs font-bold text-white tracking-wide uppercase drop-shadow-sm">
                  Your Score
                </p>
                <h2 className="text-3xl font-extrabold text-white mt-1 drop-shadow">
                  {score} / {questions.length}
                </h2>
              </div>

              <div className="flex justify-center mt-2">
                <button
                  onClick={() =>
                    navigate("/answers", { state: { answers, questions } })
                  }
                  className="px-4 py-1.5 border border-purple-600 bg-white text-black font-semibold rounded-full hover:bg-purple-50 transition"
                >
                  See Correct Answer
                </button>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={restartQuiz}
                  className="px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                >
                  Start Again
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] text-gray-400 font-medium">
                  Question {currentQuestion + 1}/{questions.length}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  Time: {timeLeft}s
                </span>
              </div>

              <div className="w-full h-2 bg-gray-300 rounded mb-6">
                <div
                  className="h-full"
                  style={{
                    width: `${timerProgress}%`,
                    backgroundColor: "#8b5cf6",
                    transition: "width 1s linear",
                  }}
                />
              </div>

              <h3
                className={`text-lg font-bold mb-6 pl-4 transition-opacity duration-500 ${
                  animateQuestion ? "opacity-100" : "opacity-0"
                }`}
                onAnimationEnd={() => setAnimateQuestion(false)}
              >
                {currentQ.question}
              </h3>

              <div className="flex flex-col items-center space-y-3 mt-4">
                {currentQ.options.map((option, idx) => (
                  <label
                    key={idx}
                    className={`w-full max-w-xs flex items-center gap-4 px-3 py-1.5 border rounded-md cursor-pointer transition text-sm ${
                      selectedOption === option
                        ? "bg-gray-100 border-gray-300"
                        : "bg-white border-gray-300 hover:bg-purple-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedOption === option}
                      onChange={() => setSelectedOption(option)}
                      className="form-checkbox text-purple-600 h-4 w-4 transition-transform duration-200"
                    />
                    <span className="text-gray-700">
                      {option.replace(/^[a-d]\)\s*/i, "")}
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => setCurrentQuestion((prev) => prev - 1)}
                  disabled={currentQuestion === 0}
                  className="px-6 py-2 rounded-full border border-gray-400 text-gray-800 font-medium hover:bg-gray-100 transition disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => handleAnswer(selectedOption)}
                  disabled={!selectedOption}
                  className={`px-6 py-2 rounded-full transition font-medium ${
                    selectedOption
                      ? "bg-purple-600 text-white hover:bg-purple-700 animate-pulse"
                      : "bg-purple-300 text-white opacity-60 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
