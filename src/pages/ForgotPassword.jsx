import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/Logo.png'
import houseImg from '../assets/house.png'
import './Auth.css'

function ForgotPassword() {
  const [method, setMethod] = useState('email')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Navigate to OTP verification page
    navigate('/verify-otp?from=forgot-password')
  }

  const isValid = method === 'email' ? email.includes('@') : mobile.length >= 10

  return (
    <div className="auth-page">
      <div className="auth-modal">
        <button className="auth-back-btn" onClick={() => navigate('/login')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>
        {/* Left Panel */}
        <div className="auth-left">
          <div className="auth-left-top">
            <img src={logo} alt="CasaX" className="auth-left-logo" />
            <h1 className="auth-left-title">
              Forgot{'\n'}<span className="text-orange">Password?</span>
            </h1>
            <p className="auth-left-subtitle">
              Don't worry! Enter your registered email or mobile number to receive a verification code.
            </p>
          </div>
          <div className="auth-left-image">
            <img src={houseImg} alt="Modern luxury house" />
          </div>
        </div>

        {/* Right Panel */}
        <div className="auth-right">
          <div className="auth-right-content auth-right-otp">
            <div className="otp-icon-wrapper">
              <div className="otp-icon-circle">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  <circle cx="12" cy="16" r="1" />
                </svg>
              </div>
            </div>

            <h2 className="auth-heading otp-heading">Forgot Password</h2>
            <p className="otp-desc">
              Enter your registered email address or mobile<br />number to receive a verification code.
            </p>

            {/* Method Toggle */}
            <div className="forgot-method-toggle">
              <button
                type="button"
                className={`forgot-method-btn ${method === 'email' ? 'active' : ''}`}
                onClick={() => setMethod('email')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13L2 4" />
                </svg>
                Email
              </button>
              <button
                type="button"
                className={`forgot-method-btn ${method === 'mobile' ? 'active' : ''}`}
                onClick={() => setMethod('mobile')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                Mobile
              </button>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {method === 'email' ? (
                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M22 4L12 13L2 4" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="input-group">
                  <label className="input-label">Mobile Number</label>
                  <div className="input-wrapper has-prefix">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                        <line x1="12" y1="18" x2="12.01" y2="18" />
                      </svg>
                    </span>
                    <div className="phone-prefix-wrapper">
                      <span className="phone-prefix">+91</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={mobile}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '')
                        if (val.length <= 10) setMobile(val)
                      }}
                      required
                    />
                  </div>
                </div>
              )}

              <button type="submit" className="auth-btn" disabled={!isValid} style={{ marginTop: '8px' }}>
                Send OTP
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '8px' }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>

            <Link to="/login" className="otp-back" style={{ marginTop: '24px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Login
            </Link>

            <p className="auth-secure-note">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              Your data is protected with 256-bit encryption.
            </p>

            <div className="auth-badges-inline">
              <div className="auth-badge-inline">
                <div className="badge-icon-circle-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <span className="badge-inline-title">Secure Login</span>
                  <span className="badge-inline-desc">256-bit Encrypted</span>
                </div>
              </div>
              <div className="auth-badge-inline">
                <div className="badge-icon-circle-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div>
                  <span className="badge-inline-title">Fast Recovery</span>
                  <span className="badge-inline-desc">Instant OTP</span>
                </div>
              </div>
              <div className="auth-badge-inline">
                <div className="badge-icon-circle-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <span className="badge-inline-title">Trusted Platform</span>
                  <span className="badge-inline-desc">100% Reliable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
