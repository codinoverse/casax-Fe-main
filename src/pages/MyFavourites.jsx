import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { get, post } from '../services/api'
import Navbar from '../components/Navbar'
import './MyFavourites.css'

const formatPrice = (price) => {
  if (!price) return '—'
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`
  return `₹${price.toLocaleString('en-IN')}`
}

const formatPropertyType = (type) => {
  if (!type) return '—'
  const map = {
    FLATS: 'Flats', VILLAS: 'Villas', VILLA: 'Villa', OPEN_PLOTS: 'Open Plots',
    COMMERCIAL: 'Commercial', AGRICULTURE_LAND: 'Agriculture Land',
    INDEPENDENT_HOUSE: 'Independent House', PLOT: 'Plot',
  }
  return map[type] || type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const formatFurnishing = (f) => {
  if (!f) return null
  const map = { FULLY_FURNISHED: 'Fully Furnished', SEMI_FURNISHED: 'Semi Furnished', UNFURNISHED: 'Unfurnished' }
  return map[f] || f.replace(/_/g, ' ')
}

const formatFacing = (f) => {
  if (!f) return null
  return f.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function MyFavourites({ isLoggedIn, onLogout }) {
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [removingId, setRemovingId] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    fetchFavourites(token)
  }, [navigate])

  const fetchFavourites = async (token) => {
    setLoading(true)
    setError('')
    try {
      const data = await get('/favourites', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProperties(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Failed to load favourites')
    } finally {
      setLoading(false)
    }
  }

  const removeFavourite = async (e, propertyId) => {
    e.stopPropagation()
    const token = localStorage.getItem('token')
    if (!token) return
    setRemovingId(propertyId)
    try {
      await post('/favourites', { propertyId, add: false }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProperties((prev) => prev.filter((p) => p.propertyId !== propertyId))
      window.dispatchEvent(new CustomEvent('favourites-changed'))
    } catch {
      /* ignore */
    } finally {
      setRemovingId(null)
    }
  }

  const placeholderImg = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250">' +
    '<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#f8fafc"/><stop offset="100%" style="stop-color:#e2e8f0"/></linearGradient></defs>' +
    '<rect width="400" height="250" fill="url(#bg)"/>' +
    '<g transform="translate(200,105)">' +
    '<rect x="-32" y="-28" width="64" height="52" rx="6" fill="none" stroke="#cbd5e1" stroke-width="2"/>' +
    '<path d="M-20-8 L-8-20 L12-4 L20-10 L28 0 L28 20 L-28 20 L-28 8 Z" fill="#e2e8f0"/>' +
    '<circle cx="-16" cy="-12" r="6" fill="#f26522" opacity="0.5"/>' +
    '<path d="M-6 28 L-2 22 L2 26 L8 18 L14 28 Z" fill="#cbd5e1" opacity="0.5"/>' +
    '</g>' +
    '<text x="200" y="165" text-anchor="middle" fill="#94a3b8" font-family="Inter,sans-serif" font-size="12" font-weight="500">No Image Available</text>' +
    '</svg>'
  )

  return (
    <div className="mf-page">
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="mf-container">
        {/* Header */}
        <div className="mf-header">
          <div className="mf-header-left">
            <h1 className="mf-title">My Favourites</h1>
            <p className="mf-subtitle">Properties you've saved for later</p>
          </div>
          <div className="mf-header-right">
            <span className="mf-count">{properties.length} {properties.length === 1 ? 'Property' : 'Properties'}</span>
            <Link to="/buy" className="mf-browse-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Browse Properties
            </Link>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mf-loading">
            <div className="mf-spinner"></div>
            <p>Loading your favourites...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="mf-error">
            <svg width="24" height="24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            <p>{error}</p>
            <button className="mf-retry-btn" onClick={() => fetchFavourites(localStorage.getItem('token'))}>Try Again</button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && properties.length === 0 && (
          <div className="mf-empty">
            <svg width="64" height="64" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            <h3>No Favourites Yet</h3>
            <p>Start exploring properties and save the ones you love by tapping the heart icon.</p>
            <Link to="/buy" className="mf-browse-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Browse Properties
            </Link>
          </div>
        )}

        {/* Favourites Grid */}
        {!loading && !error && properties.length > 0 && (
          <div className="mf-grid">
            {properties.map((prop) => {
              const imgUrl = prop.propertyImageUrls && prop.propertyImageUrls.length > 0
                ? prop.propertyImageUrls[0]
                : placeholderImg

              return (
                <div key={prop.propertyId} className="mf-card" onClick={() => navigate(`/property/${prop.propertyId}`)} style={{ cursor: 'pointer' }}>
                  {/* Image */}
                  <div className="mf-card-img-wrap">
                    <img src={imgUrl} alt={prop.propertyName} className="mf-card-img" onError={(e) => { e.target.onerror = null; e.target.src = placeholderImg }} />
                    <span className="mf-sale-badge">{prop.saleType === 'RENT' ? 'For Rent' : 'For Sale'}</span>
                    <button
                      className={`mf-remove-btn ${removingId === prop.propertyId ? 'removing' : ''}`}
                      onClick={(e) => removeFavourite(e, prop.propertyId)}
                      title="Remove from favourites"
                    >
                      <svg width="16" height="16" fill="#ef4444" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="mf-card-body">
                    <div className="mf-card-top">
                      <h3 className="mf-card-title">{prop.propertyName}</h3>
                      <span className="mf-card-price">{formatPrice(prop.price)}</span>
                    </div>

                    <div className="mf-card-location">
                      <svg width="14" height="14" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span>{[prop.areaName, prop.address].filter(Boolean).join(', ') || prop.location || '—'}</span>
                    </div>

                    <div className="mf-card-type">
                      <span className="mf-type-tag">{formatPropertyType(prop.propertyTypes)}</span>
                      {prop.furnishingStatus && <span className="mf-type-tag mf-type-tag-alt">{formatFurnishing(prop.furnishingStatus)}</span>}
                    </div>

                    {/* Stats */}
                    <div className="mf-card-stats">
                      {prop.bedrooms != null && (
                        <div className="mf-stat">
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7"/><path d="M21 7H3l2-4h14l2 4z"/><path d="M7 11h4v4H7z"/></svg>
                          <span>{prop.bedrooms} Bed</span>
                        </div>
                      )}
                      {prop.bathrooms != null && (
                        <div className="mf-stat">
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z"/><path d="M6 12V5a2 2 0 012-2h1"/></svg>
                          <span>{prop.bathrooms} Bath</span>
                        </div>
                      )}
                      {prop.totalAreaInSqFeet != null && (
                        <div className="mf-stat">
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                          <span>{prop.totalAreaInSqFeet} sq.ft</span>
                        </div>
                      )}
                      {prop.facing && (
                        <div className="mf-stat">
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                          <span>{formatFacing(prop.facing)}</span>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="mf-card-footer">
                      <span className="mf-meta-item">
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        {prop.ownerName || '—'}
                      </span>
                      <div className="mf-card-badges">
                        {prop.verifiedProperty && <span className="mf-badge mf-badge-verified">Verified</span>}
                        {prop.loanAvailable && <span className="mf-badge mf-badge-loan">Loan</span>}
                        {prop.reraCompliant && <span className="mf-badge mf-badge-rera">RERA</span>}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyFavourites
