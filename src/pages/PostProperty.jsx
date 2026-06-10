import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import './PostProperty.css'

const steps = [
  { id: 1, label: 'Basic Details' },
  { id: 2, label: 'Location' },
  { id: 3, label: 'Property Details' },
  { id: 4, label: 'Media' },
  { id: 5, label: 'Review & Publish' },
]

const amenitiesList = [
  { value: 'parking', label: 'Parking' },
  { value: 'lift', label: 'Lift' },
  { value: 'powerBackup', label: 'Power Backup' },
  { value: 'swimmingPool', label: 'Swimming Pool' },
  { value: 'gym', label: 'Gym' },
  { value: 'security', label: 'Security' },
  { value: 'petFriendly', label: 'Pet Friendly' },
  { value: 'clubHouse', label: 'Club House' },
]

const sidebarMenu = [
  {
    title: 'MY ACCOUNT',
    items: [
      { label: 'Dashboard', icon: 'grid' },
      { label: 'My Profile', icon: 'user' },
      { label: 'My Properties', icon: 'home', active: true },
      { label: 'Saved Properties', icon: 'heart' },
      { label: 'My Enquiries', icon: 'mail' },
      { label: 'Bookings', icon: 'calendar' },
    ],
  },
  {
    title: 'PROPERTY MANAGEMENT',
    items: [
      { label: 'Add New Property', icon: 'plus', active: false },
      { label: 'Manage Properties', icon: 'settings' },
    ],
  },
  {
    title: 'SETTINGS',
    items: [
      { label: 'Account Settings', icon: 'sliders' },
      { label: 'Change Password', icon: 'lock' },
      { label: 'Notifications', icon: 'bell' },
    ],
  },
]

const tips = [
  { icon: 'camera', title: 'High Quality Photos', desc: 'Properties with clear photos get 3x more enquiries.' },
  { icon: 'check', title: 'Accurate Details', desc: 'Complete and accurate information builds trust with buyers.' },
  { icon: 'tag', title: 'Right Price', desc: 'Set a competitive price based on market rates in your area.' },
  { icon: 'shield', title: 'Verify Property', desc: 'Verified properties get priority in search results.' },
]

