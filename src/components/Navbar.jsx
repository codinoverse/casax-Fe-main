import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { get } from '../services/api'
import logo from '../assets/Logo.png'
import playstoreImg from '../assets/playstore.png'
import appleImg from '../assets/apple-logo.png'
import './Navbar.css'

function Navbar({ isLoggedIn, onLogout }) {
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [favCount, setFavCount] = useState(0)
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

  // Fetch favourites count
  const fetchFavCount = () => {
    if (!isLoggedIn) { setFavCount(0); return }
    const token = localStorage.getItem('token')
    if (!token) return
    get('/favourites', { headers: { Authorization: `Bearer ${token}` } })
      .then(data => {
        const list = Array.isArray(data) ? data : data?.favourites || data?.properties || []
        setFavCount(list.length)
      })
      .catch(() => {})
  }

  useEffect(() => {
    fetchFavCount()
  }, [isLoggedIn, location.pathname])

  useEffect(() => {
    const handler = () => fetchFavCount()
    window.addEventListener('favourites-changed', handler)
    return () => window.removeEventListener('favourites-changed', handler)
  }, [isLoggedIn])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const isActive = (path) => location.pathname === path

  const getUserName = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user && user.firstName) return user.firstName
    } catch { /* ignore */ }
    return 'My Account'
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo-link">
          <img src={logo} alt="CASAX" className="navbar-logo" />
        </Link>

        {/* Hamburger button */}
        <button
          className={`navbar-hamburger ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div className="navbar-mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* Desktop center nav + mobile drawer */}
        <div className={`navbar-center ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="nav-links">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
            <Link to="/buy" className={`nav-link ${isActive('/buy') ? 'active' : ''}`}>Buy</Link>
            <a href="#" className="nav-link">Rent</a>
            <a href="#" className="nav-link">Sell</a>
            <a href="#" className="nav-link">Agents</a>
            <a href="#" className="nav-link">About Us</a>
            <a href="#" className="nav-link">Contact</a>
          </div>

          {/* Store badges inside mobile drawer */}
          <div className="nav-mobile-store-badges">
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

          {/* Login/Account inside mobile drawer */}
          <div className="nav-mobile-auth">
            {isLoggedIn ? (
              <>
                <Link to="/my-favourites" className="nav-mobile-auth-link" onClick={() => setMobileMenuOpen(false)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                  My Favourites {favCount > 0 && `(${favCount})`}
                </Link>
                <Link to="/profile" className="nav-mobile-auth-link" onClick={() => setMobileMenuOpen(false)}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  My Profile
                </Link>
                <button className="nav-mobile-logout-btn" onClick={() => { onLogout(); setMobileMenuOpen(false); }}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-mobile-login-btn" onClick={() => setMobileMenuOpen(false)}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>

        {/* Desktop right side */}
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
          {isLoggedIn && (
            <Link to="/my-favourites" className="nav-fav-icon" title="My Favourites">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
              {favCount > 0 && <span className="nav-fav-count">{favCount}</span>}
            </Link>
          )}
          {isLoggedIn ? (
            <div className="nav-account-wrap" ref={accountRef}>
              <button
                className="nav-login-btn"
                onClick={() => setShowAccountMenu(!showAccountMenu)}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>{getUserName()}</span>
              </button>
              {showAccountMenu && (
                <div className="nav-account-dropdown">
                  <Link to="/profile" className="nav-account-item" onClick={() => setShowAccountMenu(false)}>My Profile</Link>
                  <Link to="/my-properties" className="nav-account-item" onClick={() => setShowAccountMenu(false)}>My Properties</Link>
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
