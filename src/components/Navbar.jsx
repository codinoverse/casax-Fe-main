import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/Logo.png'
import playstoreImg from '../assets/playstore.png'
import appleImg from '../assets/apple-logo.png'
import './Navbar.css'

function Navbar({ isLoggedIn, onLogout }) {
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const accountRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setShowAccountMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo-link">
          <img src={logo} alt="CASAX" className="navbar-logo" />
        </Link>
        <div className="navbar-center">
          <div className="nav-links">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
            <Link to="/buy" className={`nav-link ${isActive('/buy') ? 'active' : ''}`}>Buy</Link>
            <a href="#" className="nav-link">Rent</a>
            <a href="#" className="nav-link">Sell</a>
            <a href="#" className="nav-link">Agents</a>
            <a href="#" className="nav-link">About Us</a>
            <a href="#" className="nav-link">Contact</a>
          </div>
        </div>
        <div className="navbar-right">
          <div className="nav-store-badges">
            <a href="#" className="nav-store-badge" title="Get it on Google Play">
              <img src={playstoreImg} alt="Play Store" className="nav-store-icon" />
              <div className="nav-store-text">
                <span className="nav-store-label">GET IT ON</span>
                <span className="nav-store-name">Google Play</span>
              </div>
            </a>
            <a href="#" className="nav-store-badge" title="Download on App Store">
              <img src={appleImg} alt="App Store" className="nav-store-icon nav-store-icon-apple" />
              <div className="nav-store-text">
                <span className="nav-store-label">Download on the</span>
                <span className="nav-store-name">App Store</span>
              </div>
            </a>
          </div>
          {isLoggedIn ? (
            <div className="nav-account-wrap" ref={accountRef}>
              <button
                className="nav-login-btn"
                onClick={() => setShowAccountMenu(!showAccountMenu)}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>My Account</span>
              </button>
              {showAccountMenu && (
                <div className="nav-account-dropdown">
                  <Link to="/profile" className="nav-account-item" onClick={() => setShowAccountMenu(false)}>My Profile</Link>
                  <a href="#" className="nav-account-item">My Properties</a>
                  <a href="#" className="nav-account-item">Settings</a>
                  <button className="nav-account-item nav-account-logout" onClick={onLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-login-btn">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
