'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export function FeaturedProducts() {
  // Exact 6 popular smartphones as requested
  const popularSlugs = [
    'iphone-17-pro-max',
    'samsung-galaxy-s26-ultra',
    'google-pixel-10-pro',
    'oneplus-13',
    'xiaomi-15-ultra',
    'nothing-phone-3'
  ];

  const popularSmartphones = popularSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Smartphones
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Discover the latest devices from the world&apos;s leading brands.
            </p>
          </div>

          <Link
            href="/shop?category=smartphones"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors group self-start sm:self-auto"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Responsive Product Grid: 2 columns mobile, 3 columns desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {popularSmartphones.map((product, index) => (
            <ProductCard
              key={product!.id}
              product={product!}
              priority={index < 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
