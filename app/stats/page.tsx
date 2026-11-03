'use client';

import React from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import SectionHeader from '@/components/ui/SectionHeader';
import { BarChart2, Target, Trophy, ArrowRight, GitCompare } from 'lucide-react';

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-body transition-colors duration-200">
      <PublicHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Breadcrumb */}
        <div className="text-xs text-ink-muted flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-tealAccent">Home</Link>
          <span>/</span>
          <span className="font-bold text-ink">Stats & Records</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-display">
              Cricket Stats & Records Explorer
            </h1>
            <p className="text-xs sm:text-sm text-ink-muted mt-1">
              Explore all-time batting, bowling, team, and tournament records with clear coverage caveats.
            </p>
          </div>

          <Link
            href="/compare"
            className="bg-brand hover:bg-brand-hover dark:bg-lime dark:text-canvas text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 self-start sm:self-auto btn-tactile"
          >
            <GitCompare className="w-4 h-4" />
            <span>Player Comparison Lab</span>
          </Link>
        </div>

        {/* 3 Explorer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: BarChart2,
              title: 'Batting Records',
              desc: 'Most runs, centuries, batting averages, and milestone strike rates.',
            },
            {
              icon: Target,
              title: 'Bowling Records',
              desc: 'Best bowling figures, career wickets, five-wicket hauls, and economy.',
            },
            {
              icon: Trophy,
              title: 'Tournament Records',
              desc: 'World Cup, Champions Trophy, and PSL season leaderboards.',
            },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="bg-surface rounded-2xl p-5 border border-line shadow-xs hover:border-tealAccent/60 transition flex flex-col justify-between interactive-card"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-surface-alt text-tealAccent dark:text-lime flex items-center justify-center mb-3 border border-line">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-ink font-display">{cat.title}</h3>
                  <p className="text-xs text-ink-muted mt-1">{cat.desc}</p>
                </div>
                <Link
                  href="/players/babar-azam"
                  className="mt-4 text-xs font-bold text-tealAccent dark:text-lime hover:underline flex items-center gap-1"
                >
                  Explore records <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Batting Leaders Table */}
        <div className="bg-surface rounded-2xl p-5 border border-line shadow-xs">
          <SectionHeader
            title="Sample Batting Leaders · Verified Baseline"
            href="/compare"
            linkLabel="Compare players"
            subtitle="Demonstration dataset labeled with format scopes"
          />

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line text-ink-muted font-bold uppercase text-[10px]">
                  <th className="pb-3 pl-2">#</th>
                  <th className="pb-3">Player</th>
                  <th className="pb-3">Country</th>
                  <th className="pb-3">Format</th>
                  <th className="pb-3 text-right">Runs</th>
                  <th className="pb-3 text-right pr-2">Average</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {[
                  { rank: 1, name: 'Babar Azam', country: '🇵🇰 Pakistan', format: 'ODI', runs: '5,720', avg: '55.32' },
                  { rank: 2, name: 'Virat Kohli', country: '🇮🇳 India', format: 'ODI', runs: '13,848', avg: '58.67' },
                  { rank: 3, name: 'Kane Williamson', country: '🇳🇿 New Zealand', format: 'Test', runs: '8,743', avg: '54.98' },
                  { rank: 4, name: 'Joe Root', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', format: 'Test', runs: '12,716', avg: '51.06' },
                ].map((row) => (
                  <tr key={row.name} className="hover:bg-surface-alt/70 transition">
                    <td className="py-3 pl-2 font-bold text-ink-muted">{row.rank}</td>
                    <td className="py-3 font-bold text-ink">
                      <Link href="/players/babar-azam" className="hover:text-tealAccent">
                        {row.name}
                      </Link>
                    </td>
                    <td className="py-3 text-ink-muted">{row.country}</td>
                    <td className="py-3 font-bold text-tealAccent dark:text-lime">{row.format}</td>
                    <td className="py-3 text-right font-black text-ink tabular-nums font-mono">{row.runs}</td>
                    <td className="py-3 text-right pr-2 font-mono text-[11px] tabular-nums text-emerald-500 font-bold">{row.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
