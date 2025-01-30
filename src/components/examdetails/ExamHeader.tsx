import React from 'react';

interface ExamHeaderProps {
  name: string;
  description: string;
}

const ExamHeader: React.FC<ExamHeaderProps> = ({ name, description }) => {
  return (
    <section className="hero text-white text-center py-5" style={{ backgroundColor: '#6cb2eb' }}>
      <div className="container">
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default ExamHeader;
