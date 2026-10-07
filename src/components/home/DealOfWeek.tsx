'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { dealOfTheWeek } from '@/data/products';
import { formatINR } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

export function DealOfWeek() {
  const { addToCart } = useCart();

  // 3-day countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleQuickBuy = () => {
    addToCart(dealOfTheWeek.product, 1);
  };

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
                <span>{dealOfTheWeek.title}</span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  {dealOfTheWeek.subtitle}
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-xl leading-relaxed">
                  {dealOfTheWeek.description}
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Offer Ends In:
                </span>
                <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                  <div className="flex flex-col items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner">
                    <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Days</span>
                  </div>
                  <span className="text-xl font-bold text-slate-500">:</span>
                  <div className="flex flex-col items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner">
                    <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Hours</span>
                  </div>
                  <span className="text-xl font-bold text-slate-500">:</span>
                  <div className="flex flex-col items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner">
                    <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Mins</span>
                  </div>
                  <span className="text-xl font-bold text-slate-500">:</span>
                  <div className="flex flex-col items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-indigo-600/30 backdrop-blur-md border border-indigo-500/40 shadow-inner">
                    <span className="text-xl sm:text-2xl font-black text-indigo-300 tabular-nums">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-indigo-300">Secs</span>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      {formatINR(dealOfTheWeek.dealPrice)}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-rose-500 text-white text-xs font-black">
                      {dealOfTheWeek.discountTag}
                    </span>
                  </div>
                  <span className="text-sm line-through text-slate-400">
                    Original Price: {formatINR(dealOfTheWeek.originalPrice)}
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href={`/products/${dealOfTheWeek.product.slug}`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 group"
                  >
                    <span>SHOP DEAL</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 pt-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Free Screen Protection</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>No Cost EMI Available</span>
                </div>
              </div>
            </div>

            {/* Right Product Image & Badge */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square">
                <Image
                  src="/images/deal-phone.jpg"
                  alt="Deal of the week smartphone visual"
                  fill
                  className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />

                {/* Claimed Meter Badge */}
                <div className="absolute -bottom-2 sm:bottom-0 inset-x-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3.5 shadow-xl">
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                    <span>Already Claimed</span>
                    <span className="text-indigo-400 font-bold">{dealOfTheWeek.claimedPercentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      style={{ width: `${dealOfTheWeek.claimedPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
