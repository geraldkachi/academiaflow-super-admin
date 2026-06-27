import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react'
import { Logo } from '../components/ui'

// ── Shared Auth Shell ──────────────────────────────────────────────────────
function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8"><Logo size="lg" /></div>
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
          {children}
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">AcademiaFlow Super Admin © 2026</p>
      </div>
    </div>
  )
}

// ── Forgot Password ─────────────────────────────────────────────────────────
export function ForgotPassword() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    nav('/verify-otp', { state: { email } })
  }

  return (
    <AuthShell>
      <Link to="/login" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6">
        <ArrowLeft size={14} /> Back to login
      </Link>
      <div className="mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
          <Mail size={22} className="text-green-600" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">Forgot password?</h1>
        <p className="text-sm text-slate-500 mt-1">Enter your email and we'll send you a reset code.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
          <div className="relative">
            <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="email" className="input-field pl-9" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-2.5">
          {loading ? 'Sending…' : 'Send Reset Code'}
        </button>
      </form>
    </AuthShell>
  )
}

// ── Verify OTP ──────────────────────────────────────────────────────────────
export function VerifyOTP() {
  const nav = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return
    const next = [...otp]
    next[i] = v.slice(-1)
    setOtp(next)
    if (v && i < 5) refs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs.current[i - 1]?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    setLoading(false)
    nav('/reset-password')
  }

  return (
    <AuthShell>
      <Link to="/forgot-password" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6">
        <ArrowLeft size={14} /> Back
      </Link>
      <div className="mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
          <Mail size={22} className="text-green-600" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">Check your email</h1>
        <p className="text-sm text-slate-500 mt-1">We sent a 6-digit code to your email. Enter it below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-2 justify-between">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => { refs.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className="w-11 h-12 text-center text-lg font-bold border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all"
            />
          ))}
        </div>
        <button type="submit" disabled={loading || otp.some(d => !d)} className="btn-primary w-full justify-center py-2.5">
          {loading ? 'Verifying…' : 'Verify Code'}
        </button>
        <p className="text-center text-sm text-slate-500">
          Didn't receive it?{' '}
          <button type="button" className="text-green-600 font-medium hover:underline">Resend code</button>
        </p>
      </form>
    </AuthShell>
  )
}

// ── Reset Password ───────────────────────────────────────────────────────────
export function ResetPassword() {
  const nav = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showP, setShowP] = useState(false)
  const [showC, setShowC] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    nav('/login')
  }

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3
  const strengthColor = ['', 'bg-red-400', 'bg-yellow-400', 'bg-green-500'][strength]
  const strengthLabel = ['', 'Weak', 'Fair', 'Strong'][strength]

  return (
    <AuthShell>
      <div className="mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
          <Lock size={22} className="text-green-600" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">Create new password</h1>
        <p className="text-sm text-slate-500 mt-1">Your new password must be different from previous ones.</p>
      </div>

      {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type={showP ? 'text' : 'password'} className="input-field pl-9 pr-10" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="button" onClick={() => setShowP(!showP)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {showP ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-1 flex-1">
                {[1,2,3].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${i <= strength ? strengthColor : 'bg-slate-200'}`} />)}
              </div>
              <span className="text-xs text-slate-500">{strengthLabel}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type={showC ? 'text' : 'password'} className="input-field pl-9 pr-10" placeholder="Repeat your password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
            <button type="button" onClick={() => setShowC(!showC)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {showC ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-2.5 mt-2">
          {loading ? 'Saving…' : 'Reset Password'}
        </button>
      </form>
    </AuthShell>
  )
}
