'use client';

import React from 'react';
import { Smartphone, ShoppingBag, Truck, Gift } from 'lucide-react';

export function BuyProcess() {
  const buySteps = [
    {
      num: '01',
      title: 'Choose Your Device',
      desc: 'Browse flagship smartphones, accessories & compare top tech specifications.',
      icon: Smartphone
    },
    {
      num: '02',
      title: 'Place Your Order',
      desc: 'Add to cart, apply bank discount codes, and choose UPI or Cash on Delivery.',
      icon: ShoppingBag
    },
    {
      num: '03',
      title: 'Fast Delivery',
      desc: 'Real-time dispatched from our Gorakhpur hub with tamper-evident safe packaging.',
      icon: Truck
    },
    {
      num: '04',
      title: 'Enjoy Your New Device',
      desc: 'Unbox your genuine 100% authentic device covered under official brand warranty.',
      icon: Gift
    }
  ];

  return (
    <section className="py-14 sm:py-18 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block mb-1">
            Shopping Guide
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            How to Buy From A1
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            A seamless, transparent retail experience from click to unboxing.
          </p>
        </div>

        {/* 4 Cards Grid - Visually distinct from sell process */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {buySteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-orange-500/60 hover:-translate-y-1 transition-all duration-300 relative group"
              >
                <div>
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-slate-600 group-hover:text-orange-400 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
