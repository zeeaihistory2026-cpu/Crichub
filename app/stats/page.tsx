'use client';

import React from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import SectionHeader from '@/components/ui/SectionHeader';
import { BarChart2, Target, Trophy, ArrowRight, GitCompare } from 'lucide-react';

export default function StatsPage() {
  return (
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <span className="font-bold text-navy">Stats & Records</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              Cricket Stats & Records Explorer
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore all-time batting, bowling, team, and tournament records with clear coverage caveats.
            </p>
          </div>

          <Link
            href="/compare"
            className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
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
                className="bg-white rounded-2xl p-5 border border-[#e5eaf2] shadow-xs hover:border-brand-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-navy">{cat.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{cat.desc}</p>
                </div>
                <Link
                  href="/players/babar-azam"
                  className="mt-4 text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
                >
                  Explore records <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Batting Leaders Table */}
        <div className="bg-white rounded-2xl p-5 border border-[#e5eaf2] shadow-xs">
          <SectionHeader
            title="Sample Batting Leaders · Verified Baseline"
            href="/compare"
            linkLabel="Compare players"
            subtitle="Demonstration dataset labeled with format scopes"
          />

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="pb-3 pl-2">#</th>
                  <th className="pb-3">Player</th>
                  <th className="pb-3">Country</th>
                  <th className="pb-3">Format</th>
                  <th className="pb-3 text-right">Runs</th>
                  <th className="pb-3 text-right pr-2">Average</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { rank: 1, name: 'Babar Azam', country: '🇵🇰 Pakistan', format: 'ODI', runs: '5,720', avg: '55.32' },
                  { rank: 2, name: 'Virat Kohli', country: '🇮🇳 India', format: 'ODI', runs: '13,848', avg: '58.67' },
                  { rank: 3, name: 'Kane Williamson', country: '🇳🇿 New Zealand', format: 'Test', runs: '8,743', avg: '54.98' },
                  { rank: 4, name: 'Joe Root', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', format: 'Test', runs: '12,716', avg: '51.06' },
                ].map((row) => (
                  <tr key={row.name} className="hover:bg-slate-50 transition">
                    <td className="py-3 pl-2 font-bold text-slate-400">{row.rank}</td>
                    <td className="py-3 font-bold text-navy">
                      <Link href="/players/babar-azam" className="hover:text-brand-600">
                        {row.name}
                      </Link>
                    </td>
                    <td className="py-3 text-slate-600">{row.country}</td>
                    <td className="py-3 font-bold text-brand-600">{row.format}</td>
                    <td className="py-3 text-right font-black text-navy tabular-nums font-mono">{row.runs}</td>
                    <td className="py-3 text-right pr-2 font-mono text-[11px] tabular-nums text-emerald-600 font-bold">{row.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}

