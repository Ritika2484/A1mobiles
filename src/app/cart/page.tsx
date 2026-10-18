'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Heart,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  RotateCcw
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatINR } from '@/lib/utils';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    subtotal,
    discount,
    shipping,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    amountNeededForFreeShipping,
  } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  const progressPercentage = Math.min(
    100,
    Math.round(((freeShippingThreshold - amountNeededForFreeShipping) / freeShippingThreshold) * 100)
  );

  return (
    <div className="bg-[#F5EFE6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <nav className="text-xs text-[#6E685F] mb-2">
            <Link href="/" className="hover:text-[#23201C]">Home</Link>
            <span className="mx-1.5">/</span>
            <span className="text-[#23201C] font-semibold">Shopping Cart</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#23201C] tracking-tight">
                Shopping Cart
              </h1>
              <p className="text-sm text-[#6E685F] mt-1">
                You have {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 self-start sm:self-auto hover:underline"
              >
                Clear All Items
              </button>
            )}
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="bg-[#EAE4D9]/80 rounded-3xl border border-[#E0D9CD] p-12 sm:p-16 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-20 h-20 rounded-full bg-[#F5EFE6] border border-[#E0D9CD] flex items-center justify-center mx-auto text-[#23201C] mb-5">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-[#23201C] tracking-tight">
              Your Cart is Empty
            </h2>
            <p className="text-sm text-[#6E685F] mt-2 max-w-sm mx-auto">
              Looks like you haven&apos;t added any devices to your cart yet. Discover smartphones, audio, and accessories at unbeatable prices.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] font-bold text-sm transition-all shadow-sm"
            >
              <span>EXPLORE PRODUCTS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Delivery Banner */}
              <div className="bg-[#EAE4D9]/80 p-5 rounded-2xl border border-[#E0D9CD] shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-[#23201C]">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#23201C]" />
                    {amountNeededForFreeShipping > 0 ? (
                      <span>
                        Add <strong className="font-bold text-[#23201C]">{formatINR(amountNeededForFreeShipping)}</strong> more to get <strong>FREE Delivery</strong>
                      </span>
                    ) : (
                      <span className="text-[#2E6B47] font-bold">
                        🎉 Great news! You have unlocked FREE Express Delivery!
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-[#6E685F]">{progressPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-[#DED7CA] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      amountNeededForFreeShipping === 0 ? 'bg-[#2E6B47]' : 'bg-[#23201C]'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-[#EAE4D9]/80 rounded-3xl border border-[#E0D9CD] shadow-sm divide-y divide-[#E0D9CD] overflow-hidden">
                {cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedStorage}-${idx}`}
                    className="p-6 flex flex-col sm:flex-row gap-5"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#F5EFE6] border border-[#E0D9CD] p-2 shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#564F46]">
                              {item.product.brand}
                            </span>
                            <Link href={`/products/${item.product.slug}`} className="block">
                              <h3 className="font-bold text-[#23201C] text-base sm:text-lg hover:text-[#564F46] transition-colors">
                                {item.product.name}
                              </h3>
                            </Link>
                          </div>

                          <div className="text-right">
                            <span className="text-base sm:text-lg font-black text-[#23201C] block">
                              {formatINR(item.product.price * item.quantity)}
                            </span>
                            {item.quantity > 1 && (
                              <span className="text-[11px] text-[#8E867C]">
                                {formatINR(item.product.price)} each
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Selected Variants */}
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {item.selectedStorage && (
                            <span className="text-xs px-2.5 py-0.5 rounded-lg bg-[#F5EFE6] text-[#23201C] border border-[#E0D9CD] font-medium">
                              {item.selectedStorage}
                            </span>
                          )}
                          {item.selectedColor && (
                            <span className="text-xs px-2.5 py-0.5 rounded-lg bg-[#F5EFE6] text-[#23201C] border border-[#E0D9CD] font-medium">
                              Color: {item.selectedColor}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Controls Row */}
                      <div className="flex items-center justify-between gap-4 mt-4 pt-3 border-t border-[#E0D9CD]">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#DED7CA] rounded-xl overflow-hidden bg-[#F5EFE6]">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedColor,
                                item.selectedStorage
                              )
                            }
                            className="px-3 py-1.5 text-[#23201C] hover:bg-[#EAE4D9] transition-colors font-bold text-sm"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-[#23201C]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedColor,
                                item.selectedStorage
                              )
                            }
                            className="px-3 py-1.5 text-[#23201C] hover:bg-[#EAE4D9] transition-colors font-bold text-sm"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Action buttons: Wishlist & Remove */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleWishlist(item.product)}
                            className="inline-flex items-center gap-1.5 text-xs text-[#6E685F] hover:text-rose-600 font-medium transition-colors"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                isInWishlist(item.product.id) ? 'fill-rose-600 text-rose-600' : ''
                              }`}
                            />
                            <span className="hidden sm:inline">Save for Later</span>
                          </button>

                          <span className="text-[#DED7CA]">•</span>

                          <button
                            onClick={() =>
                              removeFromCart(
                                item.product.id,
                                item.selectedColor,
                                item.selectedStorage
                              )
                            }
                            className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#EAE4D9]/80 border border-[#E0D9CD]">
                  <ShieldCheck className="w-5 h-5 text-[#23201C] shrink-0" />
                  <span className="text-xs font-semibold text-[#23201C]">
                    100% Brand Sealed &amp; Covered Under Official Warranty
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#EAE4D9]/80 border border-[#E0D9CD]">
                  <RotateCcw className="w-5 h-5 text-[#2E6B47] shrink-0" />
                  <span className="text-xs font-semibold text-[#23201C]">
                    7-Day Replacement Guarantee on Defective Devices
                  </span>
                </div>
              </div>
            </div>

            {/* Order Summary Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#EAE4D9]/80 rounded-3xl border border-[#E0D9CD] p-6 sm:p-7 shadow-sm space-y-6">
                <h2 className="text-xl font-black text-[#23201C] tracking-tight pb-4 border-b border-[#E0D9CD]">
                  Order Summary
                </h2>

                {/* Coupon Input */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#23201C] block mb-2">
                    Have a Promo Code?
                  </span>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#E6EFE9] border border-[#2E6B47]/30 text-xs">
                      <div className="flex items-center gap-2 text-[#2E6B47] font-bold">
                        <Tag className="w-4 h-4 text-[#2E6B47]" />
                        <span>Code &apos;{appliedCoupon}&apos; Applied!</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-rose-600 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. A1SPECIAL"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#DED7CA] bg-[#F5EFE6] text-xs font-semibold uppercase placeholder-[#8E867C] focus:outline-hidden focus:border-[#23201C] text-[#23201C]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-[#23201C] text-[#F5EFE6] text-xs font-bold hover:bg-[#151311] transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  <span className="text-[11px] text-[#6E685F] mt-1.5 block">
                    Try <strong>A1SPECIAL</strong> for up to ₹2,000 off or <strong>WELCOME10</strong>
                  </span>
                </div>

                {/* Summary Lines */}
                <div className="space-y-3 pt-4 border-t border-[#E0D9CD] text-sm">
                  <div className="flex justify-between text-[#6E685F]">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#23201C]">{formatINR(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[#2E6B47] font-medium">
                      <span>Promo Discount</span>
                      <span>-{formatINR(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#6E685F]">
                    <span>Shipping Charges</span>
                    <span>
                      {shipping === 0 ? (
                        <strong className="text-[#2E6B47] font-bold">FREE</strong>
                      ) : (
                        formatINR(shipping)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#6E685F]">
                    <span>Estimated Tax (GST included)</span>
                    <span className="text-xs text-[#8E867C]">Included in price</span>
                  </div>

                  <div className="flex justify-between text-lg font-black text-[#23201C] pt-4 border-t border-[#DED7CA]">
                    <span>Grand Total</span>
                    <span className="text-[#23201C]">{formatINR(total)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] font-bold text-sm transition-all shadow-sm group"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-xs text-[#6E685F] pt-2">
                  <ShieldCheck className="w-4 h-4 text-[#2E6B47]" />
                  <span>Safe &amp; Secure 256-bit Encrypted Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
