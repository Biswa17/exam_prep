import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4">
            <h5>About Exam Prep</h5>
            <p>Exam Prep is your platform designed to help students prepare for competitive exams with ease and efficiency.</p>
          </div>

          {/* Useful Links */}
          <div className="col-md-4">
            <h5>Useful Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Home</a></li>
              <li><a href="#" className="text-white">Features</a></li>
              <li><a href="#" className="text-white">Pricing</a></li>
              <li><a href="#" className="text-white">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div>
              <a href="#" className="text-white me-3">
                <i className="bi bi-facebook"></i> {/* Facebook icon */}
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-twitter"></i> {/* Twitter icon */}
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-linkedin"></i> {/* LinkedIn icon */}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-4">
          <p>&copy; {new Date().getFullYear()} Exam Prep. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;