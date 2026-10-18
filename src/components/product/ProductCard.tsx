'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, Eye, MessageCircle } from 'lucide-react';
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
  const [isOrderingWhatsApp, setIsOrderingWhatsApp] = useState(false);

  const handleWhatsAppOrder = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOrderingWhatsApp(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      const data = await res.json();
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank', 'noopener,noreferrer');
        return;
      }
    } catch (e) {
      console.warn('API enquiry failed, using direct WhatsApp fallback', e);
    } finally {
      setIsOrderingWhatsApp(false);
    }

    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918726942338';
    const text = encodeURIComponent(
      `Hello! I would like to order:\n\nProduct: ${product.name}\nPrice: ${formatINR(product.price)}\nQuantity: 1\nLink: https://a1mobileshop.in/products/${product.slug}\n\nPlease confirm availability!`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

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
    <div className="group relative bg-[#EAE4D9]/80 rounded-2xl border border-[#E0D9CD] hover:border-[#23201C] hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      {/* Badges / Discount */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {product.discount > 0 && (
          <span className="px-2.5 py-1 rounded-full bg-[#23201C] text-[#F5EFE6] text-[10px] font-bold tracking-wide shadow-xs">
            {product.discount}% OFF
          </span>
        )}
        {product.tag && (
          <span className="px-2.5 py-1 rounded-full bg-[#564F46] text-[#F5EFE6] text-[10px] font-medium tracking-wide">
            {product.tag}
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
          isWished
            ? 'bg-[#F5EFE6] text-rose-600 shadow-sm'
            : 'bg-[#F5EFE6]/90 backdrop-blur-sm text-[#6E685F] hover:text-rose-600 hover:bg-white shadow-xs'
        }`}
        aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart className={`w-4 h-4 ${isWished ? 'fill-rose-600 text-rose-600' : ''}`} />
      </button>

      {/* Product Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative w-full aspect-square bg-[#F5EFE6] flex items-center justify-center p-4 sm:p-6 overflow-hidden"
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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#23201C]/90 backdrop-blur-sm text-[#F5EFE6] text-xs font-medium shadow-md">
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
            <span className="font-bold uppercase tracking-wider text-[#564F46] text-[11px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-[#23201C]">
              <Star className="w-3.5 h-3.5 fill-[#564F46] text-[#564F46]" />
              <span className="font-bold text-xs">{product.rating}</span>
              <span className="text-[11px] text-[#6E685F]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-bold text-[#23201C] text-sm sm:text-base leading-snug group-hover:text-[#564F46] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Storage / Variant info */}
          <div className="text-[11px] sm:text-xs text-[#6E685F] mt-1 line-clamp-1">
            {product.storageOptions ? (
              <span>Storage: {product.storageOptions.join(' • ')}</span>
            ) : (
              <span>{product.colors.length} Color Options Available</span>
            )}
          </div>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-4 pt-3 border-t border-[#E0D9CD] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-[#23201C] tracking-tight">
                {formatINR(product.price)}
              </span>
            </div>
            {product.originalPrice > product.price && (
              <span className="text-[11px] line-through text-[#78726A] block -mt-0.5">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleWhatsAppOrder}
              disabled={isOrderingWhatsApp}
              className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#2E6B47] hover:bg-[#245437] text-white transition-all shadow-xs active:scale-95 shrink-0 disabled:opacity-50"
              title="Order on WhatsApp"
              aria-label={`Order ${product.name} on WhatsApp`}
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              onClick={handleQuickAdd}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] text-xs font-semibold transition-all duration-200 shadow-xs active:scale-95 shrink-0"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
