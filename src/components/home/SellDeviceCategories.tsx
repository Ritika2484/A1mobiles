'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Smartphone, Laptop, Tablet, Watch } from 'lucide-react';
import { SELL_DEVICE_CATEGORIES } from '@/data/valuation';

export function SellDeviceCategories() {
  const iconMap: Record<string, React.ElementType> = {
    phone: Smartphone,
    laptop: Laptop,
    tablet: Tablet,
    smartwatch: Watch
  };

  return (
    <section className="py-14 sm:py-18 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">
            Choose Category
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            What Device Do You Want to Sell?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Select your device type to check instant resale value with free doorstep collection.
          </p>
        </div>

        {/* 4 Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SELL_DEVICE_CATEGORIES.map((item) => {
            const Icon = iconMap[item.type] || Smartphone;
            return (
              <Link
                key={item.id}
                href={`/sell-device?category=${item.type}`}
                className="group bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Image container */}
                  <div className="relative w-full aspect-square bg-slate-50 rounded-xl overflow-hidden mb-4 border border-slate-100 flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-contain p-4 group-hover:scale-106 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold">
                      {item.tag}
                    </div>
                  </div>

                  {/* Header with Icon and Title */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer with Rate & Quote CTA */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:text-orange-700">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.quoteRate}
                  </span>
                  <div className="flex items-center gap-1">
                    <span>Get Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
