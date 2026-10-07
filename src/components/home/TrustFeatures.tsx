import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Original Products',
    desc: '100% genuine devices',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Quick & reliable shipping',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    desc: 'Simple return policy',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    desc: 'Safe & trusted checkout',
  },
];

export function TrustFeatures() {
  return (
    <section className="py-6 sm:py-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 hover:border-orange-300 hover:shadow-xs transition-all duration-200 group"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shadow-xs border border-orange-100 shrink-0 group-hover:scale-105 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Icon className="w-5 h-5 transition-colors" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
