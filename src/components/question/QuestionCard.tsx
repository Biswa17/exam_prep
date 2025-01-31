import React from "react";
import "./QuestionCard.css";

interface QuestionCardProps {
  question: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
  };
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
  const optionLabels = ["A", "B", "C", "D"]; // Labels for options

  return (
    <div className="question-card card p-4">
      <h5 className="question-text">{question.question}</h5>
      <div className="options-container">
        {question.options.map((option, idx) => {
          // Determine if the option is the correct answer
          const isCorrect = option === question.correctAnswer;

          return (
            <div key={idx} className="custom-radio">
              <label
                className={`option-label ${
                  selectedAnswer === option && isSubmitted && option !== question.correctAnswer
                    ? "incorrect"
                    : ""
                } ${isCorrect && isSubmitted ? "correct" : ""}`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => setSelectedAnswer(option)}
                  disabled={isSubmitted} // Disable after submission
                  className="custom-radio-input"
                />
                <span className="custom-radio-label">
                  {optionLabels[idx]} - {option}
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

      {/* Show feedback after submission */}
      {isSubmitted && selectedAnswer === question.correctAnswer && (
        <p className="text-success mt-3">✅ Correct Answer!</p>
      )}

      {isSubmitted && selectedAnswer !== question.correctAnswer && (
        <p className="text-danger mt-3">
          ❌ Incorrect! Correct answer: {question.correctAnswer}
        </p>
      )}
    </div>
  );
};

export default QuestionCard;
