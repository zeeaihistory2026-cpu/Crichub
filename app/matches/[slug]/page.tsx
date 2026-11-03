'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import TeamFlag from '@/components/ui/TeamFlag';
import { SEED_MATCHES } from '@/data/seed-data';
import { Target, ChevronRight } from 'lucide-react';

interface MatchPageProps {
  params: {
    slug: string;
  };
}

export default function MatchDetailPage({ params }: MatchPageProps) {
  const match = SEED_MATCHES.find((m) => m.slug === params.slug) || SEED_MATCHES[0];
  const [activeTab, setActiveTab] = useState<'summary' | 'scorecard' | 'commentary' | 'stats' | 'timeline'>('summary');

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-body transition-colors duration-200">
      <PublicHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-9 pb-16 space-y-7">
        {/* Breadcrumb */}
        <div className="text-xs text-ink-muted flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-tealAccent">Home</Link>
          <span>/</span>
          <Link href="/matches" className="hover:text-tealAccent">Matches</Link>
          <span>/</span>
          <span className="font-bold text-ink font-display">{match.name}</span>
        </div>

        {/* Live Match Hero Banner */}
        <section className="bg-gradient-to-r from-[#0B513E] to-[#06392C] dark:from-[#122B34] dark:to-[#0A1A22] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-tealAccent/25 dark:border-line">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-alert text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>{match.status}</span>
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-2">
                {match.name}
              </h1>
              <p className="text-xs text-slate-200 dark:text-slate-300 mt-1 font-normal">{match.detail}</p>
            </div>

            <Link
              href="/tools/required-run-rate"
              className="bg-lime hover:bg-lime-hover text-canvas font-extrabold text-xs px-5 py-2.5 rounded-full transition-all shadow-md flex items-center gap-1.5 self-start sm:self-auto btn-tactile"
            >
              <Target className="w-4 h-4 stroke-[2.5]" />
              <span>Calculate Chase RRR</span>
            </Link>
          </div>

          {/* Scores Split */}
          <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Team A */}
            <div className="flex items-center gap-4">
              <TeamFlag code={match.teamACode} size={48} />
              <div>
                <div className="text-xs text-slate-200 uppercase tracking-wider font-mono font-bold">
                  {match.teamA} (Chasing)
                </div>
                <div className="text-3xl sm:text-5xl font-black text-white tabular-nums tracking-tight font-mono">
                  {match.teamAScore}
                </div>
              </div>
            </div>

            {/* Central Chase Equation */}
            <div className="text-center bg-black/25 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-inner">
              <div className="text-[10px] uppercase font-mono font-bold text-lime tracking-wider">
                CHASE EQUATION
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-white mt-1 font-display">
                Need {match.runsNeeded || 35} runs from {match.ballsRemaining || 22} balls
              </div>
              <div className="text-xs text-slate-200 mt-2 flex items-center justify-center gap-3 font-mono">
                <span>Target: <b>{match.target || 177}</b></span>
                <span>·</span>
                <span>CRR: <b>{match.currentRate || 8.69}</b></span>
                <span>·</span>
                <span>RRR: <b>{match.requiredRate || 9.55}</b></span>
              </div>
            </div>

            {/* Team B */}
            <div className="flex items-center justify-end gap-4 text-right">
              <div>
                <div className="text-xs text-slate-200 uppercase tracking-wider font-mono font-bold">
                  {match.teamB} (1st Innings)
                </div>
                <div className="text-3xl sm:text-5xl font-black text-white tabular-nums tracking-tight font-mono">
                  {match.teamBScore}
                </div>
              </div>
              <TeamFlag code={match.teamBCode} size={48} />
            </div>
          </div>
        </section>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-line pb-3 overflow-x-auto">
          {[
            { id: 'summary', label: 'Match Summary' },
            { id: 'scorecard', label: 'Detailed Scorecard' },
            { id: 'commentary', label: 'Ball-by-Ball Commentary' },
            { id: 'stats', label: 'Innings Comparison' },
            { id: 'timeline', label: 'Match Timeline' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition btn-tactile whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-brand text-white dark:bg-lime dark:text-canvas font-bold shadow-xs'
                  : 'bg-surface text-ink-muted hover:text-ink hover:bg-surface-alt border border-line'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'summary' && (
              <>
                {/* Last Over Ticker */}
                <div className="bg-surface dark:bg-surface rounded-3xl p-6 border border-line shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-ink font-display">Over 16 Deliveries</h3>
                    <span className="text-xs font-mono font-medium text-ink-muted">12 runs scored · Boult bowling</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { ball: '1', class: 'bg-surface-alt text-ink border border-line' },
                      { ball: '0', class: 'bg-surface-alt text-ink border border-line' },
                      { ball: '4', class: 'bg-tealAccent text-white font-extrabold shadow-2xs' },
                      { ball: 'W', class: 'bg-alert text-white font-extrabold shadow-2xs' },
                      { ball: '1', class: 'bg-surface-alt text-ink border border-line' },
                      { ball: '6', class: 'bg-brand text-white dark:bg-lime dark:text-canvas font-extrabold shadow-2xs' },
                    ].map((d, i) => (
                      <span
                        key={i}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs shadow-2xs ${d.class}`}
                      >
                        {d.ball}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Scorecard Preview Table */}
                <div className="bg-surface dark:bg-surface rounded-3xl p-6 border border-line shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-ink font-display">Pakistan Batting (Innings 2)</h3>
                    <span className="text-xs font-mono font-bold text-ink-muted">142/4 (16.2 ov)</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-line text-ink-muted font-mono font-bold uppercase text-[10px] tracking-wider">
                          <th className="pb-2.5">BATTER</th>
                          <th className="pb-2.5">DISMISSAL</th>
                          <th className="pb-2.5 text-right">R</th>
                          <th className="pb-2.5 text-right">B</th>
                          <th className="pb-2.5 text-right">4s</th>
                          <th className="pb-2.5 text-right">6s</th>
                          <th className="pb-2.5 text-right pr-2">SR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line/60">
                        {[
                          { batter: 'Babar Azam *', dis: 'batting', r: 58, b: 39, f: 5, s: 2, sr: 148.7 },
                          { batter: 'Mohammad Rizwan', dis: 'c Conway b Boult', r: 34, b: 24, f: 3, s: 1, sr: 141.6 },
                          { batter: 'Saim Ayub', dis: 'b Santner', r: 18, b: 12, f: 2, s: 1, sr: 150.0 },
                          { batter: 'Fakhar Zaman', dis: 'c Phillips b Sodhi', r: 12, b: 9, f: 1, s: 0, sr: 133.3 },
                          { batter: 'Iftikhar Ahmed *', dis: 'batting', r: 14, b: 8, f: 1, s: 1, sr: 175.0 },
                        ].map((row) => (
                          <tr key={row.batter} className="hover:bg-surface-alt transition">
                            <td className="py-2.5 font-bold text-ink font-display">{row.batter}</td>
                            <td className="py-2.5 text-ink-muted text-[11px]">{row.dis}</td>
                            <td className="py-2.5 text-right font-black font-mono tabular-nums text-ink">{row.r}</td>
                            <td className="py-2.5 text-right font-mono tabular-nums text-ink-muted">{row.b}</td>
                            <td className="py-2.5 text-right font-mono tabular-nums text-ink-muted">{row.f}</td>
                            <td className="py-2.5 text-right font-mono tabular-nums text-ink-muted">{row.s}</td>
                            <td className="py-2.5 text-right font-mono tabular-nums text-ink-muted pr-2">{row.sr}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'scorecard' && (
              <div className="bg-surface dark:bg-surface rounded-3xl p-6 border border-line shadow-xs space-y-6">
                <div>
                  <h3 className="text-base font-bold text-ink font-display mb-3">
                    New Zealand 1st Innings: 176/6 (20.0 ov)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-line text-ink-muted font-mono font-bold uppercase text-[10px] tracking-wider">
                          <th className="pb-2">BATTER</th>
                          <th className="pb-2 text-right">R</th>
                          <th className="pb-2 text-right">B</th>
                          <th className="pb-2 text-right">4s</th>
                          <th className="pb-2 text-right">6s</th>
                          <th className="pb-2 text-right pr-2">SR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line/60">
                        {[
                          { batter: 'Devon Conway', r: 44, b: 32, f: 4, s: 1, sr: 137.5 },
                          { batter: 'Finn Allen', r: 38, b: 19, f: 3, s: 3, sr: 200.0 },
                          { batter: 'Kane Williamson', r: 35, b: 28, f: 3, s: 0, sr: 125.0 },
                          { batter: 'Glenn Phillips', r: 28, b: 18, f: 2, s: 2, sr: 155.5 },
                        ].map((b) => (
                          <tr key={b.batter} className="hover:bg-surface-alt transition">
                            <td className="py-2 font-bold text-ink font-display">{b.batter}</td>
                            <td className="py-2 text-right font-black font-mono tabular-nums text-ink">{b.r}</td>
                            <td className="py-2 text-right font-mono tabular-nums text-ink-muted">{b.b}</td>
                            <td className="py-2 text-right font-mono tabular-nums text-ink-muted">{b.f}</td>
                            <td className="py-2 text-right font-mono tabular-nums text-ink-muted">{b.s}</td>
                            <td className="py-2 text-right font-mono tabular-nums text-ink-muted pr-2">{b.sr}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'commentary' && (
              <div className="bg-surface dark:bg-surface rounded-3xl p-6 border border-line shadow-xs space-y-4">
                <h3 className="text-base font-bold text-ink font-display">Ball-by-Ball Commentary</h3>
                <div className="space-y-3">
                  {[
                    { over: '16.2', text: 'Boult to Iftikhar Ahmed, 1 run, guided towards backward point for a sharp single.', ball: '1' },
                    { over: '16.1', text: 'Boult to Babar Azam, 1 run, punched off the backfoot through covers.', ball: '1' },
                    { over: '15.6', text: 'Sodhi to Babar Azam, SIX! Magnificent lofted drive straight down the ground, sailing into the stands!', ball: '6' },
                    { over: '15.5', text: 'Sodhi to Babar Azam, 1 run, tucked around the corner.', ball: '1' },
                    { over: '15.4', text: 'Sodhi to Fakhar Zaman, OUT! Caught at long-off! High in the air and safely pouching it is Glenn Phillips.', ball: 'W' },
                  ].map((comm, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-surface-alt border border-line flex items-start gap-3">
                      <span className={`w-8 h-8 rounded-xl font-mono font-bold text-xs flex items-center justify-center shrink-0 ${comm.ball === 'W' ? 'bg-alert text-white' : comm.ball === '6' ? 'bg-brand text-white dark:bg-lime dark:text-canvas' : 'bg-surface border border-line text-ink'}`}>
                        {comm.ball}
                      </span>
                      <div>
                        <div className="text-xs font-mono font-bold text-ink-muted">Over {comm.over}</div>
                        <p className="text-xs text-ink font-medium mt-1">{comm.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Key Match Context */}
          <div className="space-y-6">
            <div className="bg-surface dark:bg-surface rounded-3xl p-6 border border-line shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-ink font-display">Match Condition &amp; Pitch</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-line">
                  <span className="text-ink-muted">Toss:</span>
                  <span className="font-bold text-ink">Pakistan won toss, chose to bowl</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-line">
                  <span className="text-ink-muted">Venue:</span>
                  <span className="font-bold text-ink">Gaddafi Stadium, Lahore</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-line">
                  <span className="text-ink-muted">Umpires:</span>
                  <span className="font-bold text-ink">Aleem Dar &amp; Ahsan Raza</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-ink-muted">DLS Par:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-lime">138 (Ahead by 4 runs)</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#0B513E] to-[#06392C] dark:from-[#122B34] dark:to-[#0A1A22] rounded-3xl p-6 text-white shadow-xl border border-tealAccent/25 dark:border-line space-y-3">
              <h3 className="font-extrabold text-base font-display">Explore Chase Mathematics</h3>
              <p className="text-xs text-slate-200 dark:text-slate-300 leading-relaxed font-normal">
                Check exactly how every dot ball, single or boundary shifts the required run rate (RRR) and projected total.
              </p>
              <Link
                href="/tools/required-run-rate"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-lime hover:bg-lime-hover text-canvas font-extrabold text-xs py-2.5 rounded-xl transition-all shadow-md btn-tactile"
              >
                <span>Launch RRR Calculator</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
