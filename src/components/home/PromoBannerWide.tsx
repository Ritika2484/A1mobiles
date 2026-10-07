'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export function PromoBannerWide() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-radial from-orange-500 via-orange-600 to-amber-700 text-white p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl">
          {/* Subtle background graphics */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-black/15 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LIMITED TIME MEGA SALE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Upgrade Today
              </h2>

              <p className="text-base sm:text-lg text-orange-50 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Get up to 40% OFF on selected smartphones &amp; accessories. Plus get flat ₹3,000 instant trade-in exchange bonus!
              </p>

              <div className="pt-2">
                <Link
                  href="/shop?deal=true"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-xl hover:-translate-y-0.5 group"
                >
                  <span>SHOP DEALS</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Product Visuals */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-64 sm:w-72 aspect-square">
                <Image
                  src="/images/deal-phone.jpg"
                  alt="Flagship Smartphone Deals"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
