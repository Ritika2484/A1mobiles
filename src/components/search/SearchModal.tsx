'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, TrendingUp, Clock, Star } from 'lucide-react';
import { categories } from '@/data/categories';
import { Product } from '@/types';
import { formatINR } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'Smartphones',
  '5G Flagship',
  'Accessories',
  'Gorakhpur',
  'Exchange Offer'
];

function mapDbToProduct(p: any): Product {
  const img = p.imageUrl || '/images/hero-phone.jpg';
  return {
    id: p.id,
    slug: p.slug,
    brand: p.brand,
    name: p.name,
    category: p.category || 'smartphones',
    price: p.price,
    originalPrice: p.originalPrice || p.price,
    discount: p.discount || 0,
    rating: 4.8,
    reviewsCount: 16,
    image: img,
    images: [img],
    colors: [{ name: 'Default', hex: '#1e293b' }],
    description: p.description,
    specifications: {},
    features: [],
    whatsInTheBox: ['Device', 'Charging Cable', 'Manual'],
    featured: p.featured,
    inStock: p.inStock,
    tag: p.tag || undefined,
  };
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch live products from DB
  useEffect(() => {
    if (!isOpen) return;
    async function fetchSearchProducts() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data.products && Array.isArray(data.products)) {
            setDbProducts(data.products.map(mapDbToProduct));
          }
        }
      } catch (err) {
        console.error('Error fetching products for search:', err);
      }
    }
    fetchSearchProducts();
  }, [isOpen]);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('a1_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      } else {
        setRecentSearches(['Smartphones', 'Gorakhpur']);
      }
    } catch {
      // ignore
    }
  }, []);

  // Focus input on modal open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSelectSearch = (term: string) => {
    setQuery(term);
    saveSearchTerm(term);
  };

  const saveSearchTerm = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter((item) => item.toLowerCase() !== term.toLowerCase())].slice(0, 6);
    setRecentSearches(updated);
    try {
      localStorage.setItem('a1_recent_searches', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('a1_recent_searches');
  };

  const matchingProducts: Product[] = debouncedQuery
    ? dbProducts.filter((p) => {
        const q = debouncedQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : [];

  const matchingCategories = debouncedQuery
    ? categories.filter((c) =>
        c.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-[#F5EFE6] rounded-2xl shadow-2xl border border-[#E0D9CD] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-5 py-4 border-b border-[#E0D9CD] bg-[#EAE4D9]">
          <Search className="w-5 h-5 text-[#23201C] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                saveSearchTerm(query.trim());
              }
            }}
            placeholder="Search for smartphones, accessories & more"
            className="w-full bg-transparent text-[#23201C] placeholder-[#8E867C] font-medium text-base sm:text-lg focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#6E685F] hover:text-[#23201C] hover:bg-[#DED7CA] mr-2"
              aria-label="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6E685F] hover:text-[#23201C] transition-colors"
            aria-label="Close search"
          >
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded border border-[#DED7CA] bg-[#F5EFE6]">ESC</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 space-y-6">
          {debouncedQuery ? (
            <div>
              {matchingProducts.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6E685F]">
                      Matching Products ({matchingProducts.length})
                    </h3>
                    <Link
                      href={`/shop?q=${encodeURIComponent(debouncedQuery)}`}
                      onClick={() => {
                        saveSearchTerm(debouncedQuery);
                        onClose();
                      }}
                      className="text-xs font-semibold text-[#23201C] hover:text-[#564F46] flex items-center gap-1"
                    >
                      <span>View in Shop</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchingProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={() => {
                          saveSearchTerm(product.name);
                          onClose();
                        }}
                        className="group flex items-center gap-3 p-3 rounded-xl border border-[#E0D9CD] hover:border-[#23201C] transition-all bg-[#EAE4D9]/70"
                      >
                        <div className="relative w-14 h-14 bg-[#F5EFE6] rounded-lg overflow-hidden shrink-0 border border-[#E0D9CD]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-1 group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-bold text-[#564F46] uppercase tracking-wider">
                            {product.brand}
                          </span>
                          <h4 className="text-sm font-semibold text-[#23201C] truncate group-hover:text-[#564F46] transition-colors">
                            {product.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-[#23201C]">
                              {formatINR(product.price)}
                            </span>
                            {product.discount > 0 && (
                              <span className="text-xs line-through text-[#8E867C]">
                                {formatINR(product.originalPrice)}
                              </span>
                            )}
                            <div className="flex items-center gap-0.5 text-xs text-amber-600 ml-auto">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              <span className="font-medium text-[#23201C]">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {matchingCategories.length > 0 && (
                    <div className="pt-4 border-t border-[#E0D9CD]">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6E685F] mb-2">
                        Categories
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {matchingCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/shop?category=${cat.slug}`}
                            onClick={onClose}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EAE4D9] border border-[#E0D9CD] text-[#23201C] text-xs font-medium hover:bg-[#DED7CA] transition-colors"
                          >
                            <span>{cat.name}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#EAE4D9] flex items-center justify-center mx-auto mb-3 text-[#6E685F]">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-semibold text-[#23201C]">No products found</h4>
                  <p className="text-sm text-[#6E685F] mt-1 max-w-sm mx-auto">
                    We could not find any products matching &quot;{debouncedQuery}&quot;. Try checking for typos or searching a broader term.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6E685F]">
                      <Clock className="w-3.5 h-3.5 text-[#6E685F]" />
                      <span>Recent Searches</span>
                    </div>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-[#6E685F] hover:text-[#23201C] transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectSearch(term)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAE4D9] text-[#23201C] hover:bg-[#DED7CA] text-xs font-medium transition-colors"
                      >
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6E685F] mb-2.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#564F46]" />
                  <span>Popular Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectSearch(term)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E0D9CD] bg-[#F5EFE6] text-[#23201C] hover:border-[#23201C] text-xs font-medium transition-all"
                    >
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Categories */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6E685F] mb-2.5">
                  Browse by Category
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.slug}`}
                      onClick={onClose}
                      className="flex flex-col items-center text-center p-3 rounded-xl border border-[#E0D9CD] bg-[#EAE4D9]/60 hover:border-[#23201C] transition-all group"
                    >
                      <span className="text-xs font-semibold text-[#23201C] group-hover:text-[#564F46]">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
