'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Trophy, User, ChevronRight } from 'lucide-react';

interface PublicHeaderProps {
  onOpenSearch?: () => void;
}

export default function PublicHeader({ onOpenSearch }: PublicHeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Clean, perfectly spaced primary navigation
  const navLinks = [
    { href: '/matches', label: 'Matches' },
    { href: '/tournaments', label: 'Tournaments' },
    { href: '/qualification', label: 'Qualification' },
    { href: '/stats', label: 'Stats' },
    { href: '/tools', label: 'Tools' },
    { href: '/news', label: 'News' },
    { href: '/local', label: 'Local' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-navy flex items-center justify-center text-white font-mono font-black text-sm shadow-sm shadow-brand-500/20 group-hover:shadow-glow transition-all duration-300">
            C
          </span>
          <span className="font-display font-black text-xl tracking-tightest text-navy">
            Crease<span className="text-brand-600">Grid</span>
          </span>
        </Link>

        {/* Clean Center Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-tight transition relative ${
                  isActive
                    ? 'text-brand-600 bg-brand-50 font-bold'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-100/70'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Utilities */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Search Icon Button */}
          <button
            onClick={onOpenSearch}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-navy hover:bg-slate-100 transition btn-tactile"
            aria-label="Search"
            title="Search (⌘K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Organizer Console Action */}
          <Link
            href="/organizer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 transition shadow-xs shadow-brand-500/20 btn-tactile"
            title="Organizer Workspace"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Organizer</span>
          </Link>

          {/* Profile Icon Only (No Text) */}
          <Link
            href="/me"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-50 hover:text-brand-600 border border-slate-200/90 flex items-center justify-center text-slate-700 transition shadow-2xs btn-tactile"
            title="Profile & My Cricket"
            aria-label="Profile"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1.5 rounded-xl text-slate-600 hover:bg-slate-100 transition"
            aria-label="Toggle navigation drawer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 py-4 space-y-1 shadow-xl">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-brand-600 transition"
          >
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-brand-600 transition"
            >
              <span>{link.label}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <Link
              href="/organizer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-xs"
            >
              <Trophy className="w-4 h-4" />
              <span>Organizer Workspace</span>
            </Link>
            <Link
              href="/me"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-100 text-xs font-bold text-navy"
            >
              <User className="w-4 h-4 text-brand-600" />
              <span>Profile (My Cricket)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
