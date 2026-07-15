import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { get, put } from '../services/api'
import Navbar from '../components/Navbar'
import './MyProperties.css'

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

const formatPropertyType = (type) => {
  if (!type) return '—'
  const map = {
    FLATS: 'Flats', VILLAS: 'Villas', VILLA: 'Villa', OPEN_PLOTS: 'Open Plots',
    COMMERCIAL: 'Commercial', AGRICULTURE_LAND: 'Agriculture Land',
    INDEPENDENT_HOUSE: 'Independent House', PLOT: 'Plot',
  }
  return map[type] || type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const formatFacing = (f) => {
  if (!f) return null
  return f.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const formatFurnishing = (f) => {
  if (!f) return null
  const map = { FULLY_FURNISHED: 'Fully Furnished', SEMI_FURNISHED: 'Semi Furnished', UNFURNISHED: 'Unfurnished' }
  return map[f] || f.replace(/_/g, ' ')
}

const statusConfig = {
  PENDING: { label: 'Pending', className: 'mp-status-pending' },
  APPROVED: { label: 'Approved', className: 'mp-status-approved' },
  REJECTED: { label: 'Rejected', className: 'mp-status-rejected' },
}

function MyProperties({ isLoggedIn, onLogout }) {
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editModal, setEditModal] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [editSaving, setEditSaving] = useState(false)
  const [editError, setEditError] = useState('')
  const [editSuccess, setEditSuccess] = useState('')
  const [lookups, setLookups] = useState(null)
  const editModalRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    fetchProperties(token)
    // Fetch lookups for dropdown options
    get('/lookups', { headers: { Authorization: `Bearer ${token}` } })
      .then((data) => setLookups(data))
      .catch(() => { /* use fallback options */ })
  }, [navigate])

  const fetchProperties = async (token) => {
    setLoading(true)
    setError('')
    try {
      const data = await get('/properties/my', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProperties(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Failed to load properties')
    } finally {
      setLoading(false)
    }
  }

  const [editTab, setEditTab] = useState('basic')

  const openEditModal = (e, prop) => {
    e.stopPropagation()
    setEditForm({
      propertyName: prop.propertyName || '',
      ownerName: prop.ownerName || '',
      ownerMobileNumber: prop.ownerMobileNumber || '',
      ownerAlternateNumber: prop.ownerAlternateNumber || '',
      propertyTypes: prop.propertyTypes || '',
      saleType: prop.saleType || '',
      sellerType: prop.sellerType || '',
      price: prop.price || '',
      rentPerMonth: prop.rentPerMonth ?? '',
      bedrooms: prop.bedrooms ?? '',
      bathrooms: prop.bathrooms ?? '',
      floorNo: prop.floorNo ?? '',
      totalNoOfFloors: prop.totalNoOfFloors ?? '',
      pujaRoom: prop.pujaRoom ?? '',
      carParking: prop.carParking ?? '',
      totalAreaInSqFeet: prop.totalAreaInSqFeet ?? '',
      builtUpAreaInSqFeet: prop.builtUpAreaInSqFeet ?? '',
      roadWidth: prop.roadWidth ?? '',
      dimensionWidth: prop.dimensionWidth ?? '',
      dimensionLength: prop.dimensionLength ?? '',
      facing: prop.facing || '',
      furnishingStatus: prop.furnishingStatus || '',
      constructionStatus: prop.constructionStatus || '',
      propertyAge: prop.propertyAge ?? '',
      location: prop.location || '',
      areaName: prop.areaName || '',
      address: prop.address || '',
      pinCode: prop.pinCode || '',
      permissionType: prop.permissionType || '',
      colonyType: prop.colonyType || '',
      registrationType: prop.registrationType || '',
      ventureName: prop.ventureName || '',
      amenities: prop.amenities || '',
      loanAvailable: prop.loanAvailable ?? false,
      reraCompliant: prop.reraCompliant ?? false,
      maintenanceAmount: prop.maintenanceAmount ?? '',
      bores: prop.bores ?? '',
      noOfAcres: prop.noOfAcres ?? '',
      numberOfShutters: prop.numberOfShutters ?? '',
      reference: prop.reference || '',
      propertyDetails: prop.propertyDetails || '',
    })
    setEditModal(prop)
    setEditTab('basic')
    setEditError('')
    setEditSuccess('')
  }

  const closeEditModal = () => {
    setEditModal(null)
    setEditForm({})
    setEditError('')
    setEditSuccess('')
  }

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleEditSubmit = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    setEditSaving(true)
    setEditError('')
    setEditSuccess('')

    const payload = {}
    const strFields = ['propertyName', 'ownerName', 'ownerMobileNumber', 'ownerAlternateNumber', 'propertyTypes', 'saleType', 'sellerType', 'facing', 'furnishingStatus', 'constructionStatus', 'location', 'areaName', 'address', 'pinCode', 'permissionType', 'colonyType', 'registrationType', 'ventureName', 'amenities', 'reference', 'propertyDetails']
    strFields.forEach((f) => { if (editForm[f]) payload[f] = editForm[f] })
    const numFields = ['price', 'rentPerMonth', 'bedrooms', 'bathrooms', 'floorNo', 'totalNoOfFloors', 'pujaRoom', 'carParking', 'totalAreaInSqFeet', 'builtUpAreaInSqFeet', 'roadWidth', 'dimensionWidth', 'dimensionLength', 'propertyAge', 'maintenanceAmount', 'bores', 'noOfAcres', 'numberOfShutters']
    numFields.forEach((f) => { if (editForm[f] !== '' && editForm[f] !== undefined) payload[f] = Number(editForm[f]) })
    payload.loanAvailable = editForm.loanAvailable
    payload.reraCompliant = editForm.reraCompliant

    try {
      await put(`/properties/${editModal.propertyId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setEditSuccess('Property updated successfully')
      setProperties((prev) =>
        prev.map((p) => p.propertyId === editModal.propertyId ? { ...p, ...payload } : p)
      )
      setTimeout(() => closeEditModal(), 1200)
    } catch (err) {
      setEditError(err.message || 'Failed to update property')
    } finally {
      setEditSaving(false)
    }
  }

  // Close modal on outside click
  useEffect(() => {
    if (!editModal) return
    const handleClick = (e) => {
      if (editModalRef.current && !editModalRef.current.contains(e.target)) {
        closeEditModal()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [editModal])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (editModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [editModal])

  // Helper to format lookup codes to display labels
  const formatLookupLabel = (code) => {
    if (!code) return code
    return code.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  }

  // Build dropdown options from lookups API (with fallbacks)
  const buildOptions = (lookupKey, fallback) => {
    const base = [{ value: '', label: 'Select' }]
    if (lookups && lookups[lookupKey]) {
      return base.concat(lookups[lookupKey].map((l) => ({ value: l.code, label: formatLookupLabel(l.code) })))
    }
    return base.concat(fallback)
  }

  const dropdownOptions = {
    furnishingStatus: buildOptions('furnishingStatuses', [
      { value: 'FULLY_FURNISHED', label: 'Fully Furnished' }, { value: 'SEMI_FURNISHED', label: 'Semi Furnished' }, { value: 'UNFURNISHED', label: 'Unfurnished' },
    ]),
    facing: buildOptions('facings', [
      { value: 'NORTH', label: 'North' }, { value: 'SOUTH', label: 'South' }, { value: 'EAST', label: 'East' }, { value: 'WEST', label: 'West' },
      { value: 'NORTH_EAST', label: 'North East' }, { value: 'NORTH_WEST', label: 'North West' }, { value: 'SOUTH_EAST', label: 'South East' }, { value: 'SOUTH_WEST', label: 'South West' },
    ]),
    propertyTypes: buildOptions('propertyTypes', [
      { value: 'FLATS', label: 'Flats' }, { value: 'VILLAS', label: 'Villas' }, { value: 'OPEN_PLOTS', label: 'Open Plots' },
      { value: 'COMMERCIAL', label: 'Commercial' }, { value: 'AGRICULTURE_LAND', label: 'Agriculture Land' }, { value: 'INDEPENDENT_HOUSE', label: 'Independent House' },
    ]),
    saleType: buildOptions('saleTypes', [
      { value: 'NEW', label: 'New' }, { value: 'RESALE', label: 'Resale' },
    ]),
    sellerType: buildOptions('sellerTypes', [
      { value: 'OWNER', label: 'Owner' }, { value: 'AGENT', label: 'Agent' }, { value: 'BUILDER', label: 'Builder' },
    ]),
    constructionStatus: buildOptions('constructionStatuses', [
      { value: 'READY', label: 'Ready' }, { value: 'COMPLETE', label: 'Complete' }, { value: 'INCOMPLETE', label: 'Incomplete' },
    ]),
    permissionType: buildOptions('permissionTypes', [
      { value: 'HMDA', label: 'Hmda' }, { value: 'MUNICIPAL', label: 'Municipal' }, { value: 'GRAMPANCHAYAT', label: 'Grampanchayat' }, { value: 'DTCP', label: 'Dtcp' },
    ]),
    colonyType: buildOptions('colonyTypes', [
      { value: 'GATED_COMMUNITY', label: 'Gated Community' }, { value: 'OPEN_PLOT', label: 'Open Plot' }, { value: 'TOWNSHIP', label: 'Township' },
    ]),
    registrationType: buildOptions('registrationTypes', [
      { value: 'REGISTERED', label: 'Registered' }, { value: 'UNREGISTERED', label: 'Unregistered' }, { value: 'IN_PROGRESS', label: 'In Progress' },
    ]),
  }

  const editTabs = [
    { key: 'basic', label: 'Basic Info' },
    { key: 'details', label: 'Details' },
    { key: 'location', label: 'Location' },
    { key: 'financial', label: 'Financial' },
  ]

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
    <div className="mp-page">
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="mp-container">
        {/* Header */}
        <div className="mp-header">
          <div className="mp-header-left">
            <h1 className="mp-title">My Properties</h1>
            <p className="mp-subtitle">Manage and track all your listed properties</p>
          </div>
          <div className="mp-header-right">
            <span className="mp-count">{properties.length} {properties.length === 1 ? 'Property' : 'Properties'}</span>
            <Link to="/post-property" className="mp-add-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Property
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mp-loading">
            <div className="mp-spinner"></div>
            <p>Loading your properties...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="mp-error">
            <svg width="24" height="24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            <p>{error}</p>
            <button className="mp-retry-btn" onClick={() => fetchProperties(localStorage.getItem('token'))}>Try Again</button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && properties.length === 0 && (
          <div className="mp-empty">
            <svg width="64" height="64" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <h3>No Properties Listed</h3>
            <p>You haven't posted any properties yet. Start by adding your first property.</p>
            <Link to="/post-property" className="mp-add-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Post Your First Property
            </Link>
          </div>
        )}

        {/* Property Cards */}
        {!loading && !error && properties.length > 0 && (
          <div className="mp-grid">
            {properties.map((prop) => {
              const status = statusConfig[prop.propertyStatus] || statusConfig.PENDING
              const imgUrl = prop.propertyImageUrls && prop.propertyImageUrls.length > 0
                ? prop.propertyImageUrls[0]
                : placeholderImg

              return (
                <div key={prop.propertyId} className="mp-card" onClick={() => navigate(`/property/${prop.propertyId}`)} style={{ cursor: 'pointer' }}>
                  {/* Image */}
                  <div className="mp-card-img-wrap">
                    <img src={imgUrl} alt={prop.propertyName} className="mp-card-img" onError={(e) => { e.target.onerror = null; e.target.src = placeholderImg }} />
                    <span className={`mp-status-badge ${status.className}`}>{status.label}</span>
                    <span className="mp-sale-badge">{prop.saleType === 'RENT' ? 'For Rent' : 'For Sale'}</span>
                  </div>

                  {/* Content */}
                  <div className="mp-card-body">
                    <div className="mp-card-top">
                      <h3 className="mp-card-title">{prop.propertyName}</h3>
                      <span className="mp-card-price">{formatPrice(prop.price)}</span>
                    </div>

                    <div className="mp-card-location">
                      <svg width="14" height="14" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span>{[prop.areaName, prop.address].filter(Boolean).join(', ') || prop.location || '—'}</span>
                    </div>

                    <div className="mp-card-type">
                      <span className="mp-type-tag">{formatPropertyType(prop.propertyTypes)}</span>
                      {prop.furnishingStatus && <span className="mp-type-tag mp-type-tag-alt">{formatFurnishing(prop.furnishingStatus)}</span>}
                    </div>

                    {/* Stats */}
                    <div className="mp-card-stats">
                      {prop.bedrooms != null && (
                        <div className="mp-stat">
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7"/><path d="M21 7H3l2-4h14l2 4z"/><path d="M7 11h4v4H7z"/></svg>
                          <span>{prop.bedrooms} Bed</span>
                        </div>
                      )}
                      {prop.bathrooms != null && (
                        <div className="mp-stat">
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z"/><path d="M6 12V5a2 2 0 012-2h1"/></svg>
                          <span>{prop.bathrooms} Bath</span>
                        </div>
                      )}
                      {prop.totalAreaInSqFeet != null && (
                        <div className="mp-stat">
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                          <span>{prop.totalAreaInSqFeet} sq.ft</span>
                        </div>
                      )}
                      {prop.facing && (
                        <div className="mp-stat">
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                          <span>{formatFacing(prop.facing)}</span>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="mp-card-footer">
                      <div className="mp-card-meta">
                        <span className="mp-meta-item">
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                          {formatDate(prop.createdDate)}
                        </span>
                        <span className="mp-meta-item">
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          {prop.ownerName}
                        </span>
                        {prop.totalViews != null && (
                          <span className="mp-meta-item">
                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            {prop.totalViews} Views
                          </span>
                        )}
                        {prop.uniqueUsers != null && (
                          <span className="mp-meta-item">
                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                            {prop.uniqueUsers} Visitors
                          </span>
                        )}
                      </div>
                      <div className="mp-card-actions-row">
                        <div className="mp-card-badges">
                          {prop.verifiedProperty && <span className="mp-badge mp-badge-verified">Verified</span>}
                          {prop.loanAvailable && <span className="mp-badge mp-badge-loan">Loan</span>}
                          {prop.reraCompliant && <span className="mp-badge mp-badge-rera">RERA</span>}
                        </div>
                        <button className="mp-edit-btn" onClick={(e) => openEditModal(e, prop)}>
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="mp-modal-overlay">
          <div className="mp-modal" ref={editModalRef}>
            <div className="mp-modal-header">
              <h2 className="mp-modal-title">
                <svg width="20" height="20" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Update Property
              </h2>
              <button className="mp-modal-close" onClick={closeEditModal}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="mp-modal-tabs">
              {editTabs.map((tab) => (
                <button key={tab.key} className={`mp-modal-tab ${editTab === tab.key ? 'active' : ''}`} onClick={() => setEditTab(tab.key)}>{tab.label}</button>
              ))}
            </div>

            <div className="mp-modal-body">
              {editError && <div className="mp-modal-alert mp-modal-alert-error">{editError}</div>}
              {editSuccess && <div className="mp-modal-alert mp-modal-alert-success">{editSuccess}</div>}

              {/* Basic Info Tab */}
              {editTab === 'basic' && (
                <div className="mp-modal-grid">
                  <div className="mp-modal-field mp-modal-field-full">
                    <label className="mp-modal-label">Property Name</label>
                    <input type="text" className="mp-modal-input" value={editForm.propertyName} onChange={(e) => handleEditChange('propertyName', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Owner Name</label>
                    <input type="text" className="mp-modal-input" value={editForm.ownerName} onChange={(e) => handleEditChange('ownerName', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Owner Mobile</label>
                    <input type="text" className="mp-modal-input" value={editForm.ownerMobileNumber} onChange={(e) => handleEditChange('ownerMobileNumber', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Alternate Mobile</label>
                    <input type="text" className="mp-modal-input" value={editForm.ownerAlternateNumber} onChange={(e) => handleEditChange('ownerAlternateNumber', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Property Type</label>
                    <select className="mp-modal-select" value={editForm.propertyTypes} onChange={(e) => handleEditChange('propertyTypes', e.target.value)}>
                      {dropdownOptions.propertyTypes.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Sale Type</label>
                    <select className="mp-modal-select" value={editForm.saleType} onChange={(e) => handleEditChange('saleType', e.target.value)}>
                      {dropdownOptions.saleType.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Seller Type</label>
                    <select className="mp-modal-select" value={editForm.sellerType} onChange={(e) => handleEditChange('sellerType', e.target.value)}>
                      {dropdownOptions.sellerType.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div className="mp-modal-field mp-modal-field-full">
                    <label className="mp-modal-label">Property Details</label>
                    <textarea className="mp-modal-textarea" rows="3" value={editForm.propertyDetails} onChange={(e) => handleEditChange('propertyDetails', e.target.value)} />
                  </div>
                </div>
              )}

              {/* Details Tab */}
              {editTab === 'details' && (
                <div className="mp-modal-grid">
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Bedrooms</label>
                    <input type="number" className="mp-modal-input" value={editForm.bedrooms} onChange={(e) => handleEditChange('bedrooms', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Bathrooms</label>
                    <input type="number" className="mp-modal-input" value={editForm.bathrooms} onChange={(e) => handleEditChange('bathrooms', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Floor No</label>
                    <input type="number" className="mp-modal-input" value={editForm.floorNo} onChange={(e) => handleEditChange('floorNo', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Total Floors</label>
                    <input type="number" className="mp-modal-input" value={editForm.totalNoOfFloors} onChange={(e) => handleEditChange('totalNoOfFloors', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Car Parking</label>
                    <input type="number" className="mp-modal-input" value={editForm.carParking} onChange={(e) => handleEditChange('carParking', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Puja Room</label>
                    <input type="number" className="mp-modal-input" value={editForm.pujaRoom} onChange={(e) => handleEditChange('pujaRoom', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Total Area (sq.ft)</label>
                    <input type="number" className="mp-modal-input" value={editForm.totalAreaInSqFeet} onChange={(e) => handleEditChange('totalAreaInSqFeet', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Built-up Area (sq.ft)</label>
                    <input type="number" className="mp-modal-input" value={editForm.builtUpAreaInSqFeet} onChange={(e) => handleEditChange('builtUpAreaInSqFeet', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Road Width (ft)</label>
                    <input type="number" className="mp-modal-input" value={editForm.roadWidth} onChange={(e) => handleEditChange('roadWidth', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Dimension Width (ft)</label>
                    <input type="number" className="mp-modal-input" value={editForm.dimensionWidth} onChange={(e) => handleEditChange('dimensionWidth', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Dimension Length (ft)</label>
                    <input type="number" className="mp-modal-input" value={editForm.dimensionLength} onChange={(e) => handleEditChange('dimensionLength', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Facing</label>
                    <select className="mp-modal-select" value={editForm.facing} onChange={(e) => handleEditChange('facing', e.target.value)}>
                      {dropdownOptions.facing.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Furnishing</label>
                    <select className="mp-modal-select" value={editForm.furnishingStatus} onChange={(e) => handleEditChange('furnishingStatus', e.target.value)}>
                      {dropdownOptions.furnishingStatus.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Construction Status</label>
                    <select className="mp-modal-select" value={editForm.constructionStatus} onChange={(e) => handleEditChange('constructionStatus', e.target.value)}>
                      {dropdownOptions.constructionStatus.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Property Age (yrs)</label>
                    <input type="number" className="mp-modal-input" value={editForm.propertyAge} onChange={(e) => handleEditChange('propertyAge', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">No. of Shutters</label>
                    <input type="number" className="mp-modal-input" value={editForm.numberOfShutters} onChange={(e) => handleEditChange('numberOfShutters', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Bores</label>
                    <input type="number" className="mp-modal-input" value={editForm.bores} onChange={(e) => handleEditChange('bores', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">No. of Acres</label>
                    <input type="number" step="0.01" className="mp-modal-input" value={editForm.noOfAcres} onChange={(e) => handleEditChange('noOfAcres', e.target.value)} />
                  </div>
                  <div className="mp-modal-field mp-modal-field-full">
                    <label className="mp-modal-label">Amenities</label>
                    <input type="text" className="mp-modal-input" placeholder="e.g. SWIMMING_POOL,GYM,SECURITY" value={editForm.amenities} onChange={(e) => handleEditChange('amenities', e.target.value)} />
                  </div>
                </div>
              )}

              {/* Location Tab */}
              {editTab === 'location' && (
                <div className="mp-modal-grid">
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Location / City</label>
                    <input type="text" className="mp-modal-input" value={editForm.location} onChange={(e) => handleEditChange('location', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Area Name</label>
                    <input type="text" className="mp-modal-input" value={editForm.areaName} onChange={(e) => handleEditChange('areaName', e.target.value)} />
                  </div>
                  <div className="mp-modal-field mp-modal-field-full">
                    <label className="mp-modal-label">Address</label>
                    <input type="text" className="mp-modal-input" value={editForm.address} onChange={(e) => handleEditChange('address', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Pin Code</label>
                    <input type="text" className="mp-modal-input" value={editForm.pinCode} onChange={(e) => handleEditChange('pinCode', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Venture Name</label>
                    <input type="text" className="mp-modal-input" value={editForm.ventureName} onChange={(e) => handleEditChange('ventureName', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Permission Type</label>
                    <select className="mp-modal-select" value={editForm.permissionType} onChange={(e) => handleEditChange('permissionType', e.target.value)}>
                      {dropdownOptions.permissionType.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Colony Type</label>
                    <select className="mp-modal-select" value={editForm.colonyType} onChange={(e) => handleEditChange('colonyType', e.target.value)}>
                      {dropdownOptions.colonyType.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Registration Type</label>
                    <select className="mp-modal-select" value={editForm.registrationType} onChange={(e) => handleEditChange('registrationType', e.target.value)}>
                      {dropdownOptions.registrationType.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div className="mp-modal-field mp-modal-field-full">
                    <label className="mp-modal-label">Reference</label>
                    <input type="text" className="mp-modal-input" value={editForm.reference} onChange={(e) => handleEditChange('reference', e.target.value)} />
                  </div>
                </div>
              )}

              {/* Financial Tab */}
              {editTab === 'financial' && (
                <div className="mp-modal-grid">
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Price (₹)</label>
                    <input type="number" className="mp-modal-input" value={editForm.price} onChange={(e) => handleEditChange('price', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Rent / Month (₹)</label>
                    <input type="number" className="mp-modal-input" value={editForm.rentPerMonth} onChange={(e) => handleEditChange('rentPerMonth', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Maintenance (₹)</label>
                    <input type="number" className="mp-modal-input" value={editForm.maintenanceAmount} onChange={(e) => handleEditChange('maintenanceAmount', e.target.value)} />
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">Loan Available</label>
                    <div className="mp-modal-toggle-row">
                      <button type="button" className={`mp-modal-toggle ${editForm.loanAvailable ? 'active' : ''}`} onClick={() => handleEditChange('loanAvailable', !editForm.loanAvailable)}>
                        <span className="mp-modal-toggle-knob"></span>
                      </button>
                      <span className="mp-modal-toggle-label">{editForm.loanAvailable ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                  <div className="mp-modal-field">
                    <label className="mp-modal-label">RERA Compliant</label>
                    <div className="mp-modal-toggle-row">
                      <button type="button" className={`mp-modal-toggle ${editForm.reraCompliant ? 'active' : ''}`} onClick={() => handleEditChange('reraCompliant', !editForm.reraCompliant)}>
                        <span className="mp-modal-toggle-knob"></span>
                      </button>
                      <span className="mp-modal-toggle-label">{editForm.reraCompliant ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mp-modal-footer">
              <button className="mp-modal-cancel-btn" onClick={closeEditModal}>Cancel</button>
              <button className="mp-modal-save-btn" onClick={handleEditSubmit} disabled={editSaving}>
                {editSaving ? (
                  <>
                    <span className="mp-modal-btn-spinner"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    Update Property
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyProperties
