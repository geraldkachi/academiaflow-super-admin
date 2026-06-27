// LoginPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '../components/AuthLayout';
import SchoolBadge from '../components/SchoolBadge';
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    email: 'admin@school.com', 
    password: 'password123', 
    remember: true 
  });
  const [showPwd, setShowPwd] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.email || !form.password) {
      return toast.error('Please fill all fields');
    }

    setIsPending(true);

    try {
      // await login(form.email, form.password, form.remember);
       await login();
      navigate('/dashboard');
      toast.success('Welcome back!');
    } catch (error: any) {
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setIsPending(false);
    }
  };

  // Demo accounts helper
  const fillDemoAccount = (email: string) => {
    setForm(f => ({ ...f, email }));
  };

  return (
    <AuthLayout>
      <SchoolBadge name="Spring Hills Academy" />
      
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-navy mb-1">Welcome Back</h2>
        <p className="text-xs text-gray-400">Let's get the learning started</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="you@school.edu"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              required
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••••••••"
              className="input-field pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))}
              className="w-3.5 h-3.5 accent-primary rounded"
            />
            Keep me signed in
          </label>
          <Link 
            to="/forgot-password" 
            className="text-xs text-primary font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button 
          type="submit" 
          disabled={isPending} 
          className="btn-primary w-full mt-1"
        >
          {isPending ? 'Logging in…' : 'Login'}
        </button>
      </form>

      {/* Demo Accounts - Remove in production */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center mb-3">Demo Accounts</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['admin@school.com', 'teacher@school.com', 'student@school.com', 'parent@school.com'].map(email => (
            <button
              key={email}
              onClick={() => fillDemoAccount(email)}
              className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              {email.split('@')[0]}
            </button>
          ))}
        </div>
      </div>
    </AuthLayout>
  );
}

// import React, { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
// import { Logo } from '../components/ui'
// import { useAuth } from '../hooks/useAuth'

// export default function Login() {
//   const { login } = useAuth()
//   const nav = useNavigate()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [show, setShow] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')
//     if (!email || !password) { setError('Please fill in all fields.'); return }
//     setLoading(true)
//     await new Promise(r => setTimeout(r, 800))
//     setLoading(false)
//     login()
//     nav('/dashboard')
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-sm">
//         {/* Logo */}
//         <div className="flex justify-center mb-8">
//           <Logo size="lg" />
//         </div>

//         <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
//             <p className="text-sm text-slate-500 mt-1">Sign in to your super admin account</p>
//           </div>

//           {error && (
//             <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
//               <div className="relative">
//                 <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type="email"
//                   className="input-field pl-9"
//                   placeholder="@Admin123.com"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="flex justify-between items-center mb-1.5">
//                 <label className="text-sm font-medium text-slate-700">Password</label>
//                 <Link to="/forgot-password" className="text-xs text-green-600 hover:text-green-700 font-medium">Forgot password?</Link>
//               </div>
//               <div className="relative">
//                 <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type={show ? 'text' : 'password'}
//                   className="input-field pl-9 pr-10"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                 />
//                 <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
//                   {show ? <EyeOff size={15} /> : <Eye size={15} />}
//                 </button>
//               </div>
//             </div>

//             <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-2.5 mt-2">
//               {loading ? 'Signing in…' : 'Sign In'}
//             </button>
//           </form>
//         </div>

//         <p className="text-center text-xs text-slate-400 mt-6">AcademiaFlow Super Admin © 2026</p>
//       </div>
//     </div>
//   )
// }
