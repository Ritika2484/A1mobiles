'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calculator, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export function SellDeviceHero() {
  return (
    <section className="py-14 sm:py-18 bg-[#EAE4D9] text-[#23201C] relative overflow-hidden border-b border-[#E0D9CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EFE6] border border-[#DED7CA] text-[#564F46] text-xs sm:text-sm font-bold tracking-wide uppercase">
              <Zap className="w-3.5 h-3.5 text-[#564F46]" />
              <span>INSTANT CASH • FREE DOORSTEP PICKUP</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-[#23201C]">
              Sell Your Old Phone. <br />
              <span className="text-[#564F46]">Get the Best Value.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#6E685F] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Turn your old smartphone into instant cash. Get a quick quote, schedule a free pickup and receive secure payment directly in your bank account or UPI.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/sell-device"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] font-bold text-sm sm:text-base transition-all duration-200 shadow-md group"
              >
                <span>SELL YOUR PHONE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Trust bullet badges */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#23201C] text-left">
              <div className="flex items-center gap-2 bg-[#F5EFE6] p-2.5 rounded-lg border border-[#E0D9CD]">
                <CheckCircle2 className="w-4 h-4 text-[#2E6B47] shrink-0" />
                <span>Guaranteed Best Price</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F5EFE6] p-2.5 rounded-lg border border-[#E0D9CD]">
                <ShieldCheck className="w-4 h-4 text-[#2E6B47] shrink-0" />
                <span>100% Safe Data Wipe</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F5EFE6] p-2.5 rounded-lg border border-[#E0D9CD]">
                <Zap className="w-4 h-4 text-[#564F46] shrink-0" />
                <span>Instant UPI Payment</span>
              </div>
            </div>
          </div>

          {/* Right Visual Container */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden border border-[#E0D9CD] shadow-lg bg-[#F5EFE6] group">
              <Image
                src="/images/tradein-exchange.jpg"
                alt="Sell Old Phone for Best Value"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#23201C]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-[#23201C]/90 backdrop-blur-md p-3 rounded-xl border border-[#3E3831]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#EAE4D9] block">Instant Doorstep Payout</span>
                  <span className="text-sm font-black text-white">Up to ₹95,000 for Flagships</span>
                </div>
                <Link
                  href="/sell-device"
                  className="bg-[#564F46] hover:bg-[#433D35] text-[#F5EFE6] text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
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
