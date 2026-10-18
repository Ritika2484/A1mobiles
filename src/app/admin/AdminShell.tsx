'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Order Enquiries', href: '/admin/orders', icon: MessageSquare },
];

function NavLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
        isActive
          ? 'bg-[#F5EFE6] text-[#23201C] shadow-sm'
          : 'text-[#8E867C] hover:text-[#F5EFE6] hover:bg-[#23201C]'
      }`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

function SidebarContent({
  onLogout,
  isLoggingOut,
}: {
  onLogout: () => void;
  isLoggingOut: boolean;
}) {
  return (
    <div className="flex flex-col h-full bg-[#1C1A17] text-[#F5EFE6]">
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#2D2924]">
        <div className="w-8 h-8 rounded-lg bg-[#F5EFE6] text-[#23201C] flex items-center justify-center shrink-0">
          <ShoppingBag className="w-4 h-4" />
        </div>
        <div>
          <span className="text-sm font-semibold text-white leading-none block">A1 Mobile</span>
          <span className="text-[10px] text-[#A89F91] font-medium uppercase tracking-wider">Admin Panel</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>

      {/* Footer actions */}
      <div className="p-3 space-y-1 border-t border-[#2D2924]">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#8E867C] hover:text-[#F5EFE6] hover:bg-[#23201C] transition-colors"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          <span>View Store</span>
        </a>
        <button
          onClick={onLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#8E867C] hover:text-rose-400 hover:bg-rose-950/40 transition-colors disabled:opacity-50"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>{isLoggingOut ? 'Logging out…' : 'Log Out'}</span>
        </button>
      </div>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#141210]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-[#1C1A17] border-r border-[#2D2924] shrink-0">
        <SidebarContent onLogout={handleLogout} isLoggingOut={isLoggingOut} />
      </aside>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="relative w-56 bg-[#1C1A17] border-r border-[#2D2924] h-full z-10 shadow-2xl">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 p-1 text-[#8E867C] hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent onLogout={handleLogout} isLoggingOut={isLoggingOut} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#1C1A17] border-b border-[#2D2924]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#F5EFE6] text-[#23201C] flex items-center justify-center">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-semibold text-white">A1 Admin</span>
          </div>
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-1.5 rounded-lg text-[#8E867C] hover:text-white hover:bg-[#23201C] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-[#141210]">
          {children}
        </main>
      </div>
    </div>
  );
}
