'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/categories';

export function CategorySection() {
  return (
    <section className="py-14 sm:py-16 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 text-center md:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Our Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Everything you need for your connected lifestyle.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center md:justify-start gap-1.5 text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Cards Grid - 6 Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 flex flex-col justify-between hover:border-orange-400 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Image Container */}
                <div className="relative w-full aspect-square bg-slate-50 rounded-xl overflow-hidden mb-3 border border-slate-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-contain p-2 sm:p-3 group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[9px] font-bold text-slate-500 shadow-2xs">
                    {category.itemCount}+
                  </div>
                </div>

                {/* Category Info */}
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                  {category.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:text-orange-700">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
