'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types';

function mapDbToProduct(p: any): Product {
  const img = p.imageUrl || '/images/hero-phone.jpg';
  return {
    id: p.id,
    slug: p.slug,
    brand: p.brand,
    name: p.name,
    category: p.category || 'smartphones',
    price: p.price,
    originalPrice: p.originalPrice || p.price,
    discount: p.discount || 0,
    rating: 4.8,
    reviewsCount: 16,
    image: img,
    images: [img],
    colors: [{ name: 'Default', hex: '#1e293b' }],
    description: p.description,
    specifications: {},
    features: [],
    whatsInTheBox: ['Device', 'Charging Cable', 'Manual'],
    featured: p.featured,
    inStock: p.inStock,
    tag: p.tag || undefined,
  };
}

export function FeaturedProducts() {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        if (!res.ok) return;
        const data = await res.json();
        if (data.products && Array.isArray(data.products)) {
          setPopularProducts(data.products.map(mapDbToProduct));
        }
      } catch (err) {
        console.error('Error fetching featured products from DB:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (!loading && popularProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-14 sm:py-16 bg-[#F5EFE6] border-b border-[#E0D9CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#23201C] tracking-tight">
              Featured Devices
            </h2>
            <p className="text-xs sm:text-sm text-[#6E685F] mt-1">
              Verified inventory in stock at our Gorakhpur store.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#23201C] hover:text-[#564F46] transition-colors group self-start sm:self-auto"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {loading ? (
            [1, 2, 3].map((n) => (
              <div key={n} className="bg-[#EAE4D9]/60 rounded-2xl p-5 border border-[#E0D9CD] animate-pulse space-y-4">
                <div className="w-full aspect-square bg-[#DED7CA] rounded-xl" />
                <div className="h-4 bg-[#DED7CA] rounded w-3/4" />
                <div className="h-4 bg-[#DED7CA] rounded w-1/2" />
              </div>
            ))
          ) : (
            popularProducts.slice(0, 6).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 3}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
