import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { get } from '../services/api'
import Navbar from '../components/Navbar'
import './PropertyDetails.css'

const formatPrice = (price) => {
  if (!price) return '—'
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`
  return `₹${price.toLocaleString('en-IN')}`
}

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

const formatEnum = (val) => {
  if (!val) return '—'
  return val.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const statusConfig = {
  PENDING: { label: 'Pending Review', className: 'pd-status-pending' },
  APPROVED: { label: 'Approved', className: 'pd-status-approved' },
  REJECTED: { label: 'Rejected', className: 'pd-status-rejected' },
}

function PropertyDetails({ isLoggedIn, onLogout }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    fetchProperty(token)
  }, [id, navigate])

  const fetchProperty = async (token) => {
    setLoading(true)
    setError('')
    try {
      const data = await get(`/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProperty(data)
    } catch (err) {
      setError(err.message || 'Failed to load property details')
    } finally {
      setLoading(false)
    }
  }

  const placeholderImg = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">' +
    '<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#f8fafc"/><stop offset="100%" style="stop-color:#e2e8f0"/></linearGradient></defs>' +
    '<rect width="800" height="500" fill="url(#bg)"/>' +
    '<g transform="translate(400,220)">' +
    '<rect x="-48" y="-42" width="96" height="78" rx="8" fill="none" stroke="#cbd5e1" stroke-width="3"/>' +
    '<path d="M-30-12 L-12-30 L18-6 L30-15 L42 0 L42 30 L-42 30 L-42 12 Z" fill="#e2e8f0"/>' +
    '<circle cx="-24" cy="-18" r="9" fill="#f26522" opacity="0.5"/>' +
    '<path d="M-9 42 L-3 33 L3 39 L12 27 L21 42 Z" fill="#cbd5e1" opacity="0.5"/>' +
    '</g>' +
    '<text x="400" y="310" text-anchor="middle" fill="#94a3b8" font-family="Inter,sans-serif" font-size="16" font-weight="500">No Image Available</text>' +
    '</svg>'
  )

  if (loading) {
    return (
      <div className="pd-page">
        <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
        <div className="pd-loading">
          <div className="pd-spinner"></div>
          <p>Loading property details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pd-page">
        <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
        <div className="pd-error-wrap">
          <svg width="28" height="28" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <p>{error}</p>
          <button className="pd-retry-btn" onClick={() => fetchProperty(localStorage.getItem('token'))}>Try Again</button>
        </div>
      </div>
    )
  }

  if (!property) return null

  const p = property
  const status = statusConfig[p.propertyStatus] || statusConfig.PENDING
  const images = p.propertyImageUrls && p.propertyImageUrls.length > 0 ? p.propertyImageUrls : [placeholderImg]

  const infoItems = [
    { label: 'Property Type', value: formatEnum(p.propertyTypes), icon: 'home' },
    { label: 'Sale Type', value: formatEnum(p.saleType), icon: 'tag' },
    { label: 'Facing', value: formatEnum(p.facing), icon: 'compass' },
    { label: 'Furnishing', value: formatEnum(p.furnishingStatus), icon: 'sofa' },
    { label: 'Construction', value: formatEnum(p.constructionStatus), icon: 'build' },
    { label: 'Property Age', value: p.propertyAge != null ? `${p.propertyAge} Years` : '—', icon: 'clock' },
    { label: 'Permission', value: formatEnum(p.permissionType), icon: 'file' },
    { label: 'Colony Type', value: formatEnum(p.colonyType), icon: 'grid' },
    { label: 'Registration', value: formatEnum(p.registrationType), icon: 'check' },
    { label: 'Seller Type', value: formatEnum(p.sellerType), icon: 'user' },
  ].filter((item) => item.value && item.value !== '—')

  const areaItems = [
    { label: 'Total Area', value: p.totalAreaInSqFeet ? `${p.totalAreaInSqFeet} sq.ft` : null },
    { label: 'Built-up Area', value: p.builtUpAreaInSqFeet ? `${p.builtUpAreaInSqFeet} sq.ft` : null },
    { label: 'Road Width', value: p.roadWidth ? `${p.roadWidth} ft` : null },
    { label: 'Dimensions', value: p.dimensionWidth && p.dimensionLength ? `${p.dimensionWidth} × ${p.dimensionLength} ft` : null },
    { label: 'Floor', value: p.floorNo != null ? `${p.floorNo} of ${p.totalNoOfFloors || '—'}` : null },
  ].filter((item) => item.value)

  const roomItems = [
    { label: 'Bedrooms', value: p.bedrooms, icon: 'bed' },
    { label: 'Bathrooms', value: p.bathrooms, icon: 'bath' },
    { label: 'Car Parking', value: p.carParking, icon: 'car' },
    { label: 'Puja Room', value: p.pujaRoom, icon: 'puja' },
  ].filter((item) => item.value != null)

  return (
    <div className="pd-page">
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="pd-container">
        {/* Breadcrumb */}
        <div className="pd-breadcrumb">
          <Link to="/my-properties" className="pd-breadcrumb-link">My Properties</Link>
          <svg width="14" height="14" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
          <span className="pd-breadcrumb-current">{p.propertyName}</span>
        </div>

        {/* Top Section: Gallery + Key Info */}
        <div className="pd-top">
          {/* Gallery */}
          <div className="pd-gallery">
            <div className="pd-gallery-main">
              <img src={images[activeImg]} alt={p.propertyName} className="pd-gallery-img" onError={(e) => { e.target.onerror = null; e.target.src = placeholderImg }} />
              <span className={`pd-status-badge ${status.className}`}>{status.label}</span>
            </div>
            {images.length > 1 && (
              <div className="pd-gallery-thumbs">
                {images.map((img, idx) => (
                  <button key={idx} className={`pd-thumb ${idx === activeImg ? 'active' : ''}`} onClick={() => setActiveImg(idx)}>
                    <img src={img} alt={`${p.propertyName} ${idx + 1}`} onError={(e) => { e.target.onerror = null; e.target.src = placeholderImg }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Info Card */}
          <div className="pd-key-info">
            <div className="pd-key-header">
              <div>
                <h1 className="pd-property-name">{p.propertyName}</h1>
                <div className="pd-property-location">
                  <svg width="15" height="15" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{[p.areaName, p.address, p.pinCode].filter(Boolean).join(', ') || '—'}</span>
                </div>
              </div>
              <div className="pd-price-wrap">
                <span className="pd-price">{formatPrice(p.price)}</span>
                <span className="pd-sale-type">{p.saleType === 'RENT' ? 'Per Month' : 'Total Price'}</span>
              </div>
            </div>

            {/* Quick Stats */}
            {roomItems.length > 0 && (
              <div className="pd-quick-stats">
                {roomItems.map((item) => (
                  <div key={item.label} className="pd-quick-stat">
                    <span className="pd-quick-stat-val">{item.value}</span>
                    <span className="pd-quick-stat-label">{item.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            <div className="pd-tags">
              <span className="pd-tag pd-tag-type">{formatEnum(p.propertyTypes)}</span>
              {p.saleType && <span className="pd-tag pd-tag-sale">{p.saleType === 'RENT' ? 'For Rent' : 'For Sale'}</span>}
              {p.verifiedProperty && <span className="pd-tag pd-tag-verified">Verified</span>}
              {p.loanAvailable && <span className="pd-tag pd-tag-loan">Loan Available</span>}
              {p.reraCompliant && <span className="pd-tag pd-tag-rera">RERA Compliant</span>}
            </div>

            {/* Owner Info */}
            <div className="pd-owner-card">
              <div className="pd-owner-avatar">
                <svg width="22" height="22" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div className="pd-owner-info">
                <span className="pd-owner-name">{p.ownerName}</span>
                <span className="pd-owner-phone">{p.ownerMobileNumber}{p.ownerAlternateNumber ? ` / ${p.ownerAlternateNumber}` : ''}</span>
              </div>
            </div>

            {/* Dates */}
            <div className="pd-dates">
              <div className="pd-date-item">
                <span className="pd-date-label">Listed On</span>
                <span className="pd-date-value">{formatDate(p.createdDate)}</span>
              </div>
              <div className="pd-date-item">
                <span className="pd-date-label">Last Updated</span>
                <span className="pd-date-value">{formatDate(p.modifiedDate)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Sections */}
        <div className="pd-sections">
          {/* Description */}
          {p.propertyDetails && (
            <div className="pd-section">
              <h2 className="pd-section-title">
                <svg width="18" height="18" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                Description
              </h2>
              <p className="pd-description">{p.propertyDetails}</p>
            </div>
          )}

          {/* Property Information */}
          {infoItems.length > 0 && (
            <div className="pd-section">
              <h2 className="pd-section-title">
                <svg width="18" height="18" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                Property Information
              </h2>
              <div className="pd-info-grid">
                {infoItems.map((item) => (
                  <div key={item.label} className="pd-info-item">
                    <span className="pd-info-label">{item.label}</span>
                    <span className="pd-info-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Area & Dimensions */}
          {areaItems.length > 0 && (
            <div className="pd-section">
              <h2 className="pd-section-title">
                <svg width="18" height="18" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                Area & Dimensions
              </h2>
              <div className="pd-info-grid">
                {areaItems.map((item) => (
                  <div key={item.label} className="pd-info-item">
                    <span className="pd-info-label">{item.label}</span>
                    <span className="pd-info-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities */}
          {p.amenities && (
            <div className="pd-section">
              <h2 className="pd-section-title">
                <svg width="18" height="18" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                Amenities
              </h2>
              <div className="pd-amenities">
                {p.amenities.split(',').map((a) => a.trim()).filter(Boolean).map((amenity) => (
                  <span key={amenity} className="pd-amenity-tag">
                    <svg width="12" height="12" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Financial Details */}
          {(p.price || p.maintenanceAmount) && (
            <div className="pd-section">
              <h2 className="pd-section-title">
                <svg width="18" height="18" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                Financial Details
              </h2>
              <div className="pd-info-grid">
                <div className="pd-info-item">
                  <span className="pd-info-label">Price</span>
                  <span className="pd-info-value pd-info-highlight">{formatPrice(p.price)}</span>
                </div>
                {p.maintenanceAmount > 0 && (
                  <div className="pd-info-item">
                    <span className="pd-info-label">Maintenance</span>
                    <span className="pd-info-value">₹{p.maintenanceAmount.toLocaleString('en-IN')}/month</span>
                  </div>
                )}
                <div className="pd-info-item">
                  <span className="pd-info-label">Loan Available</span>
                  <span className="pd-info-value">{p.loanAvailable ? 'Yes' : 'No'}</span>
                </div>
                <div className="pd-info-item">
                  <span className="pd-info-label">RERA Compliant</span>
                  <span className="pd-info-value">{p.reraCompliant ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          {p.documentsUrls && p.documentsUrls.length > 0 && (
            <div className="pd-section">
              <h2 className="pd-section-title">
                <svg width="18" height="18" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Documents
              </h2>
              <div className="pd-docs">
                {p.documentsUrls.map((url, idx) => (
                  <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="pd-doc-link">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    Document {idx + 1}
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Venture */}
          {p.ventureName && (
            <div className="pd-section">
              <h2 className="pd-section-title">
                <svg width="18" height="18" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Project
              </h2>
              <div className="pd-info-grid">
                <div className="pd-info-item">
                  <span className="pd-info-label">Venture Name</span>
                  <span className="pd-info-value">{p.ventureName}</span>
                </div>
                {p.reference && (
                  <div className="pd-info-item">
                    <span className="pd-info-label">Reference</span>
                    <span className="pd-info-value">{p.reference}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails
