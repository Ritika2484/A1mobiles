'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, ArrowRight } from 'lucide-react';
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

export function BestDeals() {
  const [dealProducts, setDealProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadDeals() {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        if (!res.ok) return;
        const data = await res.json();
        if (data.products && Array.isArray(data.products)) {
          const mapped: Product[] = data.products.map(mapDbToProduct);
          // Filter for products that have a discount or deal tag
          const withDeals = mapped.filter((p) => (p.discount && p.discount > 0) || p.tag?.toLowerCase().includes('deal'));
          setDealProducts(withDeals.length > 0 ? withDeals : mapped.slice(0, 4));
        }
      } catch (err) {
        console.error('Error fetching best deals from DB:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDeals();
  }, []);

  if (!loading && dealProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-14 sm:py-18 bg-[#F5EFE6] border-b border-[#E0D9CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-[#564F46] text-xs font-bold uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 text-[#564F46]" />
              <span>Special Price Drop</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#23201C] tracking-tight">
              Best Deals
            </h2>
            <p className="text-xs sm:text-sm text-[#6E685F] mt-1">
              Limited-time offers on top devices in Gorakhpur.
            </p>
          </div>

          <Link
            href="/shop?deal=true"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#23201C] hover:text-[#564F46] transition-colors group self-start sm:self-auto"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {dealProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
