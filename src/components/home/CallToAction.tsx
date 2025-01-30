// src/components/CallToAction.tsx

import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <section className="cta-section text-center py-5" style={{ backgroundColor: '#28a745', color: '#fff' }}>
      <div className="container">
        <h2>Start Your Exam Prep Journey Today!</h2>
        <p>Sign up and get access to personalized study plans, practice tests, and more.</p>
        <button className="btn btn-light">Get Started</button>
      </div>
    </section>
  );
};

export default CallToAction;
