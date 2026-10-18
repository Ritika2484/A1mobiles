'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, RefreshCw, Zap, ShieldCheck } from 'lucide-react';

export function TradeInBanner() {
  return (
    <section className="py-14 sm:py-18 bg-[#F5EFE6] border-b border-[#E0D9CD] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#564F46] rounded-3xl p-6 sm:p-10 lg:p-12 text-[#F5EFE6] relative overflow-hidden shadow-md border border-[#48423A]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#48423A] border border-[#645C52] text-[#EAE4D9] text-xs font-bold uppercase tracking-wider">
                <RefreshCw className="w-3.5 h-3.5 text-[#EAE4D9]" />
                <span>Smart Exchange Program</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-[#F5EFE6]">
                Upgrade Your Phone <br />
                <span className="text-[#EAE4D9]">&amp; Save More</span>
              </h2>

              <p className="text-sm sm:text-base text-[#D5CFCE] max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
                Exchange your old device and get additional value toward your next smartphone. Hand over your old phone at your doorstep and pay only the difference!
              </p>

              {/* Old Phone + New Phone equation indicator */}
              <div className="py-2 flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm font-extrabold">
                <div className="bg-[#48423A] border border-[#645C52] px-3.5 py-2 rounded-xl text-[#EAE4D9]">
                  Old Phone
                </div>
                <span className="text-[#EAE4D9] text-xl font-black">+</span>
                <div className="bg-[#23201C] border border-[#3E3831] text-[#F5EFE6] px-3.5 py-2 rounded-xl shadow-xs">
                  Extra ₹3,000 Bonus
                </div>
                <span className="text-[#EAE4D9] text-xl font-black">=</span>
                <div className="bg-[#F5EFE6] text-[#23201C] px-3.5 py-2 rounded-xl shadow-xs">
                  New Phone
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href="/sell-device"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] font-bold text-sm sm:text-base transition-all duration-200 shadow-md hover:-translate-y-0.5 group"
                >
                  <span>START EXCHANGE</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Split Visual */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-16/10 rounded-2xl overflow-hidden border border-[#48423A] shadow-lg bg-[#23201C]">
                <Image
                  src="/images/tradein-exchange.jpg"
                  alt="Old Phone to New Phone Trade In Exchange"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#23201C]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-bold text-[#EAE4D9] bg-[#23201C]/90 backdrop-blur-md p-2.5 rounded-xl border border-[#3E3831]">
                  <span className="flex items-center gap-1.5 text-[#EAE4D9]">
                    <Zap className="w-3.5 h-3.5 text-[#EAE4D9]" />
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
