'use client';

import React, { use, useEffect, useState } from 'react';
import { ProductForm, ProductFormData } from '@/components/admin/ProductForm';
import { Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [initialData, setInitialData] = useState<ProductFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/products/${id}`);
        if (!res.ok) {
          throw new Error('Product not found or failed to load');
        }
        const data = await res.json();
        const p = data.product;
        setInitialData({
          id: p.id,
          name: p.name,
          slug: p.slug,
          brand: p.brand,
          category: p.category,
          price: p.price,
          originalPrice: p.originalPrice,
          discount: p.discount,
          description: p.description,
          tag: p.tag || '',
          imageUrl: p.imageUrl || '',
          imagePublicId: p.imagePublicId || '',
          inStock: p.inStock,
          isActive: p.isActive,
          featured: p.featured,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-[#E0D9CD]" />
        <span className="text-sm font-semibold">Loading product details...</span>
      </div>
    );
  }

  if (error || !initialData) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center space-y-4">
        <div className="inline-flex p-3 rounded-2xl bg-rose-950/60 text-rose-400 border border-rose-800">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Error Loading Product</h2>
        <p className="text-sm text-slate-400">{error || 'Product could not be found'}</p>
        <Link
          href="/admin/products"
          className="inline-block px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
        >
          Return to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
          Edit Product
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Updating &quot;{initialData.name}&quot;
        </p>
      </div>

      <ProductForm initialData={initialData} isEdit={true} />
    </div>
  );
}
