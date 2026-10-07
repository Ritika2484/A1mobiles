'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Smartphone,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  MessageCircle
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info (2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white border border-slate-700 shadow-md shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="A1 Mobile Shop Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 leading-none">
                  <span className="font-extrabold text-lg tracking-tight text-white">
                    A1
                  </span>
                  <span className="font-extrabold text-lg tracking-tight text-orange-500">
                    MOBILE
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-slate-400 leading-tight">
                  SHOP
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Your trusted destination for smartphones, accessories and smart upgrades.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Basharatpur, Gorakhpur, Uttar Pradesh – 273004</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="mailto:support@a1mobileshop.in" className="hover:text-white transition-colors">
                  support@a1mobileshop.in
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center flex-wrap gap-2.5 pt-2">
              <a
                href="https://instagram.com/a1mobileshop26"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-orange-500/30 text-orange-400 hover:text-white hover:bg-orange-500 transition-all text-xs font-semibold"
                aria-label="Instagram @a1mobileshop26"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>@a1mobileshop26</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-orange-500 transition-all"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-orange-500 transition-all"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Column 1: SHOP */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-3">
              SHOP
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/shop?category=smartphones" className="hover:text-orange-400 transition-colors">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="hover:text-orange-400 transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop?category=smartwatches" className="hover:text-orange-400 transition-colors">
                  Smartwatches
                </Link>
              </li>
              <li>
                <Link href="/shop?category=tablets" className="hover:text-orange-400 transition-colors">
                  Tablets
                </Link>
              </li>
              <li>
                <Link href="/shop?deal=true" className="hover:text-orange-400 transition-colors text-orange-400 font-semibold">
                  Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: SELL YOUR DEVICE */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-3">
              SELL YOUR DEVICE
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/sell-device?category=phone" className="hover:text-orange-400 transition-colors">
                  Sell Phone
                </Link>
              </li>
              <li>
                <Link href="/sell-device?category=laptop" className="hover:text-orange-400 transition-colors">
                  Sell Laptop
                </Link>
              </li>
              <li>
                <Link href="/sell-device?category=tablet" className="hover:text-orange-400 transition-colors">
                  Sell Tablet
                </Link>
              </li>
              <li>
                <Link href="/sell-device?category=smartwatch" className="hover:text-orange-400 transition-colors">
                  Sell Smartwatch
                </Link>
              </li>
              <li>
                <Link href="/sell-device" className="hover:text-orange-400 transition-colors text-orange-400 font-semibold">
                  Check Device Value
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER SUPPORT */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-3">
              CUSTOMER SUPPORT
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition-colors">
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: COMPANY */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-3">
              COMPANY
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition-colors">
                  Our Store
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 A1 Mobile Shop. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Basharatpur, Gorakhpur</span>
            <span>•</span>
            <span>Your Trusted Mobile Destination</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
