'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { GitCompare, ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Trophy } from 'lucide-react';

export default function ComparePage() {
  const [format, setFormat] = useState<'T20I' | 'ODI' | 'Test'>('T20I');

  const comparisonData = {
    T20I: [
      { metric: 'Matches', a: 127, b: 102 },
      { metric: 'Total Runs', a: 4170, b: 3313 },
      { metric: 'Batting Average', a: 40.48, b: 48.72 },
      { metric: 'Strike Rate', a: 129.1, b: 126.1 },
      { metric: 'Centuries (100s)', a: 3, b: 1 },
      { metric: 'Fifties (50s)', a: 36, b: 29 },
    ],
    ODI: [
      { metric: 'Matches', a: 123, b: 74 },
      { metric: 'Total Runs', a: 5720, b: 2088 },
      { metric: 'Batting Average', a: 55.32, b: 40.15 },
      { metric: 'Strike Rate', a: 88.1, b: 89.4 },
      { metric: 'Centuries (100s)', a: 19, b: 3 },
      { metric: 'Fifties (50s)', a: 32, b: 15 },
    ],
    Test: [
      { metric: 'Matches', a: 52, b: 32 },
      { metric: 'Total Runs', a: 3900, b: 1720 },
      { metric: 'Batting Average', a: 44.3, b: 41.95 },
      { metric: 'Strike Rate', a: 55.5, b: 53.2 },
      { metric: 'Centuries (100s)', a: 9, b: 3 },
      { metric: 'Fifties (50s)', a: 26, b: 10 },
    ],
  }[format];

  return (
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link href="/stats" className="hover:text-brand-600">Stats</Link>
          <span>/</span>
          <span className="font-bold text-navy font-display">Player Comparison Lab</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider">
              HEAD-TO-HEAD INTELLIGENCE
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy font-display tracking-tightest mt-1">
              Player Comparison Lab
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-normal">
              Side-by-side format-scoped statistical evaluation with proportional dual-track benchmarks.
            </p>
          </div>

          {/* Format selector */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
            {(['T20I', 'ODI', 'Test'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition btn-tactile ${
                  format === fmt
                    ? 'bg-navy text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Player Profile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Player A */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card flex items-center gap-4 interactive-card">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-xs">
              <Image src="/assets/profile.webp" alt="Babar Azam" fill className="object-cover" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200">
                PLAYER A
              </span>
              <h2 className="text-lg font-black text-navy mt-1 font-display">Babar Azam</h2>
              <div className="text-xs text-slate-500 font-medium">🇵🇰 Pakistan · Top Order Batter</div>
            </div>
          </div>

          {/* Player B */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card flex items-center gap-4 interactive-card">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-xs">
              <Image src="/assets/player2.webp" alt="Mohammad Rizwan" fill className="object-cover" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                PLAYER B
              </span>
              <h2 className="text-lg font-black text-navy mt-1 font-display">Mohammad Rizwan</h2>
              <div className="text-xs text-slate-500 font-medium">🇵🇰 Pakistan · Wicketkeeper Batter</div>
            </div>
          </div>
        </div>

        {/* Dual-Track Metric Comparison */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider">
              Babar Azam
            </span>
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              CAREER BENCHMARK ({format})
            </span>
            <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">
              Mohammad Rizwan
            </span>
          </div>

          <div className="space-y-6">
            {comparisonData.map((row) => {
              const max = Math.max(row.a, row.b);
              const pctA = Math.round((row.a / max) * 100);
              const pctB = Math.round((row.b / max) * 100);
              const aIsBetter = row.a >= row.b;

              return (
                <div key={row.metric} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span
                      className={`tabular-nums font-mono text-sm ${
                        aIsBetter ? 'text-brand-600 font-black' : 'text-slate-500'
                      }`}
                    >
                      {row.a}
                    </span>
                    <span className="text-navy text-xs font-extrabold font-display">{row.metric}</span>
                    <span
                      className={`tabular-nums font-mono text-sm ${
                        !aIsBetter ? 'text-amber-600 font-black' : 'text-slate-500'
                      }`}
                    >
                      {row.b}
                    </span>
                  </div>

                  {/* Dual Bar Proportional Visual Track */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Left Track (Reversed direction for Player A) */}
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex justify-end">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          aIsBetter ? 'bg-brand-600' : 'bg-slate-300'
                        }`}
                        style={{ width: `${pctA}%` }}
                      />
                    </div>

                    {/* Right Track (Normal direction for Player B) */}
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex justify-start">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          !aIsBetter ? 'bg-amber-500' : 'bg-slate-300'
                        }`}
                        style={{ width: `${pctB}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[11px]">Official ICC career databases synchronized</span>
            <Link href="/players" className="text-brand-600 font-bold hover:underline">
              View individual player profile →
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
