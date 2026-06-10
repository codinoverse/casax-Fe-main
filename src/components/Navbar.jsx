import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/Logo.png'
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
        <div className="navbar-left">
          <Link to="/">
            <img src={logo} alt="CASAX" className="navbar-logo" />
          </Link>
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
          {isLoggedIn ? (
            <>
              <button className="nav-icon-btn" title="Saved">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                <span className="nav-icon-label">Saved</span>
              </button>
              <button className="nav-icon-btn nav-bell-btn" title="Alerts">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
                <span className="nav-alert-badge">3</span>
              </button>
              <div className="nav-account-wrap" ref={accountRef}>
                <button
                  className="nav-icon-btn nav-account-btn"
                  title="My Account"
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <span className="nav-icon-label">My Account</span>
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {showAccountMenu && (
                  <div className="nav-account-dropdown">
                    <a href="#" className="nav-account-item">My Profile</a>
                    <a href="#" className="nav-account-item">My Properties</a>
                    <a href="#" className="nav-account-item">Settings</a>
                    <button className="nav-account-item nav-account-logout" onClick={onLogout}>Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button className="nav-saved-btn" title="Saved">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
              </button>
              <Link to="/login" className="nav-login-link">Login</Link>
            </>
          )}
          <Link to="/post-property" className="nav-post-btn">Post Property</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
