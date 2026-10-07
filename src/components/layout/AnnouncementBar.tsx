'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div className="bg-slate-950 text-white text-xs sm:text-sm py-2 px-4 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left message */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="font-medium text-slate-200">
            Special Offers Available | Free Delivery on Selected Orders
          </span>
        </div>

        {/* Right side info & Contact */}
        <div className="hidden sm:flex items-center gap-4 text-xs text-slate-300">
          <span className="inline-flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span>Basharatpur, Gorakhpur</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <a
            href="https://instagram.com/a1mobileshop26"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-slate-300 hover:text-orange-400 transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-currentColor text-orange-400" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>@a1mobileshop26</span>
          </a>
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 font-semibold transition-colors group"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
