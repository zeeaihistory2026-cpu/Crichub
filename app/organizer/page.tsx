'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardShell from '@/components/layout/DashboardShell';
import StatCard from '@/components/ui/StatCard';
import { getLocalState, saveLocalState } from '@/lib/supabase';
import {
  Users,
  CalendarDays,
  UserRound,
  Radio,
  Play,
  Share2,
  Plus,
  MapPin,
  CheckCircle2,
  Trophy,
  ArrowRight,
  ListChecks,
  Info,
} from 'lucide-react';

export default function OrganizerDashboardPage() {
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [teams, setTeams] = useState<string[]>([]);
  const [tournamentName, setTournamentName] = useState('City Champions Cup 2026');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const state = getLocalState();
    setTeams(state.teams);
    setTournamentName(state.tournament.name);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newTeamName.trim();
    if (!name) return;
    if (teams.includes(name)) {
      triggerToast('A team with this name is already registered.');
      return;
    }
    const updated = [...teams, name];
    setTeams(updated);
    saveLocalState({ teams: updated });
    setNewTeamName('');
    setTeamModalOpen(false);
    triggerToast(`Team "${name}" successfully registered!`);
  };

  return (
    <DashboardShell
      role="organizer"
      eyebrow="LOCAL CRICKET / TOURNAMENT WORKSPACE"
      title={tournamentName}
      subtitle="Everything you need to run your competition smoothly with official MCC/ICC rule adherence."
      actions={
        <>
          <button
            onClick={() => triggerToast('Public tournament link copied to clipboard!')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-ink bg-surface border border-line hover:bg-surface-alt transition flex items-center gap-1.5 shadow-xs btn-tactile"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share tournament</span>
          </button>
          <button
            onClick={() => setTeamModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-brand hover:bg-brand-hover dark:bg-lime dark:text-canvas transition flex items-center gap-1.5 shadow-xs btn-tactile"
          >
            <Plus className="w-4 h-4" />
            <span>Register Team</span>
          </button>
        </>
      }
    >
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-surface dark:bg-surface-alt text-ink px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-line animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toastMsg}
        </div>
      )}

      {/* Organizer Hero Banner */}
      <section className="bg-gradient-to-r from-brand to-[#06392C] dark:from-[#122B34] dark:to-[#0A1A22] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-line mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10 text-xs text-slate-300">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>TOURNAMENT IN PROGRESS</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Lahore, Pakistan · 2–16 Nov 2026</span>
          </span>
        </div>

        <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tightest">
              Match day, made simple.
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-lg leading-relaxed font-normal">
              Keep fixtures, scoring, and team operations moving from one clean workspace. Record legal-ball deliveries with instant public standing updates.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/organizer/scoring"
                className="bg-lime hover:bg-lime-hover text-canvas font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-2 btn-tactile"
              >
                <Play className="w-4 h-4 fill-canvas text-canvas" />
                <span>Launch Scoring Pad</span>
              </Link>
              <Link
                href="/matches"
                className="text-xs font-semibold text-slate-200 hover:text-white px-3 py-2 transition flex items-center gap-1"
              >
                <span>View all fixtures</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Next Up Scorecard Preview */}
          <div className="md:col-span-5 bg-black/25 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 space-y-3 shadow-inner">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-lime uppercase">
              <span>NEXT UP FIXTURE</span>
              <span>04:30 PM · TODAY</span>
            </div>
            <div className="flex items-center justify-between text-base font-black text-white py-1 font-display">
              <div className="flex items-center gap-2">
                <span className="text-lg">🏏</span>
                <span>Lahore Strikers</span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-300 px-2 py-0.5 rounded-lg bg-white/10">VS</span>
              <div className="flex items-center gap-2">
                <span>City Warriors</span>
                <span className="text-lg">🏏</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-300 flex items-center justify-between pt-2 border-t border-white/10 font-mono">
              <span>Iqbal Cricket Ground</span>
              <span>Match 12 of 24 · T20</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Operational KPIs */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard
          icon={Users}
          iconColor="blue"
          title="Registered teams"
          value={teams.length}
          change="+2 new"
          context="active this season"
        />
        <StatCard
          icon={CalendarDays}
          iconColor="cyan"
          title="Fixtures completed"
          value="18 / 24"
          change="6 remaining"
          context="matches across cup"
        />
        <StatCard
          icon={UserRound}
          iconColor="violet"
          title="Players registered"
          value="186"
          change="+14 new"
          context="verified profiles"
        />
        <StatCard
          icon={Radio}
          iconColor="red"
          title="Matches live"
          value="01"
          change="Live"
          context="tap to score"
        />
      </section>

      {/* Main Grid: Left 8 Cols, Right 4 Cols */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Stack (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Match-day Fixtures */}
          <div className="bg-surface rounded-3xl p-5 sm:p-6 border border-line shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-ink font-display flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-tealAccent" />
                Match-Day Fixtures
              </h2>
              <Link href="/matches" className="text-xs font-bold text-tealAccent dark:text-lime hover:underline">
                Full schedule →
              </Link>
            </div>

            <div className="space-y-3">
              {[
                {
                  day: '03',
                  month: 'NOV',
                  teamA: 'Lahore Strikers',
                  teamB: 'City Warriors',
                  venue: 'Iqbal Ground · 04:30 PM · T20',
                  status: 'Up next',
                  statusColor: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
                  cta: 'Score match',
                  ctaHref: '/organizer/scoring',
                },
                {
                  day: '03',
                  month: 'NOV',
                  teamA: 'Royal Falcons',
                  teamB: 'Tigers XI',
                  venue: 'Model Town Ground · 07:00 PM · T20',
                  status: 'Scheduled',
                  statusColor: 'bg-surface-alt text-ink-muted border border-line',
                  cta: 'Details',
                  ctaHref: '/matches',
                },
                {
                  day: '02',
                  month: 'NOV',
                  teamA: 'North Stars',
                  teamB: 'Metro Kings',
                  venue: 'Match 10 · Completed yesterday',
                  status: 'Completed',
                  statusColor: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20',
                  cta: 'Scorecard',
                  ctaHref: '/matches',
                },
              ].map((fix, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-surface-alt border border-line gap-3 interactive-card"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-surface border border-line flex flex-col items-center justify-center text-center shrink-0 shadow-2xs">
                      <span className="text-sm font-black text-ink font-mono leading-none">{fix.day}</span>
                      <span className="text-[9px] font-mono font-bold text-ink-muted uppercase mt-0.5">{fix.month}</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-ink font-display">
                        {fix.teamA} <span className="text-ink-muted font-normal">vs</span> {fix.teamB}
                      </div>
                      <div className="text-[10px] text-ink-muted font-mono mt-0.5">{fix.venue}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${fix.statusColor}`}>
                      {fix.status}
                    </span>
                    <Link
                      href={fix.ctaHref}
                      className="px-3.5 py-1.5 rounded-xl bg-surface border border-line text-xs font-bold text-tealAccent dark:text-lime hover:bg-surface-alt transition flex items-center gap-1 shadow-2xs btn-tactile"
                    >
                      <span>{fix.cta}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Organizer Checklist */}
          <div className="bg-surface rounded-3xl p-5 sm:p-6 border border-line shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-ink font-display flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-emerald-500" />
                Tournament Operations Checklist
              </h2>
              <span className="text-xs font-mono font-bold text-ink-muted">3 of 4 completed</span>
            </div>

            <div className="space-y-2.5">
              {[
                { task: 'Confirm ground umpires for tonight’s 7:00 PM fixture', stamp: 'Today · 2:00 PM', tag: 'High', tagColor: 'bg-amber-500/10 text-amber-500 border border-amber-500/20', done: false },
                { task: 'Review City Warriors squad submission (3 player approvals pending)', stamp: '3 player approvals pending', tag: 'Normal', tagColor: 'bg-surface-alt text-ink-muted border border-line', done: false },
                { task: 'Publish Match 10 final scorecard and update NRR', stamp: 'Completed yesterday', tag: 'Done', tagColor: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20', done: true },
              ].map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-alt border border-line"
                >
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={t.done}
                      className="w-4 h-4 rounded text-brand focus:ring-brand"
                    />
                    <div>
                      <div className={`text-xs font-bold font-display ${t.done ? 'line-through text-ink-muted' : 'text-ink'}`}>
                        {t.task}
                      </div>
                      <div className="text-[10px] text-ink-muted font-mono">{t.stamp}</div>
                    </div>
                  </label>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${t.tagColor}`}>
                    {t.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Stack (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Group A Standings */}
          <div className="bg-surface rounded-3xl p-5 sm:p-6 border border-line shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-ink font-display flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                Group A Standings
              </h2>
              <Link href="/qualification" className="text-xs font-bold text-tealAccent dark:text-lime hover:underline">
                Full table →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line text-ink-muted font-mono font-bold uppercase text-[10px] tracking-wider">
                    <th className="pb-2">TEAM</th>
                    <th className="pb-2 text-center">P</th>
                    <th className="pb-2 text-center">W</th>
                    <th className="pb-2 text-center font-bold text-ink">PTS</th>
                    <th className="pb-2 text-right">NRR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {[
                    { rank: 1, name: 'Strikers', p: 4, w: 3, pts: 6, nrr: '+1.42' },
                    { rank: 2, name: 'Falcons', p: 4, w: 3, pts: 6, nrr: '+0.89' },
                    { rank: 3, name: 'Warriors', p: 4, w: 2, pts: 4, nrr: '+0.31' },
                    { rank: 4, name: 'Tigers XI', p: 4, w: 1, pts: 2, nrr: '-0.52' },
                  ].map((row) => (
                    <tr key={row.name} className="hover:bg-surface-alt/70 transition">
                      <td className="py-2.5 font-bold text-ink flex items-center gap-1.5 font-display">
                        <span className="text-[10px] text-ink-muted font-mono">{row.rank}</span>
                        <span>{row.name}</span>
                      </td>
                      <td className="py-2.5 text-center text-ink-muted font-mono tabular-nums">{row.p}</td>
                      <td className="py-2.5 text-center text-emerald-500 font-bold font-mono tabular-nums">{row.w}</td>
                      <td className="py-2.5 text-center font-black text-ink font-mono tabular-nums">{row.pts}</td>
                      <td
                        className={`py-2.5 text-right font-mono tabular-nums text-[11px] font-bold ${
                          row.nrr.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'
                        }`}
                      >
                        {row.nrr}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-2.5 rounded-xl bg-surface-alt border border-line text-[10px] text-ink-muted flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-tealAccent shrink-0" />
              <span>Standings update dynamically as scorers record ball-by-ball.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Registration Modal */}
      {teamModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAddTeam}
            className="bg-surface rounded-3xl max-w-md w-full p-6 shadow-2xl border border-line space-y-4 animate-fade-in"
          >
            <div className="flex items-center justify-between pb-2 border-b border-line">
              <h3 className="text-lg font-extrabold text-ink font-display">Register New Team</h3>
              <button
                type="button"
                onClick={() => setTeamModalOpen(false)}
                className="text-ink-muted hover:text-ink text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div>
              <label className="text-xs font-bold text-ink">Team Name</label>
              <input
                type="text"
                required
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                placeholder="e.g. Shalimar Gladiators"
                className="w-full bg-surface-alt border border-line rounded-xl p-2.5 text-xs text-ink font-semibold mt-1 outline-hidden focus:border-brand focus:bg-surface transition"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setTeamModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-ink-muted hover:bg-surface-alt transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-brand text-white hover:bg-brand-hover dark:bg-lime dark:text-canvas transition shadow-xs btn-tactile"
              >
                Register Team
              </button>
            </div>
          </form>
        </div>
      )}
    </DashboardShell>
  );
}
