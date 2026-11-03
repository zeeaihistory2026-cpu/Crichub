'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ui/ThemeToggle';
import {
  LayoutDashboard,
  Newspaper,
  Radio,
  Trophy,
  Users,
  BarChart3,
  Calculator,
  Building2,
  Settings,
  ShieldCheck,
  UserRound,
  Search,
  Bell,
  ChevronRight,
  CalendarDays,
  Heart,
  Bookmark,
  ExternalLink,
  Menu,
} from 'lucide-react';

export type DashboardRole = 'admin' | 'organizer' | 'user';

interface DashboardShellProps {
  role: DashboardRole;
  title: string;
  subtitle: string;
  eyebrow: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export default function DashboardShell({
  role,
  title,
  subtitle,
  eyebrow,
  children,
  actions,
}: DashboardShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  // Nav items per role
  const adminNav = [
    { label: 'OVERVIEW', items: [{ icon: LayoutDashboard, label: 'Overview', href: '/admin' }] },
    {
      label: 'CONTENT & DATA',
      items: [
        { icon: Newspaper, label: 'News & articles', href: '/news' },
        { icon: Radio, label: 'Matches & scores', href: '/matches' },
        { icon: Trophy, label: 'Tournaments', href: '/tournaments' },
        { icon: Users, label: 'Players & teams', href: '/players' },
        { icon: BarChart3, label: 'Stats & records', href: '/stats' },
        { icon: Calculator, label: 'Cricket tools', href: '/tools' },
      ],
    },
    {
      label: 'COMMUNITY & SYSTEM',
      items: [
        { icon: Building2, label: 'Local cricket', href: '/local' },
        { icon: Settings, label: 'Settings', href: '/me' },
      ],
    },
  ];

  const organizerNav = [
    {
      label: 'WORKSPACE',
      items: [
        { icon: LayoutDashboard, label: 'Overview', href: '/organizer' },
        { icon: CalendarDays, label: 'Fixtures & results', href: '/matches' },
        { icon: Radio, label: 'Live scoring pad', href: '/organizer/scoring' },
        { icon: Trophy, label: 'Standings', href: '/tournaments' },
      ],
    },
    {
      label: 'MANAGE',
      items: [
        { icon: Users, label: 'Teams & squads', href: '/organizer' },
        { icon: Calculator, label: 'Qualification Lab', href: '/qualification' },
        { icon: Settings, label: 'Settings', href: '/organizer' },
      ],
    },
  ];

  const userNav = [
    {
      label: 'MY SPACE',
      items: [
        { icon: LayoutDashboard, label: 'My dashboard', href: '/me' },
        { icon: Heart, label: 'Following', href: '/me' },
        { icon: Bookmark, label: 'Saved stories', href: '/me' },
        { icon: CalendarDays, label: 'Match calendar', href: '/matches' },
      ],
    },
    {
      label: 'EXPLORE',
      items: [
        { icon: Newspaper, label: 'Latest news', href: '/news' },
        { icon: Radio, label: 'Match centre', href: '/matches' },
        { icon: Calculator, label: 'Cricket tools', href: '/tools' },
        { icon: Trophy, label: 'Qualification Lab', href: '/qualification' },
      ],
    },
  ];

  const currentNavGroups = role === 'admin' ? adminNav : role === 'organizer' ? organizerNav : userNav;

  const roleLabel =
    role === 'admin'
      ? 'PLATFORM CONTROL'
      : role === 'organizer'
      ? 'LEAGUE OPERATIONS'
      : 'PERSONAL CRICKET';

  const roleName =
    role === 'admin'
      ? 'Admin Console'
      : role === 'organizer'
      ? 'Organizer Workspace'
      : 'My Cricket';

  const userAvatar = role === 'admin' ? 'AD' : role === 'organizer' ? 'HA' : 'AK';
  const userName = role === 'admin' ? 'Platform Admin' : role === 'organizer' ? 'Hassan Ali' : 'Ayaan Khan';
  const userSub = role === 'admin' ? 'Super administrator' : role === 'organizer' ? 'League organizer' : 'Cricket fan';

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col md:flex-row antialiased font-body transition-colors duration-200">
      {/* Toast popup */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-surface dark:bg-surface-alt text-ink px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-line animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {notificationToast}
        </div>
      )}

      {/* Desktop Sidebar (250px) */}
      <aside className="hidden md:flex flex-col w-[250px] bg-surface border-r border-line shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
        {/* Brand */}
        <div className="p-5 border-b border-line">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand to-canvas flex items-center justify-center text-white font-black text-sm shadow-xs transition-all">
              <span className="font-mono">C</span>
            </span>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-tightest text-ink">
                Crease<span className="text-tealAccent dark:text-lime">Grid</span>
              </span>
              <span className="text-[10px] text-ink-muted -mt-1 font-semibold tracking-tight uppercase font-mono">
                {roleLabel}
              </span>
            </div>
          </Link>

