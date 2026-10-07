'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Star,
  ChevronDown,
  ShoppingBag
} from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';
import { ProductCard } from '@/components/product/ProductCard';
import { SortOption } from '@/types';

export function ShopClient() {
  const searchParams = useSearchParams();

  // URL query params
  const initialCategory = searchParams.get('category') || 'all';
  const initialBrand = searchParams.get('brand') || 'all';
  const initialDeal = searchParams.get('deal') === 'true';
  const searchQueryParam = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  // Sync state when searchParams changes
  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category')!);
    }
    if (searchParams.get('brand')) {
      setSelectedBrand(searchParams.get('brand')!);
    }
  }, [searchParams]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange('all');
    setMinRating(0);
    setInStockOnly(false);
  };

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search query filter
        if (searchQueryParam) {
          const q = searchQueryParam.toLowerCase();
          const matches =
            product.name.toLowerCase().includes(q) ||
            product.brand.toLowerCase().includes(q) ||
            product.category.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        // Brand filter
        if (selectedBrand !== 'all' && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }

        // Deal filter
        if (initialDeal && product.discount === 0) {
          return false;
        }

        // In Stock filter
        if (inStockOnly && !product.inStock) {
          return false;
        }

        // Rating filter
        if (minRating > 0 && product.rating < minRating) {
          return false;
        }

        // Price range filter
        if (priceRange === 'under-10k' && product.price > 10000) return false;
        if (priceRange === '10k-30k' && (product.price < 10000 || product.price > 30000)) return false;
        if (priceRange === '30k-70k' && (product.price < 30000 || product.price > 70000)) return false;
        if (priceRange === '70k-100k' && (product.price < 70000 || product.price > 100000)) return false;
        if (priceRange === 'above-100k' && product.price < 100000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default 'featured'
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [
    selectedCategory,
    selectedBrand,
    initialDeal,
    searchQueryParam,
    inStockOnly,
    minRating,
    priceRange,
    sortBy,
  ]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    priceRange !== 'all' ||
    minRating > 0 ||
    inStockOnly;

  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading & Breadcrumb */}
        <div className="mb-8">
          <nav className="text-xs text-slate-400 mb-2">
            <span>Home</span> <span className="mx-1.5">/</span>
            <span className="text-slate-800 font-semibold">Shop</span>
            {selectedCategory !== 'all' && (
              <>
                <span className="mx-1.5">/</span>
                <span className="text-orange-600 font-semibold capitalize">
                  {selectedCategory}
                </span>
              </>
            )}
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Shop All Products
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Showing {filteredAndSortedProducts.length} premium tech devices &amp; accessories
              </p>
            </div>

            {/* Mobile Filter Trigger & Sort dropdown */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs shadow-2xs hover:bg-slate-50"
              >
                <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                )}
              </button>

              <div className="relative inline-block text-left">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold py-2.5 pl-4 pr-9 rounded-xl shadow-2xs focus:outline-hidden focus:border-orange-500 cursor-pointer"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="rating">Best Customer Rating</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-slate-200/60">
              <span className="text-xs font-semibold text-slate-500">Active Filters:</span>

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold">
                  <span>Category: {selectedCategory}</span>
                  <button onClick={() => setSelectedCategory('all')}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {selectedBrand !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold">
                  <span>Brand: {selectedBrand}</span>
                  <button onClick={() => setSelectedBrand('all')}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {priceRange !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold">
                  <span>Price Range</span>
                  <button onClick={() => setPriceRange('all')}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {minRating > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold">
                  <span>{minRating}★ &amp; above</span>
                  <button onClick={() => setMinRating(0)}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {inStockOnly && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold">
                  <span>In Stock Only</span>
                  <button onClick={() => setInStockOnly(false)}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold inline-flex items-center gap-1 ml-2 hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                  <span>Filter Products</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-rose-600 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Category
                </h4>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                      selectedCategory === 'all'
                        ? 'bg-orange-50 text-orange-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-[11px] text-slate-400">{products.length}</span>
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? 'bg-orange-50 text-orange-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[11px] text-slate-400">{cat.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Brand
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedBrand('all')}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedBrand === 'all'
                        ? 'bg-orange-50 text-orange-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    All Brands
                  </button>
                  {brands.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBrand(b.name)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        selectedBrand.toLowerCase() === b.name.toLowerCase()
                          ? 'bg-orange-50 text-orange-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Price Range
                </h4>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-10k', label: 'Under ₹10,000' },
                    { id: '10k-30k', label: '₹10,000 - ₹30,000' },
                    { id: '30k-70k', label: '₹30,000 - ₹70,000' },
                    { id: '70k-100k', label: '₹70,000 - ₹1,00,000' },
                    { id: 'above-100k', label: 'Above ₹1,00,000' },
                  ].map((p) => (
                    <label key={p.id} className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRangeDesktop"
                        checked={priceRange === p.id}
                        onChange={() => setPriceRange(p.id)}
                        className="text-orange-500 focus:ring-orange-500 rounded"
                      />
                      <span className={priceRange === p.id ? 'font-bold text-slate-900' : ''}>
                        {p.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Customer Rating
                </h4>
                <div className="space-y-2">
                  {[
                    { val: 0, label: 'All Ratings' },
                    { val: 4.5, label: '4.5★ & Above' },
                    { val: 4.0, label: '4.0★ & Above' },
                  ].map((r) => (
                    <label key={r.val} className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="radio"
                        name="minRatingDesktop"
                        checked={minRating === r.val}
                        onChange={() => setMinRating(r.val)}
                        className="text-orange-500 focus:ring-orange-500 rounded"
                      />
                      <div className="flex items-center gap-1">
                        <span className={minRating === r.val ? 'font-bold text-slate-900' : ''}>
                          {r.label}
                        </span>
                        {r.val > 0 && <Star className="w-3 h-3 fill-amber-400 text-amber-400" />}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock Toggle */}
              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-slate-800">In Stock Only</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded border-slate-300 focus:ring-orange-500"
                  />
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area (3 cols wide on desktop) */}
          <main className="lg:col-span-3">
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No matching products found</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  Try clearing some filters or searching with different keywords to explore our collection.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-500 text-white font-semibold text-xs hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Bottom Sheet */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="fixed inset-0"
            onClick={() => setIsMobileFiltersOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl z-10 animate-in slide-in-from-bottom duration-300">
            {/* Sheet Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                <span>Filters &amp; Refinements</span>
              </div>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sheet Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Category */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Category
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      selectedCategory === 'all'
                        ? 'bg-orange-500 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.slug)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        selectedCategory === c.slug
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Brand
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedBrand('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      selectedBrand === 'all'
                        ? 'bg-orange-500 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    All
                  </button>
                  {brands.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBrand(b.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        selectedBrand.toLowerCase() === b.name.toLowerCase()
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Price Range
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-10k', label: 'Under ₹10k' },
                    { id: '10k-30k', label: '₹10k - ₹30k' },
                    { id: '30k-70k', label: '₹30k - ₹70k' },
                    { id: '70k-100k', label: '₹70k - ₹1L' },
                    { id: 'above-100k', label: 'Above ₹1L' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPriceRange(p.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border text-left ${
                        priceRange === p.id
                          ? 'border-orange-500 bg-orange-50 text-orange-700 font-bold'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock */}
              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">In Stock Only</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded border-slate-300"
                  />
                </label>
              </div>
            </div>

            {/* Sheet Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 py-3 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 shadow-md shadow-orange-500/20"
              >
                Apply Filters ({filteredAndSortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
