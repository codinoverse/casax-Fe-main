import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import logo from '../assets/Logo.png'
import logoFooter from '../assets/logoOriginal.png'
import heroHouse from '../assets/house.png'

const featuredProperties = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=260&fit=crop',
    price: '₹45,00,000',
    title: 'Modern Family Home',
    location: 'Mumbai, MH',
    beds: 4,
    baths: 3,
    sqft: '2,500',
    badge: 'FOR SALE',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=260&fit=crop',
    price: '₹28,000/mo',
    title: 'Cozy Suburban House',
    location: 'Bangalore, KA',
    beds: 3,
    baths: 2,
    sqft: '1,800',
    badge: 'FOR RENT',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=260&fit=crop',
    price: '₹68,00,000',
    title: 'Luxury Villa Estate',
    location: 'Delhi, DL',
    beds: 5,
    baths: 4,
    sqft: '3,200',
    badge: 'FOR SALE',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=260&fit=crop',
    price: '₹35,000/mo',
    title: 'Downtown Apartment',
    location: 'Hyderabad, TS',
    beds: 2,
    baths: 2,
    sqft: '1,200',
    badge: 'FOR RENT',
  },
]

const propertyTypes = [
  {
    id: 1,
    title: 'Apartment',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22V12h6v10"/><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01"/></svg>
    ),
  },
  {
    id: 2,
    title: 'Villa',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300&h=200&fit=crop',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    ),
  },
  {
    id: 3,
    title: 'Commercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
    ),
  },
  {
    id: 4,
    title: 'Plots',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&h=200&fit=crop',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
  },
]

