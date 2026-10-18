'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Login failed. Please try again.');
        return;
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#191715] px-4">
      <div className="relative w-full max-w-sm">
        {/* Logo mark */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#23201C] border border-[#38332E] shadow-md mb-4 text-[#F5EFE6]">
            <ShieldCheck className="w-7 h-7 text-[#F5EFE6]" />
          </div>
          <h1 className="text-2xl font-medium text-white tracking-tight">Admin Portal</h1>
          <p className="text-sm text-[#8E867C] mt-1">A1 Mobile Shop</p>
        </div>

        <div className="bg-[#23201C] border border-[#38332E] rounded-3xl p-8 shadow-xl">
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#3A2222] border border-[#5C3434] text-[#FCE8E8] text-sm mb-5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#F87171]" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="admin-email" className="block text-xs font-semibold text-[#DED7CA] mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8E867C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Jaikishanhome1998@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#191715] border border-[#38332E] text-[#F5EFE6] text-sm placeholder-[#6E685F] focus:outline-none focus:border-[#E0D9CD] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold text-[#DED7CA] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8E867C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#191715] border border-[#38332E] text-[#F5EFE6] text-sm placeholder-[#6E685F] focus:outline-none focus:border-[#E0D9CD] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E867C] hover:text-[#F5EFE6] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#F5EFE6] hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed text-[#23201C] font-semibold text-sm transition-all shadow-md mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#23201C]/30 border-t-[#23201C] rounded-full animate-spin" />
                  <span>Signing in…</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Sign In to Admin</span>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#8E867C] mt-6">
          Not an administrator? &nbsp;
          <Link href="/" className="text-[#E0D9CD] hover:underline font-semibold">
            Go to Store →
          </Link>
        </p>
      </div>
    </div>
  );
}
