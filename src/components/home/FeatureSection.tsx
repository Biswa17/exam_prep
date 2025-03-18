import React from 'react';

const FeatureSection: React.FC = () => {
  return (
    <section className="key-features">
      <div className="container">
        <h2 className="text-center mb-5 animate-fade-in">Key Features</h2>
      
        <div id="featureCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="d-flex justify-content-center align-items-center">
                <div className="feature-card text-center mx-auto" style={{ maxWidth: '400px' }}>
                  <h3>Practice Tests</h3>
                  <p>Take timed and untimed tests to assess your progress and improve your skills.</p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="d-flex justify-content-center align-items-center">
                <div className="feature-card text-center mx-auto" style={{ maxWidth: '400px' }}>
                  <h3>Personalized Learning Paths</h3>
                  <p>Get study plans tailored to your strengths and weaknesses for optimal results.</p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="d-flex justify-content-center align-items-center">
                <div className="feature-card text-center mx-auto" style={{ maxWidth: '400px' }}>
                  <h3>Detailed Feedback</h3>
                  <p>Receive instant feedback with score breakdown and suggestions for improvement.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#featureCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#featureCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
