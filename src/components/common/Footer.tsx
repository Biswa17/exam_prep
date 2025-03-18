import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container py-5">
        <div className="row g-4">
          {/* About Section */}
          <div className="col-md-4 animate-fade-in">
            <h5 className="footer-heading mb-3">About Exam Prep</h5>
            <p className="footer-text">
              Exam Prep is your platform designed to help students prepare for competitive exams with ease and efficiency.
            </p>
          </div>

          {/* Useful Links */}
          <div className="col-md-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h5 className="footer-heading mb-3">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/features">Features</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h5 className="footer-heading mb-3">Connect With Us</h5>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-link">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="copyright text-center mt-5">
          <p>&copy; {new Date().getFullYear()} Exam Prep. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
