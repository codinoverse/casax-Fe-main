import { useState } from 'react'
import { Link } from 'react-router-dom'
import './SearchProperties.css'
import logo from '../assets/Logo.png'

const sampleProperties = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=260&fit=crop',
    price: '₹1,25,00,000',
    title: 'Modern Family Home',
    location: 'Whitefield, Bangalore',
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
    location: 'Koramangala, Bangalore',
    beds: 3,
    baths: 2,
    sqft: '1,800',
    badge: 'FOR RENT',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=260&fit=crop',
    price: '₹2,45,00,000',
    title: 'Luxury Villa Estate',
    location: 'Indiranagar, Bangalore',
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
    location: 'MG Road, Bangalore',
    beds: 2,
    baths: 2,
    sqft: '1,200',
    badge: 'FOR RENT',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=260&fit=crop',
    price: '₹95,00,000',
    title: 'Spacious 3BHK Flat',
    location: 'HSR Layout, Bangalore',
    beds: 3,
    baths: 2,
    sqft: '1,650',
    badge: 'FOR SALE',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=260&fit=crop',
    price: '₹22,000/mo',
    title: 'Studio Apartment',
    location: 'Electronic City, Bangalore',
    beds: 1,
    baths: 1,
    sqft: '650',
    badge: 'FOR RENT',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=260&fit=crop',
    price: '₹3,50,00,000',
    title: 'Premium Penthouse',
    location: 'Jayanagar, Bangalore',
    beds: 4,
    baths: 4,
    sqft: '3,800',
    badge: 'FOR SALE',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&h=260&fit=crop',
    price: '₹18,000/mo',
    title: 'Compact 1BHK Home',
    location: 'Marathahalli, Bangalore',
    beds: 1,
    baths: 1,
    sqft: '550',
    badge: 'FOR RENT',
  },
]

const propertyTypeOptions = [
  'All Types',
  'Apartment',
  'Villa / House',
  'Independent House',
  'Penthouse',
  'Plot',
  'Commercial',
]

