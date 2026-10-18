'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Store, ArrowRight } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export interface GalleryDevice {
  id: string;
  category: 'current' | 'new';
  brand: string;
  name: string;
  specs: string;
  price: number;
  originalPrice: number;
  image: string;
  slug: string;
}

export function HeroSection() {
  const [galleryItems, setGalleryItems] = useState<GalleryDevice[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch real inventory strictly from MongoDB & Cloudinary
  useEffect(() => {
    async function loadHeroProducts() {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        if (!res.ok) return;
        const data = await res.json();
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          const items: GalleryDevice[] = data.products.map((p: any, idx: number) => ({
            id: p.id,
            category: idx % 2 === 0 ? 'current' : 'new',
            brand: p.brand || 'A1 Exclusive',
            name: p.name,
            specs: p.description ? p.description.split('\n')[0].slice(0, 38) : 'Verified Gorakhpur Inventory',
            price: p.price,
            originalPrice: p.originalPrice || p.price,
            image: p.imageUrl || '/images/hero-phone.jpg',
            slug: p.slug,
          }));
          setGalleryItems(items);
        }
      } catch (err) {
        console.error('Failed to load hero devices from DB:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHeroProducts();
  }, []);

  const totalItems = galleryItems.length;
  const activeDevice = totalItems > 0 ? galleryItems[activeIndex % totalItems] : null;
  const activeCategory = activeDevice ? activeDevice.category : 'current';

  // Auto-transition every 2000ms (2 seconds)
  const nextSlide = useCallback(() => {
    if (totalItems <= 1) return;
    setActiveIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    if (totalItems <= 1) return;
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  useEffect(() => {
    if (isPaused || totalItems <= 1) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 2000); // 2 second transition

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused, activeIndex, totalItems]);

  // Tab switcher logic
  const handleTabClick = (category: 'new' | 'current') => {
    const targetIdx = galleryItems.findIndex((item) => item.category === category);
    if (targetIdx !== -1) {
      setActiveIndex(targetIdx);
    }
  };

  return (
    <section className="bg-[#F5EFE6] text-[#23201C] pt-10 sm:pt-14 pb-14 sm:pb-20 border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Clean Editorial Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-medium tracking-tight text-[#23201C] leading-[1.12]">
              Upgrade your <br />
              mobile experience
            </h1>

            <p className="text-base sm:text-lg text-[#6E685F] max-w-lg leading-relaxed font-normal">
              Genuine flagship smartphones, verified pre-owned devices, and instant cash exchange at your doorstep in Gorakhpur.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/shop?category=smartphones"
                className="px-6 py-3.5 rounded-2xl bg-[#23201C] hover:bg-[#151311] text-white font-medium text-sm sm:text-base transition-colors shadow-xs"
              >
                Shop smartphones
              </Link>

              <Link
                href="/sell-device"
                className="px-6 py-3.5 rounded-2xl bg-transparent hover:bg-black/5 text-[#23201C] border border-[#D5CFCE] font-medium text-sm sm:text-base transition-colors"
              >
                Sell your old phone
              </Link>
            </div>

            {/* Quiet trust credentials */}
            <p className="text-xs sm:text-sm text-[#78726A] pt-3 leading-relaxed">
              100% genuine devices, instant doorstep buyback, Gorakhpur store
            </p>
          </div>

          {/* Right Column: Fixed Minimalist Luxury Gallery Card */}
          <div
            className="lg:col-span-6 relative flex justify-center lg:justify-end"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {activeDevice ? (
              <div className="relative w-full max-w-[500px] h-[460px] sm:h-[500px] rounded-[2rem] bg-[#EAE4D9] border border-[#E0D9CD] shadow-sm overflow-hidden flex flex-col justify-between">
                
                {/* Card Header: Tabs Capsule + Arrow Controls */}
                <div className="p-4 sm:p-5 flex items-center justify-between z-20">
                  {/* Mode Tabs */}
                  <div className="bg-[#F4F0E8] p-1 rounded-full flex items-center shadow-xs">
                    <button
                      type="button"
                      onClick={() => handleTabClick('new')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                        activeCategory === 'new'
                          ? 'bg-[#23201C] text-white shadow-xs'
                          : 'text-[#6E685F] hover:text-[#23201C]'
                      }`}
                    >
                      New arrivals
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTabClick('current')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                        activeCategory === 'current'
                          ? 'bg-[#23201C] text-white shadow-xs'
                          : 'text-[#6E685F] hover:text-[#23201C]'
                      }`}
                    >
                      Current arrivals
                    </button>
                  </div>

                  {/* Arrow Controls */}
                  {totalItems > 1 && (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={prevSlide}
                        className="w-8 h-8 rounded-full bg-[#F4F0E8] hover:bg-white text-[#23201C] flex items-center justify-center transition-colors shadow-xs"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={nextSlide}
                        className="w-8 h-8 rounded-full bg-[#F4F0E8] hover:bg-white text-[#23201C] flex items-center justify-center transition-colors shadow-xs"
                        aria-label="Next slide"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Main Product Showcase Image */}
                <Link
                  href={`/products/${activeDevice.slug}`}
                  className="relative flex-1 w-full flex items-center justify-center px-8 pt-2 pb-6 group"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeDevice.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src={activeDevice.image}
                        alt={activeDevice.name}
                        fill
                        priority
                        className="object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </motion.div>
                  </AnimatePresence>
                </Link>

                {/* Bottom Details Banner (Solid Slate-Taupe #564F46) */}
                <div className="bg-[#564F46] p-4 sm:p-5 text-white z-20">
                  <div className="flex items-end justify-between gap-4">
                    {/* Device Info */}
                    <div className="min-w-0">
                      <p className="text-[11px] text-white/70 font-medium tracking-wide">
                        {activeDevice.brand}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-tight truncate mt-0.5">
                        {activeDevice.name}
                      </h3>
                      <p className="text-xs text-white/70 font-normal mt-0.5 truncate">
                        {activeDevice.specs}
                      </p>
                    </div>

                    {/* Pricing Info */}
                    <div className="text-right shrink-0">
                      {activeDevice.originalPrice > activeDevice.price && (
                        <p className="text-xs text-white/60 line-through">
                          {formatINR(activeDevice.originalPrice)}
                        </p>
                      )}
                      <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {formatINR(activeDevice.price)}
                      </p>
                    </div>
                  </div>

                  {/* Dash / Pill Progress Indicators */}
                  {totalItems > 1 && (
                    <div className="flex items-center justify-center gap-1.5 pt-3">
                      {galleryItems.map((item, idx) => {
                        const isActive = idx === activeIndex;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setActiveIndex(idx)}
                            className={`h-1 rounded-full transition-all duration-300 ${
                              isActive
                                ? 'w-7 bg-white'
                                : 'w-3 bg-white/40 hover:bg-white/60'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="relative w-full max-w-[500px] h-[460px] sm:h-[500px] rounded-[2rem] bg-[#EAE4D9] border border-[#E0D9CD] p-8 flex flex-col justify-between text-left">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#23201C] text-[#F5EFE6] flex items-center justify-center mb-6">
                    <Store className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#564F46] block mb-1">
                    Gorakhpur Flagship Store
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#23201C] leading-snug">
                    A1 Mobile Shop Experience
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E685F] mt-2 leading-relaxed">
                    Explore our physical inventory at Basharatpur, Gorakhpur. 100% genuine sealed devices with brand warranty.
                  </p>
                </div>

                <div className="pt-6 border-t border-[#DED7CA]">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#23201C] text-[#F5EFE6] text-xs font-bold hover:bg-[#151311] transition-all"
                  >
                    <span>Browse Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
