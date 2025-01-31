import React, { useState } from "react";
import QuestionCard from "../components/question/QuestionCard";
import NavigationControls from "../components/question/NavigationControls";


const QuestionPage: React.FC = () => {
  // Hardcoded 15 sample questions
  const questions = [
    {
      id: 1,
      question: "What is the value of 2 + 3?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "5",
    },
    {
      id: 2,
      question: "Which number is even?",
      options: ["3", "5", "8", "9"],
      correctAnswer: "8",
    },
    {
      id: 3,
      question: "What comes after Monday?",
      options: ["Sunday", "Wednesday", "Friday", "Tuesday"],
      correctAnswer: "Tuesday",
    },
    {
      id: 4,
      question: "What is the capital of India?",
      options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
      correctAnswer: "Delhi",
    },
    {
      id: 5,
      question: "What is 7 + 8?",
      options: ["13", "14", "15", "16"],
      correctAnswer: "15",
    },
    {
      id: 6,
      question: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      correctAnswer: "8",
    },
    {
      id: 7,
      question: "Which is the largest ocean?",
      options: ["Atlantic", "Indian", "Pacific", "Arctic"],
      correctAnswer: "Pacific",
    },
    {
      id: 8,
      question: "What is 12 - 5?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7",
    },
    {
      id: 9,
      question: "What is 9 * 3?",
      options: ["24", "25", "27", "28"],
      correctAnswer: "27",
    },
    {
      id: 10,
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "India", "South Korea"],
      correctAnswer: "Japan",
    },
    {
      id: 11,
      question: "What is 6 * 7?",
      options: ["40", "42", "44", "48"],
      correctAnswer: "42",
    },
    
  ];

  // Track current question index
  const [currentIndex, setCurrentIndex] = useState(0);
  // Track selected answers for each question
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  // Track if the answer for a particular question is submitted
  const [isSubmitted, setIsSubmitted] = useState<boolean[]>(new Array(questions.length).fill(false));

  // Number of questions to display at a time
  const questionsPerPage = 10;

  // Get the questions to display on the current page
  const indexOfLastQuestion = currentIndex + questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const handleNext = () => {
    if (currentIndex + questionsPerPage < questions.length) {
      setCurrentIndex(currentIndex + questionsPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - questionsPerPage >= 0) {
      setCurrentIndex(currentIndex - questionsPerPage);
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
    <div className="container mt-4">
      <h2 className="text-center">Practice Questions</h2>

      {/* Displaying questions based on current page */}
      {currentQuestions.map((question, index) => (
        <div key={question.id} className="mb-4">
          <QuestionCard
            question={question}
            selectedAnswer={selectedAnswers[index]}
            setSelectedAnswer={(answer: string) => handleAnswerChange(index, answer)}
            isSubmitted={isSubmitted[index]}
            handleSubmit={() => handleSubmit(index)}
          />
        </div>
      ))}

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
