'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import MatchTile from '@/components/ui/MatchTile';
import { SEED_MATCHES } from '@/data/seed-data';
import { Radio, Calendar, ArrowRight, Zap, Target } from 'lucide-react';

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'upcoming'>('all');

  const filteredMatches = SEED_MATCHES.filter((m) => {
    if (activeTab === 'live') return m.status.includes('LIVE') || m.status.includes('PROGRESS');
    if (activeTab === 'upcoming') return m.status.includes('UPCOMING');
    return true;
  });

  return (
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <span className="font-bold text-navy">Match Centre</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-red-600 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-600 live-pulse"></span>
              FIXTURES, LIVE SCORES & RESULTS
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mt-1">
              Match Centre
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Follow real-time ball trajectories, chase equations, and complete innings scorecards.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/tools/required-run-rate"
              className="bg-brand-50 text-brand-600 hover:bg-brand-100 font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 border border-brand-200"
            >
              <Target className="w-3.5 h-3.5" />
              Chase Calculator
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          {[
            { id: 'all', label: 'All Matches' },
            { id: 'live', label: 'Live / In Progress' },
            { id: 'upcoming', label: 'Upcoming Fixtures' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === tab.id
                  ? 'bg-navy text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMatches.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl p-5 border border-[#e5eaf2] hover:border-brand-300 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                      m.status.includes('LIVE')
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : m.status.includes('PROGRESS')
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {m.status}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{m.format}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-bold text-navy">
                    <span className="flex items-center gap-2">
                      <span className="text-xl">{m.teamAFlag}</span>
                      <span>{m.teamA}</span>
                    </span>
                    <span className="tabular-nums font-mono text-base">{m.teamAScore}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm font-bold text-navy">
                    <span className="flex items-center gap-2">
                      <span className="text-xl">{m.teamBFlag}</span>
                      <span>{m.teamB}</span>
                    </span>
                    <span className="tabular-nums font-mono text-base text-slate-500">
                      {m.teamBScore || 'Yet to bat'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                  {m.detail}
                </div>
              </div>

              <div className="mt-4 pt-2">
                <Link
                  href={`/matches/${m.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-brand-50 text-slate-700 hover:text-brand-600 text-xs font-bold py-2 rounded-xl transition border border-slate-200 group-hover:border-brand-200"
                >
                  <span>Open Detailed Scorecard</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}

