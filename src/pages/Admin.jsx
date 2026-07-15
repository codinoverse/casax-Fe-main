import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { get, put } from '../services/api'
import logo from '../assets/Logo.png'
import './Admin.css'

const sidebarSections = [
  {
    label: 'MAIN',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'users', label: 'Users', icon: 'users' },
      { id: 'agents', label: 'Agents', icon: 'agents' },
      { id: 'properties', label: 'Properties', icon: 'properties' },
      { id: 'enquiries', label: 'Enquiries', icon: 'enquiries' },
      { id: 'transactions', label: 'Transactions', icon: 'transactions' },
      { id: 'bookings', label: 'Bookings', icon: 'bookings' },
      { id: 'reviews', label: 'reviews', icon: 'reviews' },
    ],
  },
  {
    label: 'MARKETING',
    items: [
      { id: 'advertisements', label: 'Advertisements', icon: 'advertisements' },
      { id: 'subscriptions', label: 'Subscriptions', icon: 'subscriptions' },
    ],
  },
  {
    label: 'FINANCE',
    items: [
      { id: 'payments', label: 'Payments', icon: 'payments' },
      { id: 'payouts', label: 'Payouts', icon: 'payouts' },
      { id: 'refunds', label: 'Refunds', icon: 'refunds' },
    ],
  },
  {
    label: 'REPORTS',
    items: [
      { id: 'reports', label: 'Reports', icon: 'reports' },
      { id: 'analytics', label: 'Analytics', icon: 'analytics' },
    ],
  },
  {
    label: 'CONTENT',
    items: [
      { id: 'pages', label: 'Pages', icon: 'pages' },
      { id: 'blog', label: 'Blog', icon: 'blog' },
    ],
  },
  {
    label: 'SETTINGS',
    items: [
      { id: 'settings', label: 'Settings', icon: 'settings' },
      { id: 'roles', label: 'Roles & Permissions', icon: 'roles' },
    ],
  },
]

const avatarColors = ['#3b82f6', '#16a34a', '#f26522', '#7c3aed', '#ec4899', '#0891b2', '#ca8a04', '#dc2626']

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function getRoleName(roleId) {
  switch (roleId) {
    case 2: return 'Admin'
    default: return 'User'
  }
}

const revenueData = [
  { month: 'Jan', revenue: 1200000 },
  { month: 'Feb', revenue: 1800000 },
  { month: 'Mar', revenue: 1500000 },
  { month: 'Apr', revenue: 2200000 },
  { month: 'May', revenue: 1900000 },
  { month: 'Jun', revenue: 2800000 },
  { month: 'Jul', revenue: 2400000 },
  { month: 'Aug', revenue: 3100000 },
  { month: 'Sep', revenue: 2700000 },
  { month: 'Oct', revenue: 3500000 },
  { month: 'Nov', revenue: 3200000 },
  { month: 'Dec', revenue: 3800000 },
]

const listingsData = [
  { month: 'Jan', residential: 120, commercial: 80 },
  { month: 'Feb', residential: 150, commercial: 90 },
  { month: 'Mar', residential: 130, commercial: 100 },
  { month: 'Apr', residential: 180, commercial: 110 },
  { month: 'May', residential: 160, commercial: 95 },
  { month: 'Jun', residential: 200, commercial: 120 },
  { month: 'Jul', residential: 190, commercial: 105 },
  { month: 'Aug', residential: 220, commercial: 130 },
  { month: 'Sep', residential: 210, commercial: 115 },
  { month: 'Oct', residential: 240, commercial: 140 },
  { month: 'Nov', residential: 230, commercial: 125 },
  { month: 'Dec', residential: 250, commercial: 145 },
]

const recentProperties = [
  { id: 1, name: 'Luxury Villa in Jubilee Hills', type: 'Residential', price: '₹2.5 Cr', status: 'Active', date: '10 Jun 2025' },
  { id: 2, name: 'Commercial Space in Hitech City', type: 'Commercial', price: '₹1.8 Cr', status: 'Pending', date: '09 Jun 2025' },
  { id: 3, name: '3BHK Apartment in Gachibowli', type: 'Residential', price: '₹85 L', status: 'Active', date: '08 Jun 2025' },
  { id: 4, name: 'Office Complex in Madhapur', type: 'Commercial', price: '₹4.2 Cr', status: 'Sold', date: '07 Jun 2025' },
  { id: 5, name: 'Plot in Shamshabad', type: 'Land', price: '₹45 L', status: 'Active', date: '06 Jun 2025' },
]

const recentActivities = [
  { id: 1, text: 'New property listed by Rahul Sharma', time: '2 minutes ago', color: '#3b82f6' },
  { id: 2, text: 'Payment of ₹2.5 Cr received for Villa #234', time: '15 minutes ago', color: '#16a34a' },
  { id: 3, text: 'User Priya Reddy completed KYC verification', time: '1 hour ago', color: '#7c3aed' },
  { id: 4, text: 'New enquiry on Commercial Space #189', time: '2 hours ago', color: '#f26522' },
  { id: 5, text: 'Agent Sneha Gupta updated listing #456', time: '3 hours ago', color: '#0891b2' },
  { id: 6, text: 'Booking confirmed for Apartment #321', time: '5 hours ago', color: '#16a34a' },
]

function SidebarIcon({ type }) {
  const p = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (type) {
    case 'dashboard': return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
    case 'users': return <svg {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    case 'agents': return <svg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    case 'properties': return <svg {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    case 'enquiries': return <svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    case 'transactions': return <svg {...p}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
    case 'bookings': return <svg {...p}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    case 'reviews': return <svg {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    case 'advertisements': return <svg {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    case 'subscriptions': return <svg {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    case 'payments': return <svg {...p}><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 14h.01"/><path d="M10 14h.01"/></svg>
    case 'payouts': return <svg {...p}><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
    case 'refunds': return <svg {...p}><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
    case 'reports': return <svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    case 'analytics': return <svg {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
    case 'pages': return <svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    case 'blog': return <svg {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    case 'settings': return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    case 'roles': return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    default: return null
  }
}

function Admin({ isLoggedIn, onLogout }) {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [editRoleId, setEditRoleId] = useState(1)
  const [editLoading, setEditLoading] = useState(false)
  const [editMessage, setEditMessage] = useState({ text: '', type: '' })
  const [adminProfileOpen, setAdminProfileOpen] = useState(false)
  const [agents, setAgents] = useState([])
  const [agentsLoading, setAgentsLoading] = useState(false)
  const [agentSearch, setAgentSearch] = useState('')
  const [agentStatusFilter, setAgentStatusFilter] = useState('')
  const [agentVerificationFilter, setAgentVerificationFilter] = useState('')
  const [agentCityFilter, setAgentCityFilter] = useState('')
  const [agentDateFilter, setAgentDateFilter] = useState('')
  const [agentPage, setAgentPage] = useState(1)
  const [agentSelectedIds, setAgentSelectedIds] = useState([])
  const agentsPerPage = 10
  const [bookings, setBookings] = useState([])
  const [bookingsLoading, setBookingsLoading] = useState(false)
  const [bookingSearch, setBookingSearch] = useState('')
  const [bookingStatusFilter, setBookingStatusFilter] = useState('')
  const [bookingPaymentFilter, setBookingPaymentFilter] = useState('')
  const [bookingPropertyFilter, setBookingPropertyFilter] = useState('')
  const [bookingDateFrom, setBookingDateFrom] = useState('')
  const [bookingDateTo, setBookingDateTo] = useState('')
  const [bookingPage, setBookingPage] = useState(1)
  const [bookingSelectedIds, setBookingSelectedIds] = useState([])
  const bookingsPerPage = 10
  const [enquiries, setEnquiries] = useState([])
  const [enquiriesLoading, setEnquiriesLoading] = useState(false)
  const [enquirySearch, setEnquirySearch] = useState('')
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('')
  const [enquiryPropertyFilter, setEnquiryPropertyFilter] = useState('')
  const [enquirySourceFilter, setEnquirySourceFilter] = useState('')
  const [enquiryDateFrom, setEnquiryDateFrom] = useState('')
  const [enquiryDateTo, setEnquiryDateTo] = useState('')
  const [enquiryPage, setEnquiryPage] = useState(1)
  const [enquirySelectedIds, setEnquirySelectedIds] = useState([])
  const enquiriesPerPage = 10
  const [properties, setProperties] = useState([])
  const [propertiesLoading, setPropertiesLoading] = useState(false)
  const [propSearch, setPropSearch] = useState('')
  const [propTypeFilter, setPropTypeFilter] = useState('')
  const [propListingFilter, setPropListingFilter] = useState('')
  const [propStatusFilter, setPropStatusFilter] = useState('')
  const [propPriceMin, setPropPriceMin] = useState('')
  const [propPriceMax, setPropPriceMax] = useState('')
  const [propCityFilter, setPropCityFilter] = useState('')
  const [propBedroomFilter, setPropBedroomFilter] = useState('')
  const [propDateFilter, setPropDateFilter] = useState('')
  const [propPage, setPropPage] = useState(1)
  const [propSelectedIds, setPropSelectedIds] = useState([])
  const propertiesPerPage = 10

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const token = localStorage.getItem('token')
  const adminName = user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Admin'
  const initials = adminName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  useEffect(() => {
    if (!token) return
    setUsersLoading(true)
    get('/users/admin/all', { headers: { Authorization: `Bearer ${token}` } })
      .then(data => setUsers(data))
      .catch(err => console.error('Failed to fetch users:', err))
      .finally(() => setUsersLoading(false))
  }, [token])

  useEffect(() => {
    if (!token || activeNav !== 'agents') return
    setAgentsLoading(true)
    get('/agents/admin/all', { headers: { Authorization: `Bearer ${token}` } })
      .then(data => setAgents(Array.isArray(data) ? data : data.agents || []))
      .catch(err => console.error('Failed to fetch agents:', err))
      .finally(() => setAgentsLoading(false))
  }, [token, activeNav])

  useEffect(() => {
    if (!token || activeNav !== 'bookings') return
    setBookingsLoading(true)
    get('/bookings/admin/all', { headers: { Authorization: `Bearer ${token}` } })
      .then(data => setBookings(Array.isArray(data) ? data : data.bookings || []))
      .catch(err => console.error('Failed to fetch bookings:', err))
      .finally(() => setBookingsLoading(false))
  }, [token, activeNav])

  useEffect(() => {
    if (!token || activeNav !== 'enquiries') return
    setEnquiriesLoading(true)
    get('/enquiries/admin/all', { headers: { Authorization: `Bearer ${token}` } })
      .then(data => setEnquiries(Array.isArray(data) ? data : data.enquiries || []))
      .catch(err => console.error('Failed to fetch enquiries:', err))
      .finally(() => setEnquiriesLoading(false))
  }, [token, activeNav])

  useEffect(() => {
    if (!token || activeNav !== 'properties') return
    setPropertiesLoading(true)
    get('/properties/admin/all', { headers: { Authorization: `Bearer ${token}` } })
      .then(data => setProperties(Array.isArray(data) ? data : data.properties || []))
      .catch(err => console.error('Failed to fetch properties:', err))
      .finally(() => setPropertiesLoading(false))
  }, [token, activeNav])

  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'ACTIVE').length
  const inactiveUsers = users.filter(u => u.status !== 'ACTIVE').length

  // Agent stats
  const totalAgents = agents.length
  const activeAgents = agents.filter(a => a.status === 'ACTIVE').length
  const pendingAgents = agents.filter(a => a.status === 'PENDING').length
  const verifiedAgents = agents.filter(a => a.verified === true || a.verification === 'VERIFIED').length
  const blockedAgents = agents.filter(a => a.status === 'BLOCKED').length

  // Agent filtering
  const filteredAgents = agents.filter(a => {
    const name = `${a.firstName || ''} ${a.lastName || ''}`.toLowerCase()
    const matchSearch = !agentSearch || name.includes(agentSearch.toLowerCase()) || (a.email || '').toLowerCase().includes(agentSearch.toLowerCase()) || (a.agentId || a.userId || '').toLowerCase().includes(agentSearch.toLowerCase())
    const matchStatus = !agentStatusFilter || a.status === agentStatusFilter
    const matchVerification = !agentVerificationFilter || (agentVerificationFilter === 'VERIFIED' ? (a.verified || a.verification === 'VERIFIED') : !(a.verified || a.verification === 'VERIFIED'))
    const matchCity = !agentCityFilter || (a.city || a.area || '').toLowerCase().includes(agentCityFilter.toLowerCase())
    return matchSearch && matchStatus && matchVerification && matchCity
  })
  const agentTotalPages = Math.max(1, Math.ceil(filteredAgents.length / agentsPerPage))
  const paginatedAgents = filteredAgents.slice((agentPage - 1) * agentsPerPage, agentPage * agentsPerPage)

  const toggleAgentSelect = (id) => {
    setAgentSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }
  const toggleAllAgents = () => {
    if (agentSelectedIds.length === paginatedAgents.length) {
      setAgentSelectedIds([])
    } else {
      setAgentSelectedIds(paginatedAgents.map(a => a.agentId || a.userId))
    }
  }
  const resetAgentFilters = () => {
    setAgentSearch('')
    setAgentStatusFilter('')
    setAgentVerificationFilter('')
    setAgentCityFilter('')
    setAgentDateFilter('')
    setAgentPage(1)
  }

  // Booking stats
  const totalBookings = bookings.length
  const confirmedBookings = bookings.filter(b => b.bookingStatus === 'CONFIRMED').length
  const pendingBookings = bookings.filter(b => b.bookingStatus === 'PENDING').length
  const cancelledBookings = bookings.filter(b => b.bookingStatus === 'CANCELLED').length
  const totalBookingValue = bookings.reduce((sum, b) => sum + (b.amount || b.bookingAmount || 0), 0)

  // Booking filtering
  const filteredBookings = bookings.filter(b => {
    const searchStr = (b.bookingId || b.id || '').toString().toLowerCase()
    const userName = `${b.userName || ''} ${b.userFirstName || ''} ${b.userLastName || ''}`.toLowerCase()
    const propertyName = (b.propertyName || b.planName || '').toLowerCase()
    const matchSearch = !bookingSearch || searchStr.includes(bookingSearch.toLowerCase()) || userName.includes(bookingSearch.toLowerCase()) || propertyName.includes(bookingSearch.toLowerCase())
    const matchStatus = !bookingStatusFilter || b.bookingStatus === bookingStatusFilter
    const matchPayment = !bookingPaymentFilter || b.paymentStatus === bookingPaymentFilter
    const matchProperty = !bookingPropertyFilter || propertyName.includes(bookingPropertyFilter.toLowerCase())
    return matchSearch && matchStatus && matchPayment && matchProperty
  })
  const bookingTotalPages = Math.max(1, Math.ceil(filteredBookings.length / bookingsPerPage))
  const paginatedBookings = filteredBookings.slice((bookingPage - 1) * bookingsPerPage, bookingPage * bookingsPerPage)

  const toggleBookingSelect = (id) => {
    setBookingSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }
  const toggleAllBookings = () => {
    if (bookingSelectedIds.length === paginatedBookings.length) {
      setBookingSelectedIds([])
    } else {
      setBookingSelectedIds(paginatedBookings.map(b => b.bookingId || b.id))
    }
  }
  const resetBookingFilters = () => {
    setBookingSearch('')
    setBookingStatusFilter('')
    setBookingPaymentFilter('')
    setBookingPropertyFilter('')
    setBookingDateFrom('')
    setBookingDateTo('')
    setBookingPage(1)
  }

  // Enquiry stats
  const totalEnquiries = enquiries.length
  const newEnquiries = enquiries.filter(e => e.status === 'NEW' || e.status === 'OPEN').length
  const inProgressEnquiries = enquiries.filter(e => e.status === 'IN_PROGRESS' || e.status === 'CONTACTED').length
  const resolvedEnquiries = enquiries.filter(e => e.status === 'RESOLVED' || e.status === 'CLOSED').length
  const highPriorityEnquiries = enquiries.filter(e => e.priority === 'HIGH' || e.priority === 'URGENT').length

  // Enquiry filtering
  const filteredEnquiries = enquiries.filter(e => {
    const searchStr = (e.enquiryId || e.id || '').toString().toLowerCase()
    const name = `${e.firstName || ''} ${e.lastName || ''} ${e.name || ''}`.toLowerCase()
    const matchSearch = !enquirySearch || searchStr.includes(enquirySearch.toLowerCase()) || name.includes(enquirySearch.toLowerCase()) || (e.email || '').toLowerCase().includes(enquirySearch.toLowerCase())
    const matchStatus = !enquiryStatusFilter || e.status === enquiryStatusFilter
    const matchProperty = !enquiryPropertyFilter || (e.propertyName || e.planName || '').toLowerCase().includes(enquiryPropertyFilter.toLowerCase())
    const matchSource = !enquirySourceFilter || e.source === enquirySourceFilter
    return matchSearch && matchStatus && matchProperty && matchSource
  })
  const enquiryTotalPages = Math.max(1, Math.ceil(filteredEnquiries.length / enquiriesPerPage))
  const paginatedEnquiries = filteredEnquiries.slice((enquiryPage - 1) * enquiriesPerPage, enquiryPage * enquiriesPerPage)

  const toggleEnquirySelect = (id) => {
    setEnquirySelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }
  const toggleAllEnquiries = () => {
    if (enquirySelectedIds.length === paginatedEnquiries.length) {
      setEnquirySelectedIds([])
    } else {
      setEnquirySelectedIds(paginatedEnquiries.map(e => e.enquiryId || e.id))
    }
  }
  const resetEnquiryFilters = () => {
    setEnquirySearch('')
    setEnquiryStatusFilter('')
    setEnquiryPropertyFilter('')
    setEnquirySourceFilter('')
    setEnquiryDateFrom('')
    setEnquiryDateTo('')
    setEnquiryPage(1)
  }

  // Property stats
  const totalProperties = properties.length
  const activeListings = properties.filter(p => p.status === 'ACTIVE' || p.status === 'APPROVED').length
  const pendingProperties = properties.filter(p => p.status === 'PENDING' || p.status === 'UNDER_REVIEW').length
  const soldProperties = properties.filter(p => p.status === 'SOLD').length
  const rentedProperties = properties.filter(p => p.status === 'RENTED').length

  // Property filtering
  const filteredProperties = properties.filter(p => {
    const name = (p.propertyName || p.title || p.name || '').toLowerCase()
    const propId = (p.propertyId || p.id || '').toString().toLowerCase()
    const matchSearch = !propSearch || name.includes(propSearch.toLowerCase()) || propId.includes(propSearch.toLowerCase())
    const matchType = !propTypeFilter || p.propertyType === propTypeFilter
    const matchListing = !propListingFilter || p.listingType === propListingFilter
    const matchStatus = !propStatusFilter || p.status === propStatusFilter
    const price = p.price || p.amount || 0
    const matchPriceMin = !propPriceMin || price >= Number(propPriceMin)
    const matchPriceMax = !propPriceMax || price <= Number(propPriceMax)
    const matchCity = !propCityFilter || (p.city || p.location || p.area || '').toLowerCase().includes(propCityFilter.toLowerCase())
    const matchBedroom = !propBedroomFilter || String(p.bedrooms || p.bhk || '') === propBedroomFilter
    return matchSearch && matchType && matchListing && matchStatus && matchPriceMin && matchPriceMax && matchCity && matchBedroom
  })
  const propTotalPages = Math.max(1, Math.ceil(filteredProperties.length / propertiesPerPage))
  const paginatedProperties = filteredProperties.slice((propPage - 1) * propertiesPerPage, propPage * propertiesPerPage)

  const togglePropSelect = (id) => {
    setPropSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }
  const toggleAllProps = () => {
    if (propSelectedIds.length === paginatedProperties.length) {
      setPropSelectedIds([])
    } else {
      setPropSelectedIds(paginatedProperties.map(p => p.propertyId || p.id))
    }
  }
  const resetPropFilters = () => {
    setPropSearch('')
    setPropTypeFilter('')
    setPropListingFilter('')
    setPropStatusFilter('')
    setPropPriceMin('')
    setPropPriceMax('')
    setPropCityFilter('')
    setPropBedroomFilter('')
    setPropDateFilter('')
    setPropPage(1)
  }

  const formatCurrency = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`
    return `₹${val}`
  }

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  const openEditModal = (u) => {
    setEditingUser(u)
    setEditRoleId(u.roleId || 1)
    setEditMessage({ text: '', type: '' })
    setEditModalOpen(true)
  }

  const handleUpdateRole = async () => {
    if (!editingUser) return
    setEditLoading(true)
    setEditMessage({ text: '', type: '' })
    try {
      await put(`/users/admin/update/${editingUser.userId}`, { roleId: editRoleId }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(prev => prev.map(u => u.userId === editingUser.userId ? { ...u, roleId: editRoleId } : u))
      setEditMessage({ text: 'Role updated successfully!', type: 'success' })
      setTimeout(() => setEditModalOpen(false), 1000)
    } catch (err) {
      setEditMessage({ text: err.message || 'Failed to update role', type: 'error' })
    } finally {
      setEditLoading(false)
    }
  }

  return (
    <div className="admin-layout">
      {/* Top Header - full width */}
      <header className="admin-header">
        <div className="admin-header-left">
          <img src={logo} alt="CASAX" className="admin-header-logo-img" />
          <div className="admin-header-divider"></div>
          <button className="admin-mobile-toggle" onClick={() => setSidebarOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="admin-header-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Search users by name, email or phone..." />
        </div>

        <div className="admin-header-right">
          <button className="admin-icon-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className="admin-icon-badge">9</span>
          </button>

          <button className="admin-icon-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span className="admin-icon-badge">15</span>
          </button>

          <div className="admin-header-user-wrapper">
            <button className="admin-header-user" onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
              <div className="admin-header-avatar">{initials}</div>
              <div className="admin-header-user-info">
                <span className="admin-header-user-name">{adminName}</span>
                <span className="admin-header-user-role">Administrator</span>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {userDropdownOpen && (
              <>
                <div className="admin-dropdown-overlay" onClick={() => setUserDropdownOpen(false)} />
                <div className="admin-user-dropdown">
                  <div className="admin-dropdown-header">
                    <div className="admin-header-avatar">{initials}</div>
                    <div>
                      <div className="admin-dropdown-name">{adminName}</div>
                      <div className="admin-dropdown-role">Administrator</div>
                    </div>
                  </div>
                  <div className="admin-dropdown-divider"></div>
                  <button className="admin-dropdown-item" onClick={() => { setUserDropdownOpen(false); setAdminProfileOpen(true); setActiveNav('admin-profile') }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    Profile
                  </button>
                  <button className="admin-dropdown-item logout" onClick={() => { setUserDropdownOpen(false); handleLogout() }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Body: Sidebar + Main */}
      <div className="admin-body">
        {/* Sidebar Overlay */}
        <div className={`admin-sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />

        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <nav className="admin-sidebar-nav">
            {sidebarSections.map(section => (
              <div key={section.label}>
                <div className="admin-nav-section-label">{section.label}</div>
                {section.items.map(item => (
                  <button
                    key={item.id}
                    className={`admin-nav-item ${activeNav === item.id ? 'active' : ''}`}
                    onClick={() => { setActiveNav(item.id); setSidebarOpen(false) }}
                  >
                    <SidebarIcon type={item.icon} />
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <div className="admin-sidebar-promo">
            <p>Grow your real estate business with CASAX</p>
            <a href="/">View Website</a>
          </div>
        </aside>

        {/* Main */}
        <main className="admin-main">

        {/* Content */}
        <div className="admin-content">

          {/* ===== DASHBOARD VIEW ===== */}
          {activeNav === 'dashboard' && (
            <>
              <div className="admin-breadcrumb">
                <a href="#">Admin</a>
                <span>&gt;</span>
                <span>Dashboard</span>
              </div>

              <div className="admin-page-title-bar">
                <h1 className="admin-page-title">Dashboard</h1>
                <div className="admin-page-actions">
                  <select className="admin-date-range-select">
                    <option>Last 30 Days</option>
                    <option>Last 7 Days</option>
                    <option>Last 90 Days</option>
                    <option>This Year</option>
                  </select>
                </div>
              </div>

              {/* Dashboard Stats */}
              <div className="admin-stats dash-stats">
                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon blue">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+12.5%</span>
                  </div>
                  <div className="admin-stat-value">2,453</div>
                  <div className="admin-stat-label">Total Properties</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon green">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+8.2%</span>
                  </div>
                  <div className="admin-stat-value">1,893</div>
                  <div className="admin-stat-label">Active Listings</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon purple">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+15.3%</span>
                  </div>
                  <div className="admin-stat-value">12,458</div>
                  <div className="admin-stat-label">Total Users</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon orange">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 4h10M7 8h10M12 20l-3-6h7.5a4 4 0 0 0 0-8H7"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+22.4%</span>
                  </div>
                  <div className="admin-stat-value">₹24.5M</div>
                  <div className="admin-stat-label">Revenue</div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="dash-charts-row">
                <div className="dash-chart-card">
                  <div className="dash-chart-header">
                    <h3>Revenue Overview</h3>
                    <select className="dash-chart-select">
                      <option>Monthly</option>
                      <option>Weekly</option>
                      <option>Daily</option>
                    </select>
                  </div>
                  <div className="dash-chart-body">
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f26522" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#f26522" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={v => `₹${(v / 1000000).toFixed(1)}M`} />
                        <Tooltip formatter={v => [`₹${(v / 100000).toFixed(1)}L`, 'Revenue']} />
                        <Area type="monotone" dataKey="revenue" stroke="#f26522" strokeWidth={2.5} fill="url(#revenueGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="dash-chart-card">
                  <div className="dash-chart-header">
                    <h3>Property Listings</h3>
                    <select className="dash-chart-select">
                      <option>Monthly</option>
                      <option>Weekly</option>
                      <option>Daily</option>
                    </select>
                  </div>
                  <div className="dash-chart-body">
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={listingsData} barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="residential" fill="#f26522" radius={[4, 4, 0, 0]} name="Residential" />
                        <Bar dataKey="commercial" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Commercial" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Recent Properties + Recent Activities */}
              <div className="dash-bottom-row">
                <div className="dash-recent-card">
                  <div className="dash-recent-header">
                    <h3>Recent Properties</h3>
                    <button className="dash-view-all">View All</button>
                  </div>
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Property</th>
                          <th>Type</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentProperties.map(p => (
                          <tr key={p.id}>
                            <td><span className="dash-prop-name">{p.name}</span></td>
                            <td><span className={`admin-badge ${p.type.toLowerCase()}`}>{p.type}</span></td>
                            <td className="dash-prop-price">{p.price}</td>
                            <td><span className={`admin-badge ${p.status.toLowerCase()}`}>{p.status}</span></td>
                            <td>{p.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="dash-recent-card">
                  <div className="dash-recent-header">
                    <h3>Recent Activities</h3>
                    <button className="dash-view-all">View All</button>
                  </div>
                  <div className="dash-activities-list">
                    {recentActivities.map(a => (
                      <div key={a.id} className="dash-activity-item">
                        <div className="dash-activity-dot" style={{ background: a.color }}></div>
                        <div className="dash-activity-content">
                          <p className="dash-activity-text">{a.text}</p>
                          <span className="dash-activity-time">{a.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===== USERS VIEW ===== */}
          {activeNav === 'users' && (
            <>
              <div className="admin-breadcrumb">
                <a href="#">Dashboard</a>
                <span>&gt;</span>
                <span>Users</span>
              </div>

              <div className="admin-page-title-bar">
                <h1 className="admin-page-title">Users</h1>
                <div className="admin-page-actions">
                  <button className="admin-btn-outline">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Import Users
                  </button>
                  <button className="admin-btn-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add New User
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="admin-stats admin-stats-3">
                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon blue">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                  </div>
                  <div className="admin-stat-value">{totalUsers.toLocaleString()}</div>
                  <div className="admin-stat-label">Total Users</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon green">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                      </svg>
                    </div>
                  </div>
                  <div className="admin-stat-value">{activeUsers.toLocaleString()}</div>
                  <div className="admin-stat-label">Active Users</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon red">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                    </div>
                  </div>
                  <div className="admin-stat-value">{inactiveUsers.toLocaleString()}</div>
                  <div className="admin-stat-label">Inactive Users</div>
                </div>
              </div>

              {/* Filters */}
              <div className="admin-filters">
                <div className="admin-filter-group">
                  <label>Search User</label>
                  <input type="text" placeholder="Name, email or phone..." />
                </div>
                <div className="admin-filter-group">
                  <label>Role</label>
                  <select>
                    <option value="">All Roles</option>
                    <option value="1">User</option>
                    <option value="2">Admin</option>
                  </select>
                </div>
                <div className="admin-filter-group">
                  <label>Status</label>
                  <select>
                    <option value="">All Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
                <div className="admin-filter-group">
                  <label>Gender</label>
                  <select>
                    <option value="">All</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
                <div className="admin-filter-group">
                  <label>Date Joined</label>
                  <input type="date" />
                </div>
                <div className="admin-filter-actions">
                  <button className="admin-filter-apply">Filter</button>
                  <button className="admin-filter-reset">Reset</button>
                </div>
              </div>

              {/* Users Table */}
              <div className="admin-table-section">
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Role</th>
                        <th>Contact</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Area</th>
                        <th>Joined On</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersLoading ? (
                        <tr><td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>Loading users...</td></tr>
                      ) : users.length === 0 ? (
                        <tr><td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No users found</td></tr>
                      ) : (
                        users.map((u, idx) => {
                          const fullName = `${u.firstName || ''} ${u.lastName || ''}`.trim() || '-'
                          const userInitials = fullName !== '-' ? fullName.split(' ').map(n => n[0]).join('').toUpperCase() : '?'
                          return (
                            <tr key={u.userId}>
                              <td>
                                <div className="admin-user-cell">
                                  <div className="admin-user-cell-avatar" style={{ background: avatarColors[idx % avatarColors.length] }}>
                                    {userInitials}
                                  </div>
                                  <div className="admin-user-cell-info">
                                    <span className="admin-user-cell-name">{fullName}</span>
                                    <span className="admin-user-cell-email">{u.email}</span>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span className={`admin-badge ${u.roleId === 2 ? 'agent' : 'individual'}`}>{getRoleName(u.roleId)}</span>
                              </td>
                              <td>{u.mobileNumber || '-'}</td>
                              <td>{u.gender ? u.gender.charAt(0) + u.gender.slice(1).toLowerCase() : '-'}</td>
                              <td>
                                <span className={`admin-badge ${u.status?.toLowerCase()}`}>{u.status ? u.status.charAt(0) + u.status.slice(1).toLowerCase() : '-'}</span>
                              </td>
                              <td>{u.area || u.address || '-'}</td>
                              <td>{formatDate(u.createdAt)}</td>
                              <td>
                                <div className="admin-table-cell-actions">
                                  <button className="admin-action-btn" title="View">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                                    </svg>
                                  </button>
                                  <button className="admin-action-btn" title="Edit" onClick={() => openEditModal(u)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                  </button>
                                  <button className="admin-action-btn" title="More">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="admin-pagination">
                  <span className="admin-pagination-info">Showing 1 to {users.length} of {users.length} entries</span>
                  <div className="admin-pagination-controls">
                    <button className="admin-page-btn active">1</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===== AGENTS VIEW ===== */}
          {activeNav === 'agents' && (
            <>
              <div className="admin-breadcrumb">
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveNav('dashboard') }}>Dashboard</a>
                <span>&gt;</span>
                <span>Agents</span>
              </div>

              <div className="admin-page-title-bar">
                <h1 className="admin-page-title">Agents</h1>
                <div className="admin-page-actions">
                  <button className="admin-btn-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add New Agent
                  </button>
                </div>
              </div>

              {/* Agent Stats */}
              <div className="admin-stats admin-stats-5">
                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon blue">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+12.5%</span>
                  </div>
                  <div className="admin-stat-value">{totalAgents.toLocaleString()}</div>
                  <div className="admin-stat-label">Total Agents</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon green">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+8.3%</span>
                  </div>
                  <div className="admin-stat-value">{activeAgents.toLocaleString()}</div>
                  <div className="admin-stat-label">Active Agents</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon orange">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change down">-2.1%</span>
                  </div>
                  <div className="admin-stat-value">{pendingAgents.toLocaleString()}</div>
                  <div className="admin-stat-label">Pending Approval</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon purple">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+5.7%</span>
                  </div>
                  <div className="admin-stat-value">{verifiedAgents.toLocaleString()}</div>
                  <div className="admin-stat-label">Verified Agents</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon red">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change down">-1.2%</span>
                  </div>
                  <div className="admin-stat-value">{blockedAgents.toLocaleString()}</div>
                  <div className="admin-stat-label">Blocked Agents</div>
                </div>
              </div>

              {/* Agent Filters */}
              <div className="admin-filters">
                <div className="admin-filter-group">
                  <label>Search</label>
                  <input type="text" placeholder="Name, email or ID..." value={agentSearch} onChange={e => { setAgentSearch(e.target.value); setAgentPage(1) }} />
                </div>
                <div className="admin-filter-group">
                  <label>Status</label>
                  <select value={agentStatusFilter} onChange={e => { setAgentStatusFilter(e.target.value); setAgentPage(1) }}>
                    <option value="">All Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="PENDING">Pending</option>
                    <option value="BLOCKED">Blocked</option>
                  </select>
                </div>
                <div className="admin-filter-group">
                  <label>Verification</label>
                  <select value={agentVerificationFilter} onChange={e => { setAgentVerificationFilter(e.target.value); setAgentPage(1) }}>
                    <option value="">All</option>
                    <option value="VERIFIED">Verified</option>
                    <option value="UNVERIFIED">Unverified</option>
                  </select>
                </div>
                <div className="admin-filter-group">
                  <label>City</label>
                  <input type="text" placeholder="Filter by city..." value={agentCityFilter} onChange={e => { setAgentCityFilter(e.target.value); setAgentPage(1) }} />
                </div>
                <div className="admin-filter-group">
                  <label>Joined Date</label>
                  <input type="date" value={agentDateFilter} onChange={e => setAgentDateFilter(e.target.value)} />
                </div>
                <div className="admin-filter-actions">
                  <button className="admin-filter-reset" onClick={resetAgentFilters}>Reset</button>
                  <button className="admin-filter-apply">Apply Filters</button>
                </div>
              </div>

              {/* Table Controls */}
              <div className="admin-table-controls">
                <div className="admin-table-controls-left">
                  <select className="admin-bulk-select">
                    <option value="">Bulk Actions</option>
                    <option value="activate">Activate</option>
                    <option value="deactivate">Deactivate</option>
                    <option value="block">Block</option>
                    <option value="delete">Delete</option>
                  </select>
                  <button className="admin-btn-outline admin-btn-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Export
                  </button>
                </div>
                <div className="admin-table-controls-right">
                  <span className="admin-table-info">Showing {filteredAgents.length > 0 ? (agentPage - 1) * agentsPerPage + 1 : 0}-{Math.min(agentPage * agentsPerPage, filteredAgents.length)} of {filteredAgents.length} agents</span>
                  <select className="admin-perpage-select" value={agentsPerPage} disabled>
                    <option value={10}>10 per page</option>
                  </select>
                </div>
              </div>

              {/* Agents Table */}
              <div className="admin-table-section">
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th style={{ width: 40 }}>
                          <input type="checkbox" checked={paginatedAgents.length > 0 && agentSelectedIds.length === paginatedAgents.length} onChange={toggleAllAgents} />
                        </th>
                        <th>Agent</th>
                        <th>Contact</th>
                        <th>Properties</th>
                        <th>Enquiries</th>
                        <th>Status</th>
                        <th>Verification</th>
                        <th>Joined Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agentsLoading ? (
                        <tr><td colSpan="9" style={{ textAlign: 'center', padding: '40px' }}>Loading agents...</td></tr>
                      ) : paginatedAgents.length === 0 ? (
                        <tr><td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No agents found</td></tr>
                      ) : (
                        paginatedAgents.map((a, idx) => {
                          const agentName = `${a.firstName || ''} ${a.lastName || ''}`.trim() || '-'
                          const agentInit = agentName !== '-' ? agentName.split(' ').map(n => n[0]).join('').toUpperCase() : '?'
                          const agentId = a.agentId || a.userId || '-'
                          const isVerified = a.verified === true || a.verification === 'VERIFIED'
                          return (
                            <tr key={agentId} className={agentSelectedIds.includes(agentId) ? 'selected-row' : ''}>
                              <td>
                                <input type="checkbox" checked={agentSelectedIds.includes(agentId)} onChange={() => toggleAgentSelect(agentId)} />
                              </td>
                              <td>
                                <div className="admin-user-cell">
                                  <div className="admin-user-cell-avatar" style={{ background: avatarColors[idx % avatarColors.length] }}>
                                    {agentInit}
                                  </div>
                                  <div className="admin-user-cell-info">
                                    <span className="admin-user-cell-name">{agentName}</span>
                                    <span className="admin-user-cell-email">{agentId}</span>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="agent-contact-cell">
                                  <span className="agent-contact-email">{a.email || '-'}</span>
                                  <span className="agent-contact-phone">{a.mobileNumber || '-'}</span>
                                </div>
                              </td>
                              <td>{a.propertiesCount ?? a.properties ?? 0}</td>
                              <td>{a.enquiriesCount ?? a.enquiries ?? 0}</td>
                              <td>
                                <span className={`admin-badge ${(a.status || 'inactive').toLowerCase()}`}>
                                  {a.status ? a.status.charAt(0) + a.status.slice(1).toLowerCase() : 'Inactive'}
                                </span>
                              </td>
                              <td>
                                <span className={`admin-badge ${isVerified ? 'verified' : 'unverified'}`}>
                                  {isVerified ? 'Verified' : 'Unverified'}
                                </span>
                              </td>
                              <td>{formatDate(a.createdAt)}</td>
                              <td>
                                <div className="admin-table-cell-actions">
                                  <button className="admin-action-btn" title="View">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                                    </svg>
                                  </button>
                                  <button className="admin-action-btn" title="Edit" onClick={() => openEditModal(a)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                  </button>
                                  <button className="admin-action-btn" title="Block">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                                    </svg>
                                  </button>
                                  <button className="admin-action-btn danger" title="Delete">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="admin-pagination">
                  <span className="admin-pagination-info">Showing {filteredAgents.length > 0 ? (agentPage - 1) * agentsPerPage + 1 : 0} to {Math.min(agentPage * agentsPerPage, filteredAgents.length)} of {filteredAgents.length} entries</span>
                  <div className="admin-pagination-controls">
                    <button className="admin-page-btn" disabled={agentPage === 1} onClick={() => setAgentPage(p => p - 1)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    {Array.from({ length: agentTotalPages }, (_, i) => i + 1).map(p => (
                      <button key={p} className={`admin-page-btn ${agentPage === p ? 'active' : ''}`} onClick={() => setAgentPage(p)}>{p}</button>
                    ))}
                    <button className="admin-page-btn" disabled={agentPage === agentTotalPages} onClick={() => setAgentPage(p => p + 1)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===== BOOKINGS VIEW ===== */}
          {activeNav === 'bookings' && (
            <>
              <div className="admin-breadcrumb">
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveNav('dashboard') }}>Dashboard</a>
                <span>&gt;</span>
                <span>Bookings</span>
              </div>

              <div className="admin-page-title-bar">
                <h1 className="admin-page-title">Bookings</h1>
                <div className="admin-page-actions">
                  <button className="admin-btn-outline">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Export
                  </button>
                  <button className="admin-btn-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add Booking
                  </button>
                </div>
              </div>

              {/* Booking Stats */}
              <div className="admin-stats admin-stats-5">
                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon blue">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+15.2%</span>
                  </div>
                  <div className="admin-stat-value">{totalBookings.toLocaleString()}</div>
                  <div className="admin-stat-label">Total Bookings</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon green">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+12.8%</span>
                  </div>
                  <div className="admin-stat-value">{confirmedBookings.toLocaleString()}</div>
                  <div className="admin-stat-label">Confirmed</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon orange">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change down">-3.5%</span>
                  </div>
                  <div className="admin-stat-value">{pendingBookings.toLocaleString()}</div>
                  <div className="admin-stat-label">Pending</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon red">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change down">-8.1%</span>
                  </div>
                  <div className="admin-stat-value">{cancelledBookings.toLocaleString()}</div>
                  <div className="admin-stat-label">Cancelled</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon purple">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 4h10M7 8h10M12 20l-3-6h7.5a4 4 0 0 0 0-8H7"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+22.4%</span>
                  </div>
                  <div className="admin-stat-value">{formatCurrency(totalBookingValue)}</div>
                  <div className="admin-stat-label">Total Booking Value</div>
                </div>
              </div>

              {/* Booking Filters */}
              <div className="admin-filters">
                <div className="admin-filter-group">
                  <label>Search</label>
                  <input type="text" placeholder="Booking ID, user or property..." value={bookingSearch} onChange={e => { setBookingSearch(e.target.value); setBookingPage(1) }} />
                </div>
                <div className="admin-filter-group">
                  <label>Status</label>
                  <select value={bookingStatusFilter} onChange={e => { setBookingStatusFilter(e.target.value); setBookingPage(1) }}>
                    <option value="">All Status</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="PENDING">Pending</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
                <div className="admin-filter-group">
                  <label>Payment Status</label>
                  <select value={bookingPaymentFilter} onChange={e => { setBookingPaymentFilter(e.target.value); setBookingPage(1) }}>
                    <option value="">All Payments</option>
                    <option value="PAID">Paid</option>
                    <option value="PENDING">Pending</option>
                    <option value="PARTIAL">Partial</option>
                    <option value="REFUNDED">Refunded</option>
                    <option value="FAILED">Failed</option>
                  </select>
                </div>
                <div className="admin-filter-group">
                  <label>Property / Plan</label>
                  <input type="text" placeholder="Filter by property..." value={bookingPropertyFilter} onChange={e => { setBookingPropertyFilter(e.target.value); setBookingPage(1) }} />
                </div>
                <div className="admin-filter-group">
                  <label>Date Range</label>
                  <div className="admin-date-range">
                    <input type="date" value={bookingDateFrom} onChange={e => setBookingDateFrom(e.target.value)} placeholder="From" />
                    <span className="admin-date-range-sep">to</span>
                    <input type="date" value={bookingDateTo} onChange={e => setBookingDateTo(e.target.value)} placeholder="To" />
                  </div>
                </div>
                <div className="admin-filter-actions">
                  <button className="admin-filter-reset" onClick={resetBookingFilters}>Reset</button>
                  <button className="admin-filter-apply">Apply Filters</button>
                </div>
              </div>

              {/* Table Controls */}
              <div className="admin-table-controls">
                <div className="admin-table-controls-left">
                  <select className="admin-bulk-select">
                    <option value="">Bulk Actions</option>
                    <option value="confirm">Confirm</option>
                    <option value="cancel">Cancel</option>
                    <option value="delete">Delete</option>
                  </select>
                  <button className="admin-btn-outline admin-btn-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Export
                  </button>
                </div>
                <div className="admin-table-controls-right">
                  <span className="admin-table-info">Showing {filteredBookings.length > 0 ? (bookingPage - 1) * bookingsPerPage + 1 : 0}-{Math.min(bookingPage * bookingsPerPage, filteredBookings.length)} of {filteredBookings.length} bookings</span>
                  <select className="admin-perpage-select" value={bookingsPerPage} disabled>
                    <option value={10}>10 per page</option>
                  </select>
                </div>
              </div>

              {/* Bookings Table */}
              <div className="admin-table-section">
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th style={{ width: 40 }}>
                          <input type="checkbox" checked={paginatedBookings.length > 0 && bookingSelectedIds.length === paginatedBookings.length} onChange={toggleAllBookings} />
                        </th>
                        <th>Booking ID</th>
                        <th>User</th>
                        <th>Property / Plan</th>
                        <th>Agent</th>
                        <th>Booking Date</th>
                        <th>Amount</th>
                        <th>Payment Status</th>
                        <th>Booking Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingsLoading ? (
                        <tr><td colSpan="10" style={{ textAlign: 'center', padding: '40px' }}>Loading bookings...</td></tr>
                      ) : paginatedBookings.length === 0 ? (
                        <tr><td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No bookings found</td></tr>
                      ) : (
                        paginatedBookings.map((b, idx) => {
                          const bId = b.bookingId || b.id || '-'
                          const bUser = b.userName || `${b.userFirstName || ''} ${b.userLastName || ''}`.trim() || '-'
                          const bUserEmail = b.userEmail || b.email || ''
                          const bProperty = b.propertyName || b.planName || '-'
                          const bPropertyType = b.propertyType || b.planType || ''
                          const bAgent = b.agentName || `${b.agentFirstName || ''} ${b.agentLastName || ''}`.trim() || '-'
                          const bAmount = b.amount || b.bookingAmount || 0
                          const bPayStatus = b.paymentStatus || 'PENDING'
                          const bBookStatus = b.bookingStatus || 'PENDING'
                          const bUserInit = bUser !== '-' ? bUser.split(' ').map(n => n[0]).join('').toUpperCase() : '?'
                          return (
                            <tr key={bId} className={bookingSelectedIds.includes(bId) ? 'selected-row' : ''}>
                              <td>
                                <input type="checkbox" checked={bookingSelectedIds.includes(bId)} onChange={() => toggleBookingSelect(bId)} />
                              </td>
                              <td>
                                <span className="booking-id">#{typeof bId === 'string' && bId.length > 8 ? bId.slice(-8).toUpperCase() : bId}</span>
                              </td>
                              <td>
                                <div className="admin-user-cell">
                                  <div className="admin-user-cell-avatar" style={{ background: avatarColors[idx % avatarColors.length] }}>
                                    {bUserInit}
                                  </div>
                                  <div className="admin-user-cell-info">
                                    <span className="admin-user-cell-name">{bUser}</span>
                                    <span className="admin-user-cell-email">{bUserEmail}</span>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="booking-property-cell">
                                  <span className="booking-property-name">{bProperty}</span>
                                  {bPropertyType && <span className="booking-property-type">{bPropertyType}</span>}
                                </div>
                              </td>
                              <td>{bAgent}</td>
                              <td>{formatDate(b.bookingDate || b.createdAt)}</td>
                              <td className="booking-amount">₹{bAmount.toLocaleString('en-IN')}</td>
                              <td>
                                <span className={`admin-badge ${bPayStatus.toLowerCase()}`}>
                                  {bPayStatus.charAt(0) + bPayStatus.slice(1).toLowerCase()}
                                </span>
                              </td>
                              <td>
                                <span className={`admin-badge ${bBookStatus.toLowerCase()}`}>
                                  {bBookStatus.charAt(0) + bBookStatus.slice(1).toLowerCase()}
                                </span>
                              </td>
                              <td>
                                <div className="admin-table-cell-actions">
                                  <button className="admin-action-btn" title="View">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                                    </svg>
                                  </button>
                                  <button className="admin-action-btn" title="Edit">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                  </button>
                                  <button className="admin-action-btn" title="Download Invoice">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                  </button>
                                  <button className="admin-action-btn danger" title="Cancel Booking">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="admin-pagination">
                  <span className="admin-pagination-info">Showing {filteredBookings.length > 0 ? (bookingPage - 1) * bookingsPerPage + 1 : 0} to {Math.min(bookingPage * bookingsPerPage, filteredBookings.length)} of {filteredBookings.length} entries</span>
                  <div className="admin-pagination-controls">
                    <button className="admin-page-btn" disabled={bookingPage === 1} onClick={() => setBookingPage(p => p - 1)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    {Array.from({ length: bookingTotalPages }, (_, i) => i + 1).map(p => (
                      <button key={p} className={`admin-page-btn ${bookingPage === p ? 'active' : ''}`} onClick={() => setBookingPage(p)}>{p}</button>
                    ))}
                    <button className="admin-page-btn" disabled={bookingPage === bookingTotalPages} onClick={() => setBookingPage(p => p + 1)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===== ENQUIRIES VIEW ===== */}
          {activeNav === 'enquiries' && (
            <>
              <div className="admin-breadcrumb">
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveNav('dashboard') }}>Dashboard</a>
                <span>&gt;</span>
                <span>Enquiries</span>
              </div>

              <div className="admin-page-title-bar">
                <h1 className="admin-page-title">Enquiries Management</h1>
                <div className="admin-page-actions">
                  <button className="admin-btn-outline">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Export
                  </button>
                  <button className="admin-btn-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add Enquiry
                  </button>
                </div>
              </div>

              {/* Enquiry Stats */}
              <div className="admin-stats admin-stats-5">
                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon blue">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+18.2%</span>
                  </div>
                  <div className="admin-stat-value">{totalEnquiries.toLocaleString()}</div>
                  <div className="admin-stat-label">Total Enquiries</div>
                  <div className="admin-stat-sub">vs last 30 days</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon green">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+24.5%</span>
                  </div>
                  <div className="admin-stat-value">{newEnquiries.toLocaleString()}</div>
                  <div className="admin-stat-label">New / Open</div>
                  <div className="admin-stat-sub">vs last 30 days</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon orange">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+5.3%</span>
                  </div>
                  <div className="admin-stat-value">{inProgressEnquiries.toLocaleString()}</div>
                  <div className="admin-stat-label">In Progress</div>
                  <div className="admin-stat-sub">vs last 30 days</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon purple">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+12.8%</span>
                  </div>
                  <div className="admin-stat-value">{resolvedEnquiries.toLocaleString()}</div>
                  <div className="admin-stat-label">Resolved / Closed</div>
                  <div className="admin-stat-sub">vs last 30 days</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon red">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change down">-3.1%</span>
                  </div>
                  <div className="admin-stat-value">{highPriorityEnquiries.toLocaleString()}</div>
                  <div className="admin-stat-label">High Priority</div>
                  <div className="admin-stat-sub">vs last 30 days</div>
                </div>
              </div>

              {/* Enquiry Filters */}
              <div className="admin-filters">
                <div className="admin-filter-group">
                  <label>Search</label>
                  <input type="text" placeholder="Enquiry ID, name or email..." value={enquirySearch} onChange={e => { setEnquirySearch(e.target.value); setEnquiryPage(1) }} />
                </div>
                <div className="admin-filter-group">
                  <label>Status</label>
                  <select value={enquiryStatusFilter} onChange={e => { setEnquiryStatusFilter(e.target.value); setEnquiryPage(1) }}>
                    <option value="">All Status</option>
                    <option value="NEW">New</option>
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>
                <div className="admin-filter-group">
                  <label>Property / Plan</label>
                  <input type="text" placeholder="Filter by property..." value={enquiryPropertyFilter} onChange={e => { setEnquiryPropertyFilter(e.target.value); setEnquiryPage(1) }} />
                </div>
                <div className="admin-filter-group">
                  <label>Enquiry Source</label>
                  <select value={enquirySourceFilter} onChange={e => { setEnquirySourceFilter(e.target.value); setEnquiryPage(1) }}>
                    <option value="">All Sources</option>
                    <option value="WEBSITE">Website</option>
                    <option value="MOBILE_APP">Mobile App</option>
                    <option value="PHONE">Phone</option>
                    <option value="WALK_IN">Walk-in</option>
                    <option value="REFERRAL">Referral</option>
                    <option value="SOCIAL_MEDIA">Social Media</option>
                  </select>
                </div>
                <div className="admin-filter-group">
                  <label>Date Range</label>
                  <div className="admin-date-range">
                    <input type="date" value={enquiryDateFrom} onChange={e => setEnquiryDateFrom(e.target.value)} />
                    <span className="admin-date-range-sep">to</span>
                    <input type="date" value={enquiryDateTo} onChange={e => setEnquiryDateTo(e.target.value)} />
                  </div>
                </div>
                <div className="admin-filter-actions">
                  <button className="admin-filter-reset" onClick={resetEnquiryFilters}>Reset</button>
                  <button className="admin-filter-apply">Apply Filters</button>
                </div>
              </div>

              {/* Table Controls */}
              <div className="admin-table-controls">
                <div className="admin-table-controls-left">
                  <select className="admin-bulk-select">
                    <option value="">Bulk Actions</option>
                    <option value="assign">Assign Agent</option>
                    <option value="resolve">Mark Resolved</option>
                    <option value="close">Close</option>
                    <option value="delete">Delete</option>
                  </select>
                  <button className="admin-btn-outline admin-btn-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download Selected
                  </button>
                </div>
                <div className="admin-table-controls-right">
                  <span className="admin-table-info">Showing {filteredEnquiries.length > 0 ? (enquiryPage - 1) * enquiriesPerPage + 1 : 0}-{Math.min(enquiryPage * enquiriesPerPage, filteredEnquiries.length)} of {filteredEnquiries.length} enquiries</span>
                  <select className="admin-perpage-select" value={enquiriesPerPage} disabled>
                    <option value={10}>10 per page</option>
                  </select>
                </div>
              </div>

              {/* Enquiries Table */}
              <div className="admin-table-section">
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th style={{ width: 40 }}>
                          <input type="checkbox" checked={paginatedEnquiries.length > 0 && enquirySelectedIds.length === paginatedEnquiries.length} onChange={toggleAllEnquiries} />
                        </th>
                        <th>Enquiry ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Property / Plan</th>
                        <th>Enquiry Source</th>
                        <th>Status</th>
                        <th>Enquired On</th>
                        <th>Assigned To</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiriesLoading ? (
                        <tr><td colSpan="10" style={{ textAlign: 'center', padding: '40px' }}>Loading enquiries...</td></tr>
                      ) : paginatedEnquiries.length === 0 ? (
                        <tr><td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No enquiries found</td></tr>
                      ) : (
                        paginatedEnquiries.map((e, idx) => {
                          const eId = e.enquiryId || e.id || '-'
                          const eName = e.name || `${e.firstName || ''} ${e.lastName || ''}`.trim() || '-'
                          const eEmail = e.email || ''
                          const ePhone = e.mobileNumber || e.phone || '-'
                          const eProperty = e.propertyName || e.planName || '-'
                          const ePropertyType = e.propertyType || e.planType || ''
                          const eSource = e.source || 'WEBSITE'
                          const eStatus = e.status || 'NEW'
                          const eAssignedTo = e.assignedTo || e.agentName || `${e.agentFirstName || ''} ${e.agentLastName || ''}`.trim() || ''
                          const eInit = eName !== '-' ? eName.split(' ').map(n => n[0]).join('').toUpperCase() : '?'
                          const aInit = eAssignedTo ? eAssignedTo.split(' ').map(n => n[0]).join('').toUpperCase() : ''
                          const sourceLabels = { WEBSITE: 'Website', MOBILE_APP: 'Mobile App', PHONE: 'Phone', WALK_IN: 'Walk-in', REFERRAL: 'Referral', SOCIAL_MEDIA: 'Social Media' }
                          const statusLabels = { NEW: 'New', OPEN: 'Open', IN_PROGRESS: 'In Progress', CONTACTED: 'Contacted', RESOLVED: 'Resolved', CLOSED: 'Closed' }
                          return (
                            <tr key={eId} className={enquirySelectedIds.includes(eId) ? 'selected-row' : ''}>
                              <td>
                                <input type="checkbox" checked={enquirySelectedIds.includes(eId)} onChange={() => toggleEnquirySelect(eId)} />
                              </td>
                              <td>
                                <span className="enquiry-id">#{typeof eId === 'string' && eId.length > 8 ? eId.slice(-8).toUpperCase() : eId}</span>
                              </td>
                              <td>
                                <div className="admin-user-cell">
                                  <div className="admin-user-cell-avatar" style={{ background: avatarColors[idx % avatarColors.length] }}>
                                    {eInit}
                                  </div>
                                  <div className="admin-user-cell-info">
                                    <span className="admin-user-cell-name">{eName}</span>
                                    <span className="admin-user-cell-email">{eEmail}</span>
                                  </div>
                                </div>
                              </td>
                              <td>{ePhone}</td>
                              <td>
                                <div className="booking-property-cell">
                                  <span className="booking-property-name">{eProperty}</span>
                                  {ePropertyType && <span className="booking-property-type">{ePropertyType}</span>}
                                </div>
                              </td>
                              <td>
                                <span className={`admin-badge source-${eSource.toLowerCase().replace('_', '-')}`}>
                                  {sourceLabels[eSource] || eSource}
                                </span>
                              </td>
                              <td>
                                <span className={`admin-badge status-${eStatus.toLowerCase().replace('_', '-')}`}>
                                  {statusLabels[eStatus] || eStatus}
                                </span>
                              </td>
                              <td>{formatDate(e.enquiredOn || e.createdAt)}</td>
                              <td>
                                {eAssignedTo ? (
                                  <div className="admin-user-cell">
                                    <div className="admin-user-cell-avatar small" style={{ background: avatarColors[(idx + 3) % avatarColors.length] }}>
                                      {aInit}
                                    </div>
                                    <span className="admin-user-cell-name">{eAssignedTo}</span>
                                  </div>
                                ) : (
                                  <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Unassigned</span>
                                )}
                              </td>
                              <td>
                                <div className="admin-table-cell-actions">
                                  <button className="admin-action-btn" title="View">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                                    </svg>
                                  </button>
                                  <button className="admin-action-btn" title="Edit">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                  </button>
                                  <button className="admin-action-btn" title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                  </button>
                                  <button className="admin-action-btn danger" title="Delete">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="admin-pagination">
                  <span className="admin-pagination-info">Showing {filteredEnquiries.length > 0 ? (enquiryPage - 1) * enquiriesPerPage + 1 : 0} to {Math.min(enquiryPage * enquiriesPerPage, filteredEnquiries.length)} of {filteredEnquiries.length} entries</span>
                  <div className="admin-pagination-controls">
                    <button className="admin-page-btn" disabled={enquiryPage === 1} onClick={() => setEnquiryPage(p => p - 1)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    {Array.from({ length: enquiryTotalPages }, (_, i) => i + 1).map(p => (
                      <button key={p} className={`admin-page-btn ${enquiryPage === p ? 'active' : ''}`} onClick={() => setEnquiryPage(p)}>{p}</button>
                    ))}
                    <button className="admin-page-btn" disabled={enquiryPage === enquiryTotalPages} onClick={() => setEnquiryPage(p => p + 1)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===== PROPERTIES VIEW ===== */}
          {activeNav === 'properties' && (
            <>
              <div className="admin-breadcrumb">
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveNav('dashboard') }}>Dashboard</a>
                <span>&gt;</span>
                <span>Properties</span>
              </div>

              <div className="admin-page-title-bar">
                <h1 className="admin-page-title">Properties</h1>
                <div className="admin-page-actions">
                  <button className="admin-btn-outline">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Export
                  </button>
                  <button className="admin-btn-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add Property
                  </button>
                </div>
              </div>

              {/* Property Stats */}
              <div className="admin-stats admin-stats-5">
                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon blue">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+12.5%</span>
                  </div>
                  <div className="admin-stat-value">{totalProperties.toLocaleString()}</div>
                  <div className="admin-stat-label">Total Properties</div>
                  <div className="admin-stat-sub">from last month</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon green">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+8.3%</span>
                  </div>
                  <div className="admin-stat-value">{activeListings.toLocaleString()}</div>
                  <div className="admin-stat-label">Active Listings</div>
                  <div className="admin-stat-sub">from last month</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon orange">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change down">-2.1%</span>
                  </div>
                  <div className="admin-stat-value">{pendingProperties.toLocaleString()}</div>
                  <div className="admin-stat-label">Pending Approval</div>
                  <div className="admin-stat-sub">from last month</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon purple">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+15.7%</span>
                  </div>
                  <div className="admin-stat-value">{soldProperties.toLocaleString()}</div>
                  <div className="admin-stat-label">Sold Properties</div>
                  <div className="admin-stat-sub">from last month</div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon cyan">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a4 4 0 0 0-8 0v2"/>
                      </svg>
                    </div>
                    <span className="admin-stat-change up">+6.2%</span>
                  </div>
                  <div className="admin-stat-value">{rentedProperties.toLocaleString()}</div>
                  <div className="admin-stat-label">Rented Properties</div>
                  <div className="admin-stat-sub">from last month</div>
                </div>
              </div>

              {/* Property Filters - Row 1 */}
              <div className="admin-filters">
                <div className="admin-filter-group">
                  <label>Search</label>
                  <input type="text" placeholder="Property name or ID..." value={propSearch} onChange={e => { setPropSearch(e.target.value); setPropPage(1) }} />
                </div>
                <div className="admin-filter-group">
                  <label>Property Type</label>
                  <select value={propTypeFilter} onChange={e => { setPropTypeFilter(e.target.value); setPropPage(1) }}>
                    <option value="">All Types</option>
                    <option value="RESIDENTIAL">Residential</option>
                    <option value="COMMERCIAL">Commercial</option>
                    <option value="LAND">Land</option>
                    <option value="INDUSTRIAL">Industrial</option>
                  </select>
                </div>
                <div className="admin-filter-group">
                  <label>Listing Type</label>
                  <select value={propListingFilter} onChange={e => { setPropListingFilter(e.target.value); setPropPage(1) }}>
                    <option value="">All Listings</option>
                    <option value="SALE">For Sale</option>
                    <option value="RENT">For Rent</option>
                    <option value="LEASE">For Lease</option>
                  </select>
                </div>
                <div className="admin-filter-group">
                  <label>Status</label>
                  <select value={propStatusFilter} onChange={e => { setPropStatusFilter(e.target.value); setPropPage(1) }}>
                    <option value="">All Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="PENDING">Pending</option>
                    <option value="SOLD">Sold</option>
                    <option value="RENTED">Rented</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
              </div>
              {/* Property Filters - Row 2 */}
              <div className="admin-filters" style={{ marginTop: 0 }}>
                <div className="admin-filter-group">
                  <label>Price Range</label>
                  <div className="admin-date-range">
                    <input type="number" placeholder="Min" value={propPriceMin} onChange={e => { setPropPriceMin(e.target.value); setPropPage(1) }} />
                    <span className="admin-date-range-sep">to</span>
                    <input type="number" placeholder="Max" value={propPriceMax} onChange={e => { setPropPriceMax(e.target.value); setPropPage(1) }} />
                  </div>
                </div>
                <div className="admin-filter-group">
                  <label>City / Location</label>
                  <input type="text" placeholder="Filter by city..." value={propCityFilter} onChange={e => { setPropCityFilter(e.target.value); setPropPage(1) }} />
                </div>
                <div className="admin-filter-group">
                  <label>Bedrooms</label>
                  <select value={propBedroomFilter} onChange={e => { setPropBedroomFilter(e.target.value); setPropPage(1) }}>
                    <option value="">All</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>
                <div className="admin-filter-group">
                  <label>Posted Date</label>
                  <input type="date" value={propDateFilter} onChange={e => setPropDateFilter(e.target.value)} />
                </div>
                <div className="admin-filter-actions">
                  <button className="admin-filter-reset" onClick={resetPropFilters}>Reset</button>
                  <button className="admin-filter-apply">Apply Filters</button>
                </div>
              </div>

              {/* Table Controls */}
              <div className="admin-table-controls">
                <div className="admin-table-controls-left">
                  <select className="admin-bulk-select">
                    <option value="">Bulk Actions</option>
                    <option value="approve">Approve</option>
                    <option value="reject">Reject</option>
                    <option value="deactivate">Deactivate</option>
                    <option value="delete">Delete</option>
                  </select>
                  <button className="admin-btn-outline admin-btn-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Export
                  </button>
                  <div className="admin-view-toggle">
                    <button className="admin-view-btn active" title="List View">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                    </button>
                    <button className="admin-view-btn" title="Grid View">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                    </button>
                  </div>
                </div>
                <div className="admin-table-controls-right">
                  <span className="admin-table-info">Showing {filteredProperties.length > 0 ? (propPage - 1) * propertiesPerPage + 1 : 0}-{Math.min(propPage * propertiesPerPage, filteredProperties.length)} of {filteredProperties.length} properties</span>
                  <select className="admin-perpage-select" value={propertiesPerPage} disabled>
                    <option value={10}>10 per page</option>
                  </select>
                </div>
              </div>

              {/* Properties Table */}
              <div className="admin-table-section">
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th style={{ width: 40 }}>
                          <input type="checkbox" checked={paginatedProperties.length > 0 && propSelectedIds.length === paginatedProperties.length} onChange={toggleAllProps} />
                        </th>
                        <th>Property</th>
                        <th>Owner / Agent</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Listing Type</th>
                        <th>Posted Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {propertiesLoading ? (
                        <tr><td colSpan="10" style={{ textAlign: 'center', padding: '40px' }}>Loading properties...</td></tr>
                      ) : paginatedProperties.length === 0 ? (
                        <tr><td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No properties found</td></tr>
                      ) : (
                        paginatedProperties.map((p, idx) => {
                          const pId = p.propertyId || p.id || '-'
                          const pName = p.propertyName || p.title || p.name || '-'
                          const pOwner = p.ownerName || p.agentName || `${p.ownerFirstName || p.agentFirstName || ''} ${p.ownerLastName || p.agentLastName || ''}`.trim() || '-'
                          const pType = p.propertyType || 'Residential'
                          const pPrice = p.price || p.amount || 0
                          const pLocation = p.city || p.location || p.area || '-'
                          const pStatus = p.status || 'PENDING'
                          const pListing = p.listingType || 'SALE'
                          const pImage = p.imageUrl || p.thumbnailUrl || p.coverImage || ''
                          const typeLabels = { RESIDENTIAL: 'Residential', COMMERCIAL: 'Commercial', LAND: 'Land', INDUSTRIAL: 'Industrial' }
                          const listingLabels = { SALE: 'For Sale', RENT: 'For Rent', LEASE: 'For Lease' }
                          const statusDotColor = { ACTIVE: '#16a34a', APPROVED: '#16a34a', PENDING: '#f59e0b', UNDER_REVIEW: '#f59e0b', SOLD: '#7c3aed', RENTED: '#0891b2', INACTIVE: '#94a3b8' }
                          return (
                            <tr key={pId} className={propSelectedIds.includes(pId) ? 'selected-row' : ''}>
                              <td>
                                <input type="checkbox" checked={propSelectedIds.includes(pId)} onChange={() => togglePropSelect(pId)} />
                              </td>
                              <td>
                                <div className="prop-cell">
                                  <div className="prop-cell-thumb" style={{ background: pImage ? `url(${pImage}) center/cover` : avatarColors[idx % avatarColors.length] }}>
                                    {!pImage && <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" width="18" height="18"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
                                  </div>
                                  <div className="prop-cell-info">
                                    <span className="prop-cell-name">{pName}</span>
                                    <span className="prop-cell-id">#{typeof pId === 'string' && pId.length > 8 ? pId.slice(-8).toUpperCase() : pId}</span>
                                  </div>
                                </div>
                              </td>
                              <td>{pOwner}</td>
                              <td>
                                <span className={`admin-badge ${pType.toLowerCase()}`}>{typeLabels[pType] || pType}</span>
                              </td>
                              <td className="booking-amount">₹{pPrice.toLocaleString('en-IN')}</td>
                              <td>{pLocation}</td>
                              <td>
                                <div className="prop-status-cell">
                                  <span className="prop-status-dot" style={{ background: statusDotColor[pStatus] || '#94a3b8' }}></span>
                                  <span>{pStatus.charAt(0) + pStatus.slice(1).toLowerCase().replace('_', ' ')}</span>
                                </div>
                              </td>
                              <td>
                                <span className={`admin-badge listing-${pListing.toLowerCase()}`}>{listingLabels[pListing] || pListing}</span>
                              </td>
                              <td>{formatDate(p.postedDate || p.createdAt)}</td>
                              <td>
                                <div className="admin-table-cell-actions">
                                  <button className="admin-action-btn" title="View">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                                    </svg>
                                  </button>
                                  <button className="admin-action-btn" title="Edit">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                  </button>
                                  <button className="admin-action-btn" title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                  </button>
                                  <button className="admin-action-btn" title="Favorite">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="admin-pagination">
                  <span className="admin-pagination-info">Showing {filteredProperties.length > 0 ? (propPage - 1) * propertiesPerPage + 1 : 0} to {Math.min(propPage * propertiesPerPage, filteredProperties.length)} of {filteredProperties.length} entries</span>
                  <div className="admin-pagination-controls">
                    <button className="admin-page-btn" disabled={propPage === 1} onClick={() => setPropPage(p => p - 1)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    {Array.from({ length: Math.min(propTotalPages, 7) }, (_, i) => {
                      let p
                      if (propTotalPages <= 7) { p = i + 1 }
                      else if (propPage <= 4) { p = i + 1 }
                      else if (propPage >= propTotalPages - 3) { p = propTotalPages - 6 + i }
                      else { p = propPage - 3 + i }
                      return (
                        <button key={p} className={`admin-page-btn ${propPage === p ? 'active' : ''}`} onClick={() => setPropPage(p)}>{p}</button>
                      )
                    })}
                    <button className="admin-page-btn" disabled={propPage === propTotalPages} onClick={() => setPropPage(p => p + 1)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===== ADMIN PROFILE VIEW ===== */}
          {activeNav === 'admin-profile' && (
            <>
              <div className="admin-breadcrumb">
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveNav('dashboard') }}>Dashboard</a>
                <span>&gt;</span>
                <span>Profile</span>
              </div>

              <div className="admin-page-title-bar">
                <h1 className="admin-page-title">Admin Profile</h1>
              </div>

              <div className="admin-profile-card">
                <div className="admin-profile-avatar" style={{ background: '#f26522' }}>
                  {initials}
                </div>
                <div className="admin-profile-details">
                  <h2>{adminName}</h2>
                  <p className="admin-profile-role">Administrator</p>
                  <p className="admin-profile-email">{user.email || '-'}</p>
                  <p className="admin-profile-phone">{user.mobileNumber || '-'}</p>
                  {user.area && <p className="admin-profile-area">{user.area}</p>}
                </div>
              </div>
            </>
          )}

        </div>

        {/* Edit Role Modal */}
        {editModalOpen && editingUser && (
          <>
            <div className="admin-modal-overlay" onClick={() => setEditModalOpen(false)} />
            <div className="admin-modal">
              <div className="admin-modal-header">
                <h2>Edit User Role</h2>
                <button className="admin-modal-close" onClick={() => setEditModalOpen(false)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <div className="admin-modal-body">
                <div className="admin-modal-user-info">
                  <div className="admin-user-cell-avatar" style={{ background: '#f26522' }}>
                    {`${editingUser.firstName || ''} ${editingUser.lastName || ''}`.trim().split(' ').map(n => n[0]).join('').toUpperCase() || '?'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{`${editingUser.firstName || ''} ${editingUser.lastName || ''}`.trim() || '-'}</div>
                    <div style={{ color: '#64748b', fontSize: '0.875rem' }}>{editingUser.email}</div>
                  </div>
                </div>
                <div className="admin-modal-field">
                  <label>Role</label>
                  <select value={editRoleId} onChange={(e) => setEditRoleId(Number(e.target.value))}>
                    <option value={1}>User</option>
                    <option value={2}>Admin</option>
                  </select>
                </div>
                {editMessage.text && (
                  <div className={`admin-modal-message ${editMessage.type}`}>
                    {editMessage.text}
                  </div>
                )}
              </div>
              <div className="admin-modal-footer">
                <button className="admin-btn-outline" onClick={() => setEditModalOpen(false)}>Cancel</button>
                <button className="admin-btn-primary" onClick={handleUpdateRole} disabled={editLoading}>
                  {editLoading ? 'Updating...' : 'Update Role'}
                </button>
              </div>
            </div>
          </>
        )}

      </main>
      </div>
    </div>
  )
}

export default Admin
