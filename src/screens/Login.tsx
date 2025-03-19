import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const validatePhoneNumber = (number: string) => {
    return /^\d{10}$/.test(number);
  };

  const handleGetOtp = async () => {
    // Reset error state
    setError('');

    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/generate_otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: phoneNumber
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.response?.errors?.phone_number) {
          setError(data.response.errors.phone_number[0]);
        } else {
          setError(data.message || 'Failed to generate OTP. Please try again.');
        }
        setIsLoading(false);
        return;
      }

      setShowOtpInput(true);
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setPhoneNumber(value);
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome</h1>
          <p className="subtitle">Login or signup with your mobile number</p>
          <p className="info-text">New users will be automatically registered</p>
        </div>
        
        <div className="login-form">
          <div className="input-group">
            <label htmlFor="mobile">Mobile Number</label>
            <div className="input-wrapper">
              <span className="input-prefix">+91</span>
              <input
                type="tel"
                id="mobile"
                placeholder="Enter your mobile number"
                maxLength={10}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>

          <button 
            className={`get-otp-button ${isLoading ? 'loading' : ''}`} 
            onClick={handleGetOtp}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loader"></span>
            ) : (
              'Get OTP'
            )}
          </button>

          {showOtpInput && (
            <div className="otp-input-group animate-fade-in">
              <label htmlFor="otp">Enter OTP</label>
              <div className="otp-wrapper">
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter OTP"
                  maxLength={6}
                />
                <button className="verify-otp-button">
                  Verify
                </button>
              </div>
              <button className="resend-otp-button">
                Resend OTP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
