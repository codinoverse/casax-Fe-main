import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { get, post } from '../services/api'
import Navbar from '../components/Navbar'
import BottomSection from '../components/BottomSection'
import './Home.css'
import charminarImg from '../assets/charminar-the-arc-de-triomphe-of-the-east.jpg'
import cxVerifiedBadge from '../assets/cx-verified.png'

const formatPrice = (price) => {
  if (!price) return '—'
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`
  return `₹${price.toLocaleString('en-IN')}`
}

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

const highlightedProjects = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    builder: 'Prestige Group',
    name: 'Prestige City',
    bhk: '2, 3, 4 BHK',
    type: 'Apartments',
    location: 'Gachibowli, Hyderabad',
    price: '₹85 Lac - ₹2.5 Cr',
    tag: 'NEW LAUNCH',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    builder: 'My Home Group',
    name: 'My Home Bhooja',
    bhk: '3, 4 BHK',
    type: 'Luxury Apartments',
    location: 'Madhapur, Hyderabad',
    price: '₹1.2 Cr - ₹3.8 Cr',
    tag: 'TRENDING',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
    builder: 'Rajapushpa Properties',
    name: 'Rajapushpa Atria',
    bhk: '3, 4 BHK',
    type: 'Villas',
    location: 'Kokapet, Hyderabad',
    price: '₹2.1 Cr - ₹4.5 Cr',
    tag: 'PREMIUM',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&h=400&fit=crop',
    builder: 'Aparna Constructions',
    name: 'Aparna Zenon',
    bhk: '2, 3 BHK',
    type: 'Apartments',
    location: 'Nallagandla, Hyderabad',
    price: '₹65 Lac - ₹1.4 Cr',
    tag: 'READY TO MOVE',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop',
    builder: 'Phoenix Group',
    name: 'Phoenix Palm Republic',
    bhk: '2, 3, 4 BHK',
    type: 'Luxury Villas',
    location: 'Kondapur, Hyderabad',
    price: '₹1.5 Cr - ₹5 Cr',
    tag: 'NEW LAUNCH',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
    builder: 'Salarpuria Sattva',
    name: 'Sattva Magnus',
    bhk: '3, 4 BHK',
    type: 'Apartments',
    location: 'Hitech City, Hyderabad',
    price: '₹1.8 Cr - ₹3.2 Cr',
    tag: 'TRENDING',
  },
]

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&h=700&fit=crop',
    title: 'Your Dream Property,',
    titleHighlight: 'Our Priority.',
    subtitle: 'Buy, Sell or Rent verified properties with ease and confidence.',
  },
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=700&fit=crop',
    title: 'Find Your Perfect',
    titleHighlight: 'Home Today.',
    subtitle: 'Explore thousands of verified listings across top cities in India.',
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&h=700&fit=crop',
    title: 'Invest in Your',
    titleHighlight: 'Future.',
    subtitle: 'Discover premium properties with the best deals and offers.',
  },
]

const highGrowthProjects = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    name: 'The Promenade',
    builder: 'One & Brickstone Developers',
    bhk: '4 BHK Villa',
    location: 'Kollur, Hyderabad',
    price: '₹6.39 Cr – 6.73 Cr',
    tag: 'PREMIUM',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    name: 'Vertex 33 West',
    builder: 'Vertex Vega Developers LLP',
    bhk: '2, 3 BHK Apartments',
    location: 'Nallagandla, Hyderabad',
    price: '₹1.16 Cr – 1.77 Cr',
    tag: 'LAUNCH',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    name: 'Vishan\'s Castle',
    builder: 'B S Infra',
    bhk: '2, 3 BHK Apartments',
    location: 'Meerpet, Hyderabad',
    price: '₹57.85 L – 86.1 L',
    tag: 'NEW',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=300&fit=crop',
    name: 'Yashodas Gokulam',
    builder: 'Elite Homes Infracon LLP',
    bhk: '2, 2.5, 3 BHK Apartments',
    location: 'Nagole, Hyderabad',
    price: '₹54.24 L – 1.22 Cr',
    tag: 'PREMIUM',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=300&fit=crop',
    name: 'Team4 Aria',
    builder: 'Team4 Life Spaces LLP',
    bhk: '3, 3.5 BHK Apartments',
    location: 'Miyapur, Hyderabad',
    price: '₹1.25 Cr – 2.5 Cr',
    tag: 'NEW',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop',
    name: 'Miliarium',
    builder: 'EESHANYA INFRAA',
    bhk: '3, 4 BHK Apartments',
    location: 'Velimela, Sangareddy',
    price: '₹1.19 Cr – 1.99 Cr',
    tag: 'PREMIUM',
  },
]

function Home({ isLoggedIn, onLogout }) {
  const navigate = useNavigate()
  const [searchTab, setSearchTab] = useState('buy')
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const [favourites, setFavourites] = useState(new Set())

  const propertyOptions = ['Apartment', 'Villa', 'Commercial', 'Plot']
  const searchRef = useRef(null)
  const featuredScrollRef = useRef(null)
  const areaScrollRef = useRef(null)
  const highlightedScrollRef = useRef(null)
  const localitiesScrollRef = useRef(null)

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 320
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
    }
  }

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index) => setCurrentSlide(index)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowPropertyDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fetch featured properties from API
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await get('/properties?page=1&pageSize=10')
        setFeaturedProperties(Array.isArray(data.properties) ? data.properties : [])
      } catch {
        setFeaturedProperties([])
      } finally {
        setFeaturedLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  // Fetch user's favourites
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    const fetchFavourites = async () => {
      try {
        const data = await get('/favourites', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const favIds = new Set(Array.isArray(data) ? data.map((f) => f.propertyId) : [])
        setFavourites(favIds)
      } catch { /* ignore */ }
    }
    fetchFavourites()
  }, [isLoggedIn])

  const toggleFavourite = async (e, propertyId) => {
    e.stopPropagation()
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    const isAdding = !favourites.has(propertyId)
    setFavourites((prev) => {
      const next = new Set(prev)
      isAdding ? next.add(propertyId) : next.delete(propertyId)
      return next
    })
    try {
      await post('/favourites', { propertyId, add: isAdding }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      window.dispatchEvent(new CustomEvent('favourites-changed'))
    } catch {
      setFavourites((prev) => {
        const next = new Set(prev)
        isAdding ? next.delete(propertyId) : next.add(propertyId)
        return next
      })
    }
  }

  const placeholderImg = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">' +
    '<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#f8fafc"/><stop offset="100%" style="stop-color:#e2e8f0"/></linearGradient></defs>' +
    '<rect width="400" height="260" fill="url(#bg)"/>' +
    '<g transform="translate(200,110)">' +
    '<rect x="-32" y="-28" width="64" height="52" rx="6" fill="none" stroke="#cbd5e1" stroke-width="2"/>' +
    '<path d="M-20-8 L-8-20 L12-4 L20-10 L28 0 L28 20 L-28 20 L-28 8 Z" fill="#e2e8f0"/>' +
    '<circle cx="-16" cy="-12" r="6" fill="#f26522" opacity="0.5"/>' +
    '<path d="M-6 28 L-2 22 L2 26 L8 18 L14 28 Z" fill="#cbd5e1" opacity="0.5"/>' +
    '</g>' +
    '<text x="200" y="170" text-anchor="middle" fill="#94a3b8" font-family="Inter,sans-serif" font-size="12" font-weight="500">No Image Available</text>' +
    '</svg>'
  )

  return (
    <div className="home-page">
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />

      {/* Hero Section with Carousel */}
      <section className="hero">
        {heroSlides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt="Property"
            className={`hero-bg-img ${index === currentSlide ? 'active' : ''}`}
          />
        ))}
        <div className="hero-overlay"></div>

        {/* Carousel Arrow Buttons */}
        <button className="hero-arrow hero-arrow-left" onClick={prevSlide}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button className="hero-arrow hero-arrow-right" onClick={nextSlide}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>
        </button>

        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="hero-title">
              {heroSlides[currentSlide].title}<br />
              <span className="hero-highlight">{heroSlides[currentSlide].titleHighlight}</span>
            </h1>
            <p className="hero-subtitle">
              {heroSlides[currentSlide].subtitle}
            </p>
            <Link to="/buy" className="hero-explore-btn">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Explore Properties
            </Link>
          </div>

          {/* Carousel Dots */}
          <div className="hero-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

      </section>

      {/* Search Bar between hero and featured */}
      <div className="hero-search-bar" ref={searchRef}>
        <div className="hero-search-inner">
          <div className="hero-search-group">
            <span className="hero-search-label">Search For</span>
            <div className="hero-search-tabs">
              <button className={`hero-search-tab ${searchTab === 'buy' ? 'active' : ''}`} onClick={() => setSearchTab('buy')}>Buy</button>
              <button className={`hero-search-tab ${searchTab === 'rent' ? 'active' : ''}`} onClick={() => setSearchTab('rent')}>Rent</button>
            </div>
          </div>
          <div className="hero-search-group">
            <svg width="16" height="16" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <input type="text" placeholder="Enter location" className="hero-search-input" />
          </div>
          <div className="hero-search-group hero-search-group-dropdown" onClick={() => setShowPropertyDropdown(!showPropertyDropdown)}>
            <svg width="16" height="16" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span className={`hero-search-dropdown-label ${selectedProperty ? 'selected' : ''}`}>{selectedProperty || 'Property Type'}</span>
            <svg className="hero-search-dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            {showPropertyDropdown && (
              <div className="hero-search-custom-dropdown">
                {propertyOptions.map((opt) => (
                  <div
                    key={opt}
                    className={`hero-search-dropdown-option ${selectedProperty === opt ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setSelectedProperty(opt); setShowPropertyDropdown(false) }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="hero-search-btn">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Search Property
          </button>
        </div>
      </div>

      {/* Featured Properties + Quick Links */}
      <section className="featured-section">
        <div className="featured-outer">
          <div className="featured-main">
            <div className="section-header">
              <h2 className="section-title">Featured Properties</h2>
              <Link to="/buy" className="section-view-all">View All Properties &rarr;</Link>
            </div>
            <div className="scroll-row">
              <button className="scroll-arrow scroll-arrow-left" onClick={() => scroll(featuredScrollRef, 'left')}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <div className="featured-grid" ref={featuredScrollRef}>
                {featuredLoading ? (
                  <div className="featured-loading">
                    <div className="featured-spinner"></div>
                    <p>Loading properties...</p>
                  </div>
                ) : featuredProperties.length === 0 ? (
                  <div className="featured-loading">
                    <p>No properties available at the moment.</p>
                  </div>
                ) : (
                  featuredProperties.map((property) => {
                    const imgUrl = property.propertyImageUrls && property.propertyImageUrls.length > 0
                      ? property.propertyImageUrls[0]
                      : placeholderImg
                    const badge = property.saleType === 'RENT' ? 'FOR RENT' : 'FOR SALE'
                    const location = [property.areaName, property.address].filter(Boolean).join(', ') || property.location || '—'

                    return (
                      <div className="property-card" key={property.propertyId} onClick={() => navigate(`/property/${property.propertyId}`)} style={{ cursor: 'pointer' }}>
                        <div className="property-card-image">
                          <img src={imgUrl} alt={property.propertyName} onError={(e) => { e.target.onerror = null; e.target.src = placeholderImg }} />
                          <span className={`property-badge ${badge === 'FOR RENT' ? 'rent' : 'sale'}`}>
                            {badge}
                          </span>
                          <div className="property-card-actions">
                            <button className={`property-action-btn ${favourites.has(property.propertyId) ? 'favourited' : ''}`} onClick={(e) => toggleFavourite(e, property.propertyId)}>
                              <svg width="16" height="16" fill={favourites.has(property.propertyId) ? '#ef4444' : 'none'} stroke={favourites.has(property.propertyId) ? '#ef4444' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                            </button>
                            <button className="property-action-btn" onClick={(e) => e.stopPropagation()}>
                              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                            </button>
                          </div>
                        </div>
                        <div className="property-card-info">
                          <div className="property-card-price">{formatPrice(property.price)}</div>
                          <h3 className="property-card-title">{property.propertyName}</h3>
                          <p className="property-card-location">
                            <svg width="14" height="14" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            {location}
                          </p>
                          <div className="property-card-details">
                            {property.bedrooms != null && (
                              <span className="property-card-detail">
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 7v11m0-4h18m0 4V8a1 1 0 00-1-1H8a1 1 0 00-1 1v3"/></svg>
                                {property.bedrooms} Beds
                              </span>
                            )}
                            {property.bathrooms != null && (
                              <span className="property-card-detail">
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 12h16M4 12v6m16-6v6M6 12V8a2 2 0 012-2h1a2 2 0 012 2v4"/></svg>
                                {property.bathrooms} Baths
                              </span>
                            )}
                            {property.totalAreaInSqFeet != null && (
                              <span className="property-card-detail">
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                                {property.totalAreaInSqFeet} sqft
                              </span>
                            )}
                            {property.totalViews != null && (
                              <span className="property-card-detail">
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                {property.totalViews} Views
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
              <button className="scroll-arrow scroll-arrow-right" onClick={() => scroll(featuredScrollRef, 'right')}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>
              </button>
            </div>
            <div className="section-header" style={{ marginTop: '18px' }}>
              <h2 className="section-title">Prime Area Properties</h2>
              <a href="#" className="section-view-all">View All &rarr;</a>
            </div>
            <div className="scroll-row">
              <button className="scroll-arrow scroll-arrow-left" onClick={() => scroll(areaScrollRef, 'left')}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <div className="area-grid" ref={areaScrollRef}>
                {[
                  { name: 'Gachibowli', count: '2,340', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=260&fit=crop' },
                  { name: 'Kondapur', count: '1,870', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=260&fit=crop' },
                  { name: 'Madhapur', count: '3,120', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=260&fit=crop' },
                  { name: 'Narsingi', count: '1,450', image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=260&fit=crop' },
                  { name: 'Miyapur', count: '1,920', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=260&fit=crop' },
                  { name: 'Kukatpally', count: '2,780', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=260&fit=crop' },
                  { name: 'Banjara Hills', count: '3,450', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=260&fit=crop' },
                  { name: 'Jubilee Hills', count: '2,960', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=260&fit=crop' },
                  { name: 'Hitech City', count: '4,120', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=260&fit=crop' },
                  { name: 'Manikonda', count: '1,680', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=260&fit=crop' },
                ].map((area) => (
                  <a href="#" className="area-card" key={area.name}>
                    <div className="area-card-img-wrap">
                      <img src={area.image} alt={area.name} className="area-card-img" />
                    </div>
                    <div className="area-card-info">
                      <div className="area-card-row">
                        <svg width="14" height="14" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <h3 className="area-card-name">{area.name}</h3>
                        <svg width="16" height="16" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                      <p className="area-card-count">{area.count} Properties</p>
                    </div>
                  </a>
                ))}
              </div>
              <button className="scroll-arrow scroll-arrow-right" onClick={() => scroll(areaScrollRef, 'right')}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>
              </button>
            </div>
          </div>
          <div className="quick-links-sidebar">
            <h3 className="quick-links-title">Quick Links</h3>
            <div className="quick-links-list">
              <Link to="/post-property" className="quick-link-card">
                <div className="quick-link-icon">
                  <svg width="20" height="20" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                </div>
                <div className="quick-link-text">
                  <h4 className="quick-link-name">Post Property</h4>
                  <p className="quick-link-desc">List your property for sale or rent</p>
                </div>
                <svg className="quick-link-arrow" width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>
              <Link to="/buy" className="quick-link-card">
                <div className="quick-link-icon">
                  <svg width="20" height="20" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <div className="quick-link-text">
                  <h4 className="quick-link-name">Buy Property</h4>
                  <p className="quick-link-desc">Find your dream property</p>
                </div>
                <svg className="quick-link-arrow" width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>
              <a href="#" className="quick-link-card">
                <div className="quick-link-icon">
                  <svg width="20" height="20" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                </div>
                <div className="quick-link-text">
                  <h4 className="quick-link-name">Rent Property</h4>
                  <p className="quick-link-desc">Discover rental homes</p>
                </div>
                <svg className="quick-link-arrow" width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
              </a>
              <a href="#" className="quick-link-card">
                <div className="quick-link-icon">
                  <svg width="20" height="20" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                </div>
                <div className="quick-link-text">
                  <h4 className="quick-link-name">Request for Property</h4>
                  <p className="quick-link-desc">Let us find the perfect property for you</p>
                </div>
                <svg className="quick-link-arrow" width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
              </a>
              <a href="#" className="quick-link-card">
                <div className="quick-link-icon">
                  <svg width="20" height="20" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 3h12M6 8h12M14 3c0 5.333-2.667 8-8 8m2 0l6 10"/></svg>
                </div>
                <div className="quick-link-text">
                  <h4 className="quick-link-name">Request for Legal Advice</h4>
                  <p className="quick-link-desc">Get expert legal guidance</p>
                </div>
                <svg className="quick-link-arrow" width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
              </a>
              <a href="#" className="quick-link-card">
                <div className="quick-link-icon">
                  <svg width="20" height="20" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 3h12M6 8h12M14 3c0 5.333-2.667 8-8 8m2 0l6 10"/></svg>
                </div>
                <div className="quick-link-text">
                  <h4 className="quick-link-name">Advertise Your Property</h4>
                  <p className="quick-link-desc">List your property and reach more buyers</p>
                </div>
                <svg className="quick-link-arrow" width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
              </a>
              <a href="#" className="quick-link-card">
                <div className="quick-link-icon">
                  <svg width="20" height="20" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                </div>
                <div className="quick-link-text">
                  <h4 className="quick-link-name">Become a Agent</h4>
                  <p className="quick-link-desc">Join us and grow your career</p>
                </div>
                <svg className="quick-link-arrow" width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Top Highlighted Projects */}
      <section className="highlighted-section">
        <div className="highlighted-inner">
          <div className="section-header">
            <h2 className="section-title">Top Highlighted Projects</h2>
            <a href="#" className="section-view-all">View All Projects &rarr;</a>
          </div>
          <div className="scroll-row">
            <button className="scroll-arrow scroll-arrow-left" onClick={() => scroll(highlightedScrollRef, 'left')}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className="highlighted-grid" ref={highlightedScrollRef}>
              {highlightedProjects.map((project) => (
                <a href="#" className="highlighted-card" key={project.id}>
                  <div className="highlighted-card-img-wrap">
                    <img src={project.image} alt={project.name} className="highlighted-card-img" />
                    <div className="highlighted-card-overlay"></div>
                    <span className={`highlighted-tag ${project.tag === 'NEW LAUNCH' ? 'new' : project.tag === 'TRENDING' ? 'trending' : project.tag === 'PREMIUM' ? 'premium' : 'ready'}`}>
                      {project.tag}
                    </span>
                    <div className="highlighted-card-content">
                      <span className="highlighted-builder">{project.builder}</span>
                      <h3 className="highlighted-name">{project.name}</h3>
                      <div className="highlighted-details">
                        <span className="highlighted-detail">
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                          {project.bhk} {project.type}
                        </span>
                        <span className="highlighted-detail">
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          {project.location}
                        </span>
                      </div>
                      <div className="highlighted-price">{project.price}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <button className="scroll-arrow scroll-arrow-right" onClick={() => scroll(highlightedScrollRef, 'right')}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Explore Top Localities */}
      <section className="localities-section">
        <div className="localities-inner">
          <div className="section-header">
            <h2 className="section-title">Explore Top Localities</h2>
            <a href="#" className="section-view-all">View All Localities &rarr;</a>
          </div>
          <div className="scroll-row">
            <button className="scroll-arrow scroll-arrow-left" onClick={() => scroll(localitiesScrollRef, 'left')}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className="localities-grid" ref={localitiesScrollRef}>
              {[
                { name: 'Gachibowli', count: '2,340', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop', trend: 'up' },
                { name: 'Kondapur', count: '1,870', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop', trend: 'up' },
                { name: 'Madhapur', count: '3,120', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop', trend: 'up' },
                { name: 'Kokapet', count: '1,450', image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=300&fit=crop', trend: 'new' },
                { name: 'Hitech City', count: '4,120', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop', trend: 'up' },
                { name: 'Banjara Hills', count: '3,450', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=300&fit=crop', trend: 'up' },
                { name: 'Jubilee Hills', count: '2,960', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop', trend: 'up' },
                { name: 'Narsingi', count: '1,920', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop', trend: 'new' },
              ].map((locality) => (
                <a href="#" className="locality-card" key={locality.name}>
                  <div className="locality-card-img-wrap">
                    <img src={locality.image} alt={locality.name} className="locality-card-img" />
                    <div className="locality-card-overlay"></div>
                    {locality.trend === 'new' && (
                      <span className="locality-trend-badge">NEW</span>
                    )}
                    {locality.trend === 'up' && (
                      <span className="locality-trend-badge trending">
                        <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
                        TRENDING
                      </span>
                    )}
                  </div>
                  <div className="locality-card-info">
                    <div className="locality-card-name-row">
                      <svg width="14" height="14" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <h3 className="locality-card-name">{locality.name}</h3>
                    </div>
                    <p className="locality-card-count">{locality.count} Properties</p>
                    <div className="locality-card-explore">
                      Explore
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <button className="scroll-arrow scroll-arrow-right" onClick={() => scroll(localitiesScrollRef, 'right')}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* High-Growth Projects to Invest Now */}
      <section className="highgrowth-section">
        <div className="highgrowth-inner">
          <div className="highgrowth-header">
            <div>
              <h2 className="highgrowth-title">High-Growth Projects to <span className="highgrowth-highlight">Invest Now</span></h2>
              <p className="highgrowth-subtitle">Leading projects in high demand</p>
            </div>
          </div>
          <div className="highgrowth-grid">
            {highGrowthProjects.map((project) => (
              <a href="#" className="hg-card" key={project.id}>
                <img src={cxVerifiedBadge} alt="CX Verified" className="hg-verified-badge" />
                <div className="hg-card-img-wrap">
                  <img src={project.image} alt={project.name} className="hg-card-img" />
                  <span className={`hg-tag ${project.tag === 'PREMIUM' ? 'premium' : project.tag === 'LAUNCH' ? 'launch' : 'new'}`}>
                    {project.tag}
                  </span>
                </div>
                <div className="hg-card-body">
                  <div className="hg-card-name-row">
                    <h3 className="hg-card-name">{project.name}</h3>
                  </div>
                  <p className="hg-card-builder">by {project.builder}</p>
                  <div className="hg-card-detail">
                    <svg width="14" height="14" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    <span>{project.bhk}</span>
                  </div>
                  <div className="hg-card-detail">
                    <svg width="14" height="14" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>{project.location}</span>
                  </div>
                  <div className="hg-card-price">{project.price}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <BottomSection />
    </div>
  )
}

export default Home
