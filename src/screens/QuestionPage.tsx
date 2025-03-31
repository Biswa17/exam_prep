import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import QuestionCard from "../components/question/QuestionCard";
import NavigationControls from "../components/question/NavigationControls";
import { apiRequest } from "../utils/apiHelper";

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
  selected_option: string | null;
}

const QuestionPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const examId = new URLSearchParams(location.search).get("examId");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(() => {
    // First check URL parameters for page number
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page_number");
    if (pageParam) {
      return parseInt(pageParam, 10);
    }
    // Fall back to localStorage if no URL param
    const saved = localStorage.getItem(`pageNumber_${topicId}`);
    return saved ? parseInt(saved, 10) : 1;
  });
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [filters, setFilters] = useState({
    solved: false,
    unsolved: true
  });

  const handleFilterChange = (filterType: 'solved' | 'unsolved', checked: boolean) => {
    // If trying to uncheck and the other filter is also unchecked, prevent the change
    if (!checked && !filters[filterType === 'solved' ? 'unsolved' : 'solved']) {
      return; // Don't allow both to be unchecked
    }
    setFilters(prev => ({...prev, [filterType]: checked}));
    setPageNumber(1);
    // Update URL with new page number while preserving examId
    const url = new URL(window.location.href);
    url.searchParams.set("page_number", "1");
    window.history.pushState({}, "", url.toString());
  };

  // Initialize state from localStorage or default values
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>(() => {
    const saved = localStorage.getItem(`selectedAnswers_${topicId}`);
    return saved ? JSON.parse(saved) : {};
  });

  const [isSubmitted, setIsSubmitted] = useState<{ [key: string]: boolean }>(
    () => {
      const saved = localStorage.getItem(`isSubmitted_${topicId}`);
      return saved ? JSON.parse(saved) : {};
    }
  );

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      `selectedAnswers_${topicId}`,
      JSON.stringify(selectedAnswers)
    );
    localStorage.setItem(`isSubmitted_${topicId}`, JSON.stringify(isSubmitted));
    localStorage.setItem(`pageNumber_${topicId}`, pageNumber.toString());
  }, [selectedAnswers, isSubmitted, pageNumber, topicId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        // Determine status parameter based on filters
        let statusParam = '';
        if (filters.solved && !filters.unsolved) {
          statusParam = '&status=solved';
        } else if (!filters.solved && filters.unsolved) {
          statusParam = '&status=unsolved';
        }

        const data = await apiRequest<{
          questions: any[];
          total_count: number;
        }>(`/api/sf/questions/topic/${topicId}?page=${pageNumber}${statusParam}`, "GET");
        console.log("API Response:", data); // Log the API response for debugging

        if (data.status === "success" && data.response) {
          if(Array.isArray(data.response.questions) && data.response.questions.length > 0) {
            setQuestions(data.response.questions || []);
            setTotalQuestions(data.response.total_count);
            
            // Update selectedAnswers with API's selected_option when available
            const apiSelectedAnswers = { ...selectedAnswers };
            const apiSubmittedState = { ...isSubmitted };
            
            data.response.questions.forEach(question => {
              if (question.selected_option) {
                // If API has a selected_option, use the corresponding choice value
                const optionKey = question.selected_option;
                const optionValue = question.choices[optionKey]?.value;
                if (optionValue) {
                  apiSelectedAnswers[question.id] = optionKey
                  // Also mark the question as submitted
                  apiSubmittedState[question.id] = true;
                }
              }
            });
            
            setSelectedAnswers(apiSelectedAnswers);
            setIsSubmitted(apiSubmittedState);
          }
          else{
            setQuestions([]);
            setTotalQuestions(1
            );
          }
        } else {
          setError(data.message || "Failed to fetch questions");
        }

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (topicId) {
      fetchQuestions();
    }
  }, [topicId, pageNumber, filters]); // Refetch when topic, page, or filters change

  // Common function to submit user answers
  const submitUserAnswers = async () => {
    try {
      await apiRequest(
        `/api/sf/questions/user-answer-by-topic`,
        "POST",
        {
          topic_id: Number(topicId),
          answers: Object.entries(selectedAnswers).map(([questionId, option]) => ({
            question_id: Number(questionId),
            selected_option: option
          }))
        }
      );
      console.log("Answers submitted successfully."); // Optional: Add success log
    } catch (error) {
      console.error("Submission failed:", error);
      // Optionally, you could re-throw the error or return a status
      // throw error; // Uncomment if you want calling functions to handle the error
    }
  };

  const handleNext = async () => {
    await submitUserAnswers(); // Call the common function

    const totalPages = Math.ceil(totalQuestions / 10);
    const nextPage = pageNumber + 1;
    if (nextPage <= totalPages) {
      console.log("Moving to next page:", nextPage);
      setPageNumber(nextPage);
      const url = new URL(window.location.href);
      url.searchParams.set("page_number", nextPage.toString());
      window.history.pushState({}, "", url.toString());
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = async () => {
    await submitUserAnswers(); // Call the common function

    if (pageNumber > 1) {
      console.log("Moving to previous page:", pageNumber - 1);
      setPageNumber((prev) => prev - 1);
      const url = new URL(window.location.href);
      url.searchParams.set("page_number", (pageNumber - 1).toString());
      window.history.pushState({}, "", url.toString());
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (questionId: number) => {
    setIsSubmitted((prev) => ({
      ...prev,
      [questionId]: true,
    }));
  };

  const handleAnswerChange = (questionId: number, optionKey: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  const handleBackToTopics = async () => {
    try {
      await submitUserAnswers(); // Call the common function
    } catch (error) {
      // Error is already logged in submitUserAnswers, but you could add more handling here if needed
      console.error("Error during final submission:", error);
    } finally {
      // Clear local storage and state
      setSelectedAnswers({});
      setIsSubmitted({});
      localStorage.removeItem(`selectedAnswers_${topicId}`);
      localStorage.removeItem(`isSubmitted_${topicId}`);

      // Navigate back
      if (examId) {
        navigate(`/exam/${examId}`);
      } else {
        navigate("/exam");
      }
    }
  };

  return (
    <div
      className="container mt-4"
      style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}
    >
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button
          className="back-btn"
          style={{ padding: "10px 15px", fontSize: "14px", cursor: "pointer" }}
          onClick={handleBackToTopics}
        >
          Back to Topics
        </button>
        <h2
          className="topic-name"
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            margin: 0,
            marginRight: "20px",
          }}
        >
          Current Topic
        </h2>
        <div
          className="filter-container"
          style={{
            background: "#f8f9fa",
            padding: "12px 20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          }}
        >
          <div style={{ 
            fontSize: "14px", 
            color: "#6c757d", 
            marginBottom: "4px",
            fontWeight: 500
          }}>
            Filter Questions
          </div>
          <div style={{
            display: "flex",
            gap: "16px",
            alignItems: "center"
          }}>
            <label 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e9ecef"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                padding: "4px 8px",
                borderRadius: "6px",
                transition: "background-color 0.2s"
              }}>
              <input 
                type="checkbox" 
                name="filter" 
                value="solved" 
                checked={filters.solved}
                onChange={(e) => handleFilterChange('solved', e.target.checked)}
                style={{
                  width: "16px",
                  height: "16px",
                  cursor: "pointer"
                }}
              />
              <span style={{ fontSize: "14px" }}>Solved</span>
            </label>
            <label 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e9ecef"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                padding: "4px 8px",
                borderRadius: "6px",
                transition: "background-color 0.2s"
              }}>
              <input 
                type="checkbox" 
                name="filter" 
                value="unsolved" 
                checked={filters.unsolved}
                onChange={(e) => handleFilterChange('unsolved', e.target.checked)}
                style={{
                  width: "16px",
                  height: "16px",
                  cursor: "pointer"
                }}
              />
              <span style={{ fontSize: "14px" }}>Unsolved</span>
            </label>
          </div>
        </div>
      </div>

      <h2 className="text-center">Practice Questions</h2>

      {/* Debug information */}
      <div className="text-center mb-3">
        <small className="text-muted">
          Page {pageNumber} | Total Questions: {totalQuestions} | Questions
          Loaded: {questions.length}
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
        {!loading &&
          !error &&
          questions.length > 0 &&
          questions.map((question) => (
            <div key={question.id}>
              <QuestionCard
                question={question}
                selectedAnswer={selectedAnswers[question.id] || ""}
                setSelectedAnswer={(optionKey: string) =>
                  handleAnswerChange(question.id, optionKey)
                }
                isSubmitted={isSubmitted[question.id] || false}
                handleSubmit={() => handleSubmit(question.id)}
              />
            </div>
          ))}
        
        {!loading && !error && questions.length === 0 && (
          <div className="alert alert-info mt-4" role="alert" style={{ 
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: '#e9f5ff',
            borderRadius: '8px',
            border: '1px solid #b6d4fe'
          }}>
            <h4 style={{ marginBottom: '1rem' }}>
              {filters.solved && !filters.unsolved 
                ? "No solved questions found"
                : !filters.solved && filters.unsolved 
                ? "No unsolved questions found" 
                : "No questions available for this topic"}
            </h4>
            <p style={{ marginBottom: '0' }}>
              {filters.solved || filters.unsolved 
                ? "Try adjusting your filters or contact support if you believe this is an error."
                : "Try adjusting your filters or contact support if you believe this is an error."}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <NavigationControls
        currentIndex={pageNumber - 1}
        totalQuestions={totalQuestions}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        selectedAnswer={Object.values(selectedAnswers || {})}
        isLoading={loading}
      />
    </div>
  );
};

export default QuestionPage;
