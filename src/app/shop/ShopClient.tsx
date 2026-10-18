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
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';
import { ProductCard } from '@/components/product/ProductCard';
import { Product, SortOption } from '@/types';

function mapDbProductToProduct(p: {
  id: string;
  slug: string;
  brand: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  description: string;
  imageUrl: string | null;
  inStock: boolean;
  storageOptions?: string[];
  colors?: { name: string; hex: string }[];
  specifications?: Record<string, string>;
  images?: string[];
  featured: boolean;
  tag: string | null;
}): Product {
  const img = p.imageUrl || '/images/hero-phone.jpg';
  const images = Array.isArray(p.images) && p.images.length > 0 ? p.images : [img];
  const colors = Array.isArray(p.colors) && p.colors.length > 0 ? p.colors : [{ name: 'Default', hex: '#1e293b' }];
  const storageOptions = Array.isArray(p.storageOptions) && p.storageOptions.length > 0 ? p.storageOptions : ['Standard'];
  const specifications = p.specifications || {};

  return {
    id: p.id,
    slug: p.slug,
    brand: p.brand,
    name: p.name,
    category: (p.category as Product['category']) || 'smartphones',
    price: p.price,
    originalPrice: p.originalPrice || p.price,
    discount: p.discount || 0,
    rating: 4.8,
    reviewsCount: 24,
    image: img,
    images,
    colors,
    storageOptions,
    description: p.description,
    specifications,
    features: [],
    whatsInTheBox: ['Device', 'Charging Cable', 'Manual'],
    featured: p.featured,
    inStock: p.inStock,
    tag: p.tag || undefined,
  };
}

