// ResetPasswordPage.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '@/components/AuthLayout';
import SchoolBadge from '@/components/SchoolBadge';


export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [show, setShow] = useState({ pwd: false, conf: false });
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.password.length < 8) {
      return toast.error('Password must be at least 8 characters');
    }
    
    if (form.password !== form.confirm) {
      return toast.error('Passwords do not match');
    }
    
    setIsPending(true);
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1000));
      navigate('/password-reset-success');
      toast.success('Password reset successful!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to reset password');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AuthLayout>
      <SchoolBadge name="Spring Hills Academy" />
      
      <h2 className="text-lg font-bold text-navy text-center mb-1">Create New Password</h2>
      <p className="text-xs text-gray-400 text-center mb-6">Create new password for your account</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {[
          { label: 'Password', key: 'password' as const, showKey: 'pwd' as const },
          { label: 'Confirm Password', key: 'confirm' as const, showKey: 'conf' as const },
        ].map(({ label, key, showKey }) => (
          <div key={key}>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
            <div className="relative">
              <input
                type={show[showKey] ? 'text' : 'password'}
                required
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder="••••••••••••••"
                className="input-field pr-10"
              />
              <button
                type="button"
                onClick={() => setShow(s => ({ ...s, [showKey]: !s[showKey] }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {show[showKey] ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
        ))}
        
        <p className="text-[11px] text-gray-400">Password must be at least 8 characters</p>
        
        <button 
          type="submit" 
          disabled={isPending} 
          className="btn-primary w-full"
        >
          {isPending ? 'Setting…' : 'Set New Password'}
        </button>
      </form>
    </AuthLayout>
  );
}