import React from 'react';
import { ProductForm } from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
          Add New Product
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Create a new product listing in your online catalog.
        </p>
      </div>

      <ProductForm isEdit={false} />
    </div>
  );
}
