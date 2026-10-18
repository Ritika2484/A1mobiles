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
    <section className="py-14 sm:py-18 bg-[#F5EFE6] border-b border-[#E0D9CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#564F46] block mb-1">
            Our Commitment
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#23201C] tracking-tight">
            Why Choose A1?
          </h2>
          <p className="text-xs sm:text-sm text-[#6E685F] mt-2">
            Gorakhpur&apos;s most trusted mobile store for brand new tech and instant buyback.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {WHY_A1_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-[#EAE4D9]/80 border border-[#E0D9CD] hover:border-[#23201C] hover:bg-[#EAE4D9] hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F5EFE6] border border-[#E0D9CD] text-[#23201C] flex items-center justify-center mb-4 group-hover:bg-[#23201C] group-hover:text-[#F5EFE6] transition-all">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-base font-bold text-[#23201C] mb-1.5 group-hover:text-[#564F46] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E685F] leading-relaxed">
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
