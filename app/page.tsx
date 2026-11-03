'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import MatchTile from '@/components/ui/MatchTile';
import SectionHeader from '@/components/ui/SectionHeader';
import SearchModal from '@/components/ui/SearchModal';
import {
  SEED_MATCHES,
  SEED_ARTICLES,
  SEED_TOOLS,
  SEED_GROUP_A_TEAMS,
} from '@/data/seed-data';
import { calculateNetRunRate } from '@/lib/cricket-math';
import {
  Search,
  Zap,
  Calculator,
  Trophy,
  Users,
  Calendar,
  Table,
  BarChart2,
  Newspaper,
  BookOpen,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Flame,
  ShieldCheck,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/search?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      setSearchOpen(true);
    }
  };

  const topArticle = SEED_ARTICLES[0];
  const sideArticles = SEED_ARTICLES.slice(1, 4);

  return (
    <>
      <PublicHeader onOpenSearch={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Cinematic Hero Section */}
        <section className="relative rounded-3xl overflow-hidden bg-navy-deep text-white min-h-[400px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-10 shadow-2xl border border-navy-border">
          {/* Background Image & Radial Gradient Scrim */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/hero.webp"
              alt="Cricket stadium action"
              fill
              priority
              className="object-cover object-center opacity-30 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-transparent" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-300 text-xs font-mono font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 green-pulse-glow"></span>
              <span>GLOBAL CRICKET INTELLIGENCE · ORIGINATING IN PAKISTAN</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tightest leading-[1.05] text-white">
              Cricket, <span className="text-brand-400">deeper</span>
              <br />
              and smarter.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Authentic match telemetry, deep editorial analysis, deterministic qualification scenarios, and verified cricket calculators — built for serious cricket fans and organizers.
            </p>

            {/* Quick Hero Search Form */}
            <form onSubmit={handleHeroSearch} className="pt-2 flex items-center gap-2 max-w-md">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Search players, teams, news or tools..."
                  className="w-full bg-white/10 backdrop-blur-md text-white placeholder-slate-400 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-white/20 outline-hidden focus:border-brand-400 focus:bg-white/15 transition shadow-inner font-medium"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow-xs shrink-0 btn-tactile"
              >
                Search
              </button>
            </form>

            <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2 pt-1">
              <span className="font-medium">Popular:</span>
              <Link href="/tools/net-run-rate" className="text-brand-300 hover:text-white underline font-semibold transition">
                NRR Calculator
              </Link>
              <span>·</span>
              <Link href="/qualification" className="text-brand-300 hover:text-white underline font-semibold transition">
                Qualification Lab
              </Link>
              <span>·</span>
              <Link href="/tournaments" className="text-brand-300 hover:text-white underline font-semibold transition">
                PSL 2026 Archive
              </Link>
            </div>
          </div>

          {/* Hero Bottom Shortcut Strip */}
          <div className="relative z-10 pt-6 mt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Zap, label: 'Match Centre', href: '/matches', desc: 'Live scores & chase RRR' },
              { icon: Calculator, label: 'Cricket Tools', href: '/tools', desc: '12 verified calculators' },
              { icon: Trophy, label: 'Qualification Lab', href: '/qualification', desc: 'Interactive scenarios' },
              { icon: Users, label: 'Local Tournaments', href: '/local', desc: 'Scores & organizer tools' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition group interactive-card"
                >
                  <span className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400 group-hover:bg-brand-500/30 group-hover:scale-105 transition shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-brand-300 transition truncate font-display">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">{item.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Live Match Rail */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-navy uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-rose-500 live-pulse-glow"></span>
              <span>MATCH TELEMETRY & SCORES</span>
            </div>
            <Link
              href="/matches"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group transition"
            >
              <span>All Matches</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {SEED_MATCHES.map((match) => (
              <MatchTile key={match.id} match={match} />
            ))}
          </div>
        </section>

        {/* Quick Hub Navigation Strip */}
        <section className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
          {[
            { icon: Calendar, label: 'Fixtures', href: '/matches' },
            { icon: Trophy, label: 'Tournaments', href: '/tournaments' },
            { icon: Table, label: 'Points Table', href: '/tournaments' },
            { icon: BarChart2, label: 'Stats & Records', href: '/stats' },
            { icon: Calculator, label: 'Cricket Tools', href: '/tools' },
            { icon: Newspaper, label: 'Latest News', href: '/news' },
            { icon: Users, label: 'Local Cricket', href: '/local' },
            { icon: BookOpen, label: 'Learn Rules', href: '/news/world-cup-explained' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="bg-white rounded-2xl p-3 border border-slate-200/80 hover:border-brand-300 hover:shadow-cardHover transition-all flex flex-col items-center justify-center text-center group interactive-card"
              >
                <Icon className="w-5 h-5 text-brand-600 group-hover:scale-110 transition mb-1.5" />
                <span className="text-[11px] font-bold text-navy group-hover:text-brand-600 transition font-display">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </section>

        {/* Main 3-Column Editorial & Operations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column 1: Latest Cricket News (5 Cols) */}
          <section className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card flex flex-col justify-between">
            <div>
              <SectionHeader
                title="Latest Cricket News"
                href="/news"
                linkLabel="More stories"
                subtitle="Curated reporting & editorial explainers"
              />

              {/* Lead Featured Story */}
              <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 mb-4 group interactive-card">
                <div className="relative h-44 rounded-xl overflow-hidden mb-3">
                  <Image
                    src={topArticle.coverImage || '/assets/player2.webp'}
                    alt={topArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded shadow-xs">
                    {topArticle.category}
                  </span>
                </div>
                <h3 className="font-extrabold text-navy font-display text-base group-hover:text-brand-600 transition leading-snug">
                  <Link href={`/news/${topArticle.id}`}>{topArticle.title}</Link>
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed font-normal">
                  {topArticle.summary}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2.5 border-t border-slate-200/70">
                  <span className="font-mono">{topArticle.stamp}</span>
                  <Link
                    href={`/news/${topArticle.id}`}
                    className="text-brand-600 font-bold hover:underline flex items-center gap-1"
                  >
                    Read story <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Additional headlines list */}
              <div className="space-y-3">
                {sideArticles.map((article) => (
                  <div
                    key={article.id}
                    className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 last:border-b-0 last:pb-0 group"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                        {article.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-navy font-display group-hover:text-brand-600 transition leading-snug">
                        <Link href={`/news/${article.id}`}>{article.title}</Link>
                      </h4>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {article.stamp} · {article.minutes} min read
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 shrink-0 mt-1 transition" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Column 2: Upcoming Fixtures & Group A Points Table (4 Cols) */}
          <section className="lg:col-span-4 space-y-6">
            {/* Upcoming Fixtures */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card">
              <SectionHeader
                title="Upcoming Fixtures"
                href="/matches"
                linkLabel="Full schedule"
              />
              <div className="space-y-2.5">
                {[
                  { flag: '🇮🇳', title: 'IND vs SA', desc: '2nd ODI · Nov 4, 5:00 PM IST', tag: 'ODI' },
                  { flag: '🇵🇰', title: 'PAK vs NZ', desc: '4th T20 · Nov 5, 7:30 PM PKT', tag: 'T20' },
                  { flag: '🏏', title: 'Lahore Cup Final', desc: 'Club Final · Nov 7, 3:00 PM PKT', tag: 'Local' },
                ].map((fix) => (
                  <Link
                    key={fix.title}
                    href="/matches"
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 hover:bg-brand-50 border border-slate-100 transition group interactive-card"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{fix.flag}</span>
                      <div>
                        <div className="text-xs font-bold text-navy group-hover:text-brand-600 transition font-display">
                          {fix.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">{fix.desc}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                      {fix.tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Group A Points Table */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card">
              <SectionHeader
                title="Group A Standings"
                href="/qualification"
                linkLabel="Scenario Lab"
                subtitle="Calculated with MCC legal delivery quota"
              />

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] font-mono font-bold text-slate-400 uppercase">
                      <th className="pb-2 pl-1">POS</th>
                      <th className="pb-2">TEAM</th>
                      <th className="pb-2 text-center">P</th>
                      <th className="pb-2 text-center font-bold text-navy">PTS</th>
                      <th className="pb-2 text-right pr-1">NRR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {SEED_GROUP_A_TEAMS.map((team, idx) => {
                      const res = calculateNetRunRate(
                        team.scored,
                        `${team.faced / 6}.0`,
                        team.conceded,
                        `${team.bowled / 6}.0`
                      );
                      const isQualifying = idx < 2;
                      return (
                        <tr
                          key={team.name}
                          className={`${
                            isQualifying ? 'bg-emerald-50/40 font-semibold' : ''
                          } hover:bg-slate-50 transition`}
                        >
                          <td className="py-2.5 pl-1">
                            <span
                              className={`w-5 h-5 rounded-full text-[10px] font-mono font-bold inline-flex items-center justify-center ${
                                isQualifying ? 'bg-emerald-600 text-white' : 'text-slate-400'
                              }`}
                            >
                              {idx + 1}
                            </span>
                          </td>
                          <td className="py-2.5 flex items-center gap-2 font-bold text-navy font-display">
                            <span>{team.flag}</span>
                            <span>{team.name}</span>
                            {isQualifying && (
                              <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-100 px-1 rounded">
                                Q
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 text-center text-slate-500 font-mono tabular-nums">{team.p}</td>
                          <td className="py-2.5 text-center font-bold text-navy font-mono tabular-nums">{team.pts}</td>
                          <td
                            className={`py-2.5 text-right tabular-nums font-mono text-[11px] font-bold pr-1 ${
                              res.answer.startsWith('+') ? 'text-emerald-600' : 'text-rose-500'
                            }`}
                          >
                            {res.answer}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-2.5 text-right">
                Top 2 teams qualify for semi-finals
              </div>
            </div>
          </section>

          {/* Column 3: Popular Tools & Signature Qualification Card (3 Cols) */}
          <section className="lg:col-span-3 space-y-6">
            {/* 6 Popular Tools */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card">
              <SectionHeader
                title="Popular Tools"
                href="/tools"
                linkLabel="All 12 tools"
                subtitle="Precise cricket arithmetic"
              />
              <div className="grid grid-cols-2 gap-2">
                {SEED_TOOLS.slice(0, 6).map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.id}`}
                    className="p-3 rounded-2xl bg-slate-50/80 hover:bg-brand-50 border border-slate-100 hover:border-brand-200 transition flex flex-col justify-between group interactive-card"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-100/70 text-brand-600 flex items-center justify-center mb-2 group-hover:scale-110 transition">
                      <Calculator className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[11px] font-bold text-navy group-hover:text-brand-600 transition line-clamp-1 font-display">
                      {tool.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Signature Qualification Lab Insight Banner */}
            <div className="bg-gradient-to-br from-brand-700 via-navy to-navy-deep rounded-3xl p-6 text-white shadow-xl space-y-3.5 border border-brand-500/20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/20 text-white">
                  FLAGSHIP LAB
                </span>
                <Trophy className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="font-extrabold text-base font-display leading-snug">
                What does your team need to qualify?
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                Test custom match scores, simulate remaining fixtures, and see real-time shifts in table rank and cumulative NRR with all-out quota rules.
              </p>
              <Link
                href="/qualification"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-white text-brand-700 hover:bg-slate-100 font-bold text-xs py-2.5 rounded-xl transition shadow-xs btn-tactile"
              >
                <span>Run Scenario Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>

        {/* Bottom Section: Cricket Explained & Local Organizer CTA */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Cricket Explained */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card flex flex-col justify-between">
            <div>
              <SectionHeader
                title="Cricket Explained"
                href="/news"
                linkLabel="Explore guides"
                subtitle="Making sense of the rules and numbers"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <Link
                  href="/news/world-cup-explained"
                  className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 hover:border-blue-300 transition group flex flex-col justify-between interactive-card"
                >
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase text-brand-600 bg-white px-2 py-0.5 rounded">
                      GUIDE
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-navy mt-2 leading-snug group-hover:text-brand-600 transition font-display">
                      How does net run rate really work?
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 font-normal">
                      A clear walkthrough with real numbers and all-out quota rules.
                    </p>
                  </div>
                  <div className="text-[11px] font-bold text-brand-600 flex items-center gap-1 mt-3">
                    Read guide <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                  </div>
                </Link>

                <Link
                  href="/news/t20-reset"
                  className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 hover:border-amber-300 transition group flex flex-col justify-between interactive-card"
                >
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase text-amber-700 bg-white px-2 py-0.5 rounded">
                      ANALYSIS
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-navy mt-2 leading-snug group-hover:text-brand-600 transition font-display">
                      The evolving T20 Powerplay blueprint
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 font-normal">
                      Why scoring rates in overs 1-6 determine tournament winners.
                    </p>
                  </div>
                  <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1 mt-3">
                    Read analysis <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Local Organizer Platform CTA */}
          <div className="bg-gradient-to-br from-navy via-slate-900 to-brand-900 rounded-3xl p-6 text-white shadow-card flex flex-col justify-between border border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  LOCAL TOURNAMENT OPS
                </span>
                <span className="text-xs text-slate-400">Club & Tape-Ball Cricket</span>
              </div>
              <h3 className="font-extrabold text-xl font-display text-white mt-1">
                Run professional tournaments in your city.
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-normal">
                CreaseGrid empowers local tournament organizers across Pakistan and globally with phone-first ball-by-ball scoring, automated legal delivery tracking, instant NRR standings, and live shareable links.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3 mt-4 border-t border-white/10">
              <Link
                href="/organizer"
                className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 btn-tactile"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Launch Organizer Workspace</span>
              </Link>
              <Link
                href="/organizer/scoring"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition border border-white/20 flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Try Live Scoring Pad</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}
