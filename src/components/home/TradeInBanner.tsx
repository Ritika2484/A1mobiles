'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, RefreshCw, Zap, ShieldCheck } from 'lucide-react';

export function TradeInBanner() {
  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-10 lg:p-12 text-white relative overflow-hidden shadow-xl border border-slate-800">
          {/* Ambient orange glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Smart Exchange Program</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
                Upgrade Your Phone <br />
                <span className="text-orange-500">&amp; Save More</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Exchange your old device and get additional value toward your next smartphone. Hand over your old phone at your doorstep and pay only the difference!
              </p>

              {/* Old Phone + New Phone equation indicator */}
              <div className="py-2 flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm font-extrabold">
                <div className="bg-slate-800/90 border border-slate-700 px-3.5 py-2 rounded-xl text-slate-300">
                  Old Phone
                </div>
                <span className="text-orange-500 text-xl font-black">+</span>
                <div className="bg-orange-500/20 border border-orange-500/40 text-orange-400 px-3.5 py-2 rounded-xl">
                  Extra ₹3,000 Bonus
                </div>
                <span className="text-orange-500 text-xl font-black">=</span>
                <div className="bg-white text-slate-950 px-3.5 py-2 rounded-xl shadow-xs">
                  New Phone
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href="/sell-device"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-md shadow-orange-500/30 hover:-translate-y-0.5 group"
                >
                  <span>START EXCHANGE</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Split Visual */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-16/10 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
                <Image
                  src="/images/tradein-exchange.jpg"
                  alt="Old Phone to New Phone Trade In Exchange"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-bold text-slate-300 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-700/60">
                  <span className="flex items-center gap-1.5 text-orange-400">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Instant Doorstep Verification</span>
                  </span>
                  <span className="text-white">Seamless Data Transfer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
