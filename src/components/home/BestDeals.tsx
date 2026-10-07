'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export function BestDeals() {
  const dealSlugs = [
    'iphone-15',
    'samsung-galaxy-s25',
    'google-pixel-9',
    'oneplus-nord-4'
  ];

  const dealProducts = dealSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <section className="py-14 sm:py-18 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-orange-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span>Special Price Drop</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Best Deals
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Limited-time offers on top smartphones.
            </p>
          </div>

          <Link
            href="/shop?deal=true"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors group self-start sm:self-auto"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {dealProducts.map((product) => (
            <ProductCard
              key={product!.id}
              product={product!}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
