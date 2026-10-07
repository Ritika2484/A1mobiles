'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-14 sm:py-18 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 text-center sm:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Read real experiences from tech buyers and device sellers across Gorakhpur and India.
            </p>
          </div>

          {/* Slider controls for mobile */}
          <div className="flex items-center justify-center sm:justify-end gap-2 md:hidden">
            <button
              onClick={prevSlide}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-orange-600 transition-colors shadow-2xs"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-500">
              {currentIndex + 1} / {testimonials.length}
            </span>
            <button
              onClick={nextSlide}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-orange-600 transition-colors shadow-2xs"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, index) => (
            <div
              key={test.id}
              className={`p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col justify-between ${
                index === currentIndex ? 'flex' : 'hidden md:flex'
              }`}
            >
              <div>
                {/* 5 Stars and Quote */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-orange-200" />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{test.comment}&rdquo;
                </p>
              </div>

              {/* Customer Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {test.author}
                  </h4>
                  {test.location && (
                    <span className="text-[11px] text-slate-400 block">
                      {test.location}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Purchase</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
