'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { SEED_GROUP_A_TEAMS } from '@/data/seed-data';
import {
  ballsFromOvers,
  oversFromBalls,
  formatSigned,
} from '@/lib/cricket-math';
import {
  Trophy,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  Copy,
  Check,
  Target,
} from 'lucide-react';

export default function QualificationPage() {
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

  const applyPreset = (preset: string) => {
    if (preset === 'pak-win-18') {
      setTeamA('Pakistan');
      setTeamB('New Zealand');
      setARuns('180');
      setAOvers('20.0');
      setBRuns('162');
      setBOvers('20.0');
      setMatchLimit('20.0');
      setAAllout(false);
      setBAllout(false);
    } else if (preset === 'nz-chase-fast') {
      setTeamA('Pakistan');
      setTeamB('New Zealand');
      setARuns('165');
      setAOvers('20.0');
      setBRuns('166');
      setBOvers('16.2');
      setMatchLimit('20.0');
      setAAllout(false);
      setBAllout(false);
    } else if (preset === 'pak-allout') {
      setTeamA('Pakistan');
      setTeamB('New Zealand');
      setARuns('135');
      setAOvers('17.4');
      setBRuns('136');
      setBOvers('18.0');
      setMatchLimit('20.0');
      setAAllout(true);
      setBAllout(false);
    }
  };

  const calculateScenario = () => {
    try {
      const teams = SEED_GROUP_A_TEAMS.map((t) => ({ ...t }));
      const rA = parseInt(aRuns, 10);
      const rB = parseInt(bRuns, 10);
      const limitBalls = ballsFromOvers(matchLimit);

      if (isNaN(rA) || isNaN(rB) || rA < 0 || rB < 0) {
        return { error: 'Please enter valid non-negative run totals.' };
      }

      const ballsA = aAllout ? limitBalls : ballsFromOvers(aOvers);
      const ballsB = bAllout ? limitBalls : ballsFromOvers(bOvers);

      if (ballsA <= 0 || ballsB <= 0) {
        return { error: 'Overs must be greater than zero.' };
      }

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
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-body transition-colors duration-200">
      <PublicHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-9 pb-16 space-y-7">
        {/* Breadcrumb */}
        <div className="text-xs text-ink-muted flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-tealAccent">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-tealAccent">Tools</Link>
          <span>/</span>
          <span className="font-bold text-ink font-display">Qualification Lab</span>
        </div>

        {/* Hero Masthead */}
        <section className="bg-gradient-to-r from-[#0B513E] to-[#06392C] dark:from-[#122B34] dark:to-[#0A1A22] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-tealAccent/25 dark:border-line flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-lime border border-white/15 text-xs font-mono font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              <span>SIGNATURE FLAGSHIP SIMULATOR · MCC COMPLIANT</span>
            </span>
            <h1 className="text-[30px] leading-[38px] sm:text-[40px] sm:leading-[48px] lg:text-[44px] lg:leading-[52px] font-extrabold font-display text-white tracking-tight">
              Tournament Qualification Lab
            </h1>
            <p className="text-sm sm:text-base text-slate-200 dark:text-slate-300 font-normal leading-relaxed">
              Model hypothetical fixtures, all-out collapses, and exact margin thresholds to see real-time shifts in table positions and cumulative Net Run Rate.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition border border-white/20 btn-tactile"
            >
              <RotateCcw className="w-3.5 h-3.5 text-lime" />
              <span>Reset Scenario</span>
            </button>
          </div>
        </section>

        {/* Presets Bar */}
        <div className="bg-surface dark:bg-surface rounded-2xl p-4 border border-line shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-ink font-display">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Quick Presets:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => applyPreset('pak-win-18')}
              className="px-3.5 py-1.5 rounded-full bg-surface-alt hover:border-tealAccent text-xs font-semibold text-ink transition border border-line btn-tactile"
            >
              🇵🇰 Pakistan win by 18 runs
            </button>
            <button
              onClick={() => applyPreset('nz-chase-fast')}
              className="px-3.5 py-1.5 rounded-full bg-surface-alt hover:border-tealAccent text-xs font-semibold text-ink transition border border-line btn-tactile"
            >
              🇳🇿 NZ chase in 16.2 ov
            </button>
            <button
              onClick={() => applyPreset('pak-allout')}
              className="px-3.5 py-1.5 rounded-full bg-surface-alt hover:border-alert text-xs font-semibold text-alert transition border border-line btn-tactile"
            >
              ⚠️ Pakistan bowled all-out (17.4 ov)
            </button>
          </div>
        </div>

        {/* Lab 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Scenario Input Column (5 Cols) */}
          <div className="lg:col-span-5 bg-surface dark:bg-surface rounded-3xl p-6 sm:p-8 border border-line shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-ink font-display">Configure Hypothetical Match</h2>
              <p className="text-xs text-ink-muted mt-1">Example group - hypothetical simulation</p>
            </div>

            <div className="space-y-4">
              {/* Teams selection */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink font-display">Team A</label>
                  <select
                    value={teamA}
                    onChange={(e) => setTeamA(e.target.value)}
                    className="w-full bg-surface-alt rounded-xl px-3 py-2 text-xs font-bold text-ink border border-line outline-hidden font-display"
                  >
                    {SEED_GROUP_A_TEAMS.map((t) => (
                      <option key={t.name} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink font-display">Team B</label>
                  <select
                    value={teamB}
                    onChange={(e) => setTeamB(e.target.value)}
                    className="w-full bg-surface-alt rounded-xl px-3 py-2 text-xs font-bold text-ink border border-line outline-hidden font-display"
                  >
                    {SEED_GROUP_A_TEAMS.map((t) => (
                      <option key={t.name} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Team A scores */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink">{teamA} Runs</label>
                  <input
                    type="number"
                    value={aRuns}
                    onChange={(e) => setARuns(e.target.value)}
                    className="w-full bg-surface-alt rounded-xl px-3.5 py-2 text-xs font-bold text-ink border border-line font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink">{teamA} Overs (e.g. 20.0)</label>
                  <input
                    type="text"
                    value={aOvers}
                    onChange={(e) => setAOvers(e.target.value)}
                    className="w-full bg-surface-alt rounded-xl px-3.5 py-2 text-xs font-bold text-ink border border-line font-mono"
                  />
                </div>
              </div>

              {/* Team B scores */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink">{teamB} Runs</label>
                  <input
                    type="number"
                    value={bRuns}
                    onChange={(e) => setBRuns(e.target.value)}
                    className="w-full bg-surface-alt rounded-xl px-3.5 py-2 text-xs font-bold text-ink border border-line font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink">{teamB} Overs (e.g. 20.0)</label>
                  <input
                    type="text"
                    value={bOvers}
                    onChange={(e) => setBOvers(e.target.value)}
                    className="w-full bg-surface-alt rounded-xl px-3.5 py-2 text-xs font-bold text-ink border border-line font-mono"
                  />
                </div>
              </div>

              {/* Match overs quota */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ink">Scheduled Match Overs Quota</label>
                <input
                  type="text"
                  value={matchLimit}
                  onChange={(e) => setMatchLimit(e.target.value)}
                  className="w-full bg-surface-alt rounded-xl px-3.5 py-2 text-xs font-bold text-ink border border-line font-mono"
                />
              </div>

              {/* All out checkboxes */}
              <div className="space-y-2 pt-2 border-t border-line">
                <label className="flex items-center gap-2.5 text-xs font-semibold text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aAllout}
                    onChange={(e) => setAAllout(e.target.checked)}
                    className="rounded text-brand dark:text-lime focus:ring-tealAccent w-4 h-4"
                  />
                  <span>{teamA} bowled all-out (counts full {matchLimit} ov quota)</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs font-semibold text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bAllout}
                    onChange={(e) => setBAllout(e.target.checked)}
                    className="rounded text-brand dark:text-lime focus:ring-tealAccent w-4 h-4"
                  />
                  <span>{teamB} bowled all-out (counts full {matchLimit} ov quota)</span>
                </label>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-alt border border-line text-[11px] text-ink leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 text-tealAccent shrink-0 mt-0.5" />
                <span>
                  <b>MCC/ICC Rule:</b> When a team is dismissed all out, their overs faced are counted as the full innings quota (e.g. 20.0 overs), penalizing collapses in Net Run Rate calculations.
                </span>
              </div>
            </div>
          </div>

          {/* Projected Table & Outcome Column (7 Cols) */}
          <div className="lg:col-span-7 bg-surface dark:bg-surface rounded-3xl p-6 sm:p-8 border border-line shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-line">
              <div>
                <h2 className="text-base font-bold text-ink font-display">Projected Group A Standings</h2>
                <p className="text-xs text-ink-muted mt-0.5">Top 2 advance to tournament semi-finals</p>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-tealAccent bg-surface-alt px-3 py-1 rounded-full border border-line">
                HYPOTHETICAL OUTCOME
              </span>
            </div>

            {scenarioResult.error ? (
              <div className="p-4 rounded-2xl bg-alert/10 border border-alert/20 text-alert text-xs font-semibold">
                {scenarioResult.error}
              </div>
            ) : (
              <>
                {/* Winner Callout */}
                <div className="p-4 rounded-2xl bg-lime/10 border border-lime/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-ink font-display">
                        {scenarioResult.winner}
                      </div>
                      <div className="text-[11px] text-ink-muted mt-0.5 font-normal">
                        {scenarioResult.summary}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-xl bg-surface border border-line text-ink hover:border-tealAccent transition shadow-2xs btn-tactile shrink-0"
                    title="Copy scenario outcome"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-ink-muted" />}
                  </button>
                </div>

                {/* Qualification Threshold Callout */}
                <div className="p-4 rounded-2xl bg-surface-alt border border-line space-y-1">
                  <div className="text-xs font-bold text-ink font-display flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-tealAccent" />
                    <span>Qualification Equation Insight</span>
                  </div>
                  <p className="text-[11px] text-ink-muted leading-relaxed">
                    To qualify above New Zealand into Position 1, Pakistan must achieve a winning margin of at least <strong>18 runs</strong> (if defending) or chase down the target within <strong>17.2 overs</strong> (if batting second).
                  </p>
                </div>

                {/* Updated Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-line text-ink-muted font-mono font-bold uppercase text-[10px] tracking-wider">
                        <th className="pb-2.5 pl-2">POS</th>
                        <th className="pb-2.5">TEAM</th>
                        <th className="pb-2.5 text-center">P</th>
                        <th className="pb-2.5 text-center">W</th>
                        <th className="pb-2.5 text-center">L</th>
                        <th className="pb-2.5 text-right font-mono">NRR</th>
                        <th className="pb-2.5 text-right pr-2 font-bold text-ink">PTS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {scenarioResult.teams?.map((team, idx) => {
                        const isQualifying = idx < 2;
                        const netRate = (team.scored * 6) / team.faced - (team.conceded * 6) / team.bowled;
                        const nrrStr = formatSigned(netRate, 3);

                        return (
                          <tr
                            key={team.name}
                            className={`${isQualifying ? 'bg-lime/5 font-semibold' : ''} hover:bg-surface-alt transition`}
                          >
                            <td className="py-3 pl-2">
                              <span
                                className={`w-5 h-5 rounded-full text-[10px] font-mono inline-flex items-center justify-center ${
                                  isQualifying ? 'bg-brand text-white dark:bg-lime dark:text-canvas font-bold' : 'text-ink-muted'
                                }`}
                              >
                                {idx + 1}
                              </span>
                            </td>
                            <td className="py-3 font-bold text-ink flex items-center gap-2 font-display">
                              <span>{team.flag}</span>
                              <span>{team.name}</span>
                              {isQualifying && (
                                <span className="text-[9px] font-mono font-bold uppercase text-brand dark:text-lime bg-lime/20 px-1 rounded">
                                  Q
                                </span>
                              )}
                            </td>
                            <td className="py-3 text-center text-ink-muted font-mono tabular-nums">{team.p}</td>
                            <td className="py-3 text-center text-ink-muted font-mono tabular-nums">{team.w}</td>
                            <td className="py-3 text-center text-ink-muted font-mono tabular-nums">{team.l}</td>
                            <td
                              className={`py-3 text-right font-mono tabular-nums text-xs font-bold ${
                                nrrStr.startsWith('+') ? 'text-emerald-600 dark:text-lime' : 'text-alert'
                              }`}
                            >
                              {nrrStr}
                            </td>
                            <td className="py-3 text-right pr-2 font-black text-ink font-mono tabular-nums">
                              {team.pts}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-[11px] text-ink-muted pt-2 border-t border-line">
                  <span className="font-mono">Top 2 advance to tournament semi-finals</span>
                  <Link href="/tournaments" className="text-tealAccent font-bold hover:underline">
                    View official tournament rules →
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
