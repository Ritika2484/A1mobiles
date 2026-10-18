'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalTab, login, register } = useAuth();

  const [tab, setTab] = useState<'login' | 'register'>(authModalTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Sync tab with context when modal opens
  React.useEffect(() => {
    setTab(authModalTab);
    setError(null);
    setSuccessMsg(null);
  }, [authModalTab, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!loginIdentifier || !loginPassword) {
      setError('Please provide both your email/phone and password.');
      return;
    }

    setIsLoading(true);
    const res = await login(loginIdentifier, loginPassword);
    setIsLoading(false);

    if (!res.success) {
      setError(res.error || 'Login failed. Please check your credentials.');
    } else {
      setSuccessMsg('Logged in successfully!');
      setTimeout(() => {
        closeAuthModal();
      }, 500);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!registerName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!registerEmail.trim() || !registerEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (registerPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    const res = await register({
      name: registerName,
      email: registerEmail,
      phone: registerPhone || undefined,
      password: registerPassword,
    });
    setIsLoading(false);

    if (!res.success) {
      setError(res.error || 'Registration failed.');
    } else {
      setSuccessMsg('Account created successfully!');
      setTimeout(() => {
        closeAuthModal();
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={closeAuthModal}
      />

      {/* Modal Box */}
      <div className="relative bg-[#F5EFE6] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-50 border border-[#E0D9CD] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 text-[#6E685F] hover:text-[#23201C] rounded-xl hover:bg-[#EAE4D9] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#23201C] text-[#F5EFE6] flex items-center justify-center mx-auto mb-3 shadow-sm">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#23201C]">
            {tab === 'login' ? 'Welcome Back!' : 'Create Your Account'}
          </h3>
          <p className="text-xs text-[#6E685F] mt-1">
            {tab === 'login'
              ? 'Sign in to track orders, manage enquiries, and view store offers.'
              : 'Join A1 Mobile Shop to shop smartphones and sell old devices.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#EAE4D9] p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'login'
                ? 'bg-[#23201C] text-[#F5EFE6] shadow-xs'
                : 'text-[#6E685F] hover:text-[#23201C]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'register'
                ? 'bg-[#23201C] text-[#F5EFE6] shadow-xs'
                : 'text-[#6E685F] hover:text-[#23201C]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs mb-4">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#E6EFE9] border border-[#2E6B47]/30 text-[#2E6B47] text-xs mb-4">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Sign In Form */}
        {tab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#23201C] mb-1">
                Email or Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8E867C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="Enter email or 10-digit mobile"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DED7CA] bg-[#EAE4D9]/60 text-sm focus:outline-hidden focus:border-[#23201C] focus:ring-1 focus:ring-[#23201C]/20 transition-all text-[#23201C] placeholder-[#8E867C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#23201C] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8E867C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#DED7CA] bg-[#EAE4D9]/60 text-sm focus:outline-hidden focus:border-[#23201C] focus:ring-1 focus:ring-[#23201C]/20 transition-all text-[#23201C] placeholder-[#8E867C]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E867C] hover:text-[#23201C]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#23201C] hover:bg-[#151311] disabled:opacity-60 text-[#F5EFE6] font-bold py-3 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In →</span>
              )}
            </button>

            <p className="text-center text-xs text-[#6E685F] pt-2">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => setTab('register')}
                className="text-[#564F46] hover:underline font-bold"
              >
                Create one now
              </button>
            </p>
          </form>
        ) : (
          /* Create Account Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#23201C] mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8E867C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="e.g. Rahul Verma"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DED7CA] bg-[#EAE4D9]/60 text-sm focus:outline-hidden focus:border-[#23201C] focus:ring-1 focus:ring-[#23201C]/20 transition-all text-[#23201C] placeholder-[#8E867C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#23201C] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8E867C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DED7CA] bg-[#EAE4D9]/60 text-sm focus:outline-hidden focus:border-[#23201C] focus:ring-1 focus:ring-[#23201C]/20 transition-all text-[#23201C] placeholder-[#8E867C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#23201C] mb-1">
                Mobile Number <span className="text-[#8E867C] font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#8E867C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DED7CA] bg-[#EAE4D9]/60 text-sm focus:outline-hidden focus:border-[#23201C] focus:ring-1 focus:ring-[#23201C]/20 transition-all text-[#23201C] placeholder-[#8E867C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#23201C] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8E867C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#DED7CA] bg-[#EAE4D9]/60 text-sm focus:outline-hidden focus:border-[#23201C] focus:ring-1 focus:ring-[#23201C]/20 transition-all text-[#23201C] placeholder-[#8E867C]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E867C] hover:text-[#23201C]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#23201C] hover:bg-[#151311] disabled:opacity-60 text-[#F5EFE6] font-bold py-3 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Register &amp; Sign In →</span>
              )}
            </button>

            <p className="text-center text-xs text-[#6E685F] pt-2">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setTab('login')}
                className="text-[#564F46] hover:underline font-bold"
              >
                Sign in
              </button>
            </p>
          </form>
        )}

        <p className="text-[11px] text-[#8E867C] text-center mt-5">
          By proceeding, you agree to A1 Mobile Shop Terms &amp; Privacy Policy.
        </p>
      </div>
    </div>
  );
}
export default AuthModal;
