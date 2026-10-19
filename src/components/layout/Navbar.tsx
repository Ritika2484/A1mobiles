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
  ChevronDown,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { SearchModal } from '@/components/search/SearchModal';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AuthModal } from '@/components/auth/AuthModal';

export function Navbar() {
  const pathname = usePathname();
  const { cartCount, cartTotal, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, openAuthModal, logout } = useAuth();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
        className={`sticky top-0 z-40 w-full bg-[#F5EFE6]/95 backdrop-blur-md transition-all duration-200 border-b border-[#E0D9CD] shadow-xs ${
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
                className="lg:hidden p-2 rounded-lg text-[#23201C] hover:bg-[#EAE4D9] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-[#DED7CA] shadow-xs group-hover:border-[#23201C] transition-colors shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="A1 Mobile Shop Logo"
                    fill
                    sizes="(max-width: 640px) 44px, 48px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#23201C]">
                      A1
                    </span>
                    <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#564F46]">
                      MOBILE
                    </span>
                    <Smartphone className="w-4 h-4 text-[#564F46] stroke-[2.5] hidden xs:inline-block" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.22em] text-[#6E685F] leading-tight">
                    SHOP GORAKHPUR
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Large Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-2">
              <div
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center bg-[#EAE4D9]/80 hover:bg-[#EAE4D9] border border-[#DED7CA] hover:border-[#564F46] rounded-full px-4 py-2 transition-all cursor-pointer group"
              >
                <Search className="w-4 h-4 text-[#6E685F] group-hover:text-[#23201C] mr-2.5 shrink-0" />
                <span className="text-xs sm:text-sm text-[#6E685F] select-none flex-1 truncate">
                  Search for smartphones, accessories &amp; more
                </span>
                <button
                  type="button"
                  className="bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] text-xs font-semibold px-3.5 py-1 rounded-full transition-colors shrink-0 flex items-center gap-1 shadow-xs"
                >
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* Right: Call Us, Location, Login, Wishlist, Cart */}
            <div className="flex items-center gap-2 sm:gap-3.5 lg:gap-4 shrink-0">
              {/* Call Us - Desktop */}
              <a
                href="tel:+918726942338"
                className="hidden xl:flex items-center gap-2 text-[#23201C] hover:text-[#564F46] transition-colors"
                title="Call A1 Mobile Shop"
              >
                <div className="w-8 h-8 rounded-full bg-[#EAE4D9] flex items-center justify-center text-[#23201C]">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[10px] uppercase font-semibold text-[#6E685F]">Call Us</span>
                  <span className="text-xs font-bold text-[#23201C] mt-0.5">+91 87269 42338</span>
                </div>
              </a>

              {/* Store Location - Desktop */}
              <Link
                href="/contact"
                className="hidden xl:flex items-center gap-2 text-[#23201C] hover:text-[#564F46] transition-colors"
                title="Visit Basharatpur, Gorakhpur store"
              >
                <div className="w-8 h-8 rounded-full bg-[#EAE4D9] flex items-center justify-center text-[#23201C]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[10px] uppercase font-semibold text-[#6E685F]">Store</span>
                  <span className="text-xs font-bold text-[#23201C] mt-0.5">Gorakhpur</span>
                </div>
              </Link>

              {/* Mobile Search Icon Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-lg text-[#23201C] hover:bg-[#EAE4D9] transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Account / Login */}
              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#23201C] bg-[#EAE4D9] hover:bg-[#DFD8CC] px-3 py-1.5 rounded-xl transition-colors border border-[#DED7CA]"
                  >
                    <div className="w-5 h-5 rounded-md bg-[#23201C] text-[#F5EFE6] flex items-center justify-center text-[10px] font-extrabold uppercase">
                      {user.name.charAt(0)}
                    </div>
                    <span className="hidden sm:inline max-w-[90px] truncate">{user.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#6E685F]" />
                  </button>

                  {isUserMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-52 bg-[#F5EFE6] rounded-2xl shadow-xl border border-[#E0D9CD] py-1.5 z-50 text-xs animate-in fade-in-50"
                      onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                      <div className="px-3.5 py-2 border-b border-[#E0D9CD]">
                        <p className="font-extrabold text-[#23201C] truncate">{user.name}</p>
                        <p className="text-[#6E685F] text-[11px] truncate">{user.email}</p>
                      </div>
                      <button
                        type="button"
                        onClick={async () => {
                          setIsUserMenuOpen(false);
                          await logout();
                        }}
                        className="w-full text-left flex items-center gap-2 px-3.5 py-2 text-rose-700 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#23201C] hover:text-[#564F46] px-2.5 py-1.5 rounded-lg hover:bg-[#EAE4D9] transition-colors"
                >
                  <User className="w-4 h-4 text-[#6E685F]" />
                  <span>Login / Sign Up</span>
                </button>
              )}

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="relative p-2 rounded-lg text-[#23201C] hover:bg-[#EAE4D9] transition-colors"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#564F46] text-[#F5EFE6] text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] px-3 sm:px-3.5 py-2 rounded-full transition-all duration-200 shadow-xs group"
                aria-label="Shopping Cart"
              >
                <div className="relative">
                  <ShoppingCart className="w-4 h-4 text-[#F5EFE6]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-[#564F46] text-[#F5EFE6] text-[10px] font-bold flex items-center justify-center border-2 border-[#23201C]">
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
        <div className="hidden lg:block border-t border-[#E0D9CD] bg-[#EAE4D9]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between text-xs font-semibold tracking-wide py-1.5">
              {/* Left Secondary Links */}
              <div className="flex items-center gap-1 xl:gap-2">
                <Link
                  href="/shop?category=smartphones"
                  className="px-3 py-1.5 rounded-md text-[#23201C] hover:bg-[#EAE4D9] transition-colors flex items-center gap-1 font-bold"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#564F46]" />
                  <span>Buy Phone</span>
                </Link>
                <Link
                  href="/sell-device"
                  className="px-3 py-1.5 rounded-md text-[#23201C] hover:bg-[#EAE4D9] transition-colors flex items-center gap-1.5 font-bold"
                >
                  <span>Sell Old Device</span>
                  <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded bg-[#23201C] text-[#F5EFE6]">
                    Instant Cash
                  </span>
                </Link>
                <span className="h-3 w-px bg-[#DED7CA] mx-1" />
                <Link
                  href="/shop?category=accessories"
                  className="px-2.5 py-1.5 rounded-md text-[#6E685F] hover:text-[#23201C] hover:bg-[#EAE4D9] transition-colors"
                >
                  Accessories
                </Link>
                <Link
                  href="/shop?deal=true"
                  className="px-2.5 py-1.5 rounded-md text-[#23201C] hover:bg-[#EAE4D9] transition-colors flex items-center gap-1 font-bold"
                >
                  <Flame className="w-3.5 h-3.5 text-[#564F46]" />
                  <span>Deals</span>
                </Link>
                <Link
                  href="/shop"
                  className="px-2.5 py-1.5 rounded-md text-[#6E685F] hover:text-[#23201C] hover:bg-[#EAE4D9] transition-colors"
                >
                  Brands
                </Link>
              </div>

              {/* Right Secondary Links */}
              <div className="flex items-center gap-3 text-xs">
                <Link
                  href="/contact?topic=corporate-buyback"
                  className="text-[#6E685F] hover:text-[#23201C] transition-colors font-medium flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E6B47]" />
                  <span>Corporate Buyback</span>
                </Link>
                <span className="h-3 w-px bg-[#DED7CA]" />
                <Link
                  href="/contact"
                  className="text-[#23201C] hover:text-[#564F46] font-bold flex items-center gap-1"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-3 h-3 text-[#564F46]" />
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
            className="fixed inset-0 bg-[#23201C]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#F5EFE6] shadow-2xl flex flex-col z-50 overflow-y-auto border-r border-[#E0D9CD]">
            {/* Header */}
            <div className="p-4 border-b border-[#E0D9CD] flex items-center justify-between bg-[#EAE4D9]">
              <div className="flex items-center gap-2">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-[#DED7CA] shrink-0">
                  <Image src="/images/logo.png" alt="Logo" fill sizes="36px" className="object-cover" />
                </div>
                <span className="font-extrabold text-sm text-[#23201C]">A1 MOBILE SHOP</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-[#6E685F] hover:bg-[#DFD8CC]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Account Bar */}
            <div className="p-3 border-b border-[#E0D9CD] bg-[#EAE4D9]/60">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#23201C] text-[#F5EFE6] flex items-center justify-center font-bold text-xs uppercase shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-[#23201C] text-xs truncate">{user.name}</div>
                      <div className="text-[10px] text-[#6E685F] truncate">{user.email}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      setIsMobileMenuOpen(false);
                      await logout();
                    }}
                    className="text-xs text-rose-700 font-bold hover:underline shrink-0 pl-2"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] font-bold rounded-xl text-xs shadow-xs"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In / Create Account</span>
                </button>
              )}
            </div>

            {/* Quick Action Badges */}
            <div className="p-4 grid grid-cols-2 gap-2 border-b border-[#E0D9CD] bg-[#EAE4D9]/40">
              <Link
                href="/shop?category=smartphones"
                className="bg-[#F5EFE6] border border-[#E0D9CD] p-2.5 rounded-xl text-center shadow-xs"
              >
                <span className="block text-[10px] uppercase font-bold text-[#6E685F]">Explore</span>
                <span className="block text-xs font-bold text-[#23201C] mt-0.5">Buy Phone</span>
              </Link>
              <Link
                href="/sell-device"
                className="bg-[#23201C] text-[#F5EFE6] p-2.5 rounded-xl text-center shadow-xs"
              >
                <span className="block text-[10px] uppercase font-bold text-[#C8BFB4]">Get Cash</span>
                <span className="block text-xs font-bold text-[#F5EFE6] mt-0.5">Sell Device</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="p-4 space-y-1 text-sm font-semibold text-[#23201C]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#6E685F] px-3 py-1">
                Buy &amp; Shop
              </div>
              <Link
                href="/shop?category=smartphones"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#EAE4D9]"
              >
                <span>Smartphones</span>
                <span className="text-xs text-[#564F46] font-bold">New</span>
              </Link>
              <Link
                href="/shop?category=accessories"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#EAE4D9]"
              >
                <span>Accessories &amp; Chargers</span>
              </Link>
              <Link
                href="/shop?category=smartwatches"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#EAE4D9]"
              >
                <span>Smartwatches</span>
              </Link>
              <Link
                href="/shop?category=tablets"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#EAE4D9]"
              >
                <span>Tablets</span>
              </Link>
              <Link
                href="/shop?category=mobile-covers"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#EAE4D9]"
              >
                <span>Mobile Covers</span>
              </Link>
              <Link
                href="/shop?deal=true"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-[#23201C] bg-[#EAE4D9]/80 font-bold"
              >
                <span>Best Deals &amp; Discounts</span>
                <Flame className="w-4 h-4 text-[#564F46]" />
              </Link>

              <div className="text-[10px] font-bold uppercase tracking-wider text-[#6E685F] px-3 pt-3 pb-1">
                Sell &amp; Exchange (Instant UPI)
              </div>
              <Link
                href="/sell-device"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#EAE4D9] text-[#23201C]"
              >
                <span>Sell Old Device</span>
                <span className="text-[10px] font-bold bg-[#23201C] text-[#F5EFE6] px-2 py-0.5 rounded">
                  Instant Cash
                </span>
              </Link>

              <div className="text-[10px] font-bold uppercase tracking-wider text-[#6E685F] px-3 pt-3 pb-1">
                Store &amp; Support
              </div>
              <Link
                href="/about"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#EAE4D9]"
              >
                <span>About A1 Mobile Shop</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#EAE4D9]"
              >
                <span>Contact &amp; Store Location</span>
              </Link>
            </div>

            {/* Mobile Footer */}
            <div className="mt-auto p-4 border-t border-[#E0D9CD] bg-[#EAE4D9] text-xs text-[#6E685F] space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#564F46] shrink-0" />
                <span>Basharatpur, Gorakhpur, UP</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#564F46] shrink-0" />
                <a href="tel:+918726942338" className="font-semibold text-[#23201C]">
                  +91 87269 42338
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Auth Modal (Sign In & Register, No OTP) */}
      <AuthModal />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
