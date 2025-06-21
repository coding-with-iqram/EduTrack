import React, { useEffect, useState } from "react";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]); // ইউজারে উত্তর সংরক্ষণ 

  
  useEffect(() => {
    fetch("https://exam-preparation.glitch.me/api/quizzes")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setQuestions(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);
  
  const handleAnswer = (selectedAnswer) => {
    const currentQ = questions[currentQuestion];
    const isCorrect = 
      selectedAnswer.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
      if(isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }

     setAnswers((prevAnswers) => [
       ...prevAnswers,
       {
         question: currentQ.question,
         selected: selectedAnswer,
         correct: currentQ.correctAnswer,
       },
     ]);
    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setAnswers([]); // উত্তরগুলো ক্লিয়ার করা হচ্ছে
  };

  if (isLoading || questions.length === 0) { 
    return <div>Loading quiz questions...</div>;
  }
  
  return (
    <div
      className="quiz"
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {showScore ? (
        <div
          className="score-section"
          style={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <h2>
            Your Score: {score} out of {questions.length} (
            {((score / questions.length) * 100).toFixed(0)}%)
          </h2>

          <h3> Correct & Incorrect Answers: </h3>
          <ul style={{ textAlign: "left" }}>
            {answers.map((item, index) => (
              <li key={index} style={{ marginBottom: "10px"}}>
                <strong>{item.question}</strong>
                <br />
                {item.selected === item.correct ? (
                  <span style={{ color: "green" }}>
                    You answered: {item.selected} (Correct!)
                  </span>  
                ) : (
                  <span style={{ color: "red" }}>
                    You answered: {item.selected} | Correct Answer: {item.correct}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={restartQuiz}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div
          className="question-section"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <div
            className="question-count"
            style={{
              marginBottom: "10px",
              fontSize: "18px",
              color: "#6c757d",
            }}
          >
            Question {currentQuestion + 1}/{questions.length}
          </div>
          <div
            className="question-text"
            style={{
              marginBottom: "20px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {questions[currentQuestion].question}
          </div>
          <div
            className="answer-section"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                style={{
                  padding: "10px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #dee2e6",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
