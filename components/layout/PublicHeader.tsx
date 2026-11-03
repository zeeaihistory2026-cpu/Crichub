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
  Wrench,
  Trophy,
  User,
  Home,
  BarChart3,
  Users,
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

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/matches', label: 'Live Scores', icon: Radio },
    { href: '/matches', label: 'Matches', icon: Calendar },
    { href: '/tools', label: 'Tools', hasDropdown: true },
    { href: '/qualification', label: 'Qualification Lab', icon: Trophy },
    { href: '/tournaments', label: 'Tournaments' },
    { href: '/news', label: 'News' },
  ];

  const toolsDropdownItems = [
    { href: '/tools/net-run-rate', name: 'Net Run Rate Calculator' },
    { href: '/tools/required-run-rate', name: 'Required Run Rate' },
    { href: '/tools/run-rate', name: 'Run Rate (RPO)' },
    { href: '/tools/batting-average', name: 'Batting Average' },
    { href: '/tools/batting-strike-rate', name: 'Batting Strike Rate' },
    { href: '/tools/overs-converter', name: 'Overs to Balls Converter' },
    { href: '/tools', name: 'View All 12 Calculators →' },
  ];

  const moreDropdownItems = [
    { href: '/players', name: 'Player Directory & Records', icon: User },
    { href: '/compare', name: 'Player Comparison Lab', icon: BarChart3 },
    { href: '/stats', name: 'Stats & Records Explorer', icon: BarChart3 },
    { href: '/local', name: 'Local Cricket Network', icon: Building2 },
    { href: '/organizer', name: 'Tournament Organizer Workspace', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface/95 dark:bg-surface/95 backdrop-blur-md border-b border-line shadow-xs transition-colors duration-200">
      {/* Spacious container with ample padding above and below */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4.5 flex items-center justify-between gap-4 sm:gap-6">
        {/* Left: Brand Logo */}
        <BrandLogo />

        {/* Center: Desktop Navigation Bar with generous link padding */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {/* Home Link */}
          <Link
            href="/"
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight transition flex items-center gap-2 ${
              pathname === '/'
                ? 'bg-brand text-white dark:bg-lime dark:text-canvas font-bold shadow-xs'
                : 'text-ink-muted hover:text-ink hover:bg-surface-alt'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>

          {/* Live Scores */}
          <Link
            href="/matches"
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight transition flex items-center gap-2 ${
              pathname === '/matches'
                ? 'bg-brand text-white dark:bg-lime dark:text-canvas font-bold'
                : 'text-ink-muted hover:text-ink hover:bg-surface-alt'
            }`}
          >
            <Radio className="w-4 h-4 text-alert animate-pulse" />
            <span>Live Scores</span>
          </Link>

          {/* Matches */}
          <Link
            href="/matches"
            className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight text-ink-muted hover:text-ink hover:bg-surface-alt transition flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Matches</span>
          </Link>

          {/* Tools with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <Link
              href="/tools"
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight transition flex items-center gap-1.5 ${
                pathname.startsWith('/tools')
                  ? 'bg-brand text-white dark:bg-lime dark:text-canvas font-bold'
                  : 'text-ink-muted hover:text-ink hover:bg-surface-alt'
              }`}
            >
              <span>Tools</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </Link>

            {toolsOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-surface dark:bg-surface border border-line rounded-2xl shadow-xl py-2.5 z-50 animate-fade-in">
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

          {/* Qualification Lab */}
          <Link
            href="/qualification"
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight transition flex items-center gap-2 ${
              pathname === '/qualification'
                ? 'bg-brand text-white dark:bg-lime dark:text-canvas font-bold shadow-xs'
                : 'text-ink-muted hover:text-ink hover:bg-surface-alt'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Qualification Lab</span>
          </Link>

          {/* Tournaments */}
          <Link
            href="/tournaments"
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight transition ${
              pathname === '/tournaments'
                ? 'bg-brand text-white dark:bg-lime dark:text-canvas font-bold'
                : 'text-ink-muted hover:text-ink hover:bg-surface-alt'
            }`}
          >
            Tournaments
          </Link>

          {/* News */}
          <Link
            href="/news"
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight transition ${
              pathname.startsWith('/news')
                ? 'bg-brand text-white dark:bg-lime dark:text-canvas font-bold'
                : 'text-ink-muted hover:text-ink hover:bg-surface-alt'
            }`}
          >
            News
          </Link>

          {/* More Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight text-ink-muted hover:text-ink hover:bg-surface-alt transition flex items-center gap-1.5"
              aria-label="More navigation options"
            >
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {moreOpen && (
              <div className="absolute top-full right-0 mt-2 w-68 bg-surface dark:bg-surface border border-line rounded-2xl shadow-xl py-2.5 z-50 animate-fade-in">
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

        {/* Right: Actions (Search, Theme, Profile, Sign In) with balanced spacing */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Search Icon Button */}
          <button
            onClick={onOpenSearch}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-ink-muted hover:text-ink bg-surface dark:bg-surface-alt border border-line hover:border-accent transition shadow-2xs btn-tactile"
            aria-label="Search"
            title="Search (⌘K)"
          >
            <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          {/* Theme Toggle (Sun ☀️ / Moon 🌙) */}
          <ThemeToggle />

          {/* Profile Avatar Icon Only (No Text) */}
          <Link
            href="/me"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface dark:bg-surface-alt border border-line hover:border-lime flex items-center justify-center text-ink-muted hover:text-ink transition shadow-2xs btn-tactile"
            title="My Profile & Followed Cricket"
            aria-label="Profile"
          >
            <User className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </Link>

          {/* Sign In / Organizer Button */}
          <Link
            href="/organizer"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold bg-brand text-white hover:bg-brand-hover dark:bg-lime dark:text-canvas dark:hover:bg-lime-hover transition shadow-xs btn-tactile"
            title="Sign In / Organizer Workspace"
          >
            Sign In
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl text-ink-muted hover:bg-surface-alt transition"
            aria-label="Toggle navigation drawer"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-line bg-surface/95 dark:bg-surface/95 backdrop-blur-xl px-4 py-5 space-y-1.5 shadow-xl animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-ink-muted hover:bg-surface-alt hover:text-ink transition"
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </Link>
          ))}
          <Link
            href="/players"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-ink-muted hover:bg-surface-alt hover:text-ink transition"
          >
            <span>Players &amp; Records</span>
            <ChevronRight className="w-4 h-4 opacity-40" />
          </Link>
          <Link
            href="/local"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-ink-muted hover:bg-surface-alt hover:text-ink transition"
          >
            <span>Local Cricket Network</span>
            <ChevronRight className="w-4 h-4 opacity-40" />
          </Link>

          <div className="pt-4 mt-2 border-t border-line flex flex-col gap-2.5">
            <Link
              href="/organizer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-brand text-white dark:bg-lime dark:text-canvas text-xs sm:text-sm font-bold shadow-xs"
            >
              <Trophy className="w-4 h-4" />
              <span>Organizer Workspace</span>
            </Link>
            <Link
              href="/me"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-surface-alt text-xs sm:text-sm font-bold text-ink"
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
