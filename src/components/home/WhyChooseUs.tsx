'use client';

import React from 'react';
import { ShieldCheck, Tag, RefreshCw, Headphones } from 'lucide-react';

const WHY_A1_CARDS = [
  {
    icon: ShieldCheck,
    title: 'Genuine Products',
    desc: 'Every device is verified and authentic.',
  },
  {
    icon: Tag,
    title: 'Best Prices',
    desc: 'Competitive prices and exclusive deals.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Exchange',
    desc: 'Get better value for your old device.',
  },
  {
    icon: Headphones,
    title: 'Trusted Support',
    desc: 'Dedicated support before and after purchase.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">
            Our Commitment
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Choose A1?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Gorakhpur&apos;s most trusted mobile store for brand new tech and instant buyback.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {WHY_A1_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-orange-400 hover:bg-white hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 flex flex-col group"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 text-orange-500 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-orange-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
