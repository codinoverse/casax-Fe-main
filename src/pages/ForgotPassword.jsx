import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { post } from '../services/api'
import logo from '../assets/white logo.png'
import houseImg from '../assets/Forgot password.png'
import './Auth.css'

function ForgotPassword() {
  const [method, setMethod] = useState('email')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [showMobilePopup, setShowMobilePopup] = useState(false)
  const navigate = useNavigate()

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (method === 'mobile') {
      setShowMobilePopup(true)
      return
    }

    setLoading(true)
    try {
      await post('/users/forgot-password', { email })
      showToast('A password reset link has been sent to your email', 'success')
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      showToast(err.message || 'Failed to send reset link. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const isValid = method === 'email' ? email.includes('@') : mobile.length >= 10

  return (
    <div className="auth-page">
      {/* Toast */}
      {toast && (
        <div className={`forgot-toast ${toast.type}`}>
          <div className="forgot-toast-icon">
            {toast.type === 'success' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            )}
          </div>
          <span>{toast.message}</span>
          <button className="forgot-toast-close" onClick={() => setToast(null)}>&times;</button>
        </div>
      )}

      {/* Mobile "Working on it" Popup */}
      {showMobilePopup && (
        <div className="forgot-popup-overlay" onClick={() => setShowMobilePopup(false)}>
          <div className="forgot-popup" onClick={(e) => e.stopPropagation()}>
            <div className="forgot-popup-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f26522" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </div>
            <h3 className="forgot-popup-title">Coming Soon!</h3>
            <p className="forgot-popup-desc">
              Mobile number password reset is currently under development. Please use your email address to reset your password.
            </p>
            <button className="forgot-popup-btn" onClick={() => { setShowMobilePopup(false); setMethod('email') }}>
              Use Email Instead
            </button>
          </div>
        </div>
      )}

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
              Forgot <span className="text-orange">Password?</span>
            </h1>
            <p className="auth-left-subtitle">
              Don't worry! Enter your registered email or mobile number to receive a verification code.
            </p>
          </div>
          {/* <div className="auth-left-pann">
            <img src={houseImg} alt="Modern luxury house" />
          </div> */}
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

              <button type="submit" className="auth-btn" disabled={!isValid || loading} style={{ marginTop: '8px' }}>
                {loading ? 'Sending...' : method === 'email' ? 'Send Reset Link' : 'Send OTP'}
                {!loading && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '8px' }}>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                )}
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
              Your data is protected, safe, and secure.
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
