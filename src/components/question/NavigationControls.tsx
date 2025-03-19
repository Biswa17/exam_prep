import React from "react";

interface NavigationControlsProps {
  currentIndex: number;
  totalQuestions: number;
  handleNext: () => void;
  handlePrevious: () => void;
  selectedAnswer: string[];
  isLoading: boolean;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentIndex,
  totalQuestions,
  handleNext,
  handlePrevious,
  isLoading,
}) => {
  // Calculate current page and total pages
  const currentPage = currentIndex + 1;
  const totalPages = Math.ceil(totalQuestions / 10);

  return (
    <div className="d-flex justify-content-between align-items-center mt-5 mb-5">
      <button
        className="btn btn-secondary"
        onClick={handlePrevious}
        disabled={currentPage === 1 || isLoading}
      >
        {isLoading ? (
          <span>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Loading...
          </span>
        ) : (
          'Previous'
        )}
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="btn btn-primary"
        onClick={handleNext}
        disabled={currentPage >= totalPages || isLoading}
      >
        {isLoading ? (
          <span>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Loading...
          </span>
        ) : (
          'Next'
        )}
      </button>
    </div>
  );
};

export default NavigationControls;
