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
    <section className="py-16 sm:py-20 bg-[#23201C] text-[#F5EFE6] relative overflow-hidden border-b border-[#38332E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C8BFB4] block mb-1">
            Newsletter &amp; Alerts
          </span>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F5EFE6]">
            Stay Updated With A1
          </h2>

          <p className="text-sm sm:text-base text-[#D4CCC0] max-w-lg mx-auto leading-relaxed">
            Get new arrivals, exclusive deals and exchange offers directly on your phone.
          </p>

          {isSubscribed ? (
            <div className="mt-6 p-4 rounded-2xl bg-[#1E2E23] border border-[#2E6B47]/40 text-[#A8D4B8] flex items-center justify-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#4CAF79] shrink-0" />
              <span className="text-sm font-semibold">
                You are all set! Welcome to the A1 Mobile Shop family.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="pt-4 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <div className="relative flex-1 w-full">
                <Mail className="w-5 h-5 text-[#8E867C] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#3E3831] bg-[#2E2A25] text-[#F5EFE6] text-sm placeholder-[#8E867C] focus:outline-hidden focus:border-[#EAE4D9]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#EAE4D9] hover:bg-white text-[#23201C] font-bold text-sm transition-all duration-200 group shrink-0 shadow-sm"
              >
                <span>SUBSCRIBE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#8E867C] pt-2">
            We value your privacy. Unsubscribe anytime with a single click.
          </p>
        </div>
      </div>
    </section>
  );
}
