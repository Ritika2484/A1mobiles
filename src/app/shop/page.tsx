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
        <div className="min-h-screen flex items-center justify-center bg-[#F5EFE6]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-[#23201C] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium text-[#6E685F]">Loading shop catalog...</span>
          </div>
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
