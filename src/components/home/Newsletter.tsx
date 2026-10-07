'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Thank you for subscribing! Check your inbox for exclusive Gorakhpur store offers.', 'success');
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-950 text-white relative overflow-hidden border-b border-slate-900">
      {/* Subtle warm orange ambient light */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block mb-1">
            Newsletter &amp; Alerts
          </span>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Stay Updated With A1
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
            Get new arrivals, exclusive deals and exchange offers directly on your phone.
          </p>

          {isSubscribed ? (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-sm font-semibold">
                You are all set! Welcome to the A1 Mobile Shop family.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="pt-4 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <div className="relative flex-1 w-full">
                <Mail className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-800 bg-slate-900 text-white text-sm placeholder-slate-500 focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all duration-200 shadow-md shadow-orange-500/25 group shrink-0"
              >
                <span>SUBSCRIBE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-slate-500 pt-2">
            We value your privacy. Unsubscribe anytime with a single click.
          </p>
        </div>
      </div>
    </section>
  );
}
