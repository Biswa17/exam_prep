import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="hero text-white text-center py-5" style={{ backgroundColor: '#6cb2eb' }}>
      <div className="container">
        <h1>Welcome to Exam Prep</h1>
        <p>Your platform designed to help students prepare for competitive exams.</p>
        <p>Track progress, get detailed feedback, and access personalized study plans.</p>
        <button className="btn" style={{ backgroundColor: '#28a745', color: '#fff' }}>Get Started</button>
      </div>
    </div>
  );
};

export default HeroSection;
