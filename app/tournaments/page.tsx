'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import SectionHeader from '@/components/ui/SectionHeader';
import { SEED_PSL_STANDINGS, SEED_MATCHES, SEED_ARTICLES } from '@/data/seed-data';
import { Trophy, ArrowRight, Calendar, Users, BarChart3, Newspaper } from 'lucide-react';

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
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <span className="font-bold text-navy">Tournaments</span>
        </div>

        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-navy via-slate-900 to-navy text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              TOURNAMENT HUB · PAKISTAN SUPER LEAGUE 2026
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Pakistan Super League 2026
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Complete tournament schedule, group tables, squad compositions, and qualification scenarios.
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <Link
              href="/qualification"
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5"
            >
              <span>Explore Scenarios</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
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
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                activeTab === tab.id
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
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
              <div className="bg-white rounded-2xl p-5 border border-[#e5eaf2] shadow-xs">
                <SectionHeader
                  title="PSL 2026 Official Standings"
                  href="/qualification"
                  linkLabel="Test in Qualification Lab"
                  subtitle="Top 4 qualify for playoffs (Qualifier & Eliminator)"
                />

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="pb-3 pl-2">#</th>
                        <th className="pb-3">Team</th>
                        <th className="pb-3 text-center">P</th>
                        <th className="pb-3 text-center">W</th>
                        <th className="pb-3 text-center">L</th>
                        <th className="pb-3 text-center font-black text-navy">Pts</th>
                        <th className="pb-3 text-right pr-2">NRR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {SEED_PSL_STANDINGS.map((row, idx) => {
                        const isPlayoffs = idx < 4;
                        return (
                          <tr
                            key={row.name}
                            className={`${isPlayoffs ? 'bg-emerald-50/30' : ''} hover:bg-slate-50 transition`}
                          >
                            <td className="py-3 pl-2 font-bold text-slate-500">
                              <span
                                className={`w-5 h-5 rounded-full text-[10px] inline-flex items-center justify-center ${
                                  isPlayoffs ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
                                }`}
                              >
                                {idx + 1}
                              </span>
                            </td>
                            <td className="py-3 font-bold text-navy flex items-center gap-2">
                              <span>🏏</span>
                              <span>{row.name}</span>
                            </td>
                            <td className="py-3 text-center text-slate-500">{row.p}</td>
                            <td className="py-3 text-center text-emerald-600 font-bold">{row.w}</td>
                            <td className="py-3 text-center text-red-500">{row.l}</td>
                            <td className="py-3 text-center font-black text-navy text-sm">{row.pts}</td>
                            <td
                              className={`py-3 text-right pr-2 tabular-nums font-mono text-[11px] ${
                                row.nrr.startsWith('+') ? 'text-emerald-600 font-bold' : 'text-red-500'
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
              <div className="bg-white rounded-2xl p-5 border border-[#e5eaf2] shadow-xs space-y-3">
                <SectionHeader title="PSL Fixtures & Results" />
                <div className="space-y-3">
                  {SEED_MATCHES.map((m) => (
                    <div key={m.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-navy">{m.name}</div>
                        <div className="text-[10px] text-slate-400">{m.detail}</div>
                      </div>
                      <Link
                        href={`/matches/${m.slug}`}
                        className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
                      >
                        Scorecard <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'teams' && (
              <div className="bg-white rounded-2xl p-5 border border-[#e5eaf2] shadow-xs space-y-4">
                <SectionHeader title="Participating Franchises" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pslTeams.map((team) => (
                    <div key={team} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">🏏</span>
                        <div className="font-bold text-xs sm:text-sm text-navy">{team}</div>
                      </div>
                      <Link href="/players/babar-azam" className="text-xs font-bold text-brand-600 hover:underline">
                        Squad
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="bg-white rounded-2xl p-5 border border-[#e5eaf2] shadow-xs space-y-4">
                <SectionHeader title="Tournament Leaderboards" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Total Runs', val: '9,240' },
                    { label: 'Total Wickets', val: '301' },
                    { label: 'Sixes Hit', val: '412' },
                    { label: 'Highest Score', val: '241/3' },
                  ].map((s) => (
                    <div key={s.label} className="p-4 rounded-xl bg-slate-50 text-center">
                      <div className="text-xl font-black text-navy tabular-nums">{s.val}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="bg-white rounded-2xl p-5 border border-[#e5eaf2] shadow-xs space-y-3">
                <SectionHeader title="League News & Updates" href="/news" />
                {SEED_ARTICLES.filter((a) => a.category === 'PSL' || a.category === 'Breaking').map((art) => (
                  <div key={art.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <h4 className="text-xs font-bold text-navy">
                      <Link href={`/news/${art.id}`} className="hover:text-brand-600">{art.title}</Link>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1">{art.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar (1 Col) */}
          <aside className="space-y-6">
            <div className="bg-gradient-to-br from-brand-600 to-navy text-white rounded-2xl p-5 shadow-md space-y-3">
              <Trophy className="w-6 h-6 text-amber-300" />
              <h3 className="font-extrabold text-base">Simulate Playoff Pathways</h3>
              <p className="text-xs text-slate-200">
                Can Lahore Qalandars hold the top seed? Test hypothetical fixture scores and watch the standings shift instantly.
              </p>
              <Link
                href="/qualification"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-white text-brand-700 font-bold text-xs py-2 rounded-xl hover:bg-slate-100 transition shadow-xs"
              >
                <span>Launch Qualification Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}