function getSidebarIcon(name) {
  const props = { width: 18, height: 18, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', viewBox: '0 0 24 24' }
  switch (name) {
    case 'grid': return <svg {...props}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
    case 'user': return <svg {...props}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    case 'home': return <svg {...props}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    case 'heart': return <svg {...props}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
    case 'mail': return <svg {...props}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
    case 'calendar': return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    case 'plus': return <svg {...props}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    case 'settings': return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
    case 'sliders': return <svg {...props}><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
    case 'lock': return <svg {...props}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
    case 'bell': return <svg {...props}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
    default: return null
  }
}

function getTipIcon(name) {
  const props = { width: 22, height: 22, fill: 'none', stroke: '#f26522', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', viewBox: '0 0 24 24' }
  switch (name) {
    case 'camera': return <svg {...props}><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
    case 'check': return <svg {...props}><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    case 'tag': return <svg {...props}><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
    case 'shield': return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    default: return null
  }
}

function PostProperty({ isLoggedIn, onLogout }) {
  const [currentStep, setCurrentStep] = useState(1)

  // Step 1: Basic Details
  const [propertyTitle, setPropertyTitle] = useState('')
  const [selectedPropertyType, setSelectedPropertyType] = useState('')
  const [showPropertyTypeDD, setShowPropertyTypeDD] = useState(false)
  const [propertyFor, setPropertyFor] = useState('sale')
  const [price, setPrice] = useState('')
  const [priceNegotiable, setPriceNegotiable] = useState(false)
  const [bedrooms, setBedrooms] = useState('')
  const [showBedroomsDD, setShowBedroomsDD] = useState(false)
  const [bathrooms, setBathrooms] = useState('')
  const [showBathroomsDD, setShowBathroomsDD] = useState(false)
  const [balconies, setBalconies] = useState('')
  const [showBalconiesDD, setShowBalconiesDD] = useState(false)
  const [propertyAge, setPropertyAge] = useState('')
  const [showPropertyAgeDD, setShowPropertyAgeDD] = useState(false)
  const [furnishing, setFurnishing] = useState('')
  const [showFurnishingDD, setShowFurnishingDD] = useState(false)
  const [description, setDescription] = useState('')
  const [amenities, setAmenities] = useState([])
  const [availability, setAvailability] = useState('')
  const [showAvailabilityDD, setShowAvailabilityDD] = useState(false)
  const [contactTime, setContactTime] = useState('')
  const [showContactTimeDD, setShowContactTimeDD] = useState(false)

  // Step 2: Location Details
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [showCityDD, setShowCityDD] = useState(false)
  const [state, setState] = useState('')
  const [showStateDD, setShowStateDD] = useState(false)
  const [pincode, setPincode] = useState('')
  const [country, setCountry] = useState('India')
  const [showCountryDD, setShowCountryDD] = useState(false)
  const [locality, setLocality] = useState('')
  const [landmark, setLandmark] = useState('')
  const [locationFeatures, setLocationFeatures] = useState([])

  // Step 3: Property Details
  const [totalArea, setTotalArea] = useState('')
  const [carpetArea, setCarpetArea] = useState('')
  const [facing, setFacing] = useState('')
  const [floorNumber, setFloorNumber] = useState('')
  const [totalFloors, setTotalFloors] = useState('')

  // Step 4: Photos & Media
  const [photos, setPhotos] = useState([])

  // Step 5: Review
  const [securityDeposit, setSecurityDeposit] = useState('')
  const [maintenanceCharges, setMaintenanceCharges] = useState('')

  const propertyTypeRef = useRef(null)
  const bedroomsRef = useRef(null)
  const bathroomsRef = useRef(null)
  const balconiesRef = useRef(null)
  const propertyAgeRef = useRef(null)
  const furnishingRef = useRef(null)
  const availabilityRef = useRef(null)
  const contactTimeRef = useRef(null)
  const cityRef = useRef(null)
  const stateRef = useRef(null)
  const countryRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (propertyTypeRef.current && !propertyTypeRef.current.contains(e.target)) setShowPropertyTypeDD(false)
      if (bedroomsRef.current && !bedroomsRef.current.contains(e.target)) setShowBedroomsDD(false)
      if (bathroomsRef.current && !bathroomsRef.current.contains(e.target)) setShowBathroomsDD(false)
      if (balconiesRef.current && !balconiesRef.current.contains(e.target)) setShowBalconiesDD(false)
      if (propertyAgeRef.current && !propertyAgeRef.current.contains(e.target)) setShowPropertyAgeDD(false)
      if (furnishingRef.current && !furnishingRef.current.contains(e.target)) setShowFurnishingDD(false)
      if (availabilityRef.current && !availabilityRef.current.contains(e.target)) setShowAvailabilityDD(false)
      if (contactTimeRef.current && !contactTimeRef.current.contains(e.target)) setShowContactTimeDD(false)
      if (cityRef.current && !cityRef.current.contains(e.target)) setShowCityDD(false)
      if (stateRef.current && !stateRef.current.contains(e.target)) setShowStateDD(false)
      if (countryRef.current && !countryRef.current.contains(e.target)) setShowCountryDD(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const nextStep = () => setCurrentStep((s) => Math.min(5, s + 1))
  const prevStep = () => setCurrentStep((s) => Math.max(1, s - 1))

  const toggleAmenity = (val) => {
    setAmenities((prev) => prev.includes(val) ? prev.filter((a) => a !== val) : [...prev, val])
  }

  const toggleLocationFeature = (val) => {
    setLocationFeatures((prev) => prev.includes(val) ? prev.filter((a) => a !== val) : [...prev, val])
  }

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files)
    const newPhotos = files.map((file) => ({ file, preview: URL.createObjectURL(file) }))
    setPhotos((prev) => [...prev, ...newPhotos])
  }

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const stepLabels = {
    1: 'Next: Location',
    2: 'Next: Property Details',
    3: 'Next: Media',
    4: 'Next: Review & Publish',
  }

  const propertyTypeOptions = ['Apartment', 'Villa / House', 'Commercial', 'Plot / Land']
  const bedroomOptions = ['1', '2', '3', '4', '5+']
  const bathroomOptions = ['1', '2', '3', '4+']
  const balconyOptions = ['0', '1', '2', '3+']
  const ageOptions = ['Under Construction', '0-1 Year', '1-3 Years', '3-5 Years', '5-10 Years', '10+ Years']
  const furnishingOptions = ['Furnished', 'Semi-Furnished', 'Unfurnished']
  const availabilityOptions = ['Ready to Move', 'Within 1 Month', 'Within 3 Months', 'Within 6 Months', 'After 6 Months']
  const contactTimeOptions = ['Any Time', 'Morning (9AM - 12PM)', 'Afternoon (12PM - 4PM)', 'Evening (4PM - 8PM)']

  const cityOptions = ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Goa', 'Noida', 'Gurgaon']
  const stateOptions = ['Maharashtra', 'Karnataka', 'Delhi', 'Telangana', 'Tamil Nadu', 'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Gujarat', 'Kerala', 'Goa']
  const countryOptions = ['India', 'USA', 'UK', 'UAE', 'Singapore', 'Australia']
  const locationFeaturesList = [
    { value: 'cornerProperty', label: 'Corner Property' },
    { value: 'gatedCommunity', label: 'Gated Community' },
    { value: 'nearHighway', label: 'Near Highway' },
    { value: 'metroNearby', label: 'Metro Nearby' },
  ]

  const renderDropdown = (ref, label, value, show, setShow, options, setValue) => (
    <div className="pp-dropdown-wrap" ref={ref}>
      <label className="pp-label">{label}</label>
      <div className={`pp-dropdown-trigger ${show ? 'open' : ''}`} onClick={() => setShow(!show)}>
        <span className={value ? 'pp-dd-value' : 'pp-dd-placeholder'}>{value || `Select ${label}`}</span>
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      {show && (
        <div className="pp-dropdown-menu">
          {options.map((opt) => (
            <div key={opt} className={`pp-dropdown-option ${value === opt ? 'active' : ''}`} onClick={() => { setValue(opt); setShow(false) }}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="pp-page">
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />

      {/* Main 3-column layout */}
      <div className="pp-layout">
        {/* Left Sidebar */}
        <aside className="pp-sidebar">
          {sidebarMenu.map((section) => (
            <div key={section.title} className="pp-sidebar-section">
              <h4 className="pp-sidebar-title">{section.title}</h4>
              <ul className="pp-sidebar-list">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <a href="#" className={`pp-sidebar-link ${item.active ? 'active' : ''}`}>
                      {getSidebarIcon(item.icon)}
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pp-sidebar-help">
            <div className="pp-help-icon">
              <svg width="24" height="24" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h5 className="pp-help-title">Need Help?</h5>
            <p className="pp-help-desc">Get assistance with posting your property</p>
            <button className="pp-help-btn">Contact Support</button>
          </div>
        </aside>

        {/* Center Content */}
        <main className="pp-main">
          {/* Header */}
          <div className="pp-main-header">
            <div>
              <h1 className="pp-main-title">Post a New Property</h1>
              <p className="pp-main-subtitle">Fill in the details below to list your property</p>
            </div>
            <button className="pp-save-draft-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
              Save as Draft
            </button>
          </div>

          {/* Stepper */}
          <div className="pp-stepper">
            {steps.map((step, idx) => (
              <div key={step.id} className={`pp-step ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
                {idx > 0 && <div className="pp-step-line"></div>}
                <div className="pp-step-circle">
                  {currentStep > step.id ? (
                    <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    step.id
                  )}
                </div>
                <span className="pp-step-label">{step.label}</span>
              </div>
            ))}
          </div>

          {/* Step 1: Basic Details */}
          {currentStep === 1 && (
            <div className="pp-form-card">
              <div className="pp-card-header">
                <h2 className="pp-card-title">
                  <span className="pp-card-num">1</span>
                  Basic Details
                </h2>
                <span className="pp-card-badge">Required</span>
              </div>

              <div className="pp-form-body">
                <div className="pp-field-group pp-field-full">
                  <label className="pp-label">Property Title</label>
                  <input type="text" className="pp-input" placeholder="e.g. Beautiful 3BHK Apartment in Whitefield" value={propertyTitle} onChange={(e) => setPropertyTitle(e.target.value)} />
                </div>

                <div className="pp-field-row">
                  {renderDropdown(propertyTypeRef, 'Property Type', selectedPropertyType, showPropertyTypeDD, setShowPropertyTypeDD, propertyTypeOptions, setSelectedPropertyType)}
                  <div className="pp-field-group">
                    <label className="pp-label">Listing Type</label>
                    <div className="pp-radio-group">
                      <label className={`pp-radio-btn ${propertyFor === 'sale' ? 'active' : ''}`}>
                        <input type="radio" name="listingType" value="sale" checked={propertyFor === 'sale'} onChange={() => setPropertyFor('sale')} />
                        <span className="pp-radio-dot"></span>
                        For Sale
                      </label>
                      <label className={`pp-radio-btn ${propertyFor === 'rent' ? 'active' : ''}`}>
                        <input type="radio" name="listingType" value="rent" checked={propertyFor === 'rent'} onChange={() => setPropertyFor('rent')} />
                        <span className="pp-radio-dot"></span>
                        For Rent
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pp-field-row">
                  <div className="pp-field-group">
                    <label className="pp-label">{propertyFor === 'rent' ? 'Monthly Rent' : 'Price'}</label>
                    <div className="pp-input-icon-wrap">
                      <span className="pp-input-prefix">₹</span>
                      <input type="text" className="pp-input pp-input-with-prefix" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                  </div>
                  <div className="pp-field-group pp-field-toggle-wrap">
                    <label className="pp-label">Negotiable</label>
                    <div className="pp-toggle-switch-wrap">
                      <button className={`pp-toggle-switch ${priceNegotiable ? 'on' : ''}`} onClick={() => setPriceNegotiable(!priceNegotiable)}>
                        <span className="pp-toggle-knob"></span>
                      </button>
                      <span className="pp-toggle-label">{priceNegotiable ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div className="pp-field-row pp-field-row-3">
                  {renderDropdown(bedroomsRef, 'Bedrooms', bedrooms, showBedroomsDD, setShowBedroomsDD, bedroomOptions, setBedrooms)}
                  {renderDropdown(bathroomsRef, 'Bathrooms', bathrooms, showBathroomsDD, setShowBathroomsDD, bathroomOptions, setBathrooms)}
                  {renderDropdown(balconiesRef, 'Balcony', balconies, showBalconiesDD, setShowBalconiesDD, balconyOptions, setBalconies)}
                </div>

                <div className="pp-field-row">
                  {renderDropdown(propertyAgeRef, 'Property Age', propertyAge, showPropertyAgeDD, setShowPropertyAgeDD, ageOptions, setPropertyAge)}
                  {renderDropdown(furnishingRef, 'Furnishing', furnishing, showFurnishingDD, setShowFurnishingDD, furnishingOptions, setFurnishing)}
                </div>

                <div className="pp-field-group pp-field-full">
                  <div className="pp-label-row">
                    <label className="pp-label">Property Description</label>
                    <span className="pp-char-count">{description.length}/2000</span>
                  </div>
                  <textarea className="pp-textarea" placeholder="Describe your property - key features, nearby facilities, and why it's a great choice..." rows="5" maxLength={2000} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                {/* Additional Details */}
                <div className="pp-field-group pp-field-full">
                  <label className="pp-label">Additional Details</label>
                  <div className="pp-amenities-grid">
                    {amenitiesList.map((am) => (
                      <label key={am.value} className={`pp-amenity-check ${amenities.includes(am.value) ? 'checked' : ''}`}>
                        <input type="checkbox" checked={amenities.includes(am.value)} onChange={() => toggleAmenity(am.value)} />
                        <span className="pp-amenity-box">
                          <svg width="12" height="12" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        {am.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pp-field-row">
                  {renderDropdown(availabilityRef, 'Availability', availability, showAvailabilityDD, setShowAvailabilityDD, availabilityOptions, setAvailability)}
                  {renderDropdown(contactTimeRef, 'Preferred Contact Time', contactTime, showContactTimeDD, setShowContactTimeDD, contactTimeOptions, setContactTime)}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="pp-form-card">
              <div className="pp-card-header">
                <h2 className="pp-card-title"><span className="pp-card-num">2</span>Location</h2>
                <span className="pp-card-badge">Required</span>
              </div>
              <div className="pp-form-body">
                {/* Map Placeholder */}
                <div className="pp-map-placeholder">
                  <div className="pp-map-content">
                    <svg width="36" height="36" fill="none" stroke="#f26522" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <p className="pp-map-text">Click on map to set location or search below</p>
                    <button type="button" className="pp-map-btn">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      Set on Map
                    </button>
                  </div>
                </div>

                <div className="pp-field-group pp-field-full">
                  <label className="pp-label">Full Address</label>
                  <textarea className="pp-textarea" placeholder="Enter complete address with house/flat number, street, area..." rows="3" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                </div>

                <div className="pp-field-row">
                  {renderDropdown(cityRef, 'City', city, showCityDD, setShowCityDD, cityOptions, setCity)}
                  {renderDropdown(stateRef, 'State', state, showStateDD, setShowStateDD, stateOptions, setState)}
                </div>

                <div className="pp-field-row">
                  <div className="pp-field-group">
                    <label className="pp-label">Pin Code</label>
                    <input type="text" className="pp-input" placeholder="e.g. 560066" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                  </div>
                  {renderDropdown(countryRef, 'Country', country, showCountryDD, setShowCountryDD, countryOptions, setCountry)}
                </div>

                <div className="pp-field-row">
                  <div className="pp-field-group">
                    <label className="pp-label">Locality / Area</label>
                    <input type="text" className="pp-input" placeholder="e.g. Whitefield, Koramangala" value={locality} onChange={(e) => setLocality(e.target.value)} />
                  </div>
                  <div className="pp-field-group">
                    <label className="pp-label">Landmark</label>
                    <input type="text" className="pp-input" placeholder="e.g. Near Phoenix Mall" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
                  </div>
                </div>

                {/* Additional Location Details */}
                <div className="pp-field-group pp-field-full">
                  <label className="pp-label">Additional Location Details</label>
                  <div className="pp-amenities-grid">
                    {locationFeaturesList.map((feat) => (
                      <label key={feat.value} className={`pp-amenity-check ${locationFeatures.includes(feat.value) ? 'checked' : ''}`}>
                        <input type="checkbox" checked={locationFeatures.includes(feat.value)} onChange={() => toggleLocationFeature(feat.value)} />
                        <span className="pp-amenity-box">
                          <svg width="12" height="12" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        {feat.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Property Details */}
          {currentStep === 3 && (
            <div className="pp-form-card">
              <div className="pp-card-header">
                <h2 className="pp-card-title"><span className="pp-card-num">3</span>Property Details</h2>
                <span className="pp-card-badge">Required</span>
              </div>
              <div className="pp-form-body">
                <div className="pp-field-row">
                  <div className="pp-field-group">
                    <label className="pp-label">Total Area (sq.ft)</label>
                    <input type="text" className="pp-input" placeholder="e.g. 1500" value={totalArea} onChange={(e) => setTotalArea(e.target.value)} />
                  </div>
                  <div className="pp-field-group">
                    <label className="pp-label">Carpet Area (sq.ft)</label>
                    <input type="text" className="pp-input" placeholder="e.g. 1200" value={carpetArea} onChange={(e) => setCarpetArea(e.target.value)} />
                  </div>
                </div>
                <div className="pp-field-row pp-field-row-3">
                  <div className="pp-field-group">
                    <label className="pp-label">Facing</label>
                    <input type="text" className="pp-input" placeholder="e.g. North" value={facing} onChange={(e) => setFacing(e.target.value)} />
                  </div>
                  <div className="pp-field-group">
                    <label className="pp-label">Floor Number</label>
                    <input type="text" className="pp-input" placeholder="e.g. 5" value={floorNumber} onChange={(e) => setFloorNumber(e.target.value)} />
                  </div>
                  <div className="pp-field-group">
                    <label className="pp-label">Total Floors</label>
                    <input type="text" className="pp-input" placeholder="e.g. 12" value={totalFloors} onChange={(e) => setTotalFloors(e.target.value)} />
                  </div>
                </div>
                {propertyFor === 'rent' && (
                  <div className="pp-field-row">
                    <div className="pp-field-group">
                      <label className="pp-label">Security Deposit</label>
                      <div className="pp-input-icon-wrap">
                        <span className="pp-input-prefix">₹</span>
                        <input type="text" className="pp-input pp-input-with-prefix" placeholder="e.g. 1,00,000" value={securityDeposit} onChange={(e) => setSecurityDeposit(e.target.value)} />
                      </div>
                    </div>
                    <div className="pp-field-group">
                      <label className="pp-label">Maintenance (monthly)</label>
                      <div className="pp-input-icon-wrap">
                        <span className="pp-input-prefix">₹</span>
                        <input type="text" className="pp-input pp-input-with-prefix" placeholder="e.g. 5,000" value={maintenanceCharges} onChange={(e) => setMaintenanceCharges(e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Media */}
          {currentStep === 4 && (
            <div className="pp-form-card">
              <div className="pp-card-header">
                <h2 className="pp-card-title"><span className="pp-card-num">4</span>Media</h2>
                <span className="pp-card-badge">Required</span>
              </div>
              <div className="pp-form-body">
                <div className="pp-upload-area">
                  <input type="file" id="photo-upload" multiple accept="image/*" onChange={handlePhotoUpload} className="pp-upload-input" />
                  <label htmlFor="photo-upload" className="pp-upload-label">
                    <svg width="40" height="40" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <span className="pp-upload-text">Click to upload or drag and drop</span>
                    <span className="pp-upload-hint">PNG, JPG up to 10MB each</span>
                  </label>
                </div>
                {photos.length > 0 && (
                  <div className="pp-photo-grid">
                    {photos.map((photo, idx) => (
                      <div key={idx} className="pp-photo-item">
                        <img src={photo.preview} alt={`Property ${idx + 1}`} />
                        <button className="pp-photo-remove" onClick={() => removePhoto(idx)}>
                          <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Review & Publish */}
          {currentStep === 5 && (
            <div className="pp-form-card">
              <div className="pp-card-header">
                <h2 className="pp-card-title"><span className="pp-card-num">5</span>Review & Publish</h2>
                <span className="pp-card-badge pp-card-badge-green">Final Step</span>
              </div>
              <div className="pp-form-body">
                <div className="pp-review-summary">
                  <div className="pp-review-row">
                    <span className="pp-review-label">Property Title</span>
                    <span className="pp-review-value">{propertyTitle || '—'}</span>
                  </div>
                  <div className="pp-review-row">
                    <span className="pp-review-label">Property Type</span>
                    <span className="pp-review-value">{selectedPropertyType || '—'}</span>
                  </div>
                  <div className="pp-review-row">
                    <span className="pp-review-label">Listing Type</span>
                    <span className="pp-review-value">{propertyFor === 'sale' ? 'For Sale' : 'For Rent'}</span>
                  </div>
                  <div className="pp-review-row">
                    <span className="pp-review-label">Price</span>
                    <span className="pp-review-value">{price ? `₹${price}` : '—'}{priceNegotiable ? ' (Negotiable)' : ''}</span>
                  </div>
                  <div className="pp-review-row">
                    <span className="pp-review-label">Bedrooms / Bathrooms</span>
                    <span className="pp-review-value">{bedrooms || '—'} / {bathrooms || '—'}</span>
                  </div>
                  <div className="pp-review-row">
                    <span className="pp-review-label">Location</span>
                    <span className="pp-review-value">{[address, city, state].filter(Boolean).join(', ') || '—'}</span>
                  </div>
                  <div className="pp-review-row">
                    <span className="pp-review-label">Photos</span>
                    <span className="pp-review-value">{photos.length} uploaded</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Collapsed steps (past + future) */}
          <div className="pp-collapsed-steps">
            {steps.filter((s) => s.id !== currentStep).map((step) => (
              <div key={step.id} className={`pp-collapsed-step ${step.id < currentStep ? 'completed' : ''}`} onClick={() => setCurrentStep(step.id)}>
                <div className="pp-collapsed-left">
                  <span className={`pp-collapsed-num ${step.id < currentStep ? 'completed' : ''}`}>
                    {step.id < currentStep ? (
                      <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : step.id}
                  </span>
                  <span className="pp-collapsed-label">{step.label}</span>
                </div>
                <svg width="14" height="14" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="pp-form-actions">
            {currentStep > 1 && (
              <button className="pp-btn-prev" onClick={prevStep}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
                Previous
              </button>
            )}
            {currentStep < 5 ? (
              <button className="pp-btn-next" onClick={nextStep}>
                {stepLabels[currentStep]}
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            ) : (
              <button className="pp-btn-submit">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                Publish Property
              </button>
            )}
          </div>
        </main>

        {/* Right Sidebar - Tips */}
        <aside className="pp-tips">
          <h3 className="pp-tips-title">Tips for Better Listing</h3>
          <div className="pp-tips-list">
            {tips.map((tip) => (
              <div key={tip.title} className="pp-tip-card">
                <div className="pp-tip-icon">{getTipIcon(tip.icon)}</div>
                <div className="pp-tip-text">
                  <h4 className="pp-tip-title">{tip.title}</h4>
                  <p className="pp-tip-desc">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default PostProperty
