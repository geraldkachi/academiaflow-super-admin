import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Building2, CreditCard, Monitor, Users,
  BarChart2, Bell, ChevronDown, Search, Menu, X, LogOut
} from 'lucide-react'
import { Logo, Avatar } from '../components/ui'
import { useAuth } from '../hooks/useAuth'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/schools', label: 'Schools', icon: Building2 },
  { path: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { path: '/live-exams', label: 'Live Exams', icon: Monitor },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/analytics', label: 'Analytics', icon: BarChart2 },
  { path: '/notification', label: 'Notification', icon: Bell },
]

export default function AppLayout() {
  const { logout } = useAuth()
  const nav = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => { logout(); nav('/login') }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-slate-100">
        <Logo />
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-slate-100">
        <button onClick={handleLogout} className="sidebar-link text-red-500 hover:bg-red-50 hover:text-red-600 w-full">
          <LogOut size={17} />
          Sign out
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-52 bg-white border-r border-slate-100 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-60 h-full bg-white">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-slate-500">
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-slate-100 px-4 md:px-6 py-3 flex items-center gap-4 flex-shrink-0">
          <button className="md:hidden text-slate-500" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>

          {/* Page title area handled by pages */}
          <div className="flex-1" />

          {/* Search */}
          <div className="hidden sm:flex relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input-field pl-9 w-52 text-sm h-9" placeholder="Search" />
          </div>

          {/* Bell */}
          <button className="relative text-slate-500 hover:text-slate-700">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">3</span>
          </button>

          {/* User */}
          <div className="flex items-center gap-2.5 cursor-pointer group">
            <Avatar initials="SA" color="#16a34a" size={8} />
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-slate-800 leading-tight">Super Admin</div>
              <div className="text-xs text-slate-400">@Admin123.com</div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
