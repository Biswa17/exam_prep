import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check auth state
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear token and update state only after successful logout
      localStorage.removeItem('access_token');
      setIsAuthenticated(false);
      setIsDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state in case of API error
      localStorage.removeItem('access_token');
      setIsAuthenticated(false);
      setIsDropdownOpen(false);
      navigate('/');
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
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

        {/* User Profile Dropdown */}
        <div className="d-flex align-items-center position-relative" ref={dropdownRef}>
          <img
            src="https://www.w3schools.com/w3images/avatar2.png"
            alt="User"
            className="user-avatar cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="dropdown-menu show position-absolute" style={{ top: '100%', right: 0 }}>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile" 
                    className="dropdown-item" 
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    className="dropdown-item text-danger" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="dropdown-item" 
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
