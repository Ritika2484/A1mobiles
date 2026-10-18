'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/categories';

export function CategorySection() {
  return (
    <section className="py-14 sm:py-16 bg-[#F5EFE6] border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#23201C] tracking-tight">
              Explore Our Categories
            </h2>
            <p className="text-xs sm:text-sm text-[#6E685F] mt-1 font-normal">
              Everything you need for your connected lifestyle.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#23201C] hover:text-[#564F46] transition-colors group"
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
              className="group bg-[#EAE4D9]/80 rounded-2xl border border-[#E0D9CD] p-3.5 sm:p-4 flex flex-col justify-between hover:border-[#23201C]/50 hover:bg-[#EAE4D9] transition-all duration-300"
            >
              <div>
                {/* Image Container */}
                <div className="relative w-full aspect-square bg-[#F4F0E8] rounded-xl overflow-hidden mb-3 border border-[#E0D9CD]/80">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-contain p-2 sm:p-3 group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Category Info */}
                <h3 className="text-sm font-semibold text-[#23201C] group-hover:text-[#564F46] transition-colors line-clamp-1">
                  {category.name}
                </h3>
                <p className="text-[11px] text-[#6E685F] mt-0.5 line-clamp-2 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="mt-3 pt-2.5 border-t border-[#DED7CA] flex items-center justify-between text-xs font-semibold text-[#23201C] group-hover:text-[#564F46]">
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

export default CategorySection;
