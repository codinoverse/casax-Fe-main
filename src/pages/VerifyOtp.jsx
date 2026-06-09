import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import logo from '../assets/Logo.png'
import houseImg from '../assets/house.png'
import './Auth.css'

function VerifyOtp() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(30)
  const inputRefs = useRef([])
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const fromForgotPassword = searchParams.get('from') === 'forgot-password'

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1)
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted) {
      const newOtp = [...otp]
      for (let i = 0; i < 6; i++) newOtp[i] = pasted[i] || ''
      setOtp(newOtp)
      inputRefs.current[Math.min(pasted.length, 5)]?.focus()
    }
  }

  const handleResend = () => {
    setTimer(30)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (fromForgotPassword) {
      navigate('/reset-password')
    }
  }

  const isComplete = otp.every((d) => d !== '')
  const formattedTime = `00:${timer.toString().padStart(2, '0')}`

  return (
    <div className="auth-page">
      <div className="auth-modal">
        <button className="auth-back-btn" onClick={() => navigate(fromForgotPassword ? '/forgot-password' : '/signup')}>
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
              Secure{'\n'}<span className="text-orange">Verification</span>
            </h1>
            <p className="auth-left-subtitle">
              Your security is our priority. Verify your identity to access your account.
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
          <div className="auth-right-content auth-right-otp">
            <div className="otp-icon-wrapper">
              <div className="otp-icon-circle">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </div>
            </div>

            <h2 className="auth-heading otp-heading">OTP Verification</h2>
            <p className="otp-desc">
              We've sent a verification code to your<br />registered mobile number
            </p>

            <form onSubmit={handleSubmit} className="auth-form otp-form">
              <label className="otp-label">Enter OTP Code</label>
              <div className="otp-inputs" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`otp-input ${digit ? 'filled' : ''}`}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <div className="otp-timer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Code expires in <strong>{formattedTime}</strong></span>
              </div>

              <button type="submit" className="auth-btn otp-verify-btn" disabled={!isComplete}>
                Verify & Continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>

            <p className="otp-resend">
              Didn't receive the code?{' '}
              {timer > 0 ? (
                <span className="otp-resend-disabled">Resend in {formattedTime}</span>
              ) : (
                <button type="button" className="link-orange otp-resend-btn" onClick={handleResend}>Resend Code</button>
              )}
            </p>

            <Link to={fromForgotPassword ? '/forgot-password' : '/signup'} className="otp-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              {fromForgotPassword ? 'Back to Forgot Password' : 'Back to Sign Up'}
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

export default VerifyOtp
