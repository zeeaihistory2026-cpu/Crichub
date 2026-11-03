'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { SEED_MATCHES } from '@/data/seed-data';
import { Radio, ArrowLeft, Target, TrendingUp, CheckCircle, Clock, ChevronRight } from 'lucide-react';

interface MatchPageProps {
  params: {
    slug: string;
  };
}

export default function MatchDetailPage({ params }: MatchPageProps) {
  const match = SEED_MATCHES.find((m) => m.slug === params.slug) || SEED_MATCHES[0];
  const [activeTab, setActiveTab] = useState<'summary' | 'scorecard' | 'commentary' | 'stats' | 'timeline'>('summary');

  return (
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link href="/matches" className="hover:text-brand-600">Matches</Link>
          <span>/</span>
          <span className="font-bold text-navy font-display">{match.name}</span>
        </div>

        {/* Live Match Hero Banner */}
        <section className="bg-gradient-to-r from-navy via-navy-deep to-brand-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-navy-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-rose-500 live-pulse-glow"></span>
                <span>{match.status}</span>
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tightest mt-2">
                {match.name}
              </h1>
              <p className="text-xs text-slate-300 mt-0.5 font-normal">{match.detail}</p>
            </div>

            <Link
              href="/tools/required-run-rate"
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 self-start sm:self-auto btn-tactile"
            >
              <Target className="w-3.5 h-3.5" />
              <span>Calculate Chase RRR</span>
            </Link>
          </div>

          {/* Scores Split */}
          <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Team A */}
            <div className="flex items-center gap-4">
              <span className="text-4xl sm:text-5xl">{match.teamAFlag}</span>
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-mono font-bold">
                  {match.teamA} (Chasing)
                </div>
                <div className="text-3xl sm:text-5xl font-black text-white tabular-nums tracking-tightest font-mono">
                  {match.teamAScore}
                </div>
              </div>
            </div>

            {/* Central Chase Equation */}
            <div className="text-center bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-inner">
              <div className="text-[10px] uppercase font-mono font-bold text-amber-400 tracking-wider">
                CHASE EQUATION
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5 font-display">
                Need {match.runsNeeded || 35} runs from {match.ballsRemaining || 22} balls
              </div>
              <div className="text-xs text-slate-300 mt-1.5 flex items-center justify-center gap-3 font-mono">
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
                <div className="text-xs text-slate-400 uppercase tracking-wider font-mono font-bold">
                  {match.teamB} (1st Innings)
                </div>
                <div className="text-3xl sm:text-5xl font-black text-white tabular-nums tracking-tightest font-mono">
                  {match.teamBScore}
                </div>
              </div>
              <span className="text-4xl sm:text-5xl">{match.teamBFlag}</span>
            </div>
          </div>
        </section>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
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
              className={`px-4 py-2 rounded-xl text-xs font-bold transition btn-tactile whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-navy text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-navy'
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
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card">
                  <div className="flex items-center justify-between mb-3.5">
                    <h3 className="text-sm font-extrabold text-navy font-display">Over 16 Deliveries</h3>
                    <span className="text-xs font-mono font-bold text-slate-400">12 runs scored · Boult bowling</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { ball: '1', class: 'bg-slate-100 text-navy' },
                      { ball: '0', class: 'bg-slate-100 text-navy' },
                      { ball: '4', class: 'bg-blue-600 text-white font-extrabold' },
                      { ball: 'W', class: 'bg-rose-600 text-white font-extrabold' },
                      { ball: '1', class: 'bg-slate-100 text-navy' },
                      { ball: '6', class: 'bg-brand-600 text-white font-extrabold' },
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
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-navy font-display">Pakistan Batting (Innings 2)</h3>
                    <span className="text-xs font-mono font-bold text-slate-400">142/4 (16.2 ov)</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 font-mono font-bold uppercase text-[10px] tracking-wider">
                          <th className="pb-2.5">BATTER</th>
                          <th className="pb-2.5">DISMISSAL</th>
                          <th className="pb-2.5 text-right">R</th>
                          <th className="pb-2.5 text-right">B</th>
                          <th className="pb-2.5 text-right">4s</th>
                          <th className="pb-2.5 text-right">6s</th>
                          <th className="pb-2.5 text-right pr-2">SR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {[
                          { batter: 'Babar Azam *', dis: 'batting', r: 58, b: 39, f: 5, s: 2, sr: 148.7 },
                          { batter: 'Mohammad Rizwan', dis: 'c Conway b Boult', r: 34, b: 24, f: 3, s: 1, sr: 141.6 },
                          { batter: 'Saim Ayub', dis: 'b Santner', r: 18, b: 12, f: 2, s: 1, sr: 150.0 },
                          { batter: 'Fakhar Zaman', dis: 'c Phillips b Sodhi', r: 12, b: 9, f: 1, s: 0, sr: 133.3 },
                          { batter: 'Iftikhar Ahmed *', dis: 'batting', r: 14, b: 8, f: 1, s: 1, sr: 175.0 },
                        ].map((row) => (
                          <tr key={row.batter} className="hover:bg-slate-50 transition">
                            <td className="py-2.5 font-bold text-navy font-display">{row.batter}</td>
                            <td className="py-2.5 text-slate-400 text-[11px]">{row.dis}</td>
                            <td className="py-2.5 text-right font-black font-mono tabular-nums text-navy">{row.r}</td>
                            <td className="py-2.5 text-right font-mono tabular-nums text-slate-600">{row.b}</td>
                            <td className="py-2.5 text-right font-mono tabular-nums text-slate-600">{row.f}</td>
                            <td className="py-2.5 text-right font-mono tabular-nums text-slate-600">{row.s}</td>
                            <td className="py-2.5 text-right font-mono tabular-nums text-slate-600 pr-2">{row.sr}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'scorecard' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-6">
                <div>
                  <h3 className="text-base font-extrabold text-navy font-display mb-3">
                    New Zealand 1st Innings: 176/6 (20.0 ov)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 font-mono font-bold uppercase text-[10px] tracking-wider">
                          <th className="pb-2">BATTER</th>
                          <th className="pb-2 text-right">R</th>
                          <th className="pb-2 text-right">B</th>
                          <th className="pb-2 text-right">4s</th>
                          <th className="pb-2 text-right">6s</th>
                          <th className="pb-2 text-right pr-2">SR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {[
                          { batter: 'Devon Conway', r: 44, b: 32, f: 4, s: 1, sr: 137.5 },
                          { batter: 'Finn Allen', r: 38, b: 19, f: 3, s: 3, sr: 200.0 },
                          { batter: 'Kane Williamson', r: 35, b: 28, f: 3, s: 0, sr: 125.0 },
                          { batter: 'Glenn Phillips', r: 28, b: 18, f: 2, s: 2, sr: 155.5 },
                        ].map((b) => (
                          <tr key={b.batter}>
                            <td className="py-2 font-bold text-navy font-display">{b.batter}</td>
                            <td className="py-2 text-right font-black font-mono tabular-nums">{b.r}</td>
                            <td className="py-2 text-right font-mono tabular-nums text-slate-500">{b.b}</td>
                            <td className="py-2 text-right font-mono tabular-nums text-slate-500">{b.f}</td>
                            <td className="py-2 text-right font-mono tabular-nums text-slate-500">{b.s}</td>
                            <td className="py-2 text-right font-mono tabular-nums text-slate-500 pr-2">{b.sr}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'commentary' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-4">
                <h3 className="text-base font-extrabold text-navy font-display">Ball-by-Ball Commentary</h3>
                <div className="space-y-3">
                  {[
                    { over: '16.2', text: 'Boult to Iftikhar Ahmed, 1 run, guided towards backward point for a sharp single.', ball: '1' },
                    { over: '16.1', text: 'Boult to Babar Azam, 1 run, punched off the backfoot through covers.', ball: '1' },
                    { over: '15.6', text: 'Sodhi to Babar Azam, SIX! Magnificent lofted drive straight down the ground, sailing into the stands!', ball: '6' },
                    { over: '15.5', text: 'Sodhi to Babar Azam, 1 run, tucked around the corner.', ball: '1' },
                    { over: '15.4', text: 'Sodhi to Fakhar Zaman, OUT! Caught at long-off! High in the air and safely pouching it is Glenn Phillips.', ball: 'W' },
                  ].map((comm, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                      <span className={`w-8 h-8 rounded-xl font-mono font-bold text-xs flex items-center justify-center shrink-0 ${comm.ball === 'W' ? 'bg-rose-600 text-white' : comm.ball === '6' ? 'bg-brand-600 text-white' : 'bg-slate-200 text-navy'}`}>
                        {comm.ball}
                      </span>
                      <div>
                        <div className="text-xs font-mono font-bold text-slate-400">Over {comm.over}</div>
                        <p className="text-xs text-navy font-medium mt-0.5">{comm.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Key Match Context */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-3">
              <h3 className="text-sm font-extrabold text-navy font-display">Match Condition & Pitch</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Toss:</span>
                  <span className="font-bold text-navy">Pakistan won toss, chose to bowl</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Venue:</span>
                  <span className="font-bold text-navy">Gaddafi Stadium, Lahore</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Umpires:</span>
                  <span className="font-bold text-navy">Aleem Dar & Ahsan Raza</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">DLS Par:</span>
                  <span className="font-mono font-bold text-emerald-600">138 (Ahead by 4 runs)</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-600 to-navy rounded-3xl p-6 text-white shadow-card space-y-3">
              <h3 className="font-extrabold text-base font-display">Explore Chase Mathematics</h3>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                Check exactly how every dot ball, single or boundary shifts the required run rate (RRR) and projected total.
              </p>
              <Link
                href="/tools/required-run-rate"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-white text-brand-700 font-bold text-xs py-2.5 rounded-xl hover:bg-slate-100 transition shadow-xs btn-tactile"
              >
                <span>Launch RRR Calculator</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