function SearchProperties({ isLoggedIn, onLogout }) {
  const [searchLocation, setSearchLocation] = useState('Bangalore, Karnataka')
  const [propertyType, setPropertyType] = useState('')
  const [budget, setBudget] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [wishlist, setWishlist] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [showAccountMenu, setShowAccountMenu] = useState(false)

  // Sidebar filter states
  const [selectedType, setSelectedType] = useState('All Types')
  const [budgetMin, setBudgetMin] = useState(1000000)
  const [budgetMax, setBudgetMax] = useState(50000000)
  const [selectedBeds, setSelectedBeds] = useState('Any')
  const [selectedBaths, setSelectedBaths] = useState('Any')
  const [expandedFilters, setExpandedFilters] = useState({
    propertyType: true,
    budget: true,
    bedrooms: true,
    bathrooms: true,
    propertySize: false,
    amenities: false,
  })

  const toggleFilter = (section) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    )
  }

  const formatBudget = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(0)} Cr`
    if (val >= 100000) return `₹${(val / 100000).toFixed(0)} L`
    return `₹${val.toLocaleString('en-IN')}`
  }

  const totalPages = 21
  const bedroomOptions = ['Any', '1+', '2+', '3+', '4+', '5+']
  const bathroomOptions = ['Any', '1+', '2+', '3+', '4+']

  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1, 2, 3, 4, 5, '...', totalPages)
    }
    return pages
  }

  return (
    <div className="sp-page">
      {/* Navbar */}
      <nav className="sp-navbar">
        <div className="sp-navbar-inner">
          <div className="sp-navbar-left">
            <Link to="/">
              <img src={logo} alt="CASAX" className="sp-navbar-logo" />
            </Link>
            <div className="sp-nav-links">
              <Link to="/" className="sp-nav-link">Home</Link>
              <Link to="/buy" className="sp-nav-link active">Buy</Link>
              <a href="#" className="sp-nav-link">Rent</a>
              <a href="#" className="sp-nav-link">Sell</a>
              <a href="#" className="sp-nav-link">Agents</a>
              <a href="#" className="sp-nav-link">About Us</a>
              <a href="#" className="sp-nav-link">Contact</a>
            </div>
          </div>
          <div className="sp-navbar-right">
            {isLoggedIn ? (
              <>
                <button className="sp-nav-icon-btn" title="Saved">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                  <span className="sp-nav-icon-label">Saved</span>
                </button>
                <button className="sp-nav-icon-btn" title="Alerts">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
                  <span className="sp-nav-icon-label">Alerts</span>
                  <span className="sp-nav-badge">3</span>
                </button>
                <div className="sp-nav-account-wrap">
                  <button
                    className="sp-nav-icon-btn sp-nav-account-btn"
                    title="My Account"
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span className="sp-nav-icon-label">My Account</span>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {showAccountMenu && (
                    <div className="sp-account-dropdown">
                      <a href="#" className="sp-account-item">My Profile</a>
                      <a href="#" className="sp-account-item">My Properties</a>
                      <a href="#" className="sp-account-item">Settings</a>
                      <button className="sp-account-item sp-account-logout" onClick={onLogout}>Logout</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button className="sp-nav-saved-btn" title="Saved">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                </button>
                <Link to="/login" className="sp-nav-login-link">Login</Link>
              </>
            )}
            <button className="sp-nav-post-btn">Post Property</button>
          </div>
        </div>
      </nav>

      {/* Breadcrumb Header */}
      <div className="sp-breadcrumb-section">
        <div className="sp-breadcrumb-inner">
          <h1 className="sp-page-title">Search Properties</h1>
          <div className="sp-breadcrumb">
            <Link to="/" className="sp-breadcrumb-link">Home</Link>
            <span className="sp-breadcrumb-sep">&gt;</span>
            <Link to="/buy" className="sp-breadcrumb-link">Buy</Link>
            <span className="sp-breadcrumb-sep">&gt;</span>
            <span className="sp-breadcrumb-current">Search Properties</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="sp-search-wrap">
        <div className="sp-search-inner">
          <div className="sp-search-bar">
            <div className="sp-search-field">
              <svg width="16" height="16" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <input
                type="text"
                placeholder="Enter location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
              {searchLocation && (
                <button className="sp-field-clear" onClick={() => setSearchLocation('')}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>
            <div className="sp-search-divider"></div>
            <div className="sp-search-field">
              <svg width="16" height="16" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22V12h6v10"/><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01"/></svg>
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="commercial">Commercial</option>
                <option value="plot">Plot</option>
              </select>
            </div>
            <div className="sp-search-divider"></div>
            <div className="sp-search-field">
              <svg width="16" height="16" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 3h12M6 8h12M6 3v5M14 8c0 3.5-2.5 5.5-5.5 5.5H6l8 8.5"/></svg>
              <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                <option value="">Min - Max</option>
                <option value="10-30">₹10L - ₹30L</option>
                <option value="30-50">₹30L - ₹50L</option>
                <option value="50-100">₹50L - ₹1Cr</option>
                <option value="100+">₹1Cr+</option>
              </select>
            </div>
            <div className="sp-search-divider"></div>
            <div className="sp-search-field">
              <svg width="16" height="16" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 7v11m0-4h18m0 4V8a1 1 0 00-1-1H8a1 1 0 00-1 1v3"/></svg>
              <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            <button className="sp-search-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="sp-main">
        <div className="sp-main-inner">
          {/* Sidebar Filters */}
          <aside className="sp-sidebar">
            <div className="sp-sidebar-header">
              <h3 className="sp-sidebar-title">Filters</h3>
              <button className="sp-clear-all">Clear All</button>
            </div>

            {/* Property Type Filter */}
            <div className="sp-filter-group">
              <button className="sp-filter-heading" onClick={() => toggleFilter('propertyType')}>
                <span>Property Type</span>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={expandedFilters.propertyType ? 'sp-chevron-up' : 'sp-chevron-down'}><polyline points="18 15 12 9 6 15"/></svg>
              </button>
              {expandedFilters.propertyType && (
                <div className="sp-filter-body">
                  {propertyTypeOptions.map((type) => (
                    <label key={type} className="sp-checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedType === type}
                        onChange={() => setSelectedType(type)}
                        className="sp-checkbox"
                      />
                      <span className="sp-checkbox-custom"></span>
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Budget Range Filter */}
            <div className="sp-filter-group">
              <button className="sp-filter-heading" onClick={() => toggleFilter('budget')}>
                <span>Budget Range</span>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={expandedFilters.budget ? 'sp-chevron-up' : 'sp-chevron-down'}><polyline points="18 15 12 9 6 15"/></svg>
              </button>
              {expandedFilters.budget && (
                <div className="sp-filter-body">
                  <div className="sp-range-slider">
                    <div className="sp-range-track">
                      <div
                        className="sp-range-fill"
                        style={{
                          left: `${((budgetMin - 1000000) / 49000000) * 100}%`,
                          right: `${100 - ((budgetMax - 1000000) / 49000000) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <input
                      type="range"
                      min="1000000"
                      max="50000000"
                      step="500000"
                      value={budgetMin}
                      onChange={(e) => setBudgetMin(Math.min(Number(e.target.value), budgetMax - 500000))}
                      className="sp-range-input"
                    />
                    <input
                      type="range"
                      min="1000000"
                      max="50000000"
                      step="500000"
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(Math.max(Number(e.target.value), budgetMin + 500000))}
                      className="sp-range-input"
                    />
                  </div>
                  <div className="sp-range-labels">
                    <span>{formatBudget(budgetMin)}</span>
                    <span>{formatBudget(budgetMax)}+</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bedrooms Filter */}
            <div className="sp-filter-group">
              <button className="sp-filter-heading" onClick={() => toggleFilter('bedrooms')}>
                <span>Bedrooms</span>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={expandedFilters.bedrooms ? 'sp-chevron-up' : 'sp-chevron-down'}><polyline points="18 15 12 9 6 15"/></svg>
              </button>
              {expandedFilters.bedrooms && (
                <div className="sp-filter-body">
                  <div className="sp-pill-group">
                    {bedroomOptions.map((opt) => (
                      <button
                        key={opt}
                        className={`sp-pill ${selectedBeds === opt ? 'active' : ''}`}
                        onClick={() => setSelectedBeds(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bathrooms Filter */}
            <div className="sp-filter-group">
              <button className="sp-filter-heading" onClick={() => toggleFilter('bathrooms')}>
                <span>Bathrooms</span>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={expandedFilters.bathrooms ? 'sp-chevron-up' : 'sp-chevron-down'}><polyline points="18 15 12 9 6 15"/></svg>
              </button>
              {expandedFilters.bathrooms && (
                <div className="sp-filter-body">
                  <div className="sp-pill-group">
                    {bathroomOptions.map((opt) => (
                      <button
                        key={opt}
                        className={`sp-pill ${selectedBaths === opt ? 'active' : ''}`}
                        onClick={() => setSelectedBaths(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Size (collapsed) */}
            <div className="sp-filter-group">
              <button className="sp-filter-heading" onClick={() => toggleFilter('propertySize')}>
                <span>Property Size</span>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={expandedFilters.propertySize ? 'sp-chevron-up' : 'sp-chevron-down'}><polyline points="18 15 12 9 6 15"/></svg>
              </button>
              {expandedFilters.propertySize && (
                <div className="sp-filter-body">
                  <p className="sp-filter-placeholder">Size filter options</p>
                </div>
              )}
            </div>

            {/* Amenities (collapsed) */}
            <div className="sp-filter-group">
              <button className="sp-filter-heading" onClick={() => toggleFilter('amenities')}>
                <span>Amenities</span>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={expandedFilters.amenities ? 'sp-chevron-up' : 'sp-chevron-down'}><polyline points="18 15 12 9 6 15"/></svg>
              </button>
              {expandedFilters.amenities && (
                <div className="sp-filter-body">
                  <p className="sp-filter-placeholder">Amenity options</p>
                </div>
              )}
            </div>

            <button className="sp-more-filters-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
              More Filters
            </button>
          </aside>

          {/* Results Content */}
          <div className="sp-content">
            <div className="sp-content-header">
              <h2 className="sp-results-count">
                <span className="sp-results-number">1,248</span> Properties Found
              </h2>
              <div className="sp-content-actions">
                <div className="sp-sort">
                  <span className="sp-sort-label">Sort By:</span>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sp-sort-select">
                    <option value="newest">Newest First</option>
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
                <div className="sp-view-toggle">
                  <button
                    className={`sp-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid view"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                  </button>
                  <button
                    className={`sp-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List view"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Property Grid */}
            <div className="sp-property-grid">
              {sampleProperties.map((property) => (
                <div className="sp-card" key={property.id}>
                  <div className="sp-card-img">
                    <img src={property.image} alt={property.title} />
                    <span className={`sp-card-badge ${property.badge === 'FOR RENT' ? 'rent' : 'sale'}`}>
                      {property.badge}
                    </span>
                    <button
                      className={`sp-card-heart ${wishlist.includes(property.id) ? 'active' : ''}`}
                      onClick={() => toggleWishlist(property.id)}
                    >
                      <svg width="16" height="16" fill={wishlist.includes(property.id) ? '#ef4444' : 'none'} stroke={wishlist.includes(property.id) ? '#ef4444' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                    </button>
                  </div>
                  <div className="sp-card-body">
                    <div className="sp-card-price">{property.price}</div>
                    <h3 className="sp-card-title">{property.title}</h3>
                    <p className="sp-card-location">
                      <svg width="13" height="13" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {property.location}
                    </p>
                    <div className="sp-card-meta">
                      <span className="sp-card-meta-item">
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 7v11m0-4h18m0 4V8a1 1 0 00-1-1H8a1 1 0 00-1 1v3"/></svg>
                        {property.beds} Beds
                      </span>
                      <span className="sp-card-meta-item">
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 12h16M4 12v6m16-6v6M6 12V8a2 2 0 012-2h1a2 2 0 012 2v4"/></svg>
                        {property.baths} Baths
                      </span>
                      <span className="sp-card-meta-item">
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                        {property.sqft} sqft
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="sp-pagination">
              <button
                className="sp-pg-arrow"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              {getPageNumbers().map((page, idx) =>
                page === '...' ? (
                  <span key={`dots-${idx}`} className="sp-pg-dots">...</span>
                ) : (
                  <button
                    key={page}
                    className={`sp-pg-num ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                className="sp-pg-arrow"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchProperties
