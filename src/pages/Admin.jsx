import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { get } from '../services/api'
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

  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'ACTIVE').length
  const inactiveUsers = users.filter(u => u.status !== 'ACTIVE').length

  const handleLogout = () => {
    onLogout()
    navigate('/')
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
                  <button className="admin-dropdown-item" onClick={() => { setUserDropdownOpen(false); navigate('/profile') }}>
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
                        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
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
                                  <button className="admin-action-btn" title="Edit">
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

        </div>
      </main>
      </div>
    </div>
  )
}

export default Admin
