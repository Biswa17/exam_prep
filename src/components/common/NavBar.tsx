import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#004085' }}>
      <div className="container-fluid">
        {/* Logo and Navigation Links (Left Side) */}
        <Link className="navbar-brand" to="/" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
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
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/features">Features</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/resources">Resources</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* User Image (Right Side) */}
        <div className="d-flex align-items-center">
          <img
            src="https://www.w3schools.com/w3images/avatar2.png" // Placeholder image
            alt="User"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid #fff',
              marginLeft: '15px',
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
