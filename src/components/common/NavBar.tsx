import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        {/* Logo and Navigation Links (Left Side) */}
        <Link className="navbar-brand animate-fade-in" to="/">
          Exam Prep
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
                <span className="nav-text">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/features' ? 'active' : ''}`} to="/features">
                <span className="nav-text">Features</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/resources' ? 'active' : ''}`} to="/resources">
                <span className="nav-text">Resources</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">
                <span className="nav-text">About</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">
                <span className="nav-text">Contact</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* User Image (Right Side) */}
        <div className="d-flex align-items-center">
          <img
            src="https://www.w3schools.com/w3images/avatar2.png"
            alt="User"
            className="user-avatar"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
