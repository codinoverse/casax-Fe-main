import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/Logo.png'
import houseImg from '../assets/house.png'
import './Auth.css'

function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const metCount = Object.values(checks).filter(Boolean).length
  const strengthLabel = metCount === 0 ? '' : metCount <= 1 ? 'Weak' : metCount <= 2 ? 'Fair' : metCount <= 3 ? 'Good' : 'Strong'
  const strengthClass = metCount === 0 ? '' : metCount <= 1 ? 'weak' : metCount <= 2 ? 'fair' : metCount <= 3 ? 'good' : 'strong'

  const passwordsMatch = password && confirmPassword && password === confirmPassword
  const canSubmit = metCount === 4 && passwordsMatch

  const handleSubmit = (e) => {
    e.preventDefault()
  }

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
              Reset Your{'\n'}<span className="text-orange">Password</span>
            </h1>
            <p className="auth-left-subtitle">
              Create a new secure password to protect your account and continue exploring.
            </p>
          </div>
          <div className="auth-left-image">
            <img src={houseImg} alt="Modern luxury house" />
          </div>
          <div className="auth-badges-card">
            <div className="auth-badges">
              <div className="auth-badge">
                <div className="badge-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <span className="badge-title">Secure Login</span>
                <span className="badge-desc">256-bit Encrypted</span>
              </div>
              <div className="auth-badge">
                <div className="badge-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <span className="badge-title">Fast Verification</span>
                <span className="badge-desc">Instant OTP</span>
              </div>
              <div className="auth-badge">
                <div className="badge-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <span className="badge-title">Trusted Platform</span>
                <span className="badge-desc">100% Reliable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="auth-right">
          <div className="auth-right-content auth-right-reset">
            <div className="otp-icon-wrapper">
              <div className="otp-icon-circle">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            </div>

            <h2 className="auth-heading otp-heading">Create New Password</h2>
            <p className="otp-desc">
              Your new password must be different from<br />previously used passwords.
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <label className="input-label">New Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input type={showPassword ? 'text' : 'password'} placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showPassword ? (<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>) : (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>)}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Strength Bar */}
              {password && (
                <div className="strength-section">
                  <div className="strength-bar">
                    <div className={`strength-fill ${strengthClass}`} style={{ width: `${(metCount / 4) * 100}%` }}></div>
                  </div>
                  <span className={`strength-label ${strengthClass}`}>{strengthLabel}</span>
                </div>
              )}

              <div className="input-group">
                <label className="input-label">Confirm New Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Re-enter new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showConfirmPassword ? (<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>) : (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>)}
                    </svg>
                  </button>
                </div>
                {confirmPassword && !passwordsMatch && (
                  <span className="field-error">Passwords do not match</span>
                )}
                {passwordsMatch && (
                  <span className="field-success">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    Passwords match
                  </span>
                )}
              </div>

              {/* Password Requirements */}
              <div className="password-req-section">
                <span className="password-req-label">Password must contain:</span>
                <div className="password-requirements">
                  <div className={`req-item ${checks.length ? 'met' : ''}`}>
                    <svg className="req-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    8+ characters
                  </div>
                  <div className={`req-item ${checks.uppercase ? 'met' : ''}`}>
                    <svg className="req-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    One uppercase letter
                  </div>
                  <div className={`req-item ${checks.number ? 'met' : ''}`}>
                    <svg className="req-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    One number
                  </div>
                  <div className={`req-item ${checks.special ? 'met' : ''}`}>
                    <svg className="req-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    One special character
                  </div>
                </div>
              </div>

              <button type="submit" className="auth-btn" disabled={!canSubmit}>
                Reset Password
              </button>
            </form>

            <Link to="/login" className="otp-back" style={{ marginTop: '18px' }}>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
