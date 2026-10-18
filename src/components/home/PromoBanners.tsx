import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Tag, Zap, RefreshCw } from 'lucide-react';

export function PromoBanners() {
  return (
    <section className="py-14 bg-[#F5EFE6] border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Big Savings on Top Brands */}
          <div className="relative overflow-hidden rounded-2xl bg-[#EAE4D9]/80 border border-[#E0D9CD] p-6 sm:p-7 flex flex-col justify-between hover:border-[#23201C]/50 transition-all duration-300 group">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-[#F4F0E8] border border-[#DED7CA] text-[#23201C] flex items-center justify-center mb-4">
                <Tag className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E685F]">
                Special Collection
              </span>
              <h3 className="text-xl sm:text-2xl font-medium text-[#23201C] tracking-tight mt-1 leading-snug">
                Big Savings on <br />Top Brands
              </h3>
              <p className="text-xs sm:text-sm text-[#6E685F] mt-2 max-w-xs">
                Shop smartphones from your favorite brands. Official warranty guaranteed.
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-[#DED7CA]">
              <Link
                href="/shop?deal=true"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#23201C] group-hover:text-[#564F46] transition-colors"
              >
                <span>EXPLORE OFFERS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

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
          <div className="relative overflow-hidden rounded-2xl bg-[#23201C] text-[#F5EFE6] border border-[#38332E] p-6 sm:p-7 flex flex-col justify-between hover:border-[#564F46] transition-all duration-300 group">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-[#38332E] text-[#F5EFE6] flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#EAE4D9]/70">
                Limited Stock
              </span>
              <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight mt-1 leading-snug">
                Up to 40% Off <br />Accessories
              </h3>
              <p className="text-xs sm:text-sm text-[#EAE4D9]/80 mt-2 max-w-xs">
                Chargers, cases, earbuds &amp; more. Fast charging guaranteed.
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-[#38332E]">
              <Link
                href="/shop?category=accessories"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F5EFE6] group-hover:text-white transition-colors"
              >
                <span>SHOP ACCESSORIES</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none">
              <Image
                src="/images/accessories.jpg"
                alt="Accessories promo background"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Card 3: Trade-In & Save More */}
          <div className="relative overflow-hidden rounded-2xl bg-[#564F46] text-[#F5EFE6] border border-[#48423A] p-6 sm:p-7 flex flex-col justify-between hover:border-[#6E685F] transition-all duration-300 group">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-[#48423A] text-[#F5EFE6] flex items-center justify-center mb-4">
                <RefreshCw className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E0D9CD]">
                Exchange Bonus
              </span>
              <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight mt-1 leading-snug">
                Trade-In &amp; <br />Save More
              </h3>
              <p className="text-xs sm:text-sm text-[#EAE4D9]/80 mt-2 max-w-xs">
                Upgrade your old phone and get better value with instant doorstep evaluation.
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-[#48423A]">
              <Link
                href="/sell-device"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F5EFE6] group-hover:text-white transition-colors"
              >
                <span>CHECK EXCHANGE VALUE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none">
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

export default PromoBanners;
