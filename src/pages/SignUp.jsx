import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'
import logo from '../assets/Logo.png'
import './Auth.css'

function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [area, setArea] = useState('')
  const [pincode, setPincode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [phonePrefix, setPhonePrefix] = useState('+91')
  const [showPrefixDD, setShowPrefixDD] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [termsCheckedInModal, setTermsCheckedInModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const prefixRef = useRef(null)

  const prefixOptions = [
    { value: '+91', label: '+91', country: 'India' },
    { value: '+1', label: '+1', country: 'USA' },
    { value: '+44', label: '+44', country: 'UK' },
    { value: '+971', label: '+971', country: 'UAE' },
  ]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (prefixRef.current && !prefixRef.current.contains(e.target)) {
        setShowPrefixDD(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navigate = useNavigate()

  const mobileValid = /^[6-9]\d{9}$/.test(mobile)

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const handleBackStep = () => {
    setError('')
    setCurrentStep((s) => Math.max(1, s - 1))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (currentStep < 4) {
      setCurrentStep((s) => s + 1)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!Object.values(passwordChecks).every(Boolean)) {
      setError('Password does not meet all requirements')
      return
    }

    setLoading(true)
    try {
      await registerUser({
        firstName,
        lastName,
        mobileNumber: mobile,
        email,
        password,
        dob,
        gender,
        area,
        address,
        pincode,
      })
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const checkIcon = (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
  )

  return (
    <div className="auth-page">
      <div className="auth-modal">
        <button className="auth-back-btn" onClick={() => navigate('/')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        {/* Left Panel */}
        <div className="auth-left-login auth-left-signup">
          <div className="auth-left-top">
            <img src={logo} alt="CasaX" className="auth-left-logo" />
            <h1 className="auth-left-title">
              Find Your <span className="text-orange">Dream Home</span>
            </h1>
            <p className="auth-left-login-subtitle">
              Join thousands of happy homeowners who found their perfect property with CasaX
            </p>
            <div className="orange-line"></div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="auth-right">
          <div className="auth-right-content auth-right-signup">
            <div className="auth-heading">
              <h2 className="auth-heading-main">
                Create your <span className="text-orange">Account</span>
              </h2>
              <div className="dashline"></div>
            </div>

            {/* Stepper */}
            <div className="signup-stepper">
              <div
                className={`signup-stepper-step ${currentStep > 1 ? 'completed' : ''} ${currentStep === 1 ? 'active' : ''}`}
                onClick={() => currentStep > 1 && setCurrentStep(1)}
              >
                <div className="stepper-circle">{currentStep > 1 ? checkIcon : '1'}</div>
                <span className="stepper-label">Personal Info</span>
              </div>
              <div className={`stepper-line ${currentStep > 1 ? 'completed' : ''}`}></div>
              <div
                className={`signup-stepper-step ${currentStep > 2 ? 'completed' : ''} ${currentStep === 2 ? 'active' : ''}`}
                onClick={() => currentStep > 2 && setCurrentStep(2)}
              >
                <div className="stepper-circle">{currentStep > 2 ? checkIcon : '2'}</div>
                <span className="stepper-label">Contact Details</span>
              </div>
              <div className={`stepper-line ${currentStep > 2 ? 'completed' : ''}`}></div>
              <div
                className={`signup-stepper-step ${currentStep > 3 ? 'completed' : ''} ${currentStep === 3 ? 'active' : ''}`}
                onClick={() => currentStep > 3 && setCurrentStep(3)}
              >
                <div className="stepper-circle">{currentStep > 3 ? checkIcon : '3'}</div>
                <span className="stepper-label">Address</span>
              </div>
              <div className={`stepper-line ${currentStep > 3 ? 'completed' : ''}`}></div>
              <div className={`signup-stepper-step ${currentStep === 4 ? 'active' : ''}`}>
                <div className="stepper-circle">4</div>
                <span className="stepper-label">Security</span>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="auth-form signup-step-form">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="form-section">
                  <div className="form-section-title">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Personal Information
                  </div>
                  <div className="form-row">
                    <div className="input-group">
                      <label className="input-label">First Name</label>
                      <div className="input-wrapper">
                        <span className="input-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </span>
                        <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                      </div>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Last Name</label>
                      <div className="input-wrapper">
                        <span className="input-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </span>
                        <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="input-group">
                      <label className="input-label">Date of Birth</label>
                      <div className="input-wrapper">
                        <span className="input-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        </span>
                        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                      </div>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Gender</label>
                      <div className="input-wrapper">
                        <span className="input-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </span>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                          <option value="" disabled>Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Details */}
              {currentStep === 2 && (
                <div className="form-section">
                  <div className="form-section-title">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                    Contact Details
                  </div>
                  <div className="input-group">
                    <label className="input-label">Mobile Number</label>
                    <div className="input-wrapper has-prefix">
                      <span className="input-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                          <line x1="12" y1="18" x2="12.01" y2="18" />
                        </svg>
                      </span>
                      <div className="phone-prefix-wrapper" ref={prefixRef} onClick={() => setShowPrefixDD(!showPrefixDD)}>
                        <span className="phone-prefix-value">{phonePrefix}</span>
                        <svg className="prefix-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                        {showPrefixDD && (
                          <div className="phone-prefix-dropdown">
                            {prefixOptions.map((opt) => (
                              <div
                                key={opt.value}
                                className={`phone-prefix-option ${phonePrefix === opt.value ? 'active' : ''}`}
                                onClick={(e) => { e.stopPropagation(); setPhonePrefix(opt.value); setShowPrefixDD(false) }}
                              >
                                <span className="prefix-code">{opt.label}</span>
                                <span className="prefix-country">{opt.country}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <input
                        type="tel"
                        placeholder="Enter your mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        inputMode="numeric"
                        maxLength={10}
                        pattern="[6-9][0-9]{9}"
                        title="Enter a valid 10-digit mobile number"
                        required
                      />
                    </div>
                    {mobile.length > 0 && !mobileValid && (
                      <span className="field-error">
                        {mobile.length < 10 ? 'Mobile number must be 10 digits' : 'Enter a valid mobile number starting with 6-9'}
                      </span>
                    )}
                    {mobileValid && (
                      <span className="field-success">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        Valid mobile number
                      </span>
                    )}
                  </div>
                  <div className="input-group">
                    <label className="input-label">Email Address</label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M22 4L12 13L2 4" />
                        </svg>
                      </span>
                      <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Address */}
              {currentStep === 3 && (
                <div className="form-section">
                  <div className="form-section-title">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Address
                  </div>
                  <div className="input-group">
                    <label className="input-label">Street Address</label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </span>
                      <input type="text" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="input-group">
                      <label className="input-label">Area</label>
                      <div className="input-wrapper">
                        <span className="input-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                            <line x1="8" y1="2" x2="8" y2="18" />
                            <line x1="16" y1="6" x2="16" y2="22" />
                          </svg>
                        </span>
                        <input type="text" placeholder="Enter area" value={area} onChange={(e) => setArea(e.target.value)} required />
                      </div>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Pincode</label>
                      <div className="input-wrapper">
                        <span className="input-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                        </span>
                        <input type="text" placeholder="Enter pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} maxLength="6" required />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Security */}
              {currentStep === 4 && (
                <div className="form-section">
                  <div className="form-section-title">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Security
                  </div>
                  <div className="form-row">
                    <div className="input-group">
                      <label className="input-label">Password</label>
                      <div className="input-wrapper">
                        <span className="input-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </span>
                        <input type={showPassword ? 'text' : 'password'} placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {showPassword ? (<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>) : (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>)}
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Confirm Password</label>
                      <div className="input-wrapper">
                        <span className="input-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </span>
                        <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {showConfirmPassword ? (<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>) : (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>)}
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="password-req-section">
                    <span className="password-req-label">Password must contain:</span>
                    <div className="password-requirements">
                      <div className={`req-item ${passwordChecks.length ? 'met' : ''}`}>
                        <svg className="req-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        8+ characters
                      </div>
                      <div className={`req-item ${passwordChecks.uppercase ? 'met' : ''}`}>
                        <svg className="req-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        Uppercase
                      </div>
                      <div className={`req-item ${passwordChecks.number ? 'met' : ''}`}>
                        <svg className="req-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        Number
                      </div>
                      <div className={`req-item ${passwordChecks.special ? 'met' : ''}`}>
                        <svg className="req-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        Special char
                      </div>
                    </div>
                  </div>
                  <label className="terms-check" onClick={(e) => { if (!agreedToTerms) { e.preventDefault(); setShowTermsModal(true) } }}>
                    <input type="checkbox" checked={agreedToTerms} onChange={(e) => { if (!e.target.checked) setAgreedToTerms(false) }} />
                    <span className="checkmark"></span>
                    <span className="terms-text">
                      I agree to the <span className="link-orange">Terms of Use</span> and <span className="link-orange">Privacy Policy</span>
                    </span>
                  </label>
                </div>
              )}

              {error && <div className="auth-error-msg">{error}</div>}

              <div className="signup-step-actions">
                {currentStep > 1 && (
                  <button type="button" className="step-back-btn" onClick={handleBackStep}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Back
                  </button>
                )}
                {currentStep < 4 ? (
                  <button type="submit" className="auth-btn step-next-btn">
                    Next
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                ) : (
                  <button type="submit" className="auth-btn step-next-btn" disabled={!agreedToTerms || loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                )}
              </div>
            </form>

            <p className="auth-secure-note">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              Your data is safe and secure with us.
            </p>

            <p className="auth-subheading">
              Already have an account? <Link to="/login" className="link-orange">Login</Link>
            </p>

            <div className="auth-badges-inline">
              <div className="auth-badge-inline">
                <div className="badge-icon-circle-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <span className="badge-inline-title">Verified Listings</span>
                  <span className="badge-inline-desc">100% Trusted</span>
                </div>
              </div>
              <div className='line-btw-badge'></div>
              <div className="auth-badge-inline">
                <div className="badge-icon-circle-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <span className="badge-inline-title">Verified Agents</span>
                  <span className="badge-inline-desc">Experienced</span>
                </div>
              </div>
              <div className='line-btw-badge'></div>
              <div className="auth-badge-inline">
                <div className="badge-icon-circle-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div>
                  <span className="badge-inline-title">Fast Deals</span>
                  <span className="badge-inline-desc">Quick & Easy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="terms-modal-overlay" onClick={() => setShowTermsModal(false)}>
          <div className="terms-modal" onClick={(e) => e.stopPropagation()}>
            {/* Top Banner */}
            <div className="terms-top-banner">
              <img src={logo} alt="CasaX" className="terms-banner-logo" />
              <p className="terms-banner-tagline">BUY. SELL. RENT.</p>
            </div>

            {/* Scrollable Content */}
            <div className="terms-modal-body">
              {/* Title */}
              <div className="terms-title-section">
                <h2 className="terms-main-title">Before You Continue</h2>
                <p className="terms-main-subtitle">Please read and accept our Terms & Conditions and Privacy Policy to create your account and use CASAX services.</p>
              </div>

              {/* Safety Priority Section */}
              <div className="terms-safety-section">
                <h3 className="terms-safety-heading">Your Safety is Our Priority</h3>
                <div className="terms-safety-cards">
                  <div className="terms-safety-card">
                    <div className="terms-safety-icon terms-safety-icon-orange">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <span>Do not share OTP or passwords</span>
                  </div>
                  <div className="terms-safety-card">
                    <div className="terms-safety-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <span>Verify property documents before making any payment</span>
                  </div>
                  <div className="terms-safety-card">
                    <div className="terms-safety-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <span>Meet in safe and public places</span>
                  </div>
                  <div className="terms-safety-card">
                    <div className="terms-safety-icon terms-safety-icon-warning">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    </div>
                    <span>Report suspicious users or listings immediately</span>
                  </div>
                  <div className="terms-safety-card">
                    <div className="terms-safety-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <span>CASAX will never ask for OTP or sensitive details</span>
                  </div>
                </div>
              </div>

              {/* Terms Highlights Section */}
              <div className="terms-highlights-section">
                <div className="terms-highlights-header">
                  <h3 className="terms-highlights-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    Terms & Conditions Highlights
                  </h3>
                  <a href="#" className="terms-view-full link-orange">View Full Terms & Conditions &rsaquo;</a>
                </div>

                <div className="terms-highlight-list">
                  <div className="terms-highlight-item">
                    <svg className="terms-check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    <div>
                      <strong>Platform Role:</strong> CASAX is an intermediary platform connecting buyers, sellers, tenants and agents. We do not own, sell or verify properties unless explicitly stated.
                    </div>
                  </div>
                  <div className="terms-highlight-item">
                    <svg className="terms-check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    <div>
                      <strong>User Responsibility:</strong> You are solely responsible for verifying property documents, ownership and legal approvals before entering into any transaction.
                    </div>
                  </div>
                  <div className="terms-highlight-item">
                    <svg className="terms-check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    <div>
                      <strong>Risk Acknowledgement:</strong> All transactions and communications are at your own risk. CASAX is not liable for any loss, damage, fraud or dispute arising between users.
                    </div>
                  </div>
                  <div className="terms-highlight-item">
                    <svg className="terms-check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    <div>
                      <strong>Security:</strong> Do not share your OTP, passwords or personal information with anyone. You are responsible for safeguarding your account.
                    </div>
                  </div>
                  <div className="terms-highlight-item">
                    <svg className="terms-check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    <div>
                      <strong>Prohibited Activities:</strong> Posting fake or misleading listings, spamming, harassment or any illegal activity is strictly prohibited.
                    </div>
                  </div>
                  <div className="terms-highlight-item">
                    <svg className="terms-check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    <div>
                      <strong>Indemnity:</strong> You agree to indemnify and hold CASAX harmless from any claims, losses or damages arising from your use or misuse of the platform.
                    </div>
                  </div>
                </div>

                {/* Jurisdiction Box */}
                <div className="terms-jurisdiction-box">
                  <p><strong>Jurisdiction:</strong> Courts in Hyderabad, Telangana, India shall have exclusive jurisdiction.</p>
                  <p><strong>Arbitration:</strong> Disputes shall be resolved through arbitration in Hyderabad as per Indian law.</p>
                  <p><strong>Electronic Consent:</strong> Your electronic acceptance is legally valid and binding.</p>
                </div>
              </div>

              {/* Agree Checkbox */}
              <label className="terms-modal-checkbox">
                <input type="checkbox" checked={termsCheckedInModal} onChange={(e) => setTermsCheckedInModal(e.target.checked)} />
                <span className="terms-modal-checkmark"></span>
                <span className="terms-modal-check-text">
                  I have read, understood and agree to the <a href="#" className="link-orange">Terms & Conditions</a>, <a href="#" className="link-orange">Privacy Policy</a> and <a href="#" className="link-orange">Disclaimer</a> of CASAX.
                </span>
              </label>

              {/* Footer Buttons */}
              <div className="terms-modal-footer">
                <button className="terms-agree-btn" disabled={!termsCheckedInModal} onClick={() => { setAgreedToTerms(true); setShowTermsModal(false); setTermsCheckedInModal(false) }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                  I Agree & Continue
                </button>
                <button className="terms-cancel-btn" onClick={() => { setShowTermsModal(false); setTermsCheckedInModal(false) }}>
                  Cancel
                </button>
              </div>

              {/* Stay Alert Banner */}
              <div className="terms-alert-banner">
                <div className="terms-alert-content">
                  <div className="terms-alert-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <div className="terms-alert-text">
                    <strong>Stay Alert. Stay Safe.</strong>
                    <p>Never share OTP or send money without proper verification. Your safety is in your hands.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Badges */}
            <div className="terms-bottom-badges">
              <div className="terms-bottom-badge">
                <div className="terms-badge-icon terms-badge-icon-green">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <strong>Secure Platform</strong>
                  <span>Your data is protected</span>
                </div>
              </div>
              <div className="terms-bottom-badge">
                <div className="terms-badge-icon terms-badge-icon-blue">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <strong>Trusted by Thousands</strong>
                  <span>Users across India</span>
                </div>
              </div>
              <div className="terms-bottom-badge">
                <div className="terms-badge-icon terms-badge-icon-orange">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <strong>24/7 Support</strong>
                  <span>We are here to help</span>
                </div>
              </div>
              <div className="terms-bottom-badge">
                <div className="terms-badge-icon terms-badge-icon-purple">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div>
                  <strong>Reliable & Transparent</strong>
                  <span>Your trust, our priority</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignUp
