import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuestionCard from "../components/question/QuestionCard";
import NavigationControls from "../components/question/NavigationControls";

// API response interfaces
interface APIResponse {
  status: string;
  status_code: number;
  message: string;
  response: {
    questions: Question[];
    total_count: number;
    page_number: number;
    questions_per_page: number;
  };
}

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
  const { topicId } = useParams<{ topicId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/sf/questions/topic/${topicId}?page=${pageNumber}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }

        const data: APIResponse = await response.json();
        
        if (data.status !== 'success') {
          throw new Error(data.message || 'Failed to fetch questions');
        }

        setQuestions(data.response.questions);
        setTotalQuestions(data.response.total_count);
        // Reset selected answers and submitted state when questions change
        setSelectedAnswers(new Array(data.response.questions.length).fill(''));
        setIsSubmitted(new Array(data.response.questions.length).fill(false));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (topicId) {
      fetchQuestions();
    }
  }, [topicId, pageNumber]); // Refetch when topic or page changes

  // Track selected answers for each question
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  // Track if the answer for a particular question is submitted
  const [isSubmitted, setIsSubmitted] = useState<boolean[]>(new Array(questions.length).fill(false));


  const handleNext = () => {
    if ((pageNumber * 10) < totalQuestions) {
      setPageNumber(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber(prev => prev - 1);
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
      </div>



      <h2 className="text-center">Practice Questions</h2>
      
      {loading && (
        <div className="text-center p-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Displaying questions */}
      <div>
        {!loading && !error && questions.length > 0 && questions.map((question, index) => (
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
        currentIndex={(pageNumber - 1) * 10}
        totalQuestions={totalQuestions}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        selectedAnswer={selectedAnswers}
      />
    </div>
  );
};

export default QuestionPage;
