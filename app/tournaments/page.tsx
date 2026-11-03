'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import SectionHeader from '@/components/ui/SectionHeader';
import { SEED_PSL_STANDINGS, SEED_MATCHES, SEED_ARTICLES } from '@/data/seed-data';
import { Trophy, ArrowRight } from 'lucide-react';

export default function TournamentsPage() {
  const [activeTab, setActiveTab] = useState<'table' | 'fixtures' | 'teams' | 'stats' | 'news'>('table');

  const pslTeams = [
    'Lahore Qalandars',
    'Karachi Kings',
    'Islamabad United',
    'Multan Sultans',
    'Peshawar Zalmi',
    'Quetta Gladiators',
  ];

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-body transition-colors duration-200">
      <PublicHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-9 pb-16 space-y-7">
        {/* Breadcrumb */}
        <div className="text-xs text-ink-muted flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-tealAccent">Home</Link>
          <span>/</span>
          <span className="font-bold text-ink font-display">Tournaments</span>
        </div>

        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-[#0B513E] to-[#06392C] dark:from-[#122B34] dark:to-[#0A1A22] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-tealAccent/25 dark:border-line flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-lime border border-white/15 text-xs font-mono font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              <span>TOURNAMENT HUB · PAKISTAN SUPER LEAGUE 2026</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Pakistan Super League 2026
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-300 font-normal leading-relaxed">
              Complete tournament schedule, group tables, squad compositions, and qualification scenarios.
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <Link
              href="/qualification"
              className="bg-lime hover:bg-lime-hover text-canvas font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:scale-[1.02] flex items-center gap-2 btn-tactile"
            >
              <span>Explore Scenarios</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-line pb-3 overflow-x-auto">
          {[
            { id: 'table', label: 'Points Table' },
            { id: 'fixtures', label: 'Fixtures & Results' },
            { id: 'teams', label: 'Teams & Squads' },
            { id: 'stats', label: 'Tournament Stats' },
            { id: 'news', label: 'Tournament News' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition shrink-0 btn-tactile ${
                activeTab === tab.id
                  ? 'bg-brand text-white dark:bg-lime dark:text-canvas font-bold shadow-xs'
                  : 'bg-surface text-ink-muted hover:text-ink hover:bg-surface-alt border border-line'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'table' && (
              <div className="bg-surface dark:bg-surface rounded-2xl p-5 border border-line shadow-xs">
                <SectionHeader
                  title="PSL 2026 Official Standings"
                  href="/qualification"
                  linkLabel="Test in Qualification Lab"
                  subtitle="Top 4 qualify for playoffs (Qualifier & Eliminator)"
                />

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-line text-ink-muted font-mono font-bold uppercase text-[10px]">
                        <th className="pb-3 pl-2">#</th>
                        <th className="pb-3">Team</th>
                        <th className="pb-3 text-center">P</th>
                        <th className="pb-3 text-center">W</th>
                        <th className="pb-3 text-center">L</th>
                        <th className="pb-3 text-center font-bold text-ink">Pts</th>
                        <th className="pb-3 text-right pr-2">NRR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {SEED_PSL_STANDINGS.map((row, idx) => {
                        const isPlayoffs = idx < 4;
                        return (
                          <tr
                            key={row.name}
                            className={`${isPlayoffs ? 'bg-lime/5' : ''} hover:bg-surface-alt transition`}
                          >
                            <td className="py-3 pl-2 font-bold text-ink-muted">
                              <span
                                className={`w-5 h-5 rounded-full text-[10px] font-mono inline-flex items-center justify-center ${
                                  isPlayoffs ? 'bg-brand text-white dark:bg-lime dark:text-canvas font-bold' : 'text-ink-muted'
                                }`}
                              >
                                {idx + 1}
                              </span>
                            </td>
                            <td className="py-3 font-bold text-ink flex items-center gap-2 font-display">
                              <span>🏏</span>
                              <span>{row.name}</span>
                            </td>
                            <td className="py-3 text-center text-ink-muted font-mono tabular-nums">{row.p}</td>
                            <td className="py-3 text-center text-emerald-600 dark:text-lime font-bold font-mono tabular-nums">{row.w}</td>
                            <td className="py-3 text-center text-alert font-mono tabular-nums">{row.l}</td>
                            <td className="py-3 text-center font-black text-ink text-sm font-mono tabular-nums">{row.pts}</td>
                            <td
                              className={`py-3 text-right pr-2 tabular-nums font-mono text-[11px] ${
                                row.nrr.startsWith('+') ? 'text-emerald-600 dark:text-lime font-bold' : 'text-alert'
                              }`}
                            >
                              {row.nrr}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'fixtures' && (
              <div className="bg-surface dark:bg-surface rounded-2xl p-5 border border-line shadow-xs space-y-3">
                <SectionHeader title="PSL Fixtures & Results" />
                <div className="space-y-3">
                  {SEED_MATCHES.map((m) => (
                    <div key={m.id} className="p-3.5 rounded-xl bg-surface-alt border border-line flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-ink">{m.name}</div>
                        <div className="text-[10px] text-ink-muted">{m.detail}</div>
                      </div>
                      <Link
                        href={`/matches/${m.slug}`}
                        className="text-xs font-bold text-tealAccent hover:underline flex items-center gap-1"
                      >
                        Scorecard <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'teams' && (
              <div className="bg-surface dark:bg-surface rounded-2xl p-5 border border-line shadow-xs space-y-4">
                <SectionHeader title="Participating Franchises" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pslTeams.map((team) => (
                    <div key={team} className="p-4 rounded-xl bg-surface-alt border border-line flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">🏏</span>
                        <div className="font-bold text-xs sm:text-sm text-ink">{team}</div>
                      </div>
                      <Link href="/players/babar-azam" className="text-xs font-bold text-tealAccent hover:underline">
                        Squad
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="bg-surface dark:bg-surface rounded-2xl p-5 border border-line shadow-xs space-y-4">
                <SectionHeader title="Tournament Leaderboards" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Total Runs', val: '9,240' },
                    { label: 'Total Wickets', val: '301' },
                    { label: 'Sixes Hit', val: '412' },
                    { label: 'Highest Score', val: '241/3' },
                  ].map((s) => (
                    <div key={s.label} className="p-4 rounded-xl bg-surface-alt text-center border border-line">
                      <div className="text-xl font-black text-ink tabular-nums font-mono">{s.val}</div>
                      <div className="text-[10px] text-ink-muted uppercase font-semibold mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="bg-surface dark:bg-surface rounded-2xl p-5 border border-line shadow-xs space-y-3">
                <SectionHeader title="League News & Updates" href="/news" />
                {SEED_ARTICLES.filter((a) => a.category === 'PSL' || a.category === 'Breaking').map((art) => (
                  <div key={art.id} className="p-3.5 rounded-xl bg-surface-alt border border-line">
                    <h4 className="text-xs font-bold text-ink">
                      <Link href={`/news/${art.id}`} className="hover:text-tealAccent">{art.title}</Link>
                    </h4>
                    <p className="text-[11px] text-ink-muted mt-1">{art.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar (1 Col) */}
          <aside className="space-y-6">
            <div className="bg-gradient-to-r from-[#0B513E] to-[#06392C] dark:from-[#122B34] dark:to-[#0A1A22] text-white rounded-2xl p-6 shadow-xl border border-tealAccent/25 dark:border-line space-y-4">
              <Trophy className="w-6 h-6 text-lime" />
              <h3 className="font-extrabold text-base font-display">Simulate Playoff Pathways</h3>
              <p className="text-xs text-slate-200 dark:text-slate-300 leading-relaxed font-normal">
                Can Lahore Qalandars hold the top seed? Test hypothetical fixture scores and watch the standings shift instantly.
              </p>
              <Link
                href="/qualification"
                className="w-full inline-flex items-center justify-center gap-2 bg-lime hover:bg-lime-hover text-canvas font-extrabold text-xs py-2.5 rounded-xl transition-all shadow-md btn-tactile"
              >
                <span>Launch Qualification Lab</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
