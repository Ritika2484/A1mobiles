'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export function PromoBannerWide() {
  return (
    <section className="py-12 sm:py-16 bg-[#F5EFE6] border-b border-[#E0D9CD] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#23201C] text-[#F5EFE6] p-8 sm:p-12 lg:p-14 overflow-hidden shadow-xl border border-[#38332E]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#38332E] text-[#EAE4D9] border border-[#48423A] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#EAE4D9]" />
                <span>LIMITED TIME MEGA SALE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-[#F5EFE6]">
                Upgrade Today
              </h2>

              <p className="text-base sm:text-lg text-[#C8BFB4] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Get up to 40% OFF on selected smartphones &amp; accessories. Plus get flat ₹3,000 instant trade-in exchange bonus!
              </p>

              <div className="pt-2">
                <Link
                  href="/shop?deal=true"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#EAE4D9] hover:bg-white text-[#23201C] font-bold text-sm sm:text-base transition-all duration-200 shadow-md hover:-translate-y-0.5 group"
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
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
