import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();
  const examId = new URLSearchParams(location.search).get('examId');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(() => {
    // First check URL parameters for page number
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page_number');
    if (pageParam) {
      return parseInt(pageParam, 10);
    }
    // Fall back to localStorage if no URL param
    const saved = localStorage.getItem(`pageNumber_${topicId}`);
    return saved ? parseInt(saved, 10) : 1;
  });
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Initialize state from localStorage or default values
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>(() => {
    const saved = localStorage.getItem(`selectedAnswers_${topicId}`);
    return saved ? JSON.parse(saved) : {};
  });
  
  const [isSubmitted, setIsSubmitted] = useState<{ [key: string]: boolean }>(() => {
    const saved = localStorage.getItem(`isSubmitted_${topicId}`);
    return saved ? JSON.parse(saved) : {};
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`selectedAnswers_${topicId}`, JSON.stringify(selectedAnswers));
    localStorage.setItem(`isSubmitted_${topicId}`, JSON.stringify(isSubmitted));
    localStorage.setItem(`pageNumber_${topicId}`, pageNumber.toString());
  }, [selectedAnswers, isSubmitted, pageNumber, topicId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Log the API request URL for debugging
        const apiUrl = `${import.meta.env.VITE_BASE_URL}/sf/questions/topic/${topicId}?page_number=${pageNumber}`;
        console.log('Fetching questions from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }

        const data: APIResponse = await response.json();
        console.log('API Response:', data); // Log the API response for debugging
        
        if (data.status !== 'success') {
          throw new Error(data.message || 'Failed to fetch questions');
        }

        setQuestions(data.response.questions);
        setTotalQuestions(data.response.total_count);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };

    if (topicId) {
      fetchQuestions();
    }
  }, [topicId, pageNumber]); // Refetch when topic or page changes

  const handleNext = () => {
    const totalPages = Math.ceil(totalQuestions / 10);
    const nextPage = pageNumber + 1;
    if (nextPage <= totalPages) {
      console.log('Moving to next page:', nextPage); // Debug log
      setPageNumber(nextPage);
      // Update URL with new page number while preserving examId
      const url = new URL(window.location.href);
      url.searchParams.set('page_number', nextPage.toString());
      window.history.pushState({}, '', url.toString());
      // Scroll to top
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (pageNumber > 1) {
      console.log('Moving to previous page:', pageNumber - 1); // Debug log
      setPageNumber(prev => prev - 1);
      // Update URL with new page number while preserving examId
      const url = new URL(window.location.href);
      url.searchParams.set('page_number', (pageNumber - 1).toString());
      window.history.pushState({}, '', url.toString());
      // Scroll to top
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (questionId: number) => {
    setIsSubmitted(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleBackToTopics = () => {
    if (examId) {
      navigate(`/exam/${examId}`);
    } else {
      // If somehow examId is missing, navigate to exams list
      console.error('No exam ID found in URL parameters');
      navigate('/exam');
    }
  };

  return (
    <div className="container mt-4" style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <button
          className="back-btn"
          style={{ padding: "10px 15px", fontSize: "14px", cursor: "pointer" }}
          onClick={handleBackToTopics}
        >
          Back to Topics
        </button>
        <h2 className="topic-name" style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>
          Current Topic
        </h2>
      </div>

      <h2 className="text-center">Practice Questions</h2>
      
      {/* Debug information */}
      <div className="text-center mb-3">
        <small className="text-muted">
          Page {pageNumber} | Total Questions: {totalQuestions} | Questions Loaded: {questions.length}
        </small>
      </div>
      
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
        {!loading && !error && questions.length > 0 && questions.map((question) => (
          <div key={question.id}>
            <QuestionCard
              question={question}
              selectedAnswer={selectedAnswers[question.id] || ''}
              setSelectedAnswer={(answer: string) => handleAnswerChange(question.id, answer)}
              isSubmitted={isSubmitted[question.id] || false}
              handleSubmit={() => handleSubmit(question.id)}
            />
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <NavigationControls
        currentIndex={pageNumber - 1}
        totalQuestions={totalQuestions}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        selectedAnswer={Object.values(selectedAnswers)}
        isLoading={loading}
      />
    </div>
  );
};

export default QuestionPage;
