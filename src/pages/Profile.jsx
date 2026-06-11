import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { get, post } from '../services/api'
import Navbar from '../components/Navbar'
import './Profile.css'

function Profile({ isLoggedIn, onLogout }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [popup, setPopup] = useState({ show: false, message: '', type: '' })
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [showPassFields, setShowPassFields] = useState({ current: false, new: false, confirm: false })
  const [changingPassword, setChangingPassword] = useState(false)

  const [userData, setUserData] = useState({})
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    gender: '',
    mobileNumber: '',
    alternativeMobileNumber: '',
    qualification: '',
    annualIncome: '',
    profilePicUrl: '',
    area: '',
    address: '',
    pinCode: '',
    notes: '',
  })

  const formatDob = (dob) => {
    if (!dob) return ''
    const d = new Date(dob)
    if (isNaN(d.getTime())) return dob
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const formatGender = (g) => {
    if (!g) return ''
    return g.charAt(0).toUpperCase() + g.slice(1).toLowerCase()
  }

  const populateForm = (data) => {
    setUserData(data)
    setForm({
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      dob: formatDob(data.dob),
      email: data.email || '',
      gender: formatGender(data.gender),
      mobileNumber: data.mobileNumber || '',
      alternativeMobileNumber: data.alternativeMobileNumber || '',
      qualification: data.qualification || '',
      annualIncome: data.annualIncome || '',
      profilePicUrl: data.profilePicUrl || '',
      area: data.area || '',
      address: data.address || '',
      pinCode: data.pinCode || '',
      notes: data.notes || '',
    })
  }

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const payload = JSON.parse(atob(token.split('.')[1]))
      const userId = payload.userId
      const data = await get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      populateForm(data.user || data)
    } catch (err) {
      showPopup(err.message || 'Failed to load profile', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
      return
    }
    fetchProfile()
  }, [isLoggedIn])

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type })
    setTimeout(() => setPopup({ show: false, message: '', type: '' }), 4000)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setUpdating(true)
    try {
      const token = localStorage.getItem('token')
      await post('/users/update', {
        firstName: form.firstName,
        lastName: form.lastName,
        mobileNumber: form.mobileNumber,
        alternativeMobileNumber: form.alternativeMobileNumber,
        qualification: form.qualification,
        annualIncome: form.annualIncome,
        dob: form.dob,
        gender: form.gender.toUpperCase(),
        profilePicUrl: form.profilePicUrl,
        address: form.address,
        area: form.area,
        pinCode: form.pinCode,
        notes: form.notes,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      showPopup('Profile updated successfully', 'success')
      setIsEditing(false)
      await fetchProfile()
    } catch (err) {
      showPopup(err.message || 'Failed to update profile', 'error')
    } finally {
      setUpdating(false)
    }
  }

  const closePasswordModal = () => {
    setShowPasswordModal(false)
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setShowPassFields({ current: false, new: false, confirm: false })
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showPopup('New password and confirm password do not match', 'error')
      return
    }
    if (passwordForm.newPassword.length < 6) {
      showPopup('New password must be at least 6 characters', 'error')
      return
    }
    setChangingPassword(true)
    try {
      const token = localStorage.getItem('token')
      await post('/users/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      showPopup('Password changed successfully', 'success')
      closePasswordModal()
    } catch (err) {
      showPopup(err.message || 'Failed to change password', 'error')
    } finally {
      setChangingPassword(false)
    }
  }

  const handleCancel = () => {
    populateForm(userData)
    setIsEditing(false)
  }

  const fullName = [userData.firstName, userData.lastName].filter(Boolean).join(' ') || ''
  const memberSince = userData.createdAt
    ? new Date(userData.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : ''

  const properties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop',
      title: 'Modern Villa in Jubilee Hills',
      location: 'Jubilee Hills, Hyderabad',
      price: '₹2.5 Cr',
      tag: 'For Sale',
      tagColor: 'green',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop',
      title: '3BHK Apartment in Gachibowli',
      location: 'Gachibowli, Hyderabad',
      price: '₹35,000/month',
      tag: 'For Rent',
      tagColor: 'blue',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop',
      title: 'Luxury Penthouse in Banjara Hills',
      location: 'Banjara Hills, Hyderabad',
      price: '₹4.2 Cr',
      tag: 'For Sale',
      tagColor: 'green',
    },
  ]

  const enquiries = [
    {
      name: 'Suresh Kumar',
      property: 'Modern Villa in Jubilee Hills',
      message: 'Interested in site visit this weekend',
      date: '05 Jun, 2025',
    },
    {
      name: 'Priya Sharma',
      property: '3BHK Apartment in Gachibowli',
      message: 'Is the rent negotiable?',
      date: '03 Jun, 2025',
    },
    {
      name: 'Amit Reddy',
      property: 'Luxury Penthouse in Banjara Hills',
      message: 'Please share floor plan details',
      date: '01 Jun, 2025',
    },
  ]

  if (loading) {
    return (
      <div className="profile-page">
        <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
        <div className="profile-loading">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      {popup.show && (
        <div className={`profile-popup ${popup.type}`}>
          <span className="profile-popup-icon">
            {popup.type === 'success' ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            )}
          </span>
          <span className="profile-popup-msg">{popup.message}</span>
          <button className="profile-popup-close" onClick={() => setPopup({ show: false, message: '', type: '' })}>&times;</button>
        </div>
      )}
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="profile-breadcrumb-bar">
        <div className="profile-breadcrumb-inner">
          <span className="profile-breadcrumb-label">My Profile</span>
          <span className="profile-breadcrumb-sep">&gt;</span>
          <Link to="/" className="profile-breadcrumb-link">Home</Link>
          <span className="profile-breadcrumb-sep">&gt;</span>
          <span className="profile-breadcrumb-current">Profile</span>
        </div>
      </div>

      <div className="profile-container">
        {/* Left Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-sidebar-card">
            <div className="profile-sidebar-avatar">
              <div className="profile-sidebar-avatar-circle">
                <svg width="48" height="48" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <button className="profile-sidebar-camera" title="Upload photo">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </button>
              </div>
              <h3 className="profile-sidebar-name">{fullName || 'User'}</h3>
              {memberSince && <p className="profile-sidebar-member">Member since {memberSince}</p>}
            </div>

            <div className="profile-sidebar-info">
              <div className="profile-sidebar-info-item">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>{form.email || 'No email'}</span>
              </div>
              <div className="profile-sidebar-info-item">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                <span>{form.mobileNumber || 'No phone'}</span>
              </div>
              <div className="profile-sidebar-info-item">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>{form.area || form.address || 'No location'}</span>
              </div>
            </div>

            <button className="profile-sidebar-edit-btn" onClick={() => setIsEditing(true)}>
              {isEditing ? 'Editing...' : 'Edit Profile'}
            </button>

            <div className="profile-sidebar-completion">
              <div className="profile-sidebar-completion-header">
                <span>Profile Completion</span>
                <span className="profile-sidebar-completion-pct">85%</span>
              </div>
              <div className="profile-sidebar-progress-track">
                <div className="profile-sidebar-progress-fill" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>

          <div className="profile-sidebar-card profile-sidebar-quick">
            <h4 className="profile-sidebar-quick-title">Quick Actions</h4>
            <Link to="/post-property" className="profile-sidebar-quick-item">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              Post New Property
            </Link>
            <a href="#" className="profile-sidebar-quick-item">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              My Properties
            </a>
            <a href="#" className="profile-sidebar-quick-item">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
              Saved Properties
            </a>
            <a href="#" className="profile-sidebar-quick-item">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              My Enquiries
            </a>
            <a href="#" className="profile-sidebar-quick-item">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
              Account Settings
            </a>
          </div>

          <div className="profile-sidebar-card profile-sidebar-help">
            <h4 className="profile-sidebar-help-title">Need Help?</h4>
            <p className="profile-sidebar-help-text">Have questions or need assistance with your account?</p>
            <button className="profile-sidebar-help-btn">Contact Support</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="profile-main">
          <div className="profile-tabs">
            <button className={`profile-tab ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>Personal Info</button>
            <button className={`profile-tab ${activeTab === 'properties' ? 'active' : ''}`} onClick={() => setActiveTab('properties')}>My Properties</button>
            <button className={`profile-tab ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>Saved Properties</button>
            <button className={`profile-tab ${activeTab === 'enquiries' ? 'active' : ''}`} onClick={() => setActiveTab('enquiries')}>Enquiries</button>
          </div>

          {/* Personal Information */}
          <div className="profile-card">
            <div className="profile-card-header">
              <div>
                <h2 className="profile-card-title">Personal Information</h2>
                <p className="profile-card-subtitle">Manage your personal details and contact information.</p>
              </div>
              <button className="profile-change-password-btn" onClick={() => setShowPasswordModal(true)}>Change Password</button>
            </div>

            <form className="profile-form" onSubmit={handleUpdate}>
              <div className="profile-form-grid">
                <div className="profile-field">
                  <label className="profile-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="profile-input"
                    value={form.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="profile-field">
                  <label className="profile-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="profile-input"
                    value={form.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter last name"
                  />
                </div>
                <div className="profile-field">
                  <label className="profile-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="profile-input"
                    value={form.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter email"
                  />
                </div>
                <div className="profile-field">
                  <label className="profile-label">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    className="profile-input"
                    value={form.mobileNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter mobile number"
                  />
                </div>
                <div className="profile-field">
                  <label className="profile-label">Date of Birth</label>
                  <input
                    type="text"
                    name="dob"
                    className="profile-input"
                    value={form.dob}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                <div className="profile-field">
                  <label className="profile-label">Gender</label>
                  <select
                    name="gender"
                    className="profile-input"
                    value={form.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="profile-field">
                  <label className="profile-label">Area</label>
                  <input
                    type="text"
                    name="area"
                    className="profile-input"
                    value={form.area}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter area"
                  />
                </div>
                <div className="profile-field">
                  <label className="profile-label">Pin Code</label>
                  <input
                    type="text"
                    name="pinCode"
                    className="profile-input"
                    value={form.pinCode}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter pin code"
                  />
                </div>
                <div className="profile-field">
                  <label className="profile-label">Alternative Mobile Number</label>
                  <input
                    type="tel"
                    name="alternativeMobileNumber"
                    className="profile-input"
                    value={form.alternativeMobileNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter alternative number"
                  />
                </div>
                <div className="profile-field">
                  <label className="profile-label">Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    className="profile-input"
                    value={form.qualification}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter qualification"
                  />
                </div>
                <div className="profile-field">
                  <label className="profile-label">Annual Income</label>
                  <input
                    type="text"
                    name="annualIncome"
                    className="profile-input"
                    value={form.annualIncome}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter annual income"
                  />
                </div>
                <div className="profile-field profile-field-full">
                  <label className="profile-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="profile-input"
                    value={form.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter full address"
                  />
                </div>
                <div className="profile-field profile-field-full">
                  <label className="profile-label">Notes</label>
                  <textarea
                    name="notes"
                    className="profile-input profile-textarea"
                    value={form.notes}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter notes"
                    rows="3"
                  />
                </div>
              </div>
              {isEditing && (
                <div className="profile-form-actions">
                  <button type="button" className="profile-cancel-btn" onClick={handleCancel}>Cancel</button>
                  <button type="submit" className="profile-update-btn" disabled={updating}>
                    {updating ? 'Updating...' : 'Update Information'}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* My Properties */}
          <div className="profile-card">
            <div className="profile-card-header">
              <h2 className="profile-card-title">My Properties</h2>
              <a href="#" className="profile-view-all">View All &gt;</a>
            </div>
            <div className="profile-properties-grid">
              {properties.map((prop) => (
                <div className="profile-property-card" key={prop.id}>
                  <div className="profile-property-img-wrap">
                    <img src={prop.image} alt={prop.title} className="profile-property-img" />
                    <span className={`profile-property-tag profile-property-tag-${prop.tagColor}`}>{prop.tag}</span>
                  </div>
                  <div className="profile-property-info">
                    <h4 className="profile-property-title">{prop.title}</h4>
                    <p className="profile-property-location">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {prop.location}
                    </p>
                    <p className="profile-property-price">{prop.price}</p>
                    <div className="profile-property-actions">
                      <button className="profile-property-btn profile-property-btn-edit">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        Edit
                      </button>
                      <button className="profile-property-btn profile-property-btn-delete">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Enquiries */}
          <div className="profile-card">
            <div className="profile-card-header">
              <h2 className="profile-card-title">Recent Enquiries</h2>
              <a href="#" className="profile-view-all">View All Enquiries</a>
            </div>
            <div className="profile-table-wrap">
              <table className="profile-table">
                <thead>
                  <tr>
                    <th>Enquiry By</th>
                    <th>Property</th>
                    <th>Message</th>
                    <th>Received On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq, idx) => (
                    <tr key={idx}>
                      <td className="profile-table-name">{enq.name}</td>
                      <td>{enq.property}</td>
                      <td className="profile-table-msg">{enq.message}</td>
                      <td>{enq.date}</td>
                      <td>
                        <button className="profile-table-action-btn">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="profile-modal-overlay" onClick={closePasswordModal}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <h3 className="profile-modal-title">Change Password</h3>
              <button className="profile-modal-close" onClick={closePasswordModal}>&times;</button>
            </div>
            <form onSubmit={handleChangePassword}>
              <div className="profile-modal-body">
                <div className="profile-field">
                  <label className="profile-label">Current Password</label>
                  <div className="profile-input-wrap">
                    <input
                      type={showPassFields.current ? 'text' : 'password'}
                      className="profile-input profile-input-password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                      required
                    />
                    <button type="button" className="profile-pass-toggle" onClick={() => setShowPassFields({ ...showPassFields, current: !showPassFields.current })}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        {showPassFields.current ? (<><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>) : (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>)}
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="profile-field">
                  <label className="profile-label">New Password</label>
                  <div className="profile-input-wrap">
                    <input
                      type={showPassFields.new ? 'text' : 'password'}
                      className="profile-input profile-input-password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="Enter new password"
                      required
                    />
                    <button type="button" className="profile-pass-toggle" onClick={() => setShowPassFields({ ...showPassFields, new: !showPassFields.new })}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        {showPassFields.new ? (<><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>) : (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>)}
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="profile-field">
                  <label className="profile-label">Confirm Password</label>
                  <div className="profile-input-wrap">
                    <input
                      type={showPassFields.confirm ? 'text' : 'password'}
                      className="profile-input profile-input-password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                      required
                    />
                    <button type="button" className="profile-pass-toggle" onClick={() => setShowPassFields({ ...showPassFields, confirm: !showPassFields.confirm })}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        {showPassFields.confirm ? (<><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>) : (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>)}
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="profile-modal-footer">
                <button type="button" className="profile-cancel-btn" onClick={closePasswordModal}>Cancel</button>
                <button type="submit" className="profile-update-btn" disabled={changingPassword}>
                  {changingPassword ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
