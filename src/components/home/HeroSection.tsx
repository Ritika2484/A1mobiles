'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Star, Sparkles } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-14 lg:py-20 border-b border-slate-100">
      {/* Subtle warm ambient background glow */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-slate-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Hero Text & Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Small Orange Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs sm:text-sm font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>NEW ARRIVALS • BEST PRICES</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
              Upgrade Your <br className="hidden sm:inline" />
              <span className="text-orange-500">
                Mobile Experience
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover the latest smartphones, accessories and smart devices from trusted brands at the best prices.
            </p>

            {/* Dual CTAs: SHOP SMARTPHONES & SELL YOUR OLD PHONE */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/shop?category=smartphones"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-md shadow-orange-500/25 hover:-translate-y-0.5 group"
              >
                <span>SHOP SMARTPHONES</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/sell-device"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base border border-slate-900 transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
              >
                <span>SELL YOUR OLD PHONE</span>
              </Link>
            </div>

            {/* Trust Highlights under Hero */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Genuine Devices</span>
              </div>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-orange-500" />
                <span>Instant Doorstep Buyback</span>
              </div>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-800">📍 Gorakhpur Store</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Featured Smartphone Mockup + Floating Product Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            {/* Visual Container */}
            <div className="relative w-full max-w-md lg:max-w-lg aspect-square flex items-center justify-center">
              {/* Soft background shape */}
              <div className="absolute inset-4 bg-radial from-orange-100/50 via-slate-100/40 to-transparent rounded-full -z-10" />

              {/* Main Smartphone Hero Visual with subtle float animation */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-4/5 h-4/5"
              >
                <Image
                  src="/images/hero-phone.jpg"
                  alt="iPhone 17 Pro Max Titanium Showcase"
                  fill
                  priority
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Floating Top Rating Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute top-2 right-2 sm:top-6 sm:right-6 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 shadow-lg flex items-center gap-3 z-10"
              >
                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                  <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                    <span>4.9 / 5 Rating</span>
                  </div>
                  <span className="text-[11px] text-slate-500">2,840+ Happy Customers</span>
                </div>
              </motion.div>

              {/* Floating Product Card as explicitly specified */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-3 left-2 sm:bottom-2 sm:left-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xl max-w-[260px] sm:max-w-[280px] z-20"
              >
                <span className="inline-block px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  Featured
                </span>

                <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                  iPhone 17 Pro Max
                </h3>

                <p className="text-xs text-slate-500 mt-0.5">
                  256GB • Titanium
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                  <span className="text-base font-extrabold text-orange-500">
                    {formatINR(139900)}
                  </span>

                  <Link
                    href="/products/iphone-17-pro-max"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-orange-500 transition-colors uppercase tracking-tight"
                  >
                    <span>VIEW PRODUCT</span>
                    <ArrowRight className="w-3 h-3 text-orange-500" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
