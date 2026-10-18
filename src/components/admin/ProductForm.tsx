'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  UploadCloud,
  X,
  Loader2,
  AlertCircle,
  Save,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';

export interface ProductFormData {
  id?: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number | '';
  originalPrice: number | '';
  discount: number | '';
  description: string;
  tag: string;
  imageUrl: string;
  imagePublicId: string;
  inStock: boolean;
  isActive: boolean;
  featured: boolean;
}

interface ProductFormProps {
  initialData?: ProductFormData;
  isEdit?: boolean;
}

export function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      name: '',
      slug: '',
      brand: '',
      category: 'smartphones',
      price: '',
      originalPrice: '',
      discount: '',
      description: '',
      tag: '',
      imageUrl: '',
      imagePublicId: '',
      inStock: true,
      isActive: true,
      featured: false,
    }
  );

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto slug generation from name if user hasn't typed custom slug
  const handleNameChange = (name: string) => {
    setFormData((prev) => {
      const updates: Partial<ProductFormData> = { name };
      if (!isEdit && (!prev.slug || prev.slug === generateSlug(prev.name))) {
        updates.slug = generateSlug(name);
      }
      return { ...prev, ...updates };
    });
  };

  const generateSlug = (str: string) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Auto calculate discount percentage
  const handlePriceChange = (priceVal: string, origVal: string) => {
    const price = priceVal === '' ? '' : Number(priceVal);
    const orig = origVal === '' ? '' : Number(origVal);

    let calculatedDiscount = formData.discount;
    if (typeof price === 'number' && typeof orig === 'number' && orig > price && orig > 0) {
      calculatedDiscount = Math.round(((orig - price) / orig) * 100);
    }

    setFormData((prev) => ({
      ...prev,
      price,
      originalPrice: orig,
      discount: calculatedDiscount,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5 MB');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const body = new FormData();
      body.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }

      setFormData((prev) => ({
        ...prev,
        imageUrl: data.url,
        imagePublicId: data.publicId,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (formData.imagePublicId) {
      try {
        await fetch(`/api/admin/upload?publicId=${encodeURIComponent(formData.imagePublicId)}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.warn('Failed to delete old image from Cloudinary', err);
      }
    }
    setFormData((prev) => ({
      ...prev,
      imageUrl: '',
      imagePublicId: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.slug || !formData.brand || !formData.category || !formData.price || !formData.description) {
      setError('Please fill in all required fields (Name, Slug, Brand, Category, Price, Description).');
      return;
    }

    try {
      setSubmitting(true);
      const url = isEdit
        ? `/api/admin/products/${formData.id}`
        : '/api/admin/products';
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Number(formData.price),
          discount: formData.discount ? Number(formData.discount) : 0,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to save product');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* Top action header */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
        <button
          type="submit"
          disabled={submitting || uploading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5EFE6] hover:bg-white disabled:opacity-50 text-[#23201C] font-semibold text-xs shadow-sm transition-all"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isEdit ? 'Update Product' : 'Create Product'}</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-sm flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Form Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: 2 cols - primary info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card: Basic Information */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white mb-2">Basic Details</h2>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Product Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. iPhone 16 Pro Max 256GB Desert Titanium"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#E0D9CD] transition-colors"
              />
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300">
                  URL Slug <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, slug: generateSlug(p.name) }))}
                  className="text-[11px] text-[#E0D9CD] hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Auto-generate
                </button>
              </div>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-slate-950 border border-r-0 border-slate-700 rounded-l-xl text-xs text-slate-500 select-none">
                  /products/
                </span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().trim() })}
                  placeholder="iphone-16-pro-max-256gb"
                  className="w-full px-4 py-2.5 rounded-r-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#E0D9CD] transition-colors"
                />
              </div>
            </div>

            {/* Brand & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Brand <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="Apple, Samsung, OnePlus..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#E0D9CD] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#E0D9CD] transition-colors cursor-pointer capitalize"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Description & Specifications <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={5}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Key highlights, warranty details, box contents, specs..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#E0D9CD] transition-colors"
              />
            </div>
          </div>

          {/* Card: Pricing & Deals */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white mb-2">Pricing & Discounts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Sale Price (₹) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={formData.price}
                  onChange={(e) =>
                    handlePriceChange(e.target.value, String(formData.originalPrice || ''))
                  }
                  placeholder="129900"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#E0D9CD] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Original Price (₹ MRP)
                </label>
                <input
                  type="number"
                  min={1}
                  value={formData.originalPrice}
                  onChange={(e) =>
                    handlePriceChange(String(formData.price || ''), e.target.value)
                  }
                  placeholder="144900"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#E0D9CD] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Discount (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discount: e.target.value === '' ? '' : Number(e.target.value),
                    })
                  }
                  placeholder="10"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#E0D9CD] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Badge / Tag (Optional)
              </label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="e.g. Hot Deal, Best Seller, New Launch"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#E0D9CD] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Right column: 1 col - Media & Status */}
        <div className="space-y-6">
          {/* Card: Product Image */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white mb-2">Product Image</h2>

            {formData.imageUrl ? (
              <div className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-950 aspect-square flex items-center justify-center">
                <img
                  src={formData.imageUrl}
                  alt={formData.name || 'Preview'}
                  className="w-full h-full object-contain p-2"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-2 rounded-xl bg-rose-600/90 text-white hover:bg-rose-600 transition-colors shadow-lg"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="relative flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-dashed border-slate-700 hover:border-[#E0D9CD] bg-slate-800/40 cursor-pointer transition-colors p-4 text-center">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="sr-only"
                />
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 text-[#E0D9CD] animate-spin" />
                    <span className="text-xs text-slate-300">Uploading to Cloudinary...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-[#2D2924] text-[#E0D9CD] flex items-center justify-center">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      Click to upload image
                    </span>
                    <span className="text-[11px] text-slate-400">
                      PNG, JPG, WebP, AVIF up to 5MB
                    </span>
                  </div>
                )}
              </label>
            )}

            {/* Direct image URL fallback */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                Or Direct Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#E0D9CD] transition-colors"
              />
            </div>
          </div>

          {/* Card: Visibility & Availability */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white mb-2">Publishing & Stock</h2>

            {/* inStock */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-white block">In Stock</span>
                <span className="text-[11px] text-slate-400">
                  Customers can order this product
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="w-4 h-4 rounded accent-[#E0D9CD] cursor-pointer"
              />
            </label>

            {/* isActive */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-white block">Active in Catalog</span>
                <span className="text-[11px] text-slate-400">
                  Visible on public storefront
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded accent-[#E0D9CD] cursor-pointer"
              />
            </label>

            {/* featured */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-white block">Featured Product</span>
                <span className="text-[11px] text-slate-400">
                  Displayed on homepage featured reel
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded accent-[#E0D9CD] cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
