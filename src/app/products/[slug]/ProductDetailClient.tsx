'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  ShoppingBag,
  Zap,
  Check,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Package,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Product } from '@/types';
import { formatINR } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Active selections
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0] || product.image);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [selectedStorage, setSelectedStorage] = useState<string>(
    product.storageOptions && product.storageOptions.length > 0 ? product.storageOptions[0] : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'box' | 'delivery' | 'reviews'>('specs');
  const [openAccordion, setOpenAccordion] = useState<string | null>('specs');

  const isWished = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedStorage);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedStorage);
    router.push('/checkout');
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-400 mb-6 flex items-center flex-wrap gap-1.5">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-orange-600">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-orange-600 capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Section: Gallery + Purchase Config */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Product Gallery */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Display */}
              <div className="relative w-full aspect-square bg-slate-50/70 rounded-2xl border border-slate-200/80 p-8 flex items-center justify-center overflow-hidden group">
                {product.discount > 0 && (
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-black shadow-sm">
                    {product.discount}% OFF
                  </span>
                )}

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isWished
                      ? 'bg-rose-50 text-rose-600 shadow-sm'
                      : 'bg-white/80 backdrop-blur-sm text-slate-400 hover:text-rose-600 hover:bg-white shadow-xs'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-5 h-5 ${isWished ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>

                <div className="relative w-full h-full">
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    fill
                    priority
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Thumbnails Row */}
              {product.images && product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-20 rounded-xl bg-slate-50 border-2 overflow-hidden shrink-0 transition-all ${
                        selectedImage === img
                          ? 'border-orange-500 ring-2 ring-orange-200'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        fill
                        className="object-contain p-1.5"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Trust Highlights under gallery */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 block">100% Genuine</span>
                  <span className="text-[10px] text-slate-400">Brand Sealed</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Truck className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 block">Fast Dispatch</span>
                  <span className="text-[10px] text-slate-400">Gorakhpur Hub</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <RotateCcw className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 block">Easy Returns</span>
                  <span className="text-[10px] text-slate-400">7 Days Policy</span>
                </div>
              </div>
            </div>

            {/* Right: Product Information & Configuration */}
            <div className="lg:col-span-6 space-y-6">
              {/* Brand, Title, Rating */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wider">
                    {product.brand}
                  </span>
                  {product.inStock ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      In Stock
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-semibold">
                      Out of Stock
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-slate-900">{product.rating}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Based on <strong className="font-semibold text-slate-700">{product.reviewsCount}</strong> verified reviews
                  </span>
                </div>
              </div>

              {/* Price & EMI */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-base line-through text-slate-400">
                        {formatINR(product.originalPrice)}
                      </span>
                      <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
                        Save {formatINR(product.originalPrice - product.price)}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
                  <CreditCard className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>
                    No Cost EMI available starting from <strong>{formatINR(Math.round(product.price / 12))}/month</strong>
                  </span>
                </div>
              </div>

              {/* Description Snippet */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2.5">
                    <span>Selected Color: <strong className="text-orange-600 font-extrabold">{selectedColor}</strong></span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                          selectedColor === color.name
                            ? 'border-orange-500 bg-orange-50/50 shadow-xs ring-1 ring-orange-300'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                        {selectedColor === color.name && (
                          <Check className="w-3 h-3 text-orange-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage Selection */}
              {product.storageOptions && product.storageOptions.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2.5">
                    <span>Select Storage Variant:</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.storageOptions.map((st) => (
                      <button
                        key={st}
                        onClick={() => setSelectedStorage(st)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          selectedStorage === st
                            ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & CTAs */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-800">Quantity:</span>
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 text-xs font-bold text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-slate-400">Total: {formatINR(product.price * quantity)}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold text-sm transition-all shadow-xs group"
                  >
                    <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>ADD TO CART</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/25 hover:-translate-y-0.5 group"
                  >
                    <Zap className="w-4 h-4" />
                    <span>BUY NOW</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections: Tabs for Desktop / Accordions for Mobile */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-16">
          {/* Desktop Tabs Header */}
          <div className="hidden md:flex border-b border-slate-200 bg-slate-50/60 px-6">
            {[
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'features', label: 'Key Features' },
              { id: 'box', label: "What's in the Box" },
              { id: 'delivery', label: 'Delivery & Warranty' },
              { id: 'reviews', label: `Reviews (${product.reviewsCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 text-xs lg:text-sm font-bold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Desktop Tab Contents */}
          <div className="hidden md:block p-8 lg:p-10">
            {activeTab === 'specs' && (
              <div className="max-w-4xl space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Complete Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
                      <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">{key}</span>
                      <span className="text-sm font-semibold text-slate-800 mt-1">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="max-w-4xl space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Product Highlights</h3>
                <div className="space-y-3">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <Sparkles className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 leading-relaxed font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'box' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Inside the Packaging</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.whatsInTheBox.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <Package className="w-5 h-5 text-orange-500 shrink-0" />
                      <span className="text-sm font-semibold text-slate-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-2">
                  <Truck className="w-6 h-6 text-orange-500 mb-2" />
                  <h4 className="font-bold text-slate-900 text-base">Express Delivery</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Orders placed before 2 PM are dispatched the same day from our Basharatpur, Gorakhpur store. Average delivery timeline across UP is 24-48 hours. Live tracking link is sent via WhatsApp and SMS upon shipment.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                  <Award className="w-6 h-6 text-emerald-600 mb-2" />
                  <h4 className="font-bold text-slate-900 text-base">Brand Warranty Support</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Includes 1-Year Official Manufacturer Warranty. Claim service directly at any authorized service center across India with the tax invoice provided with your purchase.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-4xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Customer Ratings &amp; Reviews</h3>
                    <p className="text-xs text-slate-500">Verified buyer testimonials</p>
                  </div>
                  <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="text-base font-bold text-slate-900">{product.rating}</span>
                    <span className="text-xs text-slate-500">/ 5</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: 'Vikram Joshi',
                      rating: 5,
                      date: '3 days ago',
                      title: 'Worth every rupee!',
                      comment: 'Phenomenal battery life and display quality. The camera in low light is mind blowing. Delivery from A1 Mobile Shop arrived in 2 days in secure tamper-evident packaging.',
                    },
                    {
                      name: 'Sneha Patel',
                      rating: 5,
                      date: '1 week ago',
                      title: 'Genuine Indian unit with official warranty registered',
                      comment: 'Was able to register warranty on official website instantly. Great customer service team answered all my questions on WhatsApp.',
                    },
                  ].map((rev, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{rev.name}</span>
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                            Verified
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <h5 className="font-bold text-xs text-slate-800">{rev.title}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Accordions */}
          <div className="md:hidden divide-y divide-slate-100">
            {/* Specs Accordion */}
            <div>
              <button
                onClick={() => toggleAccordion('specs')}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-slate-900"
              >
                <span>Specifications</span>
                {openAccordion === 'specs' ? <ChevronUp className="w-4 h-4 text-orange-600" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'specs' && (
                <div className="px-5 pb-5 space-y-2 text-xs">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="p-3 bg-slate-50 rounded-xl">
                      <strong className="block text-orange-600 font-bold uppercase">{key}</strong>
                      <span className="text-slate-800">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Features Accordion */}
            <div>
              <button
                onClick={() => toggleAccordion('features')}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-slate-900"
              >
                <span>Key Features</span>
                {openAccordion === 'features' ? <ChevronUp className="w-4 h-4 text-orange-600" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'features' && (
                <div className="px-5 pb-5 space-y-2 text-xs">
                  {product.features.map((f, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl text-slate-700">
                      {f}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* What's in the Box Accordion */}
            <div>
              <button
                onClick={() => toggleAccordion('box')}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-slate-900"
              >
                <span>What&apos;s in the Box</span>
                {openAccordion === 'box' ? <ChevronUp className="w-4 h-4 text-orange-600" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'box' && (
                <div className="px-5 pb-5 space-y-2 text-xs">
                  {product.whatsInTheBox.map((item, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl text-slate-800 font-medium">
                      • {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Delivery & Warranty Accordion */}
            <div>
              <button
                onClick={() => toggleAccordion('delivery')}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-slate-900"
              >
                <span>Delivery &amp; Warranty</span>
                {openAccordion === 'delivery' ? <ChevronUp className="w-4 h-4 text-orange-600" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'delivery' && (
                <div className="px-5 pb-5 space-y-3 text-xs text-slate-600">
                  <div className="p-3 bg-orange-50/70 rounded-xl">
                    <strong className="block text-orange-900 font-bold mb-1">Free Delivery</strong>
                    Orders dispatched same day from Gorakhpur.
                  </div>
                  <div className="p-3 bg-emerald-50/70 rounded-xl">
                    <strong className="block text-emerald-900 font-bold mb-1">1-Year Warranty</strong>
                    Valid at any authorized brand service center across India.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">
                  You Might Also Like
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Related Products
                </h2>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
