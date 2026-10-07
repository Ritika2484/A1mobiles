import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Tag, Zap, RefreshCw } from 'lucide-react';

export function PromoBanners() {
  return (
    <section className="py-14 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Big Savings on Top Brands */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50/90 via-indigo-50/40 to-white border border-indigo-100/80 p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-300 transition-all duration-300 group">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-700 flex items-center justify-center mb-4">
                <Tag className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                Special Collection
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 leading-snug">
                Big Savings on <br />Top Brands
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xs">
                Shop smartphones from your favorite brands. Official warranty guaranteed.
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-indigo-100/80">
              <Link
                href="/shop?deal=true"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 group-hover:text-indigo-900 transition-colors"
              >
                <span>EXPLORE OFFERS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Subtle background graphic */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none">
              <Image
                src="/images/hero-phone.jpg"
                alt="Smartphone promo background"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Card 2: Up to 40% Off Accessories */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white border border-slate-800 p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300 group">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-indigo-300 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                Limited Stock
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 leading-snug">
                Up to 40% Off <br />Accessories
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xs">
                Chargers, cases, earbuds &amp; more. Fast charging guaranteed.
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-slate-800">
              <Link
                href="/shop?category=accessories"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 group-hover:text-white transition-colors"
              >
                <span>SHOP ACCESSORIES</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Subtle background graphic */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-25 group-hover:opacity-35 transition-opacity pointer-events-none">
              <Image
                src="/images/accessories.jpg"
                alt="Accessories promo background"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Card 3: Trade-In & Save More */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50/90 via-purple-50/40 to-white border border-purple-100/80 p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:shadow-purple-500/5 hover:border-purple-300 transition-all duration-300 group">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-700 flex items-center justify-center mb-4">
                <RefreshCw className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">
                Exchange Bonus
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 leading-snug">
                Trade-In &amp; <br />Save More
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xs">
                Upgrade your old phone and get better value with instant doorstep evaluation.
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-purple-100/80">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 group-hover:text-purple-900 transition-colors"
              >
                <span>LEARN MORE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Subtle background graphic */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none">
              <Image
                src="/images/deal-phone.jpg"
                alt="Trade-in promo background"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
