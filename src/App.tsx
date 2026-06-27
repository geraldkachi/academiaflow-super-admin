import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import AppLayout from './layouts/AppLayout'
import Login from './pages/Login'
// import { ForgotPassword, VerifyOTP, ResetPassword } from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Schools from './pages/Schools'
import Subscriptions from './pages/Subscriptions'
import LiveExams from './pages/LiveExams'
import UsersPage from './pages/Users'
import Analytics from './pages/Analytics'
import Notification from './pages/Notification'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import VerifyCodePage from './pages/auth/VerifyCodePage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
      <Route path="/verify-otp" element={<PublicRoute><VerifyCodePage /></PublicRoute>} />
      <Route path="/reset-password" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />

      {/* App */}
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/live-exams" element={<LiveExams />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/notification" element={<Notification />} />
      </Route>

      {/* Redirect root */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
