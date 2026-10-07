import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { ShopClient } from './ShopClient';

export const metadata: Metadata = {
  title: 'Shop All Smartphones, Earbuds & Accessories | A1 Mobile Shop',
  description: 'Browse our full catalog of smartphones, accessories, smartwatches, earbuds, and tablets with official warranty and best prices.',
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-semibold text-slate-600">Loading shop catalog...</span>
          </div>
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
