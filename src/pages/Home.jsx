import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Home.css'
import logoFooter from '../assets/logoOriginal.png'
import heroHouse from '../assets/house.png'
import charminarImg from '../assets/charminar-the-arc-de-triomphe-of-the-east.jpg'

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
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=260&fit=crop',
    price: '₹72,00,000',
    title: 'Elegant Country House',
    location: 'Pune, MH',
    beds: 4,
    baths: 3,
    sqft: '2,800',
    badge: 'FOR SALE',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=260&fit=crop',
    price: '₹55,000/mo',
    title: 'Lakeside Retreat',
    location: 'Chennai, TN',
    beds: 3,
    baths: 2,
    sqft: '2,100',
    badge: 'FOR RENT',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=260&fit=crop',
    price: '₹38,00,000',
    title: 'Contemporary Flat',
    location: 'Kolkata, WB',
    beds: 2,
    baths: 2,
    sqft: '1,400',
    badge: 'FOR SALE',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=260&fit=crop',
    price: '₹22,000/mo',
    title: 'Garden View Home',
    location: 'Ahmedabad, GJ',
    beds: 3,
    baths: 2,
    sqft: '1,600',
    badge: 'FOR RENT',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=260&fit=crop',
    price: '₹95,00,000',
    title: 'Premium Penthouse',
    location: 'Mumbai, MH',
    beds: 5,
    baths: 4,
    sqft: '3,500',
    badge: 'FOR SALE',
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=260&fit=crop',
    price: '₹42,000/mo',
    title: 'Smart Studio Loft',
    location: 'Bangalore, KA',
    beds: 1,
    baths: 1,
    sqft: '850',
    badge: 'FOR RENT',
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&h=260&fit=crop',
    price: '₹52,00,000',
    title: 'Hillside Bungalow',
    location: 'Jaipur, RJ',
    beds: 4,
    baths: 3,
    sqft: '2,600',
    badge: 'FOR SALE',
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=260&fit=crop',
    price: '₹30,000/mo',
    title: 'Riverside Cottage',
    location: 'Goa, GA',
    beds: 2,
    baths: 2,
    sqft: '1,300',
    badge: 'FOR RENT',
  },
  {
    id: 13,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=260&fit=crop',
    price: '₹61,00,000',
    title: 'Skyline Apartment',
    location: 'Noida, UP',
    beds: 3,
    baths: 2,
    sqft: '1,900',
    badge: 'FOR SALE',
  },
  {
    id: 14,
    image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=260&fit=crop',
    price: '₹48,000/mo',
    title: 'Executive Suite',
    location: 'Gurugram, HR',
    beds: 3,
    baths: 3,
    sqft: '2,200',
    badge: 'FOR RENT',
  },
  {
    id: 15,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=260&fit=crop',
    price: '₹33,00,000',
    title: 'Classic Row House',
    location: 'Lucknow, UP',
    beds: 3,
    baths: 2,
    sqft: '1,700',
    badge: 'FOR SALE',
  },
  {
    id: 16,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=260&fit=crop',
    price: '₹26,000/mo',
    title: 'Sunny Terrace Flat',
    location: 'Chandigarh, CH',
    beds: 2,
    baths: 1,
    sqft: '1,100',
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

function Home({ isLoggedIn, onLogout }) {
  const [searchTab, setSearchTab] = useState('buy')
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)

  const propertyOptions = ['Apartment', 'Villa', 'Commercial', 'Plot']
  const searchRef = useRef(null)
  const featuredScrollRef = useRef(null)
  const areaScrollRef = useRef(null)

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
              <a href="#" className="section-view-all">View All Properties &rarr;</a>
            </div>
            <div className="scroll-row">
              <button className="scroll-arrow scroll-arrow-left" onClick={() => scroll(featuredScrollRef, 'left')}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <div className="featured-grid" ref={featuredScrollRef}>
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
              <button className="scroll-arrow scroll-arrow-right" onClick={() => scroll(featuredScrollRef, 'right')}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>
              </button>
            </div>
            <div className="section-header" style={{ marginTop: '32px' }}>
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
            <Link to="/post-property" className="cta-btn">Post Property Now &rarr;</Link>
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
                +91 7997 805 805
              </p>
              <p className="footer-contact-item">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                casaxsupport@gmail.com
              </p>
              <p className="footer-contact-item">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Plot 176, Street 4, Road No. 2, Maruthi Nagar, Raghavendra Colony, Beeramguda, Hyderabad, Telangana 502032
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
