import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-dark text-light">
      <div className="container py-5">
        <div className="row g-4">
          {/* About Section */}
          <div className="col-lg-3 col-md-6 animate-fade-in">
            <h5 className="footer-heading mb-3 text-primary">About Exam Prep</h5>
            <p className="footer-text text-light-emphasis">
              Exam Prep is your comprehensive platform designed to help students excel in competitive exams. We provide quality study materials, practice tests, and personalized learning paths.
            </p>
            <div className="mt-3">
              <button className="btn btn-outline-primary">Get Started</button>
            </div>
          </div>

          {/* Resources */}
          <div className="col-lg-3 col-md-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h5 className="footer-heading mb-3 text-primary">Study Resources</h5>
            <ul className="footer-links list-unstyled">
              <li><a href="/resources" className="text-light-emphasis text-decoration-none">Study Materials</a></li>
              <li><a href="/practice-tests" className="text-light-emphasis text-decoration-none">Practice Tests</a></li>
              <li><a href="/video-lectures" className="text-light-emphasis text-decoration-none">Video Lectures</a></li>
              <li><a href="/question-bank" className="text-light-emphasis text-decoration-none">Question Bank</a></li>
              <li><a href="/mock-tests" className="text-light-emphasis text-decoration-none">Mock Tests</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h5 className="footer-heading mb-3 text-primary">Quick Links</h5>
            <ul className="footer-links list-unstyled">
              <li><a href="/" className="text-light-emphasis text-decoration-none">Home</a></li>
              <li><a href="/features" className="text-light-emphasis text-decoration-none">Features</a></li>
              <li><a href="/about" className="text-light-emphasis text-decoration-none">About Us</a></li>
              <li><a href="/pricing" className="text-light-emphasis text-decoration-none">Pricing</a></li>
              <li><a href="/contact" className="text-light-emphasis text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-lg-3 col-md-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h5 className="footer-heading mb-3 text-primary">Connect With Us</h5>
            <div className="contact-info mb-3">
              <p className="mb-2 text-light-emphasis"><i className="bi bi-envelope me-2"></i>support@examprep.com</p>
              <p className="mb-2 text-light-emphasis"><i className="bi bi-telephone me-2"></i>+1 (555) 123-4567</p>
              <p className="text-light-emphasis"><i className="bi bi-geo-alt me-2"></i>123 Education Street, Learning City</p>
            </div>
            <div className="social-links">
              <a href="#" className="social-link btn btn-outline-primary me-2">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-link btn btn-outline-primary me-2">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="social-link btn btn-outline-primary me-2">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="social-link btn btn-outline-primary">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="row mt-5">
          <div className="col-md-6 mx-auto text-center">
            <h5 className="footer-heading mb-3 text-primary">Subscribe to Our Newsletter</h5>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Enter your email" aria-label="Email for newsletter" />
              <button className="btn btn-primary" type="button">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="copyright text-center mt-5 pt-4 border-top border-secondary">
          <p className="mb-0 text-light-emphasis">&copy; {new Date().getFullYear()} Exam Prep. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
