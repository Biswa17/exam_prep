import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section animate-fade-in">
      <div className="container">
        <h1 className="mb-4">Welcome to Exam Prep</h1>
        <p className="lead mb-3">Your platform designed to help students prepare for competitive exams.</p>
        <p className="mb-4">Track progress, get detailed feedback, and access personalized study plans.</p>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </div>
  );
};

export default HeroSection;
