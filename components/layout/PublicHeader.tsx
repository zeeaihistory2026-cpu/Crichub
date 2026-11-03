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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/matches', label: 'Matches' },
    { href: '/tournaments', label: 'Tournaments' },
    { href: '/players', label: 'Players' },
    { href: '/stats', label: 'Stats & Records' },
    { href: '/tools', label: 'Tools' },
    { href: '/qualification', label: 'Qualification Lab' },
    { href: '/local', label: 'Local Cricket' },
    { href: '/news', label: 'News & Learn' },
  ];

  return (
    <>
      {/* Top Precision Alert Banner */}
      <div className="bg-navy text-white text-[11px] py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-slate-800">
        <span className="w-2 h-2 rounded-full bg-emerald-400 green-pulse-glow"></span>
        <span className="text-slate-300">
          <strong className="text-white uppercase font-extrabold tracking-wider font-mono">CREASEGRID</strong>
          <span className="text-slate-500 mx-2">·</span>
          <span>Global Cricket Intelligence originating in Pakistan</span>
          <span className="text-slate-500 mx-2">·</span>
          <span className="text-emerald-400 font-mono font-semibold">Verified MCC/ICC Algorithms</span>
        </span>
      </div>

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-17 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-navy flex items-center justify-center text-white font-black text-sm shadow-sm shadow-brand-500/20 group-hover:shadow-glow transition-all duration-300 relative overflow-hidden">
              <span className="relative z-10 font-mono">C</span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </span>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tightest text-navy flex items-center">
                Crease<span className="text-brand-600">Grid</span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 font-semibold tracking-tight uppercase font-mono hidden sm:block">
                Cricket Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
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

          {/* Action Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon Button Only */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-slate-500 hover:text-navy hover:bg-slate-100/80 border border-transparent hover:border-slate-200 transition shadow-2xs group btn-tactile"
              aria-label="Search"
              title="Search (⌘K)"
            >
              <Search className="w-4 h-4 text-slate-500 group-hover:text-brand-600 transition" />
            </button>

            {/* Quick Role Dashboard Selectors */}
            <div className="hidden sm:flex items-center gap-1.5 pl-1 border-l border-slate-200">
              <Link
                href="/me"
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-brand-600 hover:bg-slate-100 transition flex items-center gap-1.5"
                title="Personalized Fan Space"
              >
                <User className="w-3.5 h-3.5 text-brand-600" />
                <span>My Cricket</span>
              </Link>
              <Link
                href="/organizer"
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 transition shadow-xs shadow-brand-500/20 flex items-center gap-1.5 btn-tactile"
                title="Tournament Organizer Console"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Organizer</span>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              aria-label="Toggle navigation drawer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 py-4 space-y-1 shadow-xl">
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
                href="/me"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-100 text-xs font-bold text-navy"
              >
                <User className="w-4 h-4 text-brand-600" />
                <span>My Cricket (Fan Space)</span>
              </Link>
              <Link
                href="/organizer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 p-2 rounded-xl bg-brand-600 text-white text-xs font-bold"
              >
                <Trophy className="w-4 h-4" />
                <span>Tournament Organizer</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
