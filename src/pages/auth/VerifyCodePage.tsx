// VerifyCodePage.tsx
import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import SchoolBadge from '@/components/SchoolBadge';
import AuthLayout from '@/components/AuthLayout';


export default function VerifyCodePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || '';
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [isPending, setIsPending] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...code];
    next[i] = val.slice(-1);
    setCode(next);
    if (val && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.join('').length < 6) {
      return toast.error('Enter the 6-digit code');
    }
    
    setIsPending(true);
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1000));
      navigate('/reset-password', { state: { email, code: code.join('') } });
      toast.success('Code verified!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Invalid code');
    } finally {
      setIsPending(false);
    }
  };

  const handleResend = async () => {
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 800));
      toast.success('Code resent!');
    } catch (error: any) {
      toast.error('Failed to resend code');
    }
  };

  return (
    <AuthLayout>
      <SchoolBadge name="Spring Hills Academy" />
      
      <h2 className="text-lg font-bold text-navy text-center mb-1">Verify Account</h2>
      <p className="text-xs text-gray-400 text-center mb-6">
        We sent a code to <span className="text-navy font-medium">{email || 'Johndoe@gmail.com'}</span>
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">Verification code</label>
          <div className="flex gap-2 justify-center">
            {Array(6).fill(0).map((_, i) => (
              <input
                key={i}
                ref={el => { refs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={code[i]}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className={`w-10 h-11 text-center border rounded-lg text-sm font-semibold text-navy outline-none transition-all ${
                  code[i] 
                    ? 'border-primary bg-primary-light text-primary' 
                    : 'border-gray-200 bg-gray-50'
                } focus:border-primary focus:ring-1 focus:ring-primary/20`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <Link 
            to="/login" 
            className="flex items-center gap-1 text-gray-500 hover:text-navy"
          >
            <ArrowLeft size={11} /> Back to Login
          </Link>
          <button 
            type="button" 
            onClick={handleResend} 
            className="text-primary font-medium hover:underline"
          >
            Resend Code
          </button>
        </div>
        
        <button 
          type="submit" 
          disabled={isPending} 
          className="btn-primary w-full"
        >
          {isPending ? 'Verifying…' : 'Verify Code'}
        </button>
      </form>
    </AuthLayout>
  );
}