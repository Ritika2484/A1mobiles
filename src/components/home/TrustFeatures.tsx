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
    <section className="py-6 sm:py-8 bg-[#F5EFE6] border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#EAE4D9]/80 border border-[#E0D9CD] hover:border-[#23201C]/40 transition-all duration-200 group"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F4F0E8] flex items-center justify-center text-[#23201C] border border-[#DED7CA] shrink-0 group-hover:bg-[#23201C] group-hover:text-white transition-all shadow-xs">
                  <Icon className="w-5 h-5 transition-colors" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#23201C] leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#6E685F] mt-0.5 truncate">
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

export default TrustFeatures;