function Home({ isLoggedIn, onLogout }) {
  const [searchTab, setSearchTab] = useState('buy')
  const [showAccountMenu, setShowAccountMenu] = useState(false)

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-left">
            <img src={logo} alt="CASAX" className="navbar-logo" />
            <div className="nav-links">
              <Link to="/" className="nav-link active">Home</Link>
              <Link to="/buy" className="nav-link">Buy</Link>
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
                <button className="nav-icon-btn-home" title="Saved">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                  <span className="nav-icon-label-home">Saved</span>
                </button>
                <button className="nav-icon-btn-home" title="Alerts">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
                  <span className="nav-icon-label-home">Alerts</span>
                  <span className="nav-alert-badge-home">3</span>
                </button>
                <div className="nav-account-wrap-home">
                  <button
                    className="nav-icon-btn-home nav-account-btn-home"
                    title="My Account"
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span className="nav-icon-label-home">My Account</span>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {showAccountMenu && (
                    <div className="nav-account-dropdown-home">
                      <a href="#" className="nav-account-item-home">My Profile</a>
                      <a href="#" className="nav-account-item-home">My Properties</a>
                      <a href="#" className="nav-account-item-home">Settings</a>
                      <button className="nav-account-item-home nav-account-logout-home" onClick={onLogout}>Logout</button>
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
            <button className="nav-post-btn">Post Property</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <span className="hero-tagline">BUY. SELL. RENT.</span>
            <h1 className="hero-title">
              Find Your Perfect<br /><span className="hero-highlight">Property</span>
            </h1>
            <p className="hero-subtitle">
              Buy, Sell or Rent verified properties with ease and confidence.
            </p>
            <div className="hero-buttons">
              <button className="hero-btn-primary">Buy Property</button>
              <button className="hero-btn-secondary">Rent Property</button>
            </div>
          </div>
          <div className="hero-image">
            <img src={heroHouse} alt="Dream Home" />
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="search-section">
        <div className="search-card">
          <div className="search-tabs">
            <button className={`search-tab ${searchTab === 'buy' ? 'active' : ''}`} onClick={() => setSearchTab('buy')}>Buy</button>
            <button className={`search-tab ${searchTab === 'rent' ? 'active' : ''}`} onClick={() => setSearchTab('rent')}>Rent</button>
            <button className={`search-tab ${searchTab === 'commercial' ? 'active' : ''}`} onClick={() => setSearchTab('commercial')}>Commercial</button>
          </div>
          <div className="search-fields">
            <div className="search-field">
              <svg width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <input type="text" placeholder="Enter location" />
            </div>
            <div className="search-divider"></div>
            <div className="search-field">
              <svg width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <select>
                <option>Property Type</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Commercial</option>
                <option>Plot</option>
              </select>
            </div>
            <div className="search-divider"></div>
            <div className="search-field">
              <svg width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 3h12M6 8h12M6 3v5M14 8c0 3.5-2.5 5.5-5.5 5.5H6l8 8.5"/></svg>
              <select>
                <option>Budget</option>
                <option>₹10L - ₹30L</option>
                <option>₹30L - ₹50L</option>
                <option>₹50L - ₹1Cr</option>
                <option>₹1Cr+</option>
              </select>
            </div>
            <button className="search-btn">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Search Property
            </button>
          </div>
        </div>
      </section>

      {/* Explore by Property Type */}
      <section className="explore-section">
        <div className="explore-inner">
          <div className="section-header">
            <h2 className="section-title">Explore by Property Type</h2>
            <a href="#" className="section-view-all">View All</a>
          </div>
          <div className="explore-grid">
            {propertyTypes.map((type) => (
              <div className="explore-card" key={type.id}>
                <div className="explore-card-image">
                  <img src={type.image} alt={type.title} />
                </div>
                <div className="explore-card-info">
                  <div className="explore-card-icon">{type.icon}</div>
                  <h3 className="explore-card-title">{type.title}</h3>
                  <a href="#" className="explore-card-link">Browse Now &rarr;</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="featured-section">
        <div className="featured-inner">
          <div className="section-header">
            <h2 className="section-title">Featured Properties</h2>
            <a href="#" className="section-view-all">View All Properties &rarr;</a>
          </div>
          <div className="featured-grid">
            {featuredProperties.map((property) => (
              <div className="property-card" key={property.id}>
                <div className="property-card-image">
                  <img src={property.image} alt={property.title} />
                  <span className={`property-badge ${property.badge === 'FOR RENT' ? 'rent' : 'sale'}`}>
                    {property.badge}
                  </span>
                  <div className="property-card-actions">
                    <button className="property-action-btn">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                    </button>
                    <button className="property-action-btn">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    </button>
                  </div>
                </div>
                <div className="property-card-info">
                  <div className="property-card-price">{property.price}</div>
                  <h3 className="property-card-title">{property.title}</h3>
                  <p className="property-card-location">
                    <svg width="14" height="14" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {property.location}
                  </p>
                  <div className="property-card-details">
                    <span className="property-card-detail">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 7v11m0-4h18m0 4V8a1 1 0 00-1-1H8a1 1 0 00-1 1v3"/></svg>
                      {property.beds} Beds
                    </span>
                    <span className="property-card-detail">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 12h16M4 12v6m16-6v6M6 12V8a2 2 0 012-2h1a2 2 0 012 2v4"/></svg>
                      {property.baths} Baths
                    </span>
                    <span className="property-card-detail">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                      {property.sqft} sqft
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* List Your Property CTA */}
      <section className="cta-section">
        <div className="cta-banner">
          <div className="cta-inner">
          <div className="cta-left">
            <h2 className="cta-title">List your property in minutes</h2>
            <p className="cta-subtitle">Reach thousands of verified buyers and tenants.</p>
            <div className="cta-features">
              <span className="cta-feature">
                <span className="cta-feature-icon">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M5 12l5 5L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                100% Free Listing
              </span>
              <span className="cta-feature">
                <span className="cta-feature-icon">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><circle cx="10" cy="7" r="4" stroke="#fff" strokeWidth="2.5"/></svg>
                </span>
                Verified Buyers
              </span>
              <span className="cta-feature">
                <span className="cta-feature-icon">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="#fff" strokeWidth="2" fill="#fff"/></svg>
                </span>
                Quick Responses
              </span>
            </div>
          </div>
          <div className="cta-center">
            <img src={heroHouse} alt="Property" />
          </div>
          <div className="cta-right">
            <button className="cta-btn">Post Property Now &rarr;</button>
            <span className="cta-note">It's quick, easy and free!</span>
          </div>
          </div>
        </div>
      </section>

      {/* Why Choose CASAX */}
      <section className="why-section">
        <div className="why-inner">
          <h2 className="why-section-title">Why Choose CASAX?</h2>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">
                <svg width="32" height="32" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4" stroke="#0f172a" strokeWidth="1.5"/></svg>
              </div>
              <h3 className="why-title">Trusted Listings</h3>
              <p className="why-desc">All properties are verified for your safety.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <svg width="32" height="32" fill="#0f172a" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              </div>
              <h3 className="why-title">Verified Agents</h3>
              <p className="why-desc">Deal with experienced and trusted agents.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <svg width="32" height="32" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <h3 className="why-title">Easy Search</h3>
              <p className="why-desc">Advanced filters to find perfect property.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <svg width="32" height="32" fill="#0f172a" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
              </div>
              <h3 className="why-title">Fast Deals</h3>
              <p className="why-desc">Quick connections and faster transactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Subscribe Bar */}
      <section className="newsletter-section">
        <div className="newsletter-inner">
          <div className="newsletter-icon">
            <svg width="36" height="36" fill="none" stroke="#f26522" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div className="newsletter-text">
            <h2 className="newsletter-title">Subscribe to our Newsletter</h2>
            <p className="newsletter-subtitle">Get updates on new properties and offers.</p>
          </div>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" className="newsletter-input" />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={logoFooter} alt="CASAX" className="footer-logo" />
              <p className="footer-brand-text">Your trusted partner in finding the perfect property. We connect buyers, sellers, and renters with their dream spaces.</p>
              <div className="footer-social">
                <a href="#" className="social-link">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="#" className="social-link">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                </a>
                <a href="#" className="social-link">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="#" className="social-link">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
            <div className="footer-links-col">
              <h4 className="footer-col-title">Company</h4>
              <a href="#" className="footer-link">About Us</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Blog</a>
              <a href="#" className="footer-link">Press</a>
            </div>
            <div className="footer-links-col">
              <h4 className="footer-col-title">Properties</h4>
              <a href="#" className="footer-link">Buy</a>
              <a href="#" className="footer-link">Rent</a>
              <a href="#" className="footer-link">Sell</a>
              <a href="#" className="footer-link">Commercial</a>
            </div>
            <div className="footer-links-col">
              <h4 className="footer-col-title">Support</h4>
              <a href="#" className="footer-link">Help Center</a>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Contact Us</a>
            </div>
            <div className="footer-links-col">
              <h4 className="footer-col-title">Contact Us</h4>
              <p className="footer-contact-item">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                +1 (555) 123-4567
              </p>
              <p className="footer-contact-item">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                info@casax.com
              </p>
              <p className="footer-contact-item">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                123 Real Estate Ave, NY
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 CASAX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