export function ShopClient() {
  const searchParams = useSearchParams();

  // URL query params
  const initialCategory = searchParams.get('category') || 'all';
  const initialBrand = searchParams.get('brand') || 'all';
  const initialDeal = searchParams.get('deal') === 'true';
  const searchQueryParam = searchParams.get('q') || '';

  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  // Fetch live products strictly from DB & Cloudinary
  useEffect(() => {
    async function loadApiProducts() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/products');
        if (!res.ok) {
          setProductList([]);
          return;
        }
        const data = await res.json();
        if (data.products && Array.isArray(data.products)) {
          const mapped: Product[] = data.products.map(mapDbProductToProduct);
          setProductList(mapped);
        } else {
          setProductList([]);
        }
      } catch (e) {
        console.error('Failed to load products from database', e);
        setProductList([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadApiProducts();
  }, []);

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
    return productList
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
    <div className="bg-[#F5EFE6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading & Breadcrumb */}
        <div className="mb-8">
          <nav className="text-xs text-[#6E685F] mb-2">
            <span>Home</span> <span className="mx-1.5">/</span>
            <span className="text-[#23201C] font-semibold">Shop</span>
            {selectedCategory !== 'all' && (
              <>
                <span className="mx-1.5">/</span>
                <span className="text-[#564F46] font-semibold capitalize">
                  {selectedCategory}
                </span>
              </>
            )}
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#23201C] tracking-tight">
                Shop All Products
              </h1>
              <p className="text-sm text-[#6E685F] mt-1">
                Showing {filteredAndSortedProducts.length} premium tech devices &amp; accessories
              </p>
            </div>

            {/* Mobile Filter Trigger & Sort dropdown */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EAE4D9] border border-[#E0D9CD] text-[#23201C] font-bold text-xs shadow-2xs hover:bg-[#DED7CA]"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#23201C]" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-[#23201C]" />
                )}
              </button>

              <div className="relative inline-block text-left">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-[#EAE4D9] border border-[#E0D9CD] text-[#23201C] text-xs sm:text-sm font-semibold py-2.5 pl-4 pr-9 rounded-xl shadow-2xs focus:outline-hidden focus:border-[#23201C] cursor-pointer"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="rating">Best Customer Rating</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#6E685F] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-[#E0D9CD]">
              <span className="text-xs font-semibold text-[#6E685F]">Active Filters:</span>

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE4D9] text-[#23201C] text-xs font-semibold border border-[#E0D9CD]">
                  <span>Category: {selectedCategory}</span>
                  <button onClick={() => setSelectedCategory('all')}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {selectedBrand !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE4D9] text-[#23201C] text-xs font-semibold border border-[#E0D9CD]">
                  <span>Brand: {selectedBrand}</span>
                  <button onClick={() => setSelectedBrand('all')}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {priceRange !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE4D9] text-[#23201C] text-xs font-semibold border border-[#E0D9CD]">
                  <span>Price Range</span>
                  <button onClick={() => setPriceRange('all')}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {minRating > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE4D9] text-[#23201C] text-xs font-semibold border border-[#E0D9CD]">
                  <span>{minRating}★ &amp; above</span>
                  <button onClick={() => setMinRating(0)}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {inStockOnly && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE4D9] text-[#23201C] text-xs font-semibold border border-[#E0D9CD]">
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
            <div className="bg-[#EAE4D9]/80 rounded-2xl border border-[#E0D9CD] p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E0D9CD]">
                <div className="flex items-center gap-2 font-bold text-[#23201C] text-base">
                  <SlidersHorizontal className="w-4 h-4 text-[#23201C]" />
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
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#23201C] mb-3">
                  Category
                </h4>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-[#23201C] text-[#F5EFE6] font-bold shadow-xs'
                        : 'text-[#6E685F] hover:bg-[#DED7CA] hover:text-[#23201C]'
                    }`}
                  >
                    All Categories
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-[#23201C] text-[#F5EFE6] font-bold shadow-xs'
                          : 'text-[#6E685F] hover:bg-[#DED7CA] hover:text-[#23201C]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="pt-4 border-t border-[#E0D9CD]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#23201C] mb-3">
                  Brand
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedBrand('all')}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedBrand === 'all'
                        ? 'bg-[#23201C] text-[#F5EFE6] font-bold'
                        : 'text-[#6E685F] hover:bg-[#DED7CA]'
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
                          ? 'bg-[#23201C] text-[#F5EFE6] font-bold'
                          : 'text-[#6E685F] hover:bg-[#DED7CA]'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="pt-4 border-t border-[#E0D9CD]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#23201C] mb-3">
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
                    <label key={p.id} className="flex items-center gap-2.5 text-xs text-[#6E685F] cursor-pointer">
                      <input
                        type="radio"
                        name="priceRangeDesktop"
                        checked={priceRange === p.id}
                        onChange={() => setPriceRange(p.id)}
                        className="accent-[#23201C] rounded"
                      />
                      <span className={priceRange === p.id ? 'font-bold text-[#23201C]' : ''}>
                        {p.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="pt-4 border-t border-[#E0D9CD]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#23201C] mb-3">
                  Customer Rating
                </h4>
                <div className="space-y-2">
                  {[
                    { val: 0, label: 'All Ratings' },
                    { val: 4.5, label: '4.5★ & Above' },
                    { val: 4.0, label: '4.0★ & Above' },
                  ].map((r) => (
                    <label key={r.val} className="flex items-center gap-2.5 text-xs text-[#6E685F] cursor-pointer">
                      <input
                        type="radio"
                        name="minRatingDesktop"
                        checked={minRating === r.val}
                        onChange={() => setMinRating(r.val)}
                        className="accent-[#23201C] rounded"
                      />
                      <div className="flex items-center gap-1">
                        <span className={minRating === r.val ? 'font-bold text-[#23201C]' : ''}>
                          {r.label}
                        </span>
                        {r.val > 0 && <Star className="w-3 h-3 fill-amber-500 text-amber-500" />}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock Toggle */}
              <div className="pt-4 border-t border-[#E0D9CD]">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-[#23201C]">In Stock Only</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-[#23201C] rounded border-[#DED7CA]"
                  />
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area (3 cols wide on desktop) */}
          <main className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-[#EAE4D9]/60 rounded-2xl p-5 border border-[#E0D9CD] animate-pulse space-y-4">
                    <div className="w-full aspect-square bg-[#DED7CA] rounded-xl" />
                    <div className="h-4 bg-[#DED7CA] rounded w-3/4" />
                    <div className="h-4 bg-[#DED7CA] rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-[#EAE4D9] rounded-3xl border border-[#E0D9CD] p-12 text-center max-w-lg mx-auto my-12">
                <div className="w-16 h-16 rounded-full bg-[#F5EFE6] flex items-center justify-center mx-auto text-[#6E685F] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#23201C]">No matching products found</h3>
                <p className="text-xs sm:text-sm text-[#6E685F] mt-1 max-w-sm mx-auto">
                  Try clearing some filters or searching with different keywords to explore our collection.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#23201C] text-[#F5EFE6] font-semibold text-xs hover:bg-[#151311] transition-colors shadow-sm"
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

          <div className="relative w-full bg-[#F5EFE6] rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl z-10 animate-in slide-in-from-bottom duration-300 border-t border-[#E0D9CD]">
            {/* Sheet Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#E0D9CD] bg-[#EAE4D9]">
              <div className="flex items-center gap-2 font-bold text-[#23201C] text-base">
                <SlidersHorizontal className="w-4 h-4 text-[#23201C]" />
                <span>Filters &amp; Refinements</span>
              </div>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 text-[#6E685F] hover:text-[#23201C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sheet Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Category */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#23201C] mb-2.5">
                  Category
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      selectedCategory === 'all'
                        ? 'bg-[#23201C] text-[#F5EFE6]'
                        : 'bg-[#EAE4D9] text-[#23201C]'
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
                          ? 'bg-[#23201C] text-[#F5EFE6]'
                          : 'bg-[#EAE4D9] text-[#23201C]'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div className="pt-4 border-t border-[#E0D9CD]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#23201C] mb-2.5">
                  Brand
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedBrand('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      selectedBrand === 'all'
                        ? 'bg-[#23201C] text-[#F5EFE6]'
                        : 'bg-[#EAE4D9] text-[#23201C]'
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
                          ? 'bg-[#23201C] text-[#F5EFE6]'
                          : 'bg-[#EAE4D9] text-[#23201C]'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-[#E0D9CD]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#23201C] mb-2.5">
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
                          ? 'border-[#23201C] bg-[#23201C] text-[#F5EFE6] font-bold'
                          : 'border-[#E0D9CD] bg-[#EAE4D9] text-[#23201C]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock */}
              <div className="pt-4 border-t border-[#E0D9CD]">
                <label className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#23201C]">In Stock Only</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-[#23201C] rounded border-[#DED7CA]"
                  />
                </label>
              </div>
            </div>

            {/* Sheet Footer */}
            <div className="p-4 border-t border-[#E0D9CD] bg-[#EAE4D9] flex items-center gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 rounded-xl border border-[#DED7CA] text-[#23201C] bg-[#F5EFE6] text-xs font-bold hover:bg-[#EAE4D9]"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 py-3 rounded-xl bg-[#23201C] text-[#F5EFE6] text-xs font-bold hover:bg-[#151311] shadow-sm"
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
