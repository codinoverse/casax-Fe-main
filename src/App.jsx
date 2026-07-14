import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import VerifyOtp from './pages/VerifyOtp'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import SearchProperties from './pages/SearchProperties'
import PostProperty from './pages/PostProperty'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import MyProperties from './pages/MyProperties'
import PropertyDetails from './pages/PropertyDetails'
import MyFavourites from './pages/MyFavourites'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    setIsLoggedIn(false)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verifytoken" element={<ResetPassword />} />
        <Route path="/buy" element={<SearchProperties isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path="/post-property" element={<PostProperty isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path="/my-properties" element={<MyProperties isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path="/my-favourites" element={<MyFavourites isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path="/property/:id" element={<PropertyDetails isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path="/admin" element={<Admin isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
      </Routes>
    </Router>
  )
}

export default App
