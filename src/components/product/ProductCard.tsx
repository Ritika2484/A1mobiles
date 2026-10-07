'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '@/types';
import { formatINR } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWished = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Badges / Discount */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {product.discount > 0 && (
          <span className="px-2.5 py-1 rounded-full bg-orange-500 text-white text-[11px] font-extrabold tracking-wide shadow-xs">
            {product.discount}% OFF
          </span>
        )}
        {product.tag && (
          <span className="px-2.5 py-1 rounded-full bg-slate-900/90 text-white text-[10px] font-bold tracking-wide backdrop-blur-xs">
            {product.tag}
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
          isWished
            ? 'bg-rose-50 text-rose-600 shadow-sm'
            : 'bg-white/90 backdrop-blur-sm text-slate-400 hover:text-rose-600 hover:bg-white shadow-xs'
        }`}
        aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart className={`w-4 h-4 ${isWished ? 'fill-rose-600 text-rose-600' : ''}`} />
      </button>

      {/* Product Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative w-full aspect-square bg-slate-50/60 flex items-center justify-center p-4 sm:p-6 overflow-hidden"
      >
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-2 group-hover:scale-106 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Quick view hover pill */}
        <div className="absolute inset-x-0 bottom-2.5 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-sm text-white text-xs font-medium shadow-md">
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold uppercase tracking-wider text-orange-600 text-[11px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-xs">{product.rating}</span>
              <span className="text-[11px] text-slate-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-orange-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Storage / Variant info */}
          <div className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-1">
            {product.storageOptions ? (
              <span>Storage: {product.storageOptions.join(' • ')}</span>
            ) : (
              <span>{product.colors.length} Color Options Available</span>
            )}
          </div>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {formatINR(product.price)}
              </span>
            </div>
            {product.originalPrice > product.price && (
              <span className="text-[11px] line-through text-slate-400 block -mt-0.5">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-orange-500 text-white text-xs font-bold transition-all duration-200 shadow-xs active:scale-95 shrink-0"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
