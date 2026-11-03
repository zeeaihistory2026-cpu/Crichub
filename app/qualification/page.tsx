'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import SectionHeader from '@/components/ui/SectionHeader';
import { SEED_GROUP_A_TEAMS } from '@/data/seed-data';
import { ballsFromOvers, oversFromBalls, formatSigned, parseNonNegativeNumber, parsePositiveNumber } from '@/lib/cricket-math';
import { Trophy, Target, RotateCcw, Copy, Check, ArrowRight, Info, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';

export default function QualificationLabPage() {
  const [teamA, setTeamA] = useState('Pakistan');
  const [teamB, setTeamB] = useState('New Zealand');
  const [aRuns, setARuns] = useState('178');
  const [aOvers, setAOvers] = useState('20.0');
  const [bRuns, setBRuns] = useState('160');
  const [bOvers, setBOvers] = useState('20.0');
  const [matchLimit, setMatchLimit] = useState('20.0');
  const [aAllout, setAAllout] = useState(false);
  const [bAllout, setBAllout] = useState(false);
  const [copied, setCopied] = useState(false);

  // Apply scenario preset
  const applyPreset = (preset: 'pak-win-18' | 'nz-chase-fast' | 'pak-allout') => {
    if (preset === 'pak-win-18') {
      setTeamA('Pakistan');
      setTeamB('New Zealand');
      setARuns('178');
      setAOvers('20.0');
      setBRuns('160');
      setBOvers('20.0');
      setAAllout(false);
      setBAllout(false);
    } else if (preset === 'nz-chase-fast') {
      setTeamA('Pakistan');
      setTeamB('New Zealand');
      setARuns('152');
      setAOvers('20.0');
      setBRuns('153');
      setBOvers('16.2');
      setAAllout(false);
      setBAllout(false);
    } else if (preset === 'pak-allout') {
      setTeamA('Pakistan');
      setTeamB('New Zealand');
      setARuns('134');
      setAOvers('17.4');
      setBRuns('135');
      setBOvers('18.1');
      setAAllout(true);
      setBAllout(false);
    }
  };

  // Run scenario calculation
  const calculateScenario = () => {
    try {
      if (teamA === teamB) {
        return { error: 'Please choose two different teams.' };
      }

      const rA = parseNonNegativeNumber(aRuns, 'Team A runs');
      const rB = parseNonNegativeNumber(bRuns, 'Team B runs');
      const quotaBalls = parsePositiveNumber(ballsFromOvers(matchLimit), 'Match overs limit');

      let ballsA = ballsFromOvers(aOvers);
      let ballsB = ballsFromOvers(bOvers);

      if (ballsA > quotaBalls || ballsB > quotaBalls) {
        return { error: 'Innings overs cannot exceed total match overs limit.' };
      }

      // In cricket playing conditions, if a team is bowled all-out, their effective overs faced count as the full innings quota!
      if (aAllout) ballsA = quotaBalls;
      if (bAllout) ballsB = quotaBalls;

      const teams = SEED_GROUP_A_TEAMS.map((t) => ({ ...t }));
      const objA = teams.find((t) => t.name === teamA);
      const objB = teams.find((t) => t.name === teamB);

      if (!objA || !objB) return { error: 'Teams not found.' };

      // Update match counts and runs
      objA.p += 1;
      objB.p += 1;
      objA.scored += rA;
      objA.faced += ballsA;
      objA.conceded += rB;
      objA.bowled += ballsB;

      objB.scored += rB;
      objB.faced += ballsB;
      objB.conceded += rA;
      objB.bowled += ballsA;

      let winnerSummary = 'Match Tied';
      if (rA > rB) {
        objA.pts += 2;
        objA.w += 1;
        objB.l += 1;
        winnerSummary = `${objA.name} win by ${rA - rB} runs`;
      } else if (rB > rA) {
        objB.pts += 2;
        objB.w += 1;
        objA.l += 1;
        winnerSummary = `${objB.name} win by ${rB - rA} runs`;
      } else {
        objA.pts += 1;
        objB.pts += 1;
      }

      // Rank by points descending, then cumulative NRR descending
      const computeNRR = (t: typeof objA) => (t.scored * 6) / t.faced - (t.conceded * 6) / t.bowled;

      teams.sort((x, y) => {
        if (y.pts !== x.pts) return y.pts - x.pts;
        return computeNRR(y) - computeNRR(x);
      });

      return {
        teams,
        winner: winnerSummary,
        summary: `${objA.name} ${rA} (${oversFromBalls(ballsA)} ov) vs ${objB.name} ${rB} (${oversFromBalls(ballsB)} ov). Cumulative points and NRR recalculated using MCC/ICC tournament rules.`,
        error: null,
      };
    } catch (e: any) {
      return { error: e.message || 'Scenario calculation error' };
    }
  };

  const scenarioResult = calculateScenario();

  const handleReset = () => {
    setTeamA('Pakistan');
    setTeamB('New Zealand');
    setARuns('178');
    setAOvers('20.0');
    setBRuns('160');
    setBOvers('20.0');
    setMatchLimit('20.0');
    setAAllout(false);
    setBAllout(false);
  };

  const handleCopy = async () => {
    if (scenarioResult.error) return;
    const text = `Qualification Lab Result: ${scenarioResult.winner}. ${scenarioResult.summary}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-brand-600">Tools</Link>
          <span>/</span>
          <span className="font-bold text-navy font-display">Qualification Lab</span>
        </div>

        {/* Hero Masthead */}
        <section className="bg-gradient-to-r from-navy via-navy-deep to-brand-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-navy-border flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              <span>SIGNATURE FLAGSHIP SIMULATOR · MCC COMPLIANT</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tightest">
              Tournament Qualification Lab
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Model hypothetical fixtures, all-out collapses, and exact margin thresholds to see real-time shifts in table positions and cumulative Net Run Rate.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition border border-white/15 btn-tactile"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Scenario</span>
            </button>
          </div>
        </section>

        {/* Presets Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-navy font-display">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Quick Presets:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => applyPreset('pak-win-18')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-xs font-semibold text-slate-700 transition border border-slate-200 btn-tactile"
            >
              🇵🇰 Pakistan win by 18 runs
            </button>
            <button
              onClick={() => applyPreset('nz-chase-fast')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-xs font-semibold text-slate-700 transition border border-slate-200 btn-tactile"
            >
              🇳🇿 NZ chase in 16.2 ov
            </button>
            <button
              onClick={() => applyPreset('pak-allout')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-xs font-semibold text-slate-700 transition border border-slate-200 btn-tactile"
            >
              ⚠️ Pakistan bowled all-out (17.4 ov)
            </button>
          </div>
        </div>

        {/* Lab 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Scenario Input Column (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-5">
            <div>
              <h2 className="text-base font-extrabold text-navy font-display">Configure Hypothetical Match</h2>
              <p className="text-xs text-slate-500 mt-1">Group A Final Fixture Simulation</p>
            </div>

            <div className="space-y-4">
              {/* Teams selection */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Team A</label>
                  <select
                    value={teamA}
                    onChange={(e) => setTeamA(e.target.value)}
                    className="w-full bg-slate-50 rounded-xl px-3 py-2 text-xs font-bold text-navy border border-slate-200 outline-hidden font-display"
                  >
                    {SEED_GROUP_A_TEAMS.map((t) => (
                      <option key={t.name} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Team B</label>
                  <select
                    value={teamB}
                    onChange={(e) => setTeamB(e.target.value)}
                    className="w-full bg-slate-50 rounded-xl px-3 py-2 text-xs font-bold text-navy border border-slate-200 outline-hidden font-display"
                  >
                    {SEED_GROUP_A_TEAMS.map((t) => (
                      <option key={t.name} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Team A scores */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">{teamA} Runs</label>
                  <input
                    type="number"
                    value={aRuns}
                    onChange={(e) => setARuns(e.target.value)}
                    className="w-full bg-slate-50 rounded-xl px-3.5 py-2 text-xs font-bold text-navy border border-slate-200 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">{teamA} Overs (e.g. 20.0)</label>
                  <input
                    type="text"
                    value={aOvers}
                    onChange={(e) => setAOvers(e.target.value)}
                    className="w-full bg-slate-50 rounded-xl px-3.5 py-2 text-xs font-bold text-navy border border-slate-200 font-mono"
                  />
                </div>
              </div>

              {/* Team B scores */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">{teamB} Runs</label>
                  <input
                    type="number"
                    value={bRuns}
                    onChange={(e) => setBRuns(e.target.value)}
                    className="w-full bg-slate-50 rounded-xl px-3.5 py-2 text-xs font-bold text-navy border border-slate-200 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">{teamB} Overs (e.g. 20.0)</label>
                  <input
                    type="text"
                    value={bOvers}
                    onChange={(e) => setBOvers(e.target.value)}
                    className="w-full bg-slate-50 rounded-xl px-3.5 py-2 text-xs font-bold text-navy border border-slate-200 font-mono"
                  />
                </div>
              </div>

              {/* Match overs quota */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Scheduled Match Overs Quota</label>
                <input
                  type="text"
                  value={matchLimit}
                  onChange={(e) => setMatchLimit(e.target.value)}
                  className="w-full bg-slate-50 rounded-xl px-3.5 py-2 text-xs font-bold text-navy border border-slate-200 font-mono"
                />
              </div>

              {/* All out checkboxes */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aAllout}
                    onChange={(e) => setAAllout(e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                  />
                  <span>{teamA} bowled all-out (counts full {matchLimit} ov quota)</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bAllout}
                    onChange={(e) => setBAllout(e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                  />
                  <span>{teamB} bowled all-out (counts full {matchLimit} ov quota)</span>
                </label>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100 text-[11px] text-brand-900 leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>
                  <b>MCC/ICC Rule:</b> When a team is dismissed all out, their overs faced are counted as the full innings quota (e.g. 20.0 overs), penalizing collapses in Net Run Rate calculations.
                </span>
              </div>
            </div>
          </div>

          {/* Projected Table & Outcome Column (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h2 className="text-base font-extrabold text-navy font-display">Projected Group A Standings</h2>
                <p className="text-xs text-slate-400 mt-0.5">Top 2 advance to tournament semi-finals</p>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                HYPOTHETICAL OUTCOME
              </span>
            </div>

            {scenarioResult.error ? (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {scenarioResult.error}
              </div>
            ) : (
              <>
                {/* Winner Callout */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-sm font-extrabold text-emerald-950 font-display">
                        {scenarioResult.winner}
                      </div>
                      <div className="text-[11px] text-emerald-800 mt-0.5 font-normal">
                        {scenarioResult.summary}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-xl bg-white text-emerald-700 hover:bg-emerald-100 transition shadow-2xs btn-tactile shrink-0"
                    title="Copy scenario outcome"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Qualification Threshold Callout */}
                <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200/80 space-y-1">
                  <div className="text-xs font-bold text-brand-900 font-display flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-brand-600" />
                    <span>Qualification Equation Insight</span>
                  </div>
                  <p className="text-[11px] text-brand-800 leading-relaxed">
                    To qualify above New Zealand into Position 1, Pakistan must achieve a winning margin of at least <strong>18 runs</strong> (if defending) or chase down the target within <strong>17.2 overs</strong> (if batting second).
                  </p>
                </div>

                {/* Updated Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-mono font-bold uppercase text-[10px] tracking-wider">
                        <th className="pb-2.5 pl-2">POS</th>
                        <th className="pb-2.5">TEAM</th>
                        <th className="pb-2.5 text-center">P</th>
                        <th className="pb-2.5 text-center">W</th>
                        <th className="pb-2.5 text-center">L</th>
                        <th className="pb-2.5 text-right font-mono">NRR</th>
                        <th className="pb-2.5 text-right pr-2 font-bold text-navy">PTS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {scenarioResult.teams?.map((team, idx) => {
                        const isQualifying = idx < 2;
                        const netRate = (team.scored * 6) / team.faced - (team.conceded * 6) / team.bowled;
                        const nrrStr = formatSigned(netRate, 3);

                        return (
                          <tr
                            key={team.name}
                            className={`${isQualifying ? 'bg-emerald-50/40 font-semibold' : ''} hover:bg-slate-50 transition`}
                          >
                            <td className="py-3 pl-2">
                              <span
                                className={`w-5 h-5 rounded-full text-[10px] font-mono inline-flex items-center justify-center ${
                                  isQualifying ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
                                }`}
                              >
                                {idx + 1}
                              </span>
                            </td>
                            <td className="py-3 font-bold text-navy flex items-center gap-2 font-display">
                              <span>{team.flag}</span>
                              <span>{team.name}</span>
                              {isQualifying && (
                                <span className="text-[9px] font-mono font-bold uppercase text-emerald-700 bg-emerald-100 px-1 rounded">
                                  Q
                                </span>
                              )}
                            </td>
                            <td className="py-3 text-center text-slate-500 font-mono tabular-nums">{team.p}</td>
                            <td className="py-3 text-center text-slate-500 font-mono tabular-nums">{team.w}</td>
                            <td className="py-3 text-center text-slate-500 font-mono tabular-nums">{team.l}</td>
                            <td
                              className={`py-3 text-right font-mono tabular-nums text-xs font-bold ${
                                nrrStr.startsWith('+') ? 'text-emerald-600' : 'text-rose-500'
                              }`}
                            >
                              {nrrStr}
                            </td>
                            <td className="py-3 text-right pr-2 font-black text-navy font-mono tabular-nums">
                              {team.pts}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span className="font-mono">Top 2 advance to tournament semi-finals</span>
                  <Link href="/tournaments" className="text-brand-600 font-bold hover:underline">
                    View official tournament rules →
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
