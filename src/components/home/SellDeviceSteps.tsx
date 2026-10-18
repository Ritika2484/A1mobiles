'use client';

import React from 'react';
import { Smartphone, Truck, IndianRupee } from 'lucide-react';

export function SellDeviceSteps() {
  const steps = [
    {
      number: '01',
      title: 'Enter Device Details',
      icon: Smartphone,
      text: 'Select your device category, brand, model, specifications, and physical condition.',
      cta: null,
      href: null
    },
    {
      number: '02',
      title: 'Free Doorstep Pickup',
      icon: Truck,
      text: 'Schedule a convenient date and time slot. Our representative collects the device from your address in Gorakhpur.',
      cta: null,
      href: null
    },
    {
      number: '03',
      title: 'Get Instant Payment',
      icon: IndianRupee,
      text: 'After physical inspection at your doorstep, receive instant payment directly via UPI or Bank Transfer.',
      cta: null,
      href: null
    }
  ];

  return (
    <section className="py-14 sm:py-18 bg-[#F5EFE6] border-b border-[#E0D9CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#564F46] block mb-1.5">
            How to Sell Your Old Phone
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#23201C] tracking-tight">
            Sell Your Old Device in 3 Simple Steps
          </h2>
          <p className="text-xs sm:text-sm text-[#6E685F] mt-2">
            We make selling your old device quick, transparent and hassle-free.
          </p>
        </div>

        {/* 3 Step Timeline */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-16 left-1/6 right-1/6 h-0.5 border-t-2 border-dashed border-[#DED7CA] z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="bg-[#EAE4D9]/70 rounded-2xl border border-[#E0D9CD] p-6 sm:p-8 flex flex-col items-center text-center hover:border-[#23201C] hover:bg-[#EAE4D9] transition-all duration-300 relative group"
                >
                  {/* Large Step Indicator with Dark Pill */}
                  <div className="w-16 h-16 rounded-full bg-[#F5EFE6] border-2 border-[#564F46] flex items-center justify-center text-[#23201C] shadow-xs group-hover:bg-[#23201C] group-hover:text-[#F5EFE6] transition-all mb-5 relative">
                    <Icon className="w-7 h-7" />
                    <span className="absolute -top-2 -right-2 bg-[#23201C] text-[#F5EFE6] text-[11px] font-black px-2 py-0.5 rounded-full border border-white">
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#23201C] group-hover:text-[#564F46] transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#6E685F] mt-2.5 leading-relaxed flex-1">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SellDeviceSteps;
