'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#23201C] text-[#C8BFB4] pt-14 pb-10 border-t border-[#38332E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 border-b border-[#38332E]">
          {/* Brand Info (2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[#38332E] shadow-xs shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="A1 Mobile Shop Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 leading-none">
                  <span className="font-extrabold text-lg tracking-tight text-[#F5EFE6]">
                    A1
                  </span>
                  <span className="font-extrabold text-lg tracking-tight text-[#EAE4D9]">
                    MOBILE
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#8C8379] leading-tight">
                  SHOP
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#A89F93] max-w-sm leading-relaxed">
              Gorakhpur&apos;s trusted destination for authentic smartphones, accessories, and instant doorstep device trade-ins.
            </p>

            <div className="space-y-2 text-xs text-[#A89F93] pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#EAE4D9] shrink-0 mt-0.5" />
                <span className="text-[#C8BFB4]">Basharatpur, Gorakhpur, Uttar Pradesh – 273004</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#EAE4D9] shrink-0" />
                <a href="tel:+918726942338" className="hover:text-[#F5EFE6] transition-colors">
                  +91 87269 42338
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#EAE4D9] shrink-0" />
                <span>Open 7 Days: 10:00 AM – 9:00 PM IST</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#EAE4D9] shrink-0" />
                <a href="mailto:Jaikishanhome1998@gmail.com" className="hover:text-[#F5EFE6] transition-colors">
                  Jaikishanhome1998@gmail.com
                </a>
              </div>
            </div>

            {/* Reliable Connected Channels: Instagram & WhatsApp only */}
            <div className="flex items-center flex-wrap gap-2.5 pt-2">
              <a
                href="https://instagram.com/a1mobileshop26"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#2E2A25] border border-[#3E3831] text-[#EAE4D9] hover:text-[#23201C] hover:bg-[#EAE4D9] transition-all text-xs font-semibold"
                aria-label="Instagram @a1mobileshop26"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Follow @a1mobileshop26</span>
              </a>

              <a
                href="https://wa.me/918726942338"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2E2A25] border border-[#3E3831] text-[#EAE4D9] hover:text-[#23201C] hover:bg-[#EAE4D9] transition-all text-xs font-semibold"
                aria-label="WhatsApp Direct Support"
              >
                <MessageCircle className="w-4 h-4 text-[#2E6B47]" />
                <span>WhatsApp Support</span>
              </a>
            </div>
          </div>

          {/* Column 1: SHOP PRODUCTS */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5EFE6] mb-3">
              SHOP PRODUCTS
            </h4>
            <ul className="space-y-2 text-xs text-[#A89F93]">
              <li>
                <Link href="/shop?category=smartphones" className="hover:text-[#F5EFE6] transition-colors">
                  Flagship Smartphones
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="hover:text-[#F5EFE6] transition-colors">
                  Audio &amp; Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop?category=smartwatches" className="hover:text-[#F5EFE6] transition-colors">
                  Smartwatches
                </Link>
              </li>
              <li>
                <Link href="/shop?category=tablets" className="hover:text-[#F5EFE6] transition-colors">
                  Tablets &amp; iPads
                </Link>
              </li>
              <li>
                <Link href="/shop?deal=true" className="hover:text-[#F5EFE6] transition-colors text-[#EAE4D9] font-medium">
                  Deals &amp; Discounts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: SELL OLD DEVICE */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5EFE6] mb-3">
              SELL OLD DEVICE
            </h4>
            <ul className="space-y-2 text-xs text-[#A89F93]">
              <li>
                <Link href="/sell-device" className="hover:text-[#F5EFE6] transition-colors text-[#EAE4D9] font-medium">
                  Instant Cash Valuation
                </Link>
              </li>
              <li>
                <Link href="/sell-device" className="hover:text-[#F5EFE6] transition-colors">
                  Sell Old Smartphone
                </Link>
              </li>
              <li>
                <Link href="/sell-device" className="hover:text-[#F5EFE6] transition-colors">
                  Doorstep Free Pickup
                </Link>
              </li>
              <li>
                <Link href="/sell-device" className="hover:text-[#F5EFE6] transition-colors">
                  Instant UPI / Bank Transfer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER CARE */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5EFE6] mb-3">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 text-xs text-[#A89F93]">
              <li>
                <Link href="/contact" className="hover:text-[#F5EFE6] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <a href="tel:+918726942338" className="hover:text-[#F5EFE6] transition-colors">
                  Call: +91 87269 42338
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918726942338"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F5EFE6] transition-colors"
                >
                  Live WhatsApp Chat
                </a>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-[#F5EFE6] transition-colors">
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: STORE & TRUST */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5EFE6] mb-3">
              STORE &amp; TRUST
            </h4>
            <ul className="space-y-2 text-xs text-[#A89F93]">
              <li>
                <Link href="/about" className="hover:text-[#F5EFE6] transition-colors">
                  About A1 Mobile Shop
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F5EFE6] transition-colors">
                  Gorakhpur Flagship Store
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F5EFE6] transition-colors">
                  100% Brand Seal Guarantee
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F5EFE6] transition-colors">
                  Official Warranty
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C8379]">
          <p>© 2026 A1 Mobile Shop. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Basharatpur, Gorakhpur</span>
            <span>•</span>
            <span>Official Flagship Store</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
