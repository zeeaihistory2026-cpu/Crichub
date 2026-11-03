'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import LiveMatchRibbon from '@/components/home/LiveMatchRibbon';
import SearchModal from '@/components/ui/SearchModal';
import { SEED_ARTICLES } from '@/data/seed-data';
import { REAL_MATCHES } from '@/data/recent-matches';
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
  const [newsFilter, setNewsFilter] = useState<string>('All');

  const ARTICLE_IMAGES = ['/assets/cricket-match-action.svg', '/assets/pakistan-team.svg', '/assets/trophy-3d.svg'];
  const newsArticles = SEED_ARTICLES.slice(0, 6).map((a, i) => ({
    id: a.id,
    category: a.category,
    title: a.title,
    image: ARTICLE_IMAGES[i % ARTICLE_IMAGES.length],
    date: a.stamp || a.date,
    readTime: `${a.minutes} min read`,
    href: `/news/${a.id}`,
  }));
  const newsTabs = ['All', ...Array.from(new Set(newsArticles.map((a) => a.category)))];

  const filteredNews = newsFilter === 'All'
    ? newsArticles
    : newsArticles.filter((n) => n.category === newsFilter);

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-body transition-colors duration-200">
      {/* 1. Global Navigation Bar */}
      <PublicHeader onOpenSearch={() => setSearchOpen(true)} />

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Main Content Container with spacious breathing room below navbar */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-16 space-y-8 sm:space-y-10">
        
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
              <div className="inline-flex items-center gap-2 text-lime font-display text-xs font-bold tracking-[0.05em] uppercase">
                <span className="w-5 h-0.5 bg-lime rounded-full" />
                <span>Cricket, Deeper &amp; Smarter</span>
              </div>

              {/* Main Headline (PRD Hero Display 56px desktop / 36px mobile) */}
              <h1 className="text-[34px] leading-[42px] sm:text-[46px] sm:leading-[54px] lg:text-[56px] lg:leading-[64px] font-extrabold font-display tracking-tightest text-white">
                Cricket Intelligence
                <br />
                <span className="text-lime">Beyond the Score.</span>
              </h1>

              {/* Subtitle (PRD Body Large 18px desktop / 17px mobile) */}
              <p className="body-lg text-slate-200 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
                Live scores, smart calculators, qualification scenarios, player stats and local tournaments — all in one place.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime hover:bg-lime-hover text-canvas font-bold text-[14px] sm:text-[15px] font-display tracking-tight transition-all shadow-md hover:shadow-lg hover:scale-[1.02] btn-tactile"
                >
                  <span>Explore Tools</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                <Link
                  href="/qualification"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 dark:bg-surface-alt/70 dark:hover:bg-surface-alt text-white border border-white/20 dark:border-line hover:border-lime font-bold text-[14px] sm:text-[15px] font-display tracking-tight transition-all shadow-xs btn-tactile"
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
                  <span className="text-[11px] font-mono font-bold text-white tracking-wide score-num">
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
              },
              {
                id: 'rrr',
                name: 'Required RR Calculator',
                href: '/tools/required-run-rate',
                icon: Gauge,
              },
              {
                id: 'win-prob',
                name: 'Win Probability Calculator',
                href: '/tools/run-rate',
                icon: TrendingUp,
              },
              {
                id: 'overs-conv',
                name: 'Overs to Balls Converter',
                href: '/tools/overs-converter',
                icon: RefreshCw,
              },
              {
                id: 'points-table',
                name: 'Points Table Generator',
                href: '/tournaments',
                icon: Trophy,
              },
              {
                id: 'partnership',
                name: 'Partnership Calculator',
                href: '/tools/partnership',
                icon: Users,
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
                    <div className="text-[13px] sm:text-sm font-extrabold font-display leading-tight">
                      View All 12 Calculators
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs font-bold font-display">
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
                  <div className="w-10 h-10 rounded-xl bg-surface-alt dark:bg-surface-alt border border-line flex items-center justify-center mb-2.5 group-hover:scale-105 transition shrink-0">
                    <Icon className="w-4.5 h-4.5 text-tealAccent dark:text-lime" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold font-display text-ink group-hover:text-tealAccent transition leading-snug">
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

                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-lime font-mono text-[11px] font-bold uppercase tracking-wider">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Qualification Lab</span>
                  </div>
                  <h2 className="text-[24px] leading-[32px] sm:text-[30px] sm:leading-[38px] lg:text-[32px] lg:leading-[40px] font-extrabold font-display tracking-tight text-white">
                    Can your team qualify?
                  </h2>
                </div>
              </div>

              <p className="text-slate-200 dark:text-slate-300 text-xs sm:text-[14px] leading-relaxed font-normal">
                Simulate match results, NRR and scenarios to see qualification chances for any tournament in real time.
              </p>

              <Link
                href="/qualification"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime hover:bg-lime-hover text-canvas font-extrabold text-xs sm:text-[14px] font-display tracking-tight transition-all shadow-md hover:shadow-lg hover:scale-[1.02] btn-tactile"
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
<span className="text-xs sm:text-[13px] font-bold font-display text-white">
                    Group A — Live Scenario
                  </span>
                  <span className="text-[10px] font-mono text-lime font-bold uppercase tracking-wider">
                    Example
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-300 uppercase border-b border-white/10 tracking-wider">
                        <th className="pb-1.5 font-medium">#</th>
                        <th className="pb-1.5 font-medium">Team</th>
                        <th className="pb-1.5 text-center font-medium">P</th>
                        <th className="pb-1.5 text-center font-medium">W</th>
                        <th className="pb-1.5 text-center font-medium">L</th>
                        <th className="pb-1.5 text-right font-medium">NRR</th>
                        <th className="pb-1.5 text-right font-medium">Pts</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-xs sm:text-[13px]">
                      {/* Row 1 - PAK */}
                      <tr className="bg-lime/10 text-lime font-bold">
                        <td className="py-1.5 score-num">1</td>
                        <td className="py-1.5 font-display flex items-center gap-1.5">
                          <TeamFlag code="PAK" size={16} />
                          <span className="font-bold">PAK</span>
                        </td>
                        <td className="py-1.5 text-center score-num">3</td>
                        <td className="py-1.5 text-center score-num">3</td>
                        <td className="py-1.5 text-center score-num">0</td>
                        <td className="py-1.5 text-right text-lime score-num">+1.245</td>
                        <td className="py-1.5 text-right text-white font-extrabold score-num">6</td>
                      </tr>
                      {/* Row 2 - NZ */}
                      <tr className="text-slate-200">
                        <td className="py-1.5 score-num">2</td>
                        <td className="py-1.5 font-display flex items-center gap-1.5">
                          <TeamFlag code="NZ" size={16} />
                          <span className="font-medium">NZ</span>
                        </td>
                        <td className="py-1.5 text-center score-num">3</td>
                        <td className="py-1.5 text-center score-num">2</td>
                        <td className="py-1.5 text-center score-num">1</td>
                        <td className="py-1.5 text-right text-tealAccent score-num">+0.742</td>
                        <td className="py-1.5 text-right text-white font-bold score-num">4</td>
                      </tr>
                      {/* Row 3 - SA */}
                      <tr className="text-slate-300">
                        <td className="py-1.5 score-num">3</td>
                        <td className="py-1.5 font-display flex items-center gap-1.5">
                          <TeamFlag code="SA" size={16} />
                          <span className="font-medium">SA</span>
                        </td>
                        <td className="py-1.5 text-center score-num">3</td>
                        <td className="py-1.5 text-center score-num">1</td>
                        <td className="py-1.5 text-center score-num">2</td>
                        <td className="py-1.5 text-right text-rose-300 score-num">-0.348</td>
                        <td className="py-1.5 text-right text-white score-num">2</td>
                      </tr>
                      {/* Row 4 - BAN */}
                      <tr className="text-slate-400">
                        <td className="py-1.5 score-num">4</td>
                        <td className="py-1.5 font-display flex items-center gap-1.5">
                          <TeamFlag code="BAN" size={16} />
                          <span className="font-medium">BAN</span>
                        </td>
                        <td className="py-1.5 text-center score-num">3</td>
                        <td className="py-1.5 text-center score-num">0</td>
                        <td className="py-1.5 text-center score-num">3</td>
                        <td className="py-1.5 text-right text-rose-400 score-num">-1.639</td>
                        <td className="py-1.5 text-right text-white score-num">0</td>
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
                    <span className="text-2xl sm:text-3xl font-black font-mono text-white tabular-nums tracking-tight">
                      78%
                    </span>
                  </div>
                </div>
<span className="text-[11px] font-bold text-center text-slate-200 mt-1 font-display tracking-tight">
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
                  <span className="w-2.5 h-2.5 rounded-full bg-brand dark:bg-lime" />
                  <h2 className="text-base sm:text-[18px] lg:text-[20px] font-bold font-display text-ink tracking-tight">
                    Latest Cricket News
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {newsTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setNewsFilter(tab)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold tracking-tight transition btn-tactile ${
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
                    className="bg-surface dark:bg-surface-alt/80 border border-line hover:border-tealAccent/60 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all hover:shadow-md interactive-card"
                  >
                    <div className="relative h-32 w-full overflow-hidden bg-black/10">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase bg-brand text-white dark:bg-lime dark:text-canvas shadow-xs tracking-wider">
                        {article.category}
                      </span>
                    </div>

                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <h3 className="text-xs sm:text-[13px] font-bold font-display text-ink group-hover:text-tealAccent transition leading-snug line-clamp-2">
                        {article.title}
                      </h3>

                      <div className="flex items-center gap-2 text-[11px] text-ink-muted mt-2.5 pt-2.5 border-t border-line/50">
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
                className="text-xs sm:text-[13px] font-bold font-display text-tealAccent hover:underline flex items-center gap-1 group"
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
                  <h2 className="text-base sm:text-[18px] lg:text-[20px] font-bold font-display text-ink tracking-tight">
                    Local Cricket
                  </h2>
                </div>
                <Link
                  href="/local"
                  className="text-xs sm:text-[13px] font-bold font-display text-tealAccent hover:underline"
                >
                  View All News →
                </Link>
              </div>

              <p className="text-xs sm:text-[13px] text-ink-muted leading-relaxed font-normal">
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
                  <div key={feat} className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-ink">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/organizer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime hover:bg-lime-hover text-canvas font-extrabold text-xs sm:text-[14px] font-display tracking-tight transition-all shadow-md hover:shadow-lg hover:scale-[1.02] btn-tactile"
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

        {/* 7. Recent Results Strip (real verified results) */}
        <section className="bg-surface dark:bg-surface border border-line rounded-3xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-tealAccent" />
<h2 className="text-base sm:text-[18px] lg:text-[20px] font-bold font-display text-ink tracking-tight">
                Upcoming Matches
              </h2>
            </div>

            <Link
              href="/matches"
              className="text-xs sm:text-[13px] font-bold font-display text-tealAccent hover:underline flex items-center gap-1 group"
            >
              <span>All Results</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {REAL_MATCHES.slice(0, 3).map((m) => (
              <Link
                key={m.id}
                href={`/matches/${m.slug}`}
                className="p-3.5 rounded-2xl bg-surface dark:bg-surface-alt/80 border border-line hover:border-tealAccent/60 flex items-center justify-between group transition interactive-card"
              >
                <div className="space-y-1.5">
<div className="text-[11px] font-mono font-medium text-ink-muted">
                    {m.format} - {m.dateLabel}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 font-bold font-display text-xs sm:text-[13px] text-ink">
                      <TeamFlag code={m.teamACode} size={20} />
                      <span>{m.teamACode}</span>
                    </div>
                    <span className="text-[10px] font-mono text-ink-muted uppercase">vs</span>
                    <div className="flex items-center gap-1.5 font-bold font-display text-xs sm:text-[13px] text-ink">
                      <TeamFlag code={m.teamBCode} size={20} />
                      <span>{m.teamBCode}</span>
                    </div>
                  </div>
                    </div>
                  </div>
                  <div className="text-[11px] font-semibold text-tealAccent">{m.result}</div>
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
