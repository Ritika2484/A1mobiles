'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';

export default function WishlistPage() {
  const { wishlist, wishlistCount } = useWishlist();

  return (
    <div className="bg-[#F5EFE6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="text-xs text-[#8E867C] mb-2">
            <Link href="/" className="hover:text-[#23201C] transition-colors">Home</Link>
            <span className="mx-1.5">/</span>
            <span className="text-[#23201C] font-medium">My Wishlist</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-medium text-[#23201C] tracking-tight">
                My Wishlist
              </h1>
              <p className="text-sm text-[#6E685F] mt-1">
                You have {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-semibold text-[#23201C] hover:text-[#564F46] flex items-center gap-1 transition-colors"
            >
              <span>Explore More</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-[#EAE4D9]/80 rounded-3xl border border-[#E0D9CD] p-12 sm:p-16 text-center max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-[#F4F0E8] border border-[#DED7CA] flex items-center justify-center mx-auto text-[#6E685F] mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-medium text-[#23201C] tracking-tight">
              Your Wishlist is Empty
            </h2>
            <p className="text-sm text-[#6E685F] mt-2">
              Save your favorite smartphones, earbuds, and gadgets here so you can easily review and buy them later.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] font-medium text-xs transition-colors"
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
