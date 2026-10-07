'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, TrendingUp, Clock, Star } from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { Product } from '@/types';
import { formatINR } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'iPhone 17 Pro Max',
  'Samsung Galaxy S26 Ultra',
  'Google Pixel 10 Pro',
  'OnePlus 13',
  'Xiaomi 15 Ultra',
  'Nothing Phone 3',
  'Spigen Armor Case'
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('a1_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      } else {
        setRecentSearches(['iPhone 17 Pro Max', 'Samsung S26', 'Gorakhpur']);
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
    ? products.filter((p) => {
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
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-5 py-4 border-b border-slate-200 bg-slate-50/70">
          <Search className="w-5 h-5 text-orange-500 shrink-0 mr-3" />
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
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 font-medium text-base sm:text-lg focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 mr-2"
              aria-label="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/80 transition-colors"
            aria-label="Close search"
          >
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded border border-slate-300 bg-white">ESC</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 space-y-6">
          {debouncedQuery ? (
            <div>
              {matchingProducts.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Matching Products ({matchingProducts.length})
                    </h3>
                    <Link
                      href={`/shop?q=${encodeURIComponent(debouncedQuery)}`}
                      onClick={() => {
                        saveSearchTerm(debouncedQuery);
                        onClose();
                      }}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
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
                        className="group flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-orange-400 hover:shadow-md transition-all bg-white"
                      >
                        <div className="relative w-14 h-14 bg-slate-50 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-1 group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">
                            {product.brand}
                          </span>
                          <h4 className="text-sm font-semibold text-slate-900 truncate group-hover:text-orange-600 transition-colors">
                            {product.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-slate-900">
                              {formatINR(product.price)}
                            </span>
                            {product.discount > 0 && (
                              <span className="text-xs line-through text-slate-400">
                                {formatINR(product.originalPrice)}
                              </span>
                            )}
                            <div className="flex items-center gap-0.5 text-xs text-amber-500 ml-auto">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="font-medium text-slate-700">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {matchingCategories.length > 0 && (
                    <div className="pt-4 border-t border-slate-100">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        Categories
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {matchingCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/shop?category=${cat.slug}`}
                            onClick={onClose}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-700 text-xs font-medium hover:bg-orange-100 transition-colors"
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
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-semibold text-slate-900">No products found</h4>
                  <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
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
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Recent Searches</span>
                    </div>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectSearch(term)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-orange-600 text-xs font-medium transition-colors"
                      >
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
                  <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                  <span>Popular Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectSearch(term)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:border-orange-500 hover:text-orange-600 text-xs font-medium transition-all"
                    >
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Categories */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
                  Browse by Category
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.slug}`}
                      onClick={onClose}
                      className="flex flex-col items-center text-center p-3 rounded-xl border border-slate-200 hover:border-orange-400 hover:bg-orange-50/30 transition-all group"
                    >
                      <span className="text-xs font-semibold text-slate-900 group-hover:text-orange-600">
                        {cat.name}
                      </span>
                      <span className="text-[11px] text-slate-400 mt-0.5">
                        {cat.itemCount}+ items
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
