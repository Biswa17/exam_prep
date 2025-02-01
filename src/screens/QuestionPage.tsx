import React, { useState } from "react";
import QuestionCard from "../components/question/QuestionCard";
import NavigationControls from "../components/question/NavigationControls";

// Define type for choices structure
interface Choice {
  value: string;
  explanation: string | null;
}

// Define type for each question
interface Question {
  id: number;
  question_text: string;
  choices: { [key: string]: Choice };
  correct_option: string;
}

const QuestionPage: React.FC = () => {
  // Updated questions with new format
  const questions: Question[] = [
    {
      id: 1,
      question_text: "What is 2 + 3?",
      choices: {
        A: { value: "3", explanation: null },
        B: { value: "4", explanation: null },
        C: { value: "5", explanation: "Correct! 2 + 3 is 5." },
        D: { value: "6", explanation: "Incorrect. 2 + 3 is not 6." },
      },
      correct_option: "C",
    },
    {
      id: 2,
      question_text: "Which number is even?",
      choices: {
        A: { value: "3", explanation: "3 is an odd number." },
        B: { value: "5", explanation: "5 is an odd number." },
        C: { value: "8", explanation: "Correct! 8 is an even number." },
        D: { value: "9", explanation: "9 is an odd number." },
      },
      correct_option: "C",
    },
  ];

  // Track current question index
  const [currentIndex, setCurrentIndex] = useState(0);
  // Track selected answers for each question
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  // Track if the answer for a particular question is submitted
  const [isSubmitted, setIsSubmitted] = useState<boolean[]>(new Array(questions.length).fill(false));
  // Track selected difficulty
  const [difficulty, setDifficulty] = useState<string>("easy");

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(event.target.value);
  };

  // Number of questions to display at a time
  const questionsPerPage = 10;

  // Get the questions to display on the current page
  const indexOfLastQuestion = currentIndex + questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = (index: number) => {
    const newIsSubmitted = [...isSubmitted];
    newIsSubmitted[index] = true;
    setIsSubmitted(newIsSubmitted);
  };

  const handleAnswerChange = (index: number, answer: string) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };

  return (
    <div className="container mt-4" style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <button
          className="back-btn"
          style={{ padding: "10px 15px", fontSize: "14px", cursor: "pointer" }}
          onClick={() => window.history.back()} // Back button functionality
        >
          Back to Topics
        </button>
        <h2 className="topic-name" style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>
          Current Topic
        </h2>
        <select
          className="difficulty-selector"
          onChange={handleDifficultyChange}
          style={{ padding: "8px", fontSize: "14px", cursor: "pointer" }}
          value={difficulty}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>



      <h2 className="text-center">Practice Questions</h2>
      {/* Displaying questions */}
      <div>
        {questions.map((question, index) => (
          <div key={question.id}>
            <QuestionCard
              question={question}
              selectedAnswer={selectedAnswers[index]}
              setSelectedAnswer={(answer: string) => handleAnswerChange(index, answer)}
              isSubmitted={isSubmitted[index]}
              handleSubmit={() => handleSubmit(index)}
            />
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <NavigationControls
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        selectedAnswer={selectedAnswers}
      />
    </div>
  );
};

export default QuestionPage;
