// ForgotPasswordPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '@/components/AuthLayout';
import SchoolBadge from '@/components/SchoolBadge';


export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error('Enter email');
    
    setIsPending(true);
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1000));
      navigate('/verify-code', { state: { email } });
      toast.success('Verification code sent!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Email not found');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AuthLayout>
      <SchoolBadge name="Spring Hills Academy" />
      
      <h2 className="text-lg font-bold text-navy text-center mb-1">Forgot Password</h2>
      <p className="text-xs text-gray-400 text-center mb-6">We will send you a verification code</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Student Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="JohnDoe23@springhills.edu"
            className="input-field"
          />
        </div>
        
        <Link 
          to="/login" 
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-navy w-fit"
        >
          <ArrowLeft size={12} /> Back to Login
        </Link>
        
        <button 
          type="submit" 
          disabled={isPending} 
          className="btn-primary w-full"
        >
          {isPending ? 'Sending…' : 'Send Verification Code'}
        </button>
      </form>
    </AuthLayout>
  );
}