'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandLogo from '@/components/ui/BrandLogo';
import ThemeToggle from '@/components/ui/ThemeToggle';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Radio,
  Calendar,
  Trophy,
  User,
  Home,
  BarChart3,
  Building2,
  Newspaper,
} from 'lucide-react';

interface PublicHeaderProps {
  onOpenSearch?: () => void;
}

export default function PublicHeader({ onOpenSearch }: PublicHeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const toolsDropdownItems = [
    { href: '/tools/net-run-rate', name: 'Net Run Rate (NRR) Calculator' },
    { href: '/tools/required-run-rate', name: 'Required Run Rate (RRR)' },
    { href: '/tools/run-rate', name: 'Current Run Rate (RPO)' },
    { href: '/tools/batting-average', name: 'Batting Average' },
    { href: '/tools/batting-strike-rate', name: 'Batting Strike Rate' },
    { href: '/tools/overs-converter', name: 'Overs to Balls Converter' },
    { href: '/tools/target-score', name: 'Target Score (DLS Baseline)' },
    { href: '/tools/partnership', name: 'Partnership Calculator' },
    { href: '/tools', name: 'View All 12 Calculators →' },
  ];

  const moreDropdownItems = [
    { href: '/tournaments', name: 'PSL & Global Tournaments', icon: Trophy },
    { href: '/news', name: 'Cricket News & Editorial', icon: Newspaper },
    { href: '/players', name: 'Player Directory & Profiles', icon: User },
    { href: '/compare', name: 'Player Comparison Lab', icon: BarChart3 },
    { href: '/stats', name: 'Stats & Records Explorer', icon: BarChart3 },
    { href: '/local', name: 'Local Cricket Network', icon: Building2 },
    { href: '/organizer', name: 'Organizer Workspace', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface/90 dark:bg-surface/90 backdrop-blur-md border-b border-line shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <BrandLogo />

        {/* Center: Desktop Navigation Bar matching Image 2 */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2" aria-label="Main Navigation">
          {/* 1. Home Link (Active pill matching Image 2) */}
          <Link
            href="/"
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-bold tracking-tight transition flex items-center gap-1.5 ${
              pathname === '/'
                ? 'bg-brand text-white dark:bg-lime dark:text-canvas shadow-xs'
                : 'text-ink-muted hover:text-ink hover:bg-surface-alt'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>

          {/* 2. Live Scores */}
          <Link
            href="/matches"
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight transition flex items-center gap-1.5 ${
              pathname === '/matches'
                ? 'bg-brand text-white dark:bg-lime dark:text-canvas font-bold shadow-xs'
                : 'text-ink-muted hover:text-ink hover:bg-surface-alt'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alert opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-alert" />
            </span>
            <span>Live Scores</span>
          </Link>

          {/* 3. Matches */}
          <Link
            href="/matches"
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight text-ink-muted hover:text-ink hover:bg-surface-alt transition flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 opacity-70" />
            <span>Matches</span>
          </Link>

          {/* 4. Tools with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <Link
              href="/tools"
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight transition flex items-center gap-1 ${
                pathname.startsWith('/tools')
                  ? 'bg-brand text-white dark:bg-lime dark:text-canvas font-bold shadow-xs'
                  : 'text-ink-muted hover:text-ink hover:bg-surface-alt'
              }`}
            >
              <span>Tools</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </Link>

            {toolsOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-surface border border-line rounded-2xl shadow-xl py-2 z-50 animate-fade-in">
                {toolsDropdownItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setToolsOpen(false)}
                    className="block px-4 py-2 text-xs text-ink-muted hover:text-ink hover:bg-surface-alt transition font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 5. Qualification Lab */}
          <Link
            href="/qualification"
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight transition flex items-center gap-1.5 ${
              pathname === '/qualification'
                ? 'bg-brand text-white dark:bg-lime dark:text-canvas font-bold shadow-xs'
                : 'text-ink-muted hover:text-ink hover:bg-surface-alt'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Qualification Lab</span>
          </Link>

          {/* 6. More Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight text-ink-muted hover:text-ink hover:bg-surface-alt transition flex items-center gap-1"
              aria-label="More navigation options"
            >
              <span>More</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {moreOpen && (
              <div className="absolute top-full right-0 mt-1 w-68 bg-surface border border-line rounded-2xl shadow-xl py-2 z-50 animate-fade-in">
                {moreDropdownItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs text-ink-muted hover:text-ink hover:bg-surface-alt transition font-medium"
                    >
                      <Icon className="w-4 h-4 text-tealAccent" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right: Exactly 3 Action Circle Buttons matching Image 2 */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Search Icon Button */}
          <button
            onClick={onOpenSearch}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-ink-muted hover:text-ink bg-surface dark:bg-surface-alt border border-line hover:border-tealAccent transition shadow-2xs btn-tactile"
            aria-label="Search"
            title="Search (⌘K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Profile Avatar Icon Only */}
          <Link
            href="/me"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface dark:bg-surface-alt border border-line hover:border-lime flex items-center justify-center text-ink-muted hover:text-ink transition shadow-2xs btn-tactile"
            title="My Profile & Followed Cricket"
            aria-label="Profile"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Mobile Hamburger Drawer Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl text-ink-muted hover:bg-surface-alt transition"
            aria-label="Toggle navigation drawer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-line bg-surface/98 dark:bg-surface/98 backdrop-blur-xl px-4 py-4 space-y-1 shadow-xl animate-fade-in">
          {[
            { href: '/', label: 'Home', icon: Home },
            { href: '/matches', label: 'Live Scores', icon: Radio },
            { href: '/matches', label: 'Matches', icon: Calendar },
            { href: '/tools', label: 'Cricket Calculators', icon: Trophy },
            { href: '/qualification', label: 'Qualification Lab', icon: Trophy },
            { href: '/tournaments', label: 'Tournaments', icon: Trophy },
            { href: '/news', label: 'News & Editorial', icon: Newspaper },
            { href: '/players', label: 'Players & Records', icon: User },
            { href: '/compare', label: 'Player Comparison', icon: BarChart3 },
            { href: '/local', label: 'Local Cricket Network', icon: Building2 },
          ].map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-ink-muted hover:bg-surface-alt hover:text-ink transition"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-tealAccent" />
                  <span>{link.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </Link>
            );
          })}

          <div className="pt-3 mt-2 border-t border-line flex flex-col gap-2">
            <Link
              href="/organizer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-brand text-white dark:bg-lime dark:text-canvas text-xs sm:text-sm font-bold shadow-xs"
            >
              <Trophy className="w-4 h-4" />
              <span>Organizer Workspace</span>
            </Link>
            <Link
              href="/me"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-surface-alt text-xs sm:text-sm font-bold text-ink border border-line"
            >
              <User className="w-4 h-4 text-tealAccent" />
              <span>Profile (My Cricket)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
