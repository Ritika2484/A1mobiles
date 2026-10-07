'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Smartphone,
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  PhoneCall,
  MapPin,
  Flame,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { SearchModal } from '@/components/search/SearchModal';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function Navbar() {
  const pathname = usePathname();
  const { cartCount, cartTotal, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white transition-all duration-200 border-b border-slate-200 shadow-sm ${
          isScrolled ? 'py-1' : 'py-2 sm:py-2.5'
        }`}
      >
        {/* TOP ROW: Logo, Large Search, Call, Location, Account, Wishlist, Cart */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 lg:gap-6 py-1.5">
            {/* Left: Hamburger (mobile) + Brand Logo */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white border border-slate-200 shadow-sm group-hover:border-orange-500 transition-colors shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="A1 Mobile Shop Logo"
                    fill
                    className="object-contain p-0.5"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                      A1
                    </span>
                    <span className="font-extrabold text-base sm:text-lg tracking-tight text-orange-500">
                      MOBILE
                    </span>
                    <Smartphone className="w-4 h-4 text-orange-500 stroke-[2.5] hidden xs:inline-block" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.22em] text-slate-500 leading-tight">
                    SHOP GORAKHPUR
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Large Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-2">
              <div
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center bg-slate-50 hover:bg-slate-100 border border-slate-300 hover:border-orange-400 rounded-full px-4 py-2 transition-all cursor-pointer shadow-inner group"
              >
                <Search className="w-4 h-4 text-slate-400 group-hover:text-orange-500 mr-2.5 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-500 select-none flex-1 truncate">
                  Search for smartphones, accessories &amp; more
                </span>
                <button
                  type="button"
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full transition-colors shrink-0 flex items-center gap-1 shadow-sm"
                >
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* Right: Call Us, Location, Login, Wishlist, Cart */}
            <div className="flex items-center gap-2 sm:gap-3.5 lg:gap-4 shrink-0">
              {/* Call Us - Desktop */}
              <a
                href="tel:+919876543210"
                className="hidden xl:flex items-center gap-2 text-slate-700 hover:text-orange-500 transition-colors"
                title="Call A1 Mobile Shop"
              >
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Call Us</span>
                  <span className="text-xs font-bold text-slate-900 mt-0.5">+91 98765 43210</span>
                </div>
              </a>

              {/* Store Location - Desktop */}
              <Link
                href="/contact"
                className="hidden xl:flex items-center gap-2 text-slate-700 hover:text-orange-500 transition-colors"
                title="Visit Basharatpur, Gorakhpur store"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Store</span>
                  <span className="text-xs font-bold text-slate-900 mt-0.5">Gorakhpur</span>
                </div>
              </Link>

              {/* Mobile Search Icon Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-lg text-slate-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Login / Sign Up */}
              <button
                onClick={() => setIsAccountModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-orange-500 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>Login / Sign Up</span>
              </button>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="relative p-2 rounded-lg text-slate-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 bg-slate-900 hover:bg-orange-500 text-white px-3 sm:px-3.5 py-2 rounded-full transition-all duration-200 shadow-sm group"
                aria-label="Shopping Cart"
              >
                <div className="relative">
                  <ShoppingCart className="w-4 h-4 text-white" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-orange-500 group-hover:bg-slate-950 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline-block text-xs font-bold tracking-tight">
                  {cartCount > 0 ? `₹${cartTotal.toLocaleString('en-IN')}` : 'Cart'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* SECONDARY NAVIGATION BAR (Desktop) */}
        <div className="hidden lg:block border-t border-slate-100 bg-slate-50/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between text-xs font-semibold tracking-wide py-1.5">
              {/* Left Secondary Links */}
              <div className="flex items-center gap-1 xl:gap-2">
                <Link
                  href="/shop?category=smartphones"
                  className="px-3 py-1.5 rounded-md text-slate-800 hover:text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-1 font-bold"
                >
                  <Smartphone className="w-3.5 h-3.5 text-orange-500" />
                  <span>Buy Phone</span>
                </Link>
                <Link
                  href="/sell-device?category=phone"
                  className="px-3 py-1.5 rounded-md text-slate-800 hover:text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-1 text-orange-600 font-bold bg-orange-50/50"
                >
                  <span>Sell Phone</span>
                  <span className="px-1.5 py-0.2 text-[9px] font-extrabold uppercase rounded bg-orange-500 text-white">
                    Cash
                  </span>
                </Link>
                <Link
                  href="/sell-device?category=laptop"
                  className="px-2.5 py-1.5 rounded-md text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  Sell Laptop
                </Link>
                <Link
                  href="/sell-device?category=tablet"
                  className="px-2.5 py-1.5 rounded-md text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  Sell Tablet
                </Link>
                <Link
                  href="/sell-device?category=smartwatch"
                  className="px-2.5 py-1.5 rounded-md text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  Sell Smartwatch
                </Link>
                <span className="h-3 w-px bg-slate-200 mx-1" />
                <Link
                  href="/shop?category=accessories"
                  className="px-2.5 py-1.5 rounded-md text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  Accessories
                </Link>
                <Link
                  href="/shop?deal=true"
                  className="px-2.5 py-1.5 rounded-md text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-1"
                >
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  <span>Deals</span>
                </Link>
                <Link
                  href="/#brands"
                  className="px-2.5 py-1.5 rounded-md text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  Brands
                </Link>
              </div>

              {/* Right Secondary Links */}
              <div className="flex items-center gap-3 text-xs">
                <Link
                  href="/contact?topic=corporate-buyback"
                  className="text-slate-600 hover:text-orange-600 transition-colors font-medium flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Corporate Buyback</span>
                </Link>
                <span className="h-3 w-px bg-slate-200" />
                <Link
                  href="/contact"
                  className="text-slate-800 hover:text-orange-600 font-bold flex items-center gap-1"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-3 h-3 text-orange-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-50 overflow-y-auto">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                  <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <span className="font-extrabold text-sm text-slate-900">A1 MOBILE SHOP</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Badges */}
            <div className="p-4 grid grid-cols-2 gap-2 border-b border-slate-100 bg-orange-50/40">
              <Link
                href="/shop?category=smartphones"
                className="bg-white border border-slate-200 p-2.5 rounded-xl text-center shadow-xs"
              >
                <span className="block text-[10px] uppercase font-bold text-slate-400">Explore</span>
                <span className="block text-xs font-bold text-slate-900 mt-0.5">Buy Phone</span>
              </Link>
              <Link
                href="/sell-device"
                className="bg-orange-500 text-white p-2.5 rounded-xl text-center shadow-xs"
              >
                <span className="block text-[10px] uppercase font-bold text-orange-100">Get Cash</span>
                <span className="block text-xs font-bold text-white mt-0.5">Sell Device</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="p-4 space-y-1 text-sm font-semibold text-slate-700">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Buy &amp; Shop
              </div>
              <Link
                href="/shop?category=smartphones"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <span>Smartphones</span>
                <span className="text-xs text-orange-500 font-bold">New</span>
              </Link>
              <Link
                href="/shop?category=accessories"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <span>Accessories &amp; Chargers</span>
              </Link>
              <Link
                href="/shop?category=smartwatches"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <span>Smartwatches</span>
              </Link>
              <Link
                href="/shop?category=tablets"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <span>Tablets</span>
              </Link>
              <Link
                href="/shop?category=mobile-covers"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <span>Mobile Covers</span>
              </Link>
              <Link
                href="/shop?deal=true"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-rose-600 bg-rose-50/50"
              >
                <span>Best Deals &amp; Discounts</span>
                <Flame className="w-4 h-4" />
              </Link>

              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1">
                Sell &amp; Exchange (Instant UPI)
              </div>
              <Link
                href="/sell-device?category=phone"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-orange-50 text-slate-900"
              >
                <span>Sell Old Phone</span>
                <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                  Doorstep
                </span>
              </Link>
              <Link
                href="/sell-device?category=laptop"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <span>Sell Laptop</span>
              </Link>
              <Link
                href="/sell-device?category=tablet"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <span>Sell Tablet</span>
              </Link>
              <Link
                href="/sell-device?category=smartwatch"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <span>Sell Smartwatch</span>
              </Link>

              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1">
                Store &amp; Support
              </div>
              <Link
                href="/about"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <span>About A1 Mobile Shop</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <span>Contact &amp; Store Location</span>
              </Link>
            </div>

            {/* Mobile Footer */}
            <div className="mt-auto p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Basharatpur, Gorakhpur, UP</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="tel:+919876543210" className="font-semibold text-slate-900">
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Login Modal */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsAccountModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl z-50 text-center">
            <button
              onClick={() => setIsAccountModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Welcome to A1 Mobile Shop</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Login to track your orders, manage device sell quotes, and access exclusive Gorakhpur store offers.
            </p>
            <div className="space-y-3">
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
              <button
                type="button"
                onClick={() => {
                  alert('OTP sent to your mobile number!');
                  setIsAccountModalOpen(false);
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-sm transition-colors shadow-sm"
              >
                Request OTP →
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-4">
              By proceeding, you agree to A1 Mobile Shop Terms &amp; Privacy Policy.
            </p>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