          <div className="mt-3.5 flex items-center justify-between text-xs font-bold text-ink bg-surface-alt p-2 rounded-xl border border-line">
            <span className="truncate">{roleName}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-3 flex-1 space-y-5">
          {currentNavGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              <div className="text-[10px] font-mono font-bold tracking-widest text-ink-muted uppercase px-2 mb-1.5">
                {group.label}
              </div>
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition relative ${
                      isActive
                        ? 'bg-brand/10 text-tealAccent dark:text-lime font-bold'
                        : 'text-ink-muted hover:bg-surface-alt hover:text-ink'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-brand dark:bg-lime rounded-r-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}

          {/* Switch Role View */}
          <div className="pt-3 border-t border-line space-y-1">
            <div className="text-[10px] font-mono font-bold tracking-widest text-ink-muted uppercase px-2 mb-1.5">
              SWITCH CONSOLE
            </div>
            <Link
              href="/admin"
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition ${
                role === 'admin'
                  ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/20'
                  : 'text-ink-muted hover:bg-surface-alt'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-purple-500" />
              <span>Super Admin</span>
            </Link>
            <Link
              href="/organizer"
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition ${
                role === 'organizer'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20'
                  : 'text-ink-muted hover:bg-surface-alt'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Organizer</span>
            </Link>
            <Link
              href="/me"
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition ${
                role === 'user'
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20'
                  : 'text-ink-muted hover:bg-surface-alt'
              }`}
            >
              <UserRound className="w-4 h-4 text-blue-500" />
              <span>Cricket Fan</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-ink-muted hover:text-tealAccent transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </Link>
          </div>
        </nav>

        {/* Sidebar bottom user */}
        <div className="p-3 border-t border-line bg-surface-alt/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-brand text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
              {userAvatar}
            </span>
            <div className="leading-tight">
              <div className="text-xs font-bold text-ink font-display">{userName}</div>
              <div className="text-[10px] text-ink-muted">{userSub}</div>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-[60px] md:h-[72px] bg-surface/95 backdrop-blur-xl border-b border-line px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          {/* Left Breadcrumb & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-ink-muted rounded-lg hover:bg-surface-alt"
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <span className="font-semibold text-ink">Workspace</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              <strong className="text-ink font-bold truncate">{roleName}</strong>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-surface-alt px-3 py-1.5 rounded-xl border border-line text-xs">
              <Search className="w-3.5 h-3.5 text-ink-muted" />
              <input
                type="text"
                placeholder="Search dashboard..."
                className="bg-transparent text-xs outline-hidden w-36 lg:w-48 text-ink placeholder:text-ink-muted font-medium"
              />
            </div>

            {/* Theme Switcher in Dashboard */}
            <ThemeToggle />

            <button
              onClick={() => showToast("You're all caught up on system alerts!")}
              className="relative p-2 rounded-xl text-ink-muted hover:bg-surface-alt transition"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
            </button>
            <Link
              href="/"
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-tealAccent hover:underline bg-surface-alt px-3 py-1.5 rounded-xl border border-line transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Website</span>
            </Link>
          </div>
        </header>

        {/* Mobile drawer if toggled */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface border-b border-line p-4 space-y-3 shadow-md animate-fade-in">
            <div className="text-xs font-mono font-bold text-ink-muted uppercase">DASHBOARDS</div>
            <div className="grid grid-cols-3 gap-2">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-center py-2 text-xs font-bold rounded-xl border ${
                  role === 'admin' ? 'bg-purple-500/10 text-purple-600 border-purple-500/30' : 'bg-surface-alt border-line text-ink'
                }`}
              >
                Admin
              </Link>
              <Link
                href="/organizer"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-center py-2 text-xs font-bold rounded-xl border ${
                  role === 'organizer' ? 'bg-amber-500/10 text-amber-600 border-amber-500/30' : 'bg-surface-alt border-line text-ink'
                }`}
              >
                Organizer
              </Link>
              <Link
                href="/me"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-center py-2 text-xs font-bold rounded-xl border ${
                  role === 'user' ? 'bg-blue-500/10 text-blue-600 border-blue-500/30' : 'bg-surface-alt border-line text-ink'
                }`}
              >
                Fan
              </Link>
            </div>
            <div className="pt-2 border-t border-line">
              <Link href="/" className="text-xs font-semibold text-tealAccent flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" /> Return to Public Website
              </Link>
            </div>
          </div>
        )}

        {/* Dashboard Main Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-12">
          {/* Header section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <div>
              <div className="text-[11px] font-mono font-bold tracking-widest text-ink-muted uppercase flex items-center gap-1.5">
                <span>{eyebrow}</span>
                <span className="w-1 h-1 rounded-full bg-line"></span>
                <span className="text-tealAccent dark:text-lime">VERIFIED</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-ink font-display tracking-tightest mt-1">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-ink-muted mt-1 font-normal">{subtitle}</p>
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>

          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation (screens <= 768px) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-line h-14 flex items-center justify-around px-2 shadow-lg">
        <Link
          href={role === 'admin' ? '/admin' : role === 'organizer' ? '/organizer' : '/me'}
          className="flex flex-col items-center justify-center text-[10px] font-bold text-tealAccent dark:text-lime"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <Link
          href="/matches"
          className="flex flex-col items-center justify-center text-[10px] font-medium text-ink-muted hover:text-ink"
        >
          <Radio className="w-4 h-4" />
          <span>Matches</span>
        </Link>
        <Link
          href="/news"
          className="flex flex-col items-center justify-center text-[10px] font-medium text-ink-muted hover:text-ink"
        >
          <Newspaper className="w-4 h-4" />
          <span>News</span>
        </Link>
        <Link
          href="/tools"
          className="flex flex-col items-center justify-center text-[10px] font-medium text-ink-muted hover:text-ink"
        >
          <Calculator className="w-4 h-4" />
          <span>Tools</span>
        </Link>
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-[10px] font-medium text-ink-muted hover:text-ink"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Site</span>
        </Link>
      </nav>
    </div>
  );
}
