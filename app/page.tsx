'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import LiveMatchRibbon from '@/components/home/LiveMatchRibbon';
import SearchModal from '@/components/ui/SearchModal';
import TeamFlag from '@/components/ui/TeamFlag';
import {
  Calculator,
  Gauge,
  TrendingUp,
  RefreshCw,
  Trophy,
  Users,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  Radio,
  Sliders,
} from 'lucide-react';

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [newsFilter, setNewsFilter] = useState<'All' | 'Pakistan' | 'International' | 'Tournaments' | 'Analysis'>('All');

  const newsArticles = [
    {
      id: 'pak-nz-squad',
      category: 'Pakistan',
      title: 'Pakistan Announces Squad for New Zealand ODI Series',
      image: '/assets/pakistan-team.svg',
      date: 'Nov 3, 2026',
      readTime: '4 min read',
      href: '/news/pakistan-squad-announcement',
    },
    {
      id: 'icc-schedule-2027',
      category: 'ICC',
      title: 'ICC Confirms Schedule for T20 World Cup 2027',
      image: '/assets/trophy-3d.svg',
      date: 'Nov 2, 2026',
      readTime: '5 min read',
      href: '/news/world-cup-explained',
    },
    {
      id: 'ind-aus-decider',
      category: 'India',
      title: 'India Eye Series Win in Decider Against Australia',
      image: '/assets/cricket-match-action.svg',
      date: 'Nov 2, 2026',
      readTime: '6 min read',
      href: '/news/india-sa',
    },
  ];

  const filteredNews = newsFilter === 'All'
    ? newsArticles
    : newsArticles.filter((n) => n.category.toLowerCase() === newsFilter.toLowerCase() || newsFilter === 'Tournaments');

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-body transition-colors duration-200">
      {/* 1. Global Navigation Bar */}
      <PublicHeader onOpenSearch={() => setSearchOpen(true)} />

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-7">
        
        {/* 2. Top-of-Page Live Cricket Matches Ribbon (P0 Requirement: Directly BELOW Header, ABOVE Hero) */}
        <LiveMatchRibbon />

        {/* 3. Hero Section matching Bright Mode & Dark Mode specifications */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B513E] via-[#094334] to-[#063327] dark:from-[#122B34] dark:via-[#0E232B] dark:to-[#091820] text-white p-6 sm:p-10 lg:p-12 border border-line/30 shadow-xl transition-all duration-300">
          {/* Background Ambient Stadium Floodlights & Glow */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-lime/10 dark:bg-lime/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-tealAccent/20 rounded-full blur-3xl" />
            {/* Subtle stadium lights flare lines */}
            <div className="absolute top-6 right-16 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Eyebrow, Main Headline, Subtitle, and CTAs */}
            <div className="lg:col-span-7 space-y-5">
              {/* Eyebrow with Lime Line */}
              <div className="inline-flex items-center gap-2 text-lime font-mono text-xs font-bold tracking-wider uppercase">
                <span className="w-5 h-0.5 bg-lime rounded-full" />
                <span>Cricket, Deeper &amp; Smarter</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tightest leading-[1.1] text-white">
                Live Scores, Advanced
                <br />
                <span className="text-white/95">Calculators &amp; Match Insights</span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-200 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Real-time cricket, powerful tools, tournament simulations and local league management — all in one place.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime hover:bg-lime-hover text-canvas font-extrabold text-sm font-display transition-all shadow-md hover:shadow-lg hover:scale-[1.02] btn-tactile"
                >
                  <span>Explore Tools</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                <Link
                  href="/qualification"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 dark:bg-surface-alt/70 dark:hover:bg-surface-alt text-white border border-white/20 dark:border-line hover:border-lime font-bold text-sm transition-all shadow-xs btn-tactile"
                >
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Qualification Lab</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Graphic - Batsman Playing Stroke against Stadium Lights */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[380px] h-[280px] sm:h-[320px]">
                {/* Stadium Light Glow Backing */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-t from-black/40 via-transparent to-transparent z-0" />
                
                {/* Real Batsman Cutout Action Image */}
                <Image
                  src="/assets/hero.webp"
                  alt="Pakistani Batsman playing stroke under stadium floodlights"
                  fill
                  priority
                  className="object-contain object-bottom drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] z-10"
                />

                {/* Floating Telemetry Badge */}
                <div className="absolute bottom-2 left-2 z-20 bg-black/60 backdrop-blur-md border border-white/15 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-white tracking-wide">
                    PAK 152/3 (18.2 ov) · Live
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Quick Tools Bar (6 Calculators + 1 "View All" matching Image 2) */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              {
                id: 'nrr',
                name: 'NRR Calculator',
                href: '/tools/net-run-rate',
                icon: Calculator,
                accentColor: 'text-emerald-500 dark:text-lime',
              },
              {
                id: 'rrr',
                name: 'Required RR Calculator',
                href: '/tools/required-run-rate',
                icon: Gauge,
                accentColor: 'text-tealAccent',
              },
              {
                id: 'win-prob',
                name: 'Win Probability Calculator',
                href: '/tools/run-rate',
                icon: TrendingUp,
                accentColor: 'text-amber-500',
              },
              {
                id: 'overs-conv',
                name: 'Overs to Balls Converter',
                href: '/tools/overs-converter',
                icon: RefreshCw,
                accentColor: 'text-sky-500',
              },
              {
                id: 'points-table',
                name: 'Points Table Generator',
                href: '/tournaments',
                icon: Trophy,
                accentColor: 'text-amber-400',
              },
              {
                id: 'partnership',
                name: 'Partnership Calculator',
                href: '/tools/partnership',
                icon: Users,
                accentColor: 'text-violet-500',
              },
              {
                id: 'view-all',
                name: 'View All 12 Calculators',
                href: '/tools',
                isFeatured: true,
              },
            ].map((tool) => {
              if (tool.isFeatured) {
                return (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="col-span-2 sm:col-span-1 lg:col-span-1 bg-brand text-white dark:bg-lime dark:text-canvas rounded-2xl p-3.5 flex flex-col justify-between hover:scale-[1.02] transition-all shadow-xs group btn-tactile"
                  >
                    <div className="text-xs font-extrabold font-display leading-snug">
                      View All 12 Calculators
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs font-bold">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </div>
                  </Link>
                );
              }

              const Icon = tool.icon!;
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="bg-surface dark:bg-surface border border-line hover:border-tealAccent/60 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center hover:shadow-cardHover transition-all duration-200 group interactive-card"
                >
                  <div className="w-9 h-9 rounded-xl bg-surface-alt dark:bg-surface-alt border border-line/60 flex items-center justify-center mb-2 group-hover:scale-110 transition shrink-0">
                    <Icon className={`w-4 h-4 ${tool.accentColor}`} />
                  </div>
                  <span className="text-xs font-bold font-display text-ink group-hover:text-tealAccent transition leading-snug">
                    {tool.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 5. Featured Qualification Lab Card (Full Width Banner matching Image 2) */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B513E] to-[#06392C] dark:from-[#122B34] dark:to-[#0A1A22] text-white p-6 sm:p-8 lg:p-10 border border-tealAccent/25 dark:border-line shadow-xl">
          {/* Subtle Glow Accents */}
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-lime/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: 3D Trophy + Description + CTA */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start gap-5">
              <div className="flex items-center gap-4">
                {/* 3D Gold Trophy Graphic */}
                <div className="relative w-20 h-24 sm:w-24 sm:h-28 shrink-0 drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
                  <Image
                    src="/assets/trophy-3d.svg"
                    alt="Gold ICC Championship Trophy"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-lime font-mono text-[11px] font-bold uppercase tracking-wider">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Qualification Lab</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white leading-tight">
                    Can your team qualify?
                  </h2>
                </div>
              </div>

              <p className="text-slate-200 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                Simulate match results, NRR and scenarios to see qualification chances for any tournament in real time.
              </p>

              <Link
                href="/qualification"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime hover:bg-lime-hover text-canvas font-extrabold text-xs sm:text-sm font-display transition-all shadow-md hover:shadow-lg hover:scale-[1.02] btn-tactile"
              >
                <span>Run Simulation</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>

            {/* Right Column: Group A Live Scenario Points Table & 78% Gauge */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Standings Table */}
              <div className="sm:col-span-8 bg-black/25 dark:bg-black/35 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-white/10">
                  <span className="text-xs font-bold font-display text-white">
                    Group A — Live Scenario
                  </span>
                  <span className="text-[10px] font-mono text-lime font-bold uppercase tracking-wider">
                    Active
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="text-[10px] font-mono font-bold text-slate-300 uppercase border-b border-white/10">
                        <th className="pb-1.5 font-medium">#</th>
                        <th className="pb-1.5 font-medium">Team</th>
                        <th className="pb-1.5 text-center font-medium">P</th>
                        <th className="pb-1.5 text-center font-medium">W</th>
                        <th className="pb-1.5 text-center font-medium">L</th>
                        <th className="pb-1.5 text-right font-medium">NRR</th>
                        <th className="pb-1.5 text-right font-medium">Pts</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-xs">
                      {/* Row 1 - PAK */}
                      <tr className="bg-lime/10 text-lime font-bold">
                        <td className="py-1.5">1</td>
                        <td className="py-1.5 font-display flex items-center gap-1.5">
                          <TeamFlag code="PAK" size={16} />
                          <span>PAK</span>
                        </td>
                        <td className="py-1.5 text-center">3</td>
                        <td className="py-1.5 text-center">3</td>
                        <td className="py-1.5 text-center">0</td>
                        <td className="py-1.5 text-right text-lime">+1.245</td>
                        <td className="py-1.5 text-right text-white font-extrabold">6</td>
                      </tr>
                      {/* Row 2 - NZ */}
                      <tr className="text-slate-200">
                        <td className="py-1.5">2</td>
                        <td className="py-1.5 font-display flex items-center gap-1.5">
                          <TeamFlag code="NZ" size={16} />
                          <span>NZ</span>
                        </td>
                        <td className="py-1.5 text-center">3</td>
                        <td className="py-1.5 text-center">2</td>
                        <td className="py-1.5 text-center">1</td>
                        <td className="py-1.5 text-right text-tealAccent">+0.742</td>
                        <td className="py-1.5 text-right text-white font-bold">4</td>
                      </tr>
                      {/* Row 3 - SA */}
                      <tr className="text-slate-300">
                        <td className="py-1.5">3</td>
                        <td className="py-1.5 font-display flex items-center gap-1.5">
                          <TeamFlag code="SA" size={16} />
                          <span>SA</span>
                        </td>
                        <td className="py-1.5 text-center">3</td>
                        <td className="py-1.5 text-center">1</td>
                        <td className="py-1.5 text-center">2</td>
                        <td className="py-1.5 text-right text-rose-300">-0.348</td>
                        <td className="py-1.5 text-right text-white">2</td>
                      </tr>
                      {/* Row 4 - BAN */}
                      <tr className="text-slate-400">
                        <td className="py-1.5">4</td>
                        <td className="py-1.5 font-display flex items-center gap-1.5">
                          <TeamFlag code="BAN" size={16} />
                          <span>BAN</span>
                        </td>
                        <td className="py-1.5 text-center">3</td>
                        <td className="py-1.5 text-center">0</td>
                        <td className="py-1.5 text-center">3</td>
                        <td className="py-1.5 text-right text-rose-400">-1.639</td>
                        <td className="py-1.5 text-right text-white">0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 78% Circular Radial Progress Ring */}
              <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 bg-black/20 dark:bg-black/30 rounded-2xl border border-white/10">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background Ring Track */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="text-white/15"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    {/* Active Progress Arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="text-lime"
                      strokeWidth="8"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 * (1 - 0.78)}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black font-mono text-white tabular-nums tracking-tight">
                      78%
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-center text-slate-200 mt-1 font-display">
                  Qualification Chance (PAK)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Two-Column Lower Section: Latest Cricket News (Left) & Local Cricket (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column (7 cols): Latest Cricket News with Filter Tabs */}
          <section className="lg:col-span-7 bg-surface dark:bg-surface border border-line rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              {/* Header with Title, Filter Tabs, and View All */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand dark:bg-lime" />
                  <h2 className="text-base sm:text-lg font-bold font-display text-ink">
                    Latest Cricket News
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {(['All', 'Pakistan', 'International', 'Tournaments', 'Analysis'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setNewsFilter(tab)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition btn-tactile ${
                        newsFilter === tab
                          ? 'bg-brand text-white dark:bg-lime dark:text-canvas font-bold'
                          : 'text-ink-muted hover:text-ink hover:bg-surface-alt'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 News Cards in a Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                {filteredNews.map((article) => (
                  <Link
                    key={article.id}
                    href={article.href}
                    className="bg-surface-alt dark:bg-surface-alt/70 border border-line hover:border-tealAccent/60 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all hover:shadow-md interactive-card"
                  >
                    <div className="relative h-32 w-full overflow-hidden bg-black/10">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase bg-brand text-white dark:bg-lime dark:text-canvas shadow-xs">
                        {article.category}
                      </span>
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <h3 className="text-xs font-bold font-display text-ink group-hover:text-tealAccent transition leading-snug line-clamp-2">
                        {article.title}
                      </h3>

                      <div className="flex items-center gap-2 text-[10px] text-ink-muted mt-2 pt-2 border-t border-line/50">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 opacity-60" />
                          <span>{article.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 opacity-60" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-2 flex justify-end">
              <Link
                href="/news"
                className="text-xs font-bold text-tealAccent hover:underline flex items-center gap-1 group"
              >
                <span>View All News</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
              </Link>
            </div>
          </section>

          {/* Right Column (5 cols): Local Cricket with Graphic and 4 Checkmarks */}
          <section className="lg:col-span-5 bg-surface dark:bg-surface border border-line rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-surface-alt border border-line flex items-center justify-center text-tealAccent">
                    <Users className="w-4 h-4" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold font-display text-ink">
                    Local Cricket
                  </h2>
                </div>
                <Link
                  href="/local"
                  className="text-xs font-bold text-tealAccent hover:underline"
                >
                  View All News →
                </Link>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed font-normal">
                Create, manage and showcase your local tournaments online.
              </p>

              {/* 4 Feature Checklist Items */}
              <div className="space-y-2 pt-1 max-w-[220px] sm:max-w-none">
                {[
                  'Create Tournaments',
                  'Manage Teams & Players',
                  'Live Scoring & Points Table',
                  'Public Tournament Pages',
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-ink">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/organizer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime hover:bg-lime-hover text-canvas font-extrabold text-xs sm:text-sm font-display transition-all shadow-md hover:shadow-lg hover:scale-[1.02] btn-tactile"
                >
                  <span>Create Tournament</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>

            {/* Bottom-Right Graphic: Cricket Stumps & Leather Ball on Turf */}
            <div className="absolute -bottom-2 -right-2 w-36 h-40 sm:w-44 sm:h-48 pointer-events-none z-0 opacity-90">
              <Image
                src="/assets/cricket-stumps-ball.svg"
                alt="Wooden Cricket Stumps and Red Leather Cricket Ball"
                fill
                className="object-contain object-bottom-right"
              />
            </div>
          </section>
        </div>

        {/* 7. Upcoming Matches Strip (matching Image 1) */}
        <section className="bg-surface dark:bg-surface border border-line rounded-3xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-tealAccent" />
              <h2 className="text-base font-bold font-display text-ink">
                Upcoming Matches
              </h2>
            </div>

            <Link
              href="/matches"
              className="text-xs font-bold text-tealAccent hover:underline flex items-center gap-1 group"
            >
              <span>View Full Schedule</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {[
              {
                id: 'sl-ban',
                format: 'T20I • Tomorrow, 7:00 PM',
                teamA: 'SL',
                teamB: 'BAN',
              },
              {
                id: 'eng-aus',
                format: 'ODI • Nov 5, 2:00 PM',
                teamA: 'ENG',
                teamB: 'AUS',
              },
              {
                id: 'ind-nz',
                format: 'T20 • Nov 6, 7:30 PM',
                teamA: 'IND',
                teamB: 'NZ',
              },
            ].map((fixture) => (
              <Link
                key={fixture.id}
                href="/matches"
                className="p-3.5 rounded-2xl bg-surface-alt dark:bg-surface-alt/70 border border-line hover:border-tealAccent/60 flex items-center justify-between group transition interactive-card"
              >
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono font-medium text-ink-muted">
                    {fixture.format}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 font-bold font-display text-xs text-ink">
                      <TeamFlag code={fixture.teamA} size={20} />
                      <span>{fixture.teamA}</span>
                    </div>
                    <span className="text-[10px] font-mono text-ink-muted uppercase">vs</span>
                    <div className="flex items-center gap-1.5 font-bold font-display text-xs text-ink">
                      <TeamFlag code={fixture.teamB} size={20} />
                      <span>{fixture.teamB}</span>
                    </div>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-xl bg-surface border border-line flex items-center justify-center text-ink-muted group-hover:text-tealAccent transition shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* 8. Global Public Footer */}
      <PublicFooter />
    </div>
  );
}
