'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calculator, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export function SellDeviceHero() {
  return (
    <section className="py-14 sm:py-18 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Warm ambient orange highlight glow */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-bold tracking-wide uppercase">
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              <span>INSTANT CASH • FREE DOORSTEP PICKUP</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
              Sell Your Old Phone. <br />
              <span className="text-orange-500">Get the Best Value.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Turn your old smartphone into instant cash. Get a quick quote, schedule a free pickup and receive secure payment directly in your bank account or UPI.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/sell-device"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 group"
              >
                <span>SELL YOUR PHONE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#device-valuation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-white font-bold text-sm sm:text-base border border-slate-700 hover:border-orange-500/50 transition-all duration-200 shadow-xs"
              >
                <Calculator className="w-4 h-4 text-orange-400" />
                <span>CHECK PRICE</span>
              </a>
            </div>

            {/* Trust bullet badges */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 text-left">
              <div className="flex items-center gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Guaranteed Best Price</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Safe Data Wipe</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                <Zap className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Instant UPI Payment</span>
              </div>
            </div>
          </div>

          {/* Right Visual Container */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 group">
              <Image
                src="/images/tradein-exchange.jpg"
                alt="Sell Old Phone for Best Value"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700/80">
                <div>
                  <span className="text-[10px] uppercase font-bold text-orange-400 block">Instant Doorstep Payout</span>
                  <span className="text-sm font-black text-white">Up to ₹95,000 for Flagships</span>
                </div>
                <Link
                  href="/sell-device"
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  Sell Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
