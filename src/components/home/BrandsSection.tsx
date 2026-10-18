'use client';

import React from 'react';
import Link from 'next/link';
import { brands } from '@/data/brands';
import { ArrowRight } from 'lucide-react';

export function BrandsSection() {
  return (
    <section id="brands" className="py-14 sm:py-18 bg-[#F5EFE6] border-b border-[#E0D9CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 text-center sm:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#23201C] tracking-tight">
              Shop by Brand
            </h2>
            <p className="text-xs sm:text-sm text-[#6E685F] mt-1">
              Authorized retailer for top global mobile brands with official warranty.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs sm:text-sm font-bold text-[#23201C] hover:text-[#564F46] transition-colors group"
          >
            <span>All Brands</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Minimal Black/Gray Brand Cards Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-3.5">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/shop?brand=${encodeURIComponent(brand.name)}`}
              className="group flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-[#EAE4D9]/80 border border-[#E0D9CD] hover:border-[#23201C] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#F5EFE6] flex items-center justify-center text-[#23201C] group-hover:bg-[#23201C] group-hover:text-[#F5EFE6] transition-colors mb-1.5 border border-[#E0D9CD]">
                <span className="font-extrabold text-sm sm:text-base tracking-tighter">
                  {brand.name === 'Apple' ? '🍎' : brand.name.substring(0, 2).toUpperCase()}
                </span>
              </div>

              <h3 className="font-bold text-xs sm:text-sm text-[#23201C] group-hover:text-[#564F46] transition-colors">
                {brand.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
