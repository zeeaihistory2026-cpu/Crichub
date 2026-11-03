'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import TeamFlag from '@/components/ui/TeamFlag';
import { SEED_MATCHES } from '@/data/seed-data';
import { ArrowRight, Target } from 'lucide-react';

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'upcoming'>('all');

  const filteredMatches = SEED_MATCHES.filter((m) => {
    if (activeTab === 'live') return m.status.includes('LIVE') || m.status.includes('PROGRESS');
    if (activeTab === 'upcoming') return m.status.includes('UPCOMING');
    return true;
  });

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-body transition-colors duration-200">
      <PublicHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-9 pb-16 space-y-7">
        {/* Breadcrumb */}
        <div className="text-xs text-ink-muted flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-tealAccent">Home</Link>
          <span>/</span>
          <span className="font-bold text-ink font-display">Match Centre</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-alert flex items-center gap-2 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-alert animate-ping" />
              <span>FIXTURES, LIVE SCORES &amp; RESULTS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-ink font-display tracking-tight mt-1">
              Match Centre
            </h1>
            <p className="text-xs sm:text-sm text-ink-muted mt-1 font-normal">
              Follow real-time ball trajectories, chase equations, and complete innings scorecards.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/tools/required-run-rate"
              className="bg-surface-alt border border-line hover:border-tealAccent text-ink font-bold text-xs px-4 py-2.5 rounded-full transition flex items-center gap-2 btn-tactile"
            >
              <Target className="w-4 h-4 text-tealAccent" />
              <span>Chase Calculator</span>
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-line pb-3">
          {[
            { id: 'all', label: 'All Matches' },
            { id: 'live', label: 'Live / In Progress' },
            { id: 'upcoming', label: 'Upcoming Fixtures' },
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

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMatches.map((m) => {
            const isLive = m.status.includes('LIVE');
            const isProgress = m.status.includes('PROGRESS');

            return (
              <div
                key={m.id}
                className="bg-surface dark:bg-surface rounded-2xl p-5 border border-line hover:border-tealAccent/60 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isLive
                          ? 'bg-alert text-white shadow-2xs font-extrabold'
                          : isProgress
                          ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          : 'bg-surface-alt text-ink-muted border border-line'
                      }`}
                    >
                      {m.status}
                    </span>
                    <span className="text-xs text-ink-muted font-mono font-semibold">{m.format}</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm font-bold text-ink">
                      <span className="flex items-center gap-2 font-display">
                        <TeamFlag code={m.teamACode} size={22} />
                        <span>{m.teamA}</span>
                      </span>
                      <span className="tabular-nums font-mono text-base">{m.teamAScore}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm font-bold text-ink">
                      <span className="flex items-center gap-2 font-display">
                        <TeamFlag code={m.teamBCode} size={22} />
                        <span>{m.teamB}</span>
                      </span>
                      <span className="tabular-nums font-mono text-base text-ink-muted">
                        {m.teamBScore || 'Yet to bat'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-line text-[11px] text-ink-muted leading-relaxed font-normal">
                    {m.detail}
                  </div>
                </div>

                <div className="mt-5 pt-2">
                  <Link
                    href={`/matches/${m.slug}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-surface-alt hover:border-tealAccent text-ink hover:text-tealAccent text-xs font-bold py-2.5 rounded-xl transition border border-line group-hover:border-tealAccent font-display"
                  >
                    <span>Full Scorecard &amp; Commentary</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
