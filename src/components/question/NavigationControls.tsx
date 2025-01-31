import React from "react";

interface NavigationControlsProps {
  currentIndex: number;
  totalQuestions: number;
  handleNext: () => void;
  handlePrevious: () => void;
  selectedAnswer: string[];
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentIndex,
  totalQuestions,
  handleNext,
  handlePrevious,
}) => {
  return (
    <div className="d-flex justify-content-between mt-5 mb-5">
      <button
        className="btn btn-secondary"
        onClick={handlePrevious}
        disabled={currentIndex === 0}
      >
        Previous 10
      </button>
      <button
        className="btn btn-secondary"
        onClick={handleNext}
        disabled={currentIndex + 10 >= totalQuestions}
      >
        Next 10
      </button>
    </div>
  );
};

export default NavigationControls;
