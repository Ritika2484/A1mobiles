'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Clock, Navigation, ExternalLink, ShieldCheck } from 'lucide-react';

export function StoreLocationSection() {
  const storeAddress = 'Basharatpur, Gorakhpur, Uttar Pradesh – 273004';
  const storePhone = '+91 98765 43210';
  const openingHours = 'Monday – Sunday: 10:00 AM – 09:30 PM';

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">
            Physical Experience Store
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Visit A1 Mobile Shop
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Experience the latest flagship smartphones hands-on, test accessories, or get your old phone inspected instantly for highest cash value.
          </p>
        </div>

        {/* Store Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/80 rounded-3xl border border-slate-200 p-5 sm:p-8 lg:p-10 shadow-sm">
          {/* Store Image Container */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden shadow-lg border border-slate-200 group">
              <Image
                src="/images/store.jpg"
                alt="A1 Mobile Shop Basharatpur Gorakhpur Experience Store"
                fill
                className="object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open Today until 9:30 PM</span>
              </div>
            </div>
          </div>

          {/* Store Details & Maps Info */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wide text-orange-600">
                Flagship Store
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                A1 MOBILE SHOP
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your Trusted Mobile Destination in Eastern UP
              </p>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              {/* Address */}
              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Address</span>
                  <p className="font-semibold text-slate-900 mt-0.5 leading-snug">
                    {storeAddress}
                  </p>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Near Main Market, Gorakhpur</span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone Support</span>
                  <a href={`tel:${storePhone}`} className="font-bold text-slate-900 hover:text-orange-600 transition-colors mt-0.5 block">
                    {storePhone}
                  </a>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Instant WhatsApp assistance available</span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Opening Hours</span>
                  <p className="font-semibold text-slate-900 mt-0.5 leading-snug">
                    {openingHours}
                  </p>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">All 7 days open</span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent('Basharatpur, Gorakhpur, Uttar Pradesh')}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-orange-500/25"
              >
                <Navigation className="w-4 h-4" />
                <span>GET DIRECTIONS →</span>
              </a>

              <a
                href={`tel:${storePhone}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                <span>CALL STORE →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
