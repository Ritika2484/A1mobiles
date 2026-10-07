'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';

export default function WishlistPage() {
  const { wishlist, wishlistCount } = useWishlist();

  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-800 font-semibold">My Wishlist</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                My Wishlist
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                You have {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-bold text-orange-600 hover:underline flex items-center gap-1"
            >
              <span>Explore More</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 sm:p-16 text-center max-w-md mx-auto shadow-sm">
            <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-500 mb-4">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Your Wishlist is Empty
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Save your favorite smartphones, earbuds, and gadgets here so you can easily review and buy them later.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20"
            >
              <span>DISCOVER DEALS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
