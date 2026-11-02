import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, User, ShieldCheck, Mail, ArrowRight, Sparkles } from 'lucide-react';

interface AuthPageProps {
  navigate: (route: string) => void;
  initialMode?: 'login' | 'register';
  staffMode?: boolean;
}

export const AuthPages: React.FC<AuthPageProps> = ({
  navigate,
  initialMode = 'login',
  staffMode = false,
}) => {
  const { login, register, currentUser } = useApp();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      const role = staffMode || email.includes('admin') || email.includes('atelier') ? 'admin' : 'customer';
      login(email || 'aanya.sharma@example.com', role);
      navigate(role === 'admin' ? '/admin' : '/account');
    } else if (mode === 'register') {
      register(name || 'Aanya Sharma', email || 'aanya.sharma@example.com');
      navigate('/account');
    } else if (mode === 'forgot') {
      setResetSent(true);
    }
  };

  const handleQuickLoginPatron = () => {
    login('aanya.sharma@example.com', 'customer');
    navigate('/account');
  };

  const handleQuickLoginAdmin = () => {
    login('vikram.singhania@aureliafinejewels.com', 'admin');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-16 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-bold block mb-1">
            {staffMode ? 'Atelier Portal' : 'Aurelia Private Circle'}
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#283447]">
            {mode === 'login'
              ? staffMode
                ? 'Atelier Staff Sign In'
                : 'Sign In to Your Account'
              : mode === 'register'
              ? 'Create a Patron Account'
              : 'Password Reset'}
          </h1>
          <p className="text-xs text-[#82796E] mt-1 font-light">
            Manage your bespoke commissions, orders, and vault appraisals.
          </p>
        </div>

        <div className="bg-white border border-[#E7E2D9] p-8 rounded-sm shadow-md space-y-6">
          
          {/* Quick Demo Switcher */}
          <div className="p-3 bg-[#FAF7F0] border border-[#E7E2D9] rounded text-xs space-y-2">
            <span className="text-[10px] font-semibold text-[#82796E] uppercase tracking-wider block">
              Quick Demo Profile Access:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleQuickLoginPatron}
                className="flex-1 py-1.5 px-2 bg-white border border-[#245B4A] text-[#245B4A] rounded text-[11px] font-medium hover:bg-[#245B4A] hover:text-white transition-colors"
              >
                Log In as Patron (Aanya)
              </button>
              <button
                type="button"
                onClick={handleQuickLoginAdmin}
                className="flex-1 py-1.5 px-2 bg-[#245B4A] text-white rounded text-[11px] font-medium hover:bg-[#1C4537] transition-colors"
              >
                Log In as Staff (Vikram)
              </button>
            </div>
          </div>

          {resetSent ? (
            <div className="text-center py-6 space-y-3">
              <ShieldCheck className="w-10 h-10 text-[#245B4A] mx-auto" />
              <p className="text-xs text-[#283447]">
                A secure password reset link has been dispatched to your email address.
              </p>
              <button
                onClick={() => {
                  setResetSent(false);
                  setMode('login');
                }}
                className="text-xs text-[#245B4A] font-semibold underline"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {mode === 'register' && (
                <div>
                  <label className="font-semibold text-[#283447] block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aanya Sharma"
                    className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded text-[#283447]"
                  />
                </div>
              )}

              <div>
                <label className="font-semibold text-[#283447] block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded text-[#283447]"
                />
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-[#283447]">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[11px] text-[#C5A46D] hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#FAF7F0] border border-[#E7E2D9] p-2.5 rounded text-[#283447]"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-[#245B4A] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#1C4537] transition-colors"
              >
                {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
              </button>
            </form>
          )}

          <div className="pt-2 text-center text-xs text-[#82796E] border-t border-[#E7E2D9]">
            {mode === 'login' ? (
              <p>
                New to Aurelia Fine Jewels?{' '}
                <button onClick={() => setMode('register')} className="text-[#245B4A] font-semibold hover:underline">
                  Join the Private Circle
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button onClick={() => setMode('login')} className="text-[#245B4A] font-semibold hover:underline">
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
