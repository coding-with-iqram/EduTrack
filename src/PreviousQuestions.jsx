import React, { useState } from "react";
import { ShortQuestions, VeryShortQuestions } from "./prevques";

function PreviousQuestions() {
  const [selectedType, setSelectedType] = useState("veryshort"); // default view

  return (
    <div className="previous-questions p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Previous Questions</h2>
      <p className="mb-6 text-gray-700">
        Here you can view all your previous questions and answers categorized by
        type.
      </p>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded transition-all duration-300
    ${
      selectedType === "veryshort"
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-800"
    }
    hover:shadow-xl hover:scale-110 hover:-translate-y-1 transform
  `}
          onClick={() => setSelectedType("veryshort")}
        >
          Very Short Questions
        </button>

        <button
          className={`px-4 py-2 rounded transition-all duration-300
          ${
            selectedType === "short"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }
          hover:shadow-xl hover:scale-110 hover:-translate-y-1 transform
        `}
          onClick={() => setSelectedType("short")}
        >
          Short Questions
        </button>
      </div>

      {/* Very Short Questions */}
      {selectedType === "veryshort" && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Very Short Questions</h3>
          {VeryShortQuestions.map((q, index) => (
            <div
              key={index}
              className="p-4 border rounded-md mb-4 shadow-sm bg-white"
            >
              <p className="font-medium mb-1">
                Q{index + 1}. {q.question}
                <span className="text-sm text-gray-500 ml-2">
                  [Bakashibo- {q.years.join(", ")}]
                </span>
              </p>
              <p className="text-gray-700 whitespace-pre-line mt-1">
                Answer: {q.answer}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Short Questions */}
      {selectedType === "short" && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Short Questions</h3>
          {ShortQuestions.map((q, index) => (
            <div
              key={index}
              className="p-4 border rounded-md mb-4 shadow-sm bg-white"
            >
              <p className="font-medium mb-1">
                Q{index + 1}. {q.question}
                <span className="text-sm text-gray-500 ml-2">
                  [Bakashibo- {q.years.join(", ")}]
                </span>
              </p>
              <p className="text-gray-700 whitespace-pre-line mt-1">
                Answer: {q.answer}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default PreviousQuestions;
