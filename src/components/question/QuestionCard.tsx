import React, { useState } from "react";
import Latex from "react-latex-next";
import "./QuestionCard.css";

// Define types for the question and choices
interface Choice {
  value: string;
  explanation: string | null;
}

interface Question {
  id: number;
  question_text: string;
  choices: { [key: string]: Choice };
  correct_option: string;
}

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  isSubmitted: boolean;
  handleSubmit: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  setSelectedAnswer,
  isSubmitted,
  handleSubmit,
}) => {
  const [selectedOptionKey, setSelectedOptionKey] = useState<string | null>(null);
  const optionLabels = ["A", "B", "C", "D"]; // Labels for options

  const handleAnswerSelect = (value: string, key: string) => {
    setSelectedAnswer(value);
    setSelectedOptionKey(key); // Store the selected option key (A, B, C, or D)
  };

  return (
    <div className="question-card card p-4">
      <h5 className="question-text"><Latex>{question.question_text}</Latex></h5>
      <div className="options-container">
        {Object.keys(question.choices).map((optionKey, idx) => {
          const option = question.choices[optionKey];
          const isCorrect = optionKey === question.correct_option;

          return (
            <div key={idx} className="custom-radio">
              <label
                  className={`option-label ${selectedAnswer === optionKey &&
                  isSubmitted &&
                  optionKey !== question.correct_option
                  ? "incorrect"
                  : ""
                  } ${isCorrect && isSubmitted ? "correct" : ""}`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={optionKey}
                  checked={selectedAnswer === optionKey}
                  onChange={() => handleAnswerSelect(optionKey, optionKey)} // Update selected option key
                  disabled={isSubmitted} // Disable after submission
                  className="custom-radio-input"
                />
                <span className="custom-radio-label">
                  {optionKey} - <Latex>{option.value}</Latex>
                </span>
              </label>
            </div>
          );
        })}
      </div>

      <button
        className={`submit-btn btn mt-3 ${isSubmitted ? "answered" : ""}`}
        onClick={handleSubmit}
        disabled={isSubmitted}
      >
        {isSubmitted ? "Answered" : "Submit"}
      </button>

      {isSubmitted && (
        <>
          {selectedAnswer === question.correct_option ? (
            <p className="text-success mt-3">✅ Correct Answer!</p>
          ) : (
            <p className="text-danger mt-3">
              ❌ Incorrect! Correct answer: {question.correct_option}
            </p>
          )}

          {/* Always display explanation for selected answer */}
          {selectedOptionKey && (
            <p
              style={{
                fontSize: "1rem",
      marginTop: "10px",
      fontStyle: "italic",
      color: "#555",
                
              }}
            >
              {question.choices[selectedOptionKey]?.explanation}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionCard;
