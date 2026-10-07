'use client';

import React from 'react';
import Link from 'next/link';
import { Smartphone, Truck, IndianRupee, ArrowRight } from 'lucide-react';

export function SellDeviceSteps() {
  const steps = [
    {
      number: '01',
      title: 'Check Price',
      icon: Smartphone,
      text: 'Select your device and answer a few simple questions to get an instant estimated value.',
      cta: 'CHECK PRICE',
      href: '#device-valuation'
    },
    {
      number: '02',
      title: 'Free Pickup',
      icon: Truck,
      text: 'Schedule a convenient date and time. Our representative will collect the device from your doorstep.',
      cta: null,
      href: null
    },
    {
      number: '03',
      title: 'Get Paid',
      icon: IndianRupee,
      text: 'After verification, receive your payment securely through UPI or bank transfer.',
      cta: null,
      href: null
    }
  ];

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1.5">
            How to Sell Your Old Phone
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sell Your Old Device in 3 Simple Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            We make selling your old device quick, transparent and hassle-free.
          </p>
        </div>

        {/* 3 Step Timeline */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-dashed border-t-2 border-dashed border-orange-200 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col items-center text-center hover:border-orange-400 hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 relative group"
                >
                  {/* Large Step Indicator with Orange Pill */}
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center text-orange-600 shadow-md group-hover:bg-orange-500 group-hover:text-white transition-all mb-5 relative">
                    <Icon className="w-7 h-7" />
                    <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[11px] font-black px-2 py-0.5 rounded-full border border-white">
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed flex-1">
                    {step.text}
                  </p>

                  {/* Optional CTA */}
                  {step.cta && (
                    <div className="mt-5 pt-4 border-t border-slate-200/80 w-full flex justify-center">
                      <a
                        href={step.href!}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors uppercase tracking-wider group-hover:translate-x-0.5"
                      >
                        <span>{step.cta}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
