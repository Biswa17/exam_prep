import React from 'react';
import { Link } from 'react-router-dom';

interface PracticeCTAProps {
  examId: number;
}

const PracticeCTA: React.FC<PracticeCTAProps> = ({ examId }) => {
  return (
    <section className="text-center py-5" style={{ backgroundColor: '#28a745', color: '#fff' }}>
      <div className="container">
        <h2>Start Practicing Now!</h2>
        <p>Select a topic or previous paper to begin practicing questions.</p>
        <Link to={`/exam/${examId}/practice`} className="btn btn-light">Start Practice</Link>
      </div>
    </section>
  );
};

export default PracticeCTA;
