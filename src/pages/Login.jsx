import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import houseImg from '../assets/house.png'
import './Auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="auth-page">
      <div className="auth-modal">
        {/* Left Panel */}
        <div className="auth-left">
          <div className="auth-left-top">
            <img src={logo} alt="CasaX" className="auth-left-logo" />
            <h1 className="auth-left-title">
              Welcome{'\n'}<span className="text-orange">Back!</span>
            </h1>
            <p className="auth-left-subtitle">
              Login to manage your properties, connect with buyers and more.
            </p>
          </div>
          <div className="auth-left-image">
            <img src={houseImg} alt="Modern luxury house" />
          </div>
          {/* Badges Card */}
          <div className="auth-badges-card">
            <div className="auth-badges">
              <div className="auth-badge">
                <div className="badge-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <span className="badge-title">Verified Listings</span>
                <span className="badge-desc">100% Trusted</span>
              </div>
              <div className="auth-badge">
                <div className="badge-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span className="badge-title">Verified Agents</span>
                <span className="badge-desc">Experienced</span>
              </div>
              <div className="auth-badge">
                <div className="badge-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <span className="badge-title">Fast Deals</span>
                <span className="badge-desc">Quick & Easy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="auth-right">
          <div className="auth-right-content auth-right-login">
            <h2 className="auth-heading">Login to your account</h2>
            <p className="auth-subheading">
              Don't have an account? <Link to="/signup" className="link-orange">Sign Up</Link>
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 4L12 13L2 4" />
                    </svg>
                  </span>
                  <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showPassword ? (<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>) : (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>)}
                    </svg>
                  </button>
                </div>
              </div>

              <div className="forgot-password">
                <Link to="/forgot-password" className="link-orange">Forgot Password?</Link>
              </div>

              <button type="submit" className="auth-btn">Login</button>
            </form>

            <p className="auth-secure-note">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              Your data is safe and secure with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
