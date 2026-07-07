import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'
import logo from '../assets/Logo.png'
import houseImg from '../assets/loginimage.png'
import './Auth.css'
import playstore from '../assets/playstore.png';
import appstore from '../assets/apple-logo.png';


function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await loginUser({ email, password })
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('role', data.role)
      }
      if (onLogin) onLogin()
      navigate(data.role === 'ADMIN' ? '/admin' : '/')
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-modal">
        <button className="auth-back-btn" onClick={() => navigate('/')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>
        {/* Left Panel */}
        <div className="auth-left-login">
          <div className="auth-left-top">
            <img src={logo} alt="CasaX" className="auth-left-logo" />
            <h1 className="auth-left-title">
              Welcome <span className="text-orange">Back!</span>
            </h1>
            <p className="auth-left-login-subtitle">
              Login to manage your properties, connect with buyers and more.
            </p>
            <div className='orange-line'></div>
          </div>
          {/* <div className="auth-left-image">
            <img src={houseImg} alt="Modern luxury house" />
          </div> */}
        </div>

        {/* Right Panel */}
        <div className="auth-right">
          <div className="auth-right-content auth-right-login">
            <div className='auth-heading'>
              <h2 className="auth-heading-main">Login to your account</h2>
              <div className="dashline"></div>
            </div>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <label className="input-label">Mobile Number / Email Address </label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 4L12 13L2 4" />
                    </svg>
                  </span>
                  <input type="email" placeholder="Enter your Mobile Number / Email Address " value={email} onChange={(e) => setEmail(e.target.value)} required />
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

              {error && <div className="auth-error-msg">{error}</div>}

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="auth-secure-note">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              Your data is safe and secure with us.
            </p>

            <p className="auth-subheading">
              Don't have an account? <Link to="/signup" className="link-orange">Sign Up</Link>
            </p>

            <div className="auth-badges-inline">
              <div className="auth-badge-inline">
                <div className="badge-icon-circle-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <span className="badge-inline-title">Verified Listings</span>
                  <span className="badge-inline-desc">100% Trusted</span>
                </div>
              </div>
              <div>
                <div className='line-btw-badge'></div>
              </div>
              <div className="auth-badge-inline">
                <div className="badge-icon-circle-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <span className="badge-inline-title">Verified Agents</span>
                  <span className="badge-inline-desc">Experienced</span>
                </div>
              </div>
              <div className='line-btw-badge'></div>
              <div className="auth-badge-inline">
                <div className="badge-icon-circle-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div>
                  <span className="badge-inline-title">Instant Deals</span>
                  <span className="badge-inline-desc">Quick & Easy</span>
                </div>
              </div>
            </div>

            <div className='download-line'>
              <div className='dash-line'></div>
              <div>
                <h4>Download the CASAX App</h4>
              </div>
              <div className='dash-line'></div>
            </div>

            <div className='app-platforms'>
              <div className="Apps-specified-both">
                <div className='Android-specified'>
                  <div>
                    <img className='playstore-button' src={playstore} alt="playstore-button" />
                  </div>
                  <div>
                    <h3>GET IT ON</h3>
                    <h1>Google Play</h1>
                  </div>
                </div>


                <div className='Android-specified'>
                  <div>
                    <img className='appstore-button' src={appstore} alt="appstore-button" />
                  </div>
                  <div>
                    <h3>GET IT ON</h3>
                    <h1>App Store</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
