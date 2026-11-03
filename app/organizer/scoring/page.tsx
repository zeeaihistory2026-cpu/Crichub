'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardShell from '@/components/layout/DashboardShell';
import { getLocalState, saveLocalState } from '@/lib/supabase';
import { oversFromBalls, formatTwoDecimals } from '@/lib/cricket-math';
import { BallDeliveryEvent } from '@/types';
import {
  RotateCcw,
  Download,
  ArrowLeft,
  CheckCircle2,
  Info,
} from 'lucide-react';

export default function MobileScoringPage() {
  const [runs, setRuns] = useState(142);
  const [wickets, setWickets] = useState(4);
  const [legalBalls, setLegalBalls] = useState(98); // 16.2 ov
  const [events, setEvents] = useState<BallDeliveryEvent[]>([]);
  const [oversLimit, setOversLimit] = useState(20);
  const [teamName, setTeamName] = useState('Lahore Strikers');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const state = getLocalState();
    setRuns(state.scorecard.runs);
    setWickets(state.scorecard.wickets);
    setLegalBalls(state.scorecard.legalBalls);
    setEvents(state.scorecard.events);
    setOversLimit(state.tournament.overs);
    setTeamName(state.tournament.teams[0] || 'Lahore Strikers');
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const applyBall = (kind: BallDeliveryEvent['kind']) => {
    if (wickets >= 10 || legalBalls >= oversLimit * 6) {
      triggerToast('Innings has concluded (All out or overs limit reached).');
      return;
    }

    let isLegal = true;
    let ballRuns = 0;
    let ballWicket = 0;
    let label = '';

    if (kind === 'Wd') {
      isLegal = false;
      ballRuns = 1;
      label = 'Wide · +1';
    } else if (kind === 'Nb') {
      isLegal = false;
      ballRuns = 1;
      label = 'No ball · +1';
    } else if (kind === 'W') {
      ballWicket = 1;
      label = 'Wicket';
    } else {
      ballRuns = Number(kind);
      label = kind === '0' ? 'Dot ball' : `${kind} run${kind === '1' ? '' : 's'}`;
    }

    const nextLegalBalls = isLegal ? legalBalls + 1 : legalBalls;
    const nextRuns = runs + ballRuns;
    const nextWickets = wickets + ballWicket;

    const newEvent: BallDeliveryEvent = {
      id: String(Date.now()),
      sequence: events.length + 1,
      legal: isLegal,
      kind,
      runs: ballRuns,
      wicket: ballWicket,
      label,
      overNumber: Math.floor(nextLegalBalls / 6),
      ballInOver: nextLegalBalls % 6,
      timestamp: 'Just now',
    };

    const nextEvents = [...events, newEvent];

    setRuns(nextRuns);
    setWickets(nextWickets);
    setLegalBalls(nextLegalBalls);
    setEvents(nextEvents);

    saveLocalState({
      scorecard: {
        runs: nextRuns,
        wickets: nextWickets,
        legalBalls: nextLegalBalls,
        events: nextEvents,
      },
    });

    triggerToast(`Delivery recorded: ${label}`);
  };

  const undoLastBall = () => {
    if (events.length === 0) return;
    const nextEvents = [...events];
    const removed = nextEvents.pop()!;

    let nextRuns = 0;
    let nextWickets = 0;
    let nextLegalBalls = 0;

    nextEvents.forEach((e) => {
      nextRuns += e.runs;
      nextWickets += e.wicket;
      if (e.legal) nextLegalBalls++;
    });

    setRuns(nextRuns);
    setWickets(nextWickets);
    setLegalBalls(nextLegalBalls);
    setEvents(nextEvents);

    saveLocalState({
      scorecard: {
        runs: nextRuns,
        wickets: nextWickets,
        legalBalls: nextLegalBalls,
        events: nextEvents,
      },
    });

    triggerToast(`Undid last delivery: ${removed.label}`);
  };

  const resetInnings = () => {
    if (confirm('Are you sure you want to reset this scorecard to 0/0?')) {
      setRuns(0);
      setWickets(0);
      setLegalBalls(0);
      setEvents([]);
      saveLocalState({
        scorecard: {
          runs: 0,
          wickets: 0,
          legalBalls: 0,
          events: [],
        },
      });
      triggerToast('Scorecard reset to 0/0.');
    }
  };

  const exportCSV = () => {
    const rows = [
      ['Sequence', 'Ball Kind', 'Runs', 'Wicket', 'Is Legal Ball', 'Timestamp'],
      ...events.map((e, idx) => [
        idx + 1,
        e.kind,
        e.runs,
        e.wicket,
        e.legal ? 'Yes' : 'No',
        e.timestamp,
      ]),
    ];
    const csvContent = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `creasegrid-${teamName.toLowerCase().replace(/\s+/g, '-')}-scorecard.csv`;
    link.click();
    triggerToast('Scorecard CSV exported!');
  };

  const oversDisplay = oversFromBalls(legalBalls);
  const currentRR = legalBalls > 0 ? (runs * 6) / legalBalls : 0;
  const currentOverBalls = events.slice(-6);

  return (
    <DashboardShell
      role="organizer"
      eyebrow="LOCAL SCORING / PHONE-FIRST SCORER"
      title="Ball-by-Ball Scoring Pad"
      subtitle={`${teamName} Batting · 1st Innings · Max ${oversLimit} Overs Quota`}
      actions={
        <Link
          href="/organizer"
          className="px-3.5 py-2 rounded-xl text-xs font-bold text-ink bg-surface border border-line hover:bg-surface-alt transition flex items-center gap-1.5 shadow-xs btn-tactile"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Organizer Dashboard</span>
        </Link>
      }
    >
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-surface dark:bg-surface-alt text-ink px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-line animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toast}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scoring Pad & Big Score Display (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Big Broadcast Score Display Card */}
          <div className="bg-gradient-to-br from-brand via-[#0B513E] to-[#063327] dark:from-[#122B34] dark:via-[#0E232B] dark:to-[#091820] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-line space-y-5">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{teamName} Batting</span>
              </span>
              <span className="font-mono text-lime bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10 text-[11px] font-bold">
                Innings 1 of 2
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 py-2">
              <div>
                <div className="text-5xl sm:text-7xl font-black text-white tabular-nums tracking-tightest font-mono">
                  {runs}
                  <span className="text-3xl sm:text-4xl text-slate-300 font-light">/{wickets}</span>
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-1 flex items-center gap-2">
                  <span className="font-mono font-bold text-white text-base">{oversDisplay}</span>
                  <span className="text-xs text-slate-300 font-mono">/ {oversLimit}.0 overs</span>
                  <span className="text-[11px] text-lime font-mono">({legalBalls} legal balls)</span>
                </div>
              </div>

              <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-lime tabular-nums font-mono">
                  {formatTwoDecimals(currentRR)}
                </div>
                <div className="text-[10px] uppercase font-mono font-bold text-slate-300 tracking-wider">
                  Current Run Rate (RPO)
                </div>
              </div>
            </div>

            {/* Current Over Deliveries Strip */}
            <div className="pt-3 border-t border-white/10">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                CURRENT OVER DELIVERIES
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {currentOverBalls.length === 0 ? (
                  <span className="text-xs text-slate-400 font-mono">Over starting...</span>
                ) : (
                  currentOverBalls.map((b, idx) => (
                    <span
                      key={b.id || idx}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs shadow-xs ${
                        b.kind === 'W'
                          ? 'bg-rose-600 text-white font-extrabold'
                          : b.kind === '4' || b.kind === '6'
                            ? 'bg-lime text-canvas font-extrabold'
                            : b.kind === 'Wd' || b.kind === 'Nb'
                              ? 'bg-amber-500 text-white'
                              : 'bg-white/20 text-white'
                      }`}
                    >
                      {b.kind}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={undoLastBall}
                disabled={events.length === 0}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-white transition flex items-center gap-1.5 btn-tactile"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Undo Delivery</span>
              </button>

              <button
                onClick={resetInnings}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 text-xs font-bold transition btn-tactile"
              >
                Reset Innings
              </button>
            </div>
          </div>

          {/* Thumb-Zone Scoring Buttons */}
          <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-line shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-ink font-display">Record Delivery Event</h3>
              <span className="text-[10px] font-mono font-bold text-tealAccent dark:text-lime uppercase bg-surface-alt px-2 py-0.5 rounded-full border border-line">
                TACTILE SCORING PAD
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { kind: '0', label: 'Dot (0)', bg: 'bg-surface-alt hover:bg-surface text-ink' },
                { kind: '1', label: '1 Run', bg: 'bg-surface-alt hover:bg-surface text-ink' },
                { kind: '2', label: '2 Runs', bg: 'bg-surface-alt hover:bg-surface text-ink' },
                { kind: '3', label: '3 Runs', bg: 'bg-surface-alt hover:bg-surface text-ink' },
                { kind: '4', label: 'Four (4)', bg: 'bg-teal-500/10 hover:bg-teal-500/20 text-tealAccent dark:text-lime font-black border-tealAccent/30' },
                { kind: '6', label: 'Six (6)', bg: 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-black border-purple-500/30' },
                { kind: 'W', label: 'Wicket (W)', bg: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 font-black border-rose-500/30' },
                { kind: 'Wd', label: 'Wide (+1)', bg: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 font-bold border-amber-500/30' },
                { kind: 'Nb', label: 'No Ball (+1)', bg: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 font-bold border-amber-500/30' },
              ].map((btn) => (
                <button
                  key={btn.kind}
                  onClick={() => applyBall(btn.kind as any)}
                  className={`h-16 sm:h-20 rounded-2xl flex flex-col items-center justify-center border border-line shadow-2xs keypad-btn ${btn.bg}`}
                >
                  <span className="text-xl sm:text-2xl font-black font-mono">{btn.kind}</span>
                  <span className="text-[10px] font-semibold opacity-75">{btn.label}</span>
                </button>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-alt border border-line text-[11px] text-ink-muted flex items-start gap-2">
              <Info className="w-4 h-4 text-tealAccent shrink-0 mt-0.5" />
              <span>
                <b>Official Cricket Rule:</b> Wides and No Balls award 1 penalty run and do NOT consume a legal delivery, ensuring over counts strictly adhere to MCC Playing Conditions.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Deliveries & Audit Log (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface rounded-3xl p-6 border border-line shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-ink font-display">Recent Deliveries Log</h3>
              <button
                onClick={exportCSV}
                className="text-xs font-bold text-tealAccent dark:text-lime hover:underline flex items-center gap-1.5 btn-tactile"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {events.length === 0 ? (
                <p className="text-xs text-ink-muted py-8 text-center font-mono">
                  No deliveries recorded yet. Tap buttons on the left to start scoring!
                </p>
              ) : (
                events
                  .slice(-14)
                  .reverse()
                  .map((evt, idx) => (
                    <div
                      key={evt.id || idx}
                      className="flex items-center justify-between p-3 rounded-2xl bg-surface-alt border border-line text-xs interactive-card"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold font-mono text-xs shadow-2xs ${
                            evt.kind === 'W'
                              ? 'bg-rose-600 text-white'
                              : evt.kind === '4' || evt.kind === '6'
                                ? 'bg-brand dark:bg-lime text-white dark:text-canvas'
                                : evt.kind === 'Wd' || evt.kind === 'Nb'
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-surface text-ink border border-line'
                          }`}
                        >
                          {evt.kind}
                        </span>
                        <div>
                          <span className="font-bold text-ink font-display">{evt.label}</span>
                          <div className="text-[10px] text-ink-muted font-mono">
                            Over {evt.overNumber}.{evt.ballInOver}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-ink-muted font-mono">
                        Ball #{events.length - idx}
                      </span>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
