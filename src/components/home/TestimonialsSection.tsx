// src/components/TestimonialsSection.tsx

import React from 'react';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <h2 className="text-center mb-4">What Our Students Say</h2>
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="testimonial" style={{ border: '2px solid #ddd', borderRadius: '8px', padding: '20px' }}>
              <img
                src="https://www.w3schools.com/w3images/avatar2.png"
                alt="Student"
                style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '10px' }}
              />
              <p>"Exam Prep helped me improve my speed and accuracy! The practice tests are amazing."</p>
              <small>- Student A</small>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="testimonial" style={{ border: '2px solid #ddd', borderRadius: '8px', padding: '20px' }}>
              <img
                src="https://www.w3schools.com/w3images/avatar2.png"
                alt="Student"
                style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '10px' }}
              />
              <p>"The personalized study plan really helped me focus on my weak areas. Highly recommended!"</p>
              <small>- Student B</small>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="testimonial" style={{ border: '2px solid #ddd', borderRadius: '8px', padding: '20px' }}>
              <img
                src="https://www.w3schools.com/w3images/avatar2.png"
                alt="Student"
                style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '10px' }}
              />
              <p>"Thanks to Exam Prep, I was able to score higher than I expected! It's the perfect platform for exam prep."</p>
              <small>- Student C</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
