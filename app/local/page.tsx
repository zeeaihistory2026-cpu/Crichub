'use client';

import React from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { Users, Trophy, Calendar, Target, ArrowRight, Smartphone } from 'lucide-react';

export default function LocalCricketPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-body transition-colors duration-200">
      <PublicHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-9 pb-16 space-y-8">
        {/* Breadcrumb */}
        <div className="text-xs text-ink-muted flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-tealAccent">Home</Link>
          <span>/</span>
          <span className="font-bold text-ink font-display">Local Cricket</span>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#0B513E] to-[#06392C] dark:from-[#122B34] dark:to-[#0A1A22] text-white rounded-3xl p-6 sm:p-12 shadow-xl border border-tealAccent/25 dark:border-line flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-lime border border-white/15 text-xs font-mono font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>CLUBS · SCHOOLS · TAPE BALL · LOCAL LEAGUES</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              Local Cricket, <br className="hidden sm:inline" />
              Made Simple.
            </h1>
            <p className="text-xs sm:text-base text-slate-200 dark:text-slate-300 leading-relaxed font-normal">
              Organize tournaments, register squads, generate fair fixtures, and score deliveries ball-by-ball on any smartphone. Elevate neighborhood cricket with verified records.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/organizer"
                className="bg-lime hover:bg-lime-hover text-canvas font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg hover:scale-[1.02] flex items-center gap-2 btn-tactile"
              >
                <span>Open Organizer Workspace</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <Link
                href="/organizer/scoring"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition border border-white/20 flex items-center gap-2 btn-tactile"
              >
                <Smartphone className="w-4 h-4" />
                <span>Try Mobile Scorer</span>
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center p-8 bg-white/5 rounded-3xl border border-white/10 shrink-0">
            <Trophy className="w-24 h-24 text-lime" />
          </div>
        </section>

        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface dark:bg-surface rounded-2xl p-6 border border-line shadow-xs hover:border-tealAccent/60 hover:shadow-md transition-all duration-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-surface-alt border border-line text-amber-500 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-ink font-display">Create Tournaments</h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-normal">
              Pick round-robin, knockout brackets, or custom rules. Configure overs per innings, bowling quotas, and tie-breakers without spreadsheets.
            </p>
            <Link href="/organizer" className="text-xs font-bold text-tealAccent hover:underline flex items-center gap-1 pt-2 font-display">
              <span>Start tournament</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-surface dark:bg-surface rounded-2xl p-6 border border-line shadow-xs hover:border-tealAccent/60 hover:shadow-md transition-all duration-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-surface-alt border border-line text-tealAccent flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-ink font-display">Generate Fixtures</h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-normal">
              Automated fair round-robin scheduling. Assign venues, ground slots, and umpires with zero duplicate dates or time conflicts.
            </p>
            <Link href="/organizer" className="text-xs font-bold text-tealAccent hover:underline flex items-center gap-1 pt-2 font-display">
              <span>View fixtures</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-surface dark:bg-surface rounded-2xl p-6 border border-line shadow-xs hover:border-tealAccent/60 hover:shadow-md transition-all duration-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-surface-alt border border-line text-emerald-500 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-ink font-display">Score Every Ball</h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-normal">
              Phone-first thumb scoring pad. Record legal runs, dots, wides, no-balls, wickets, and undo errors with an immutable audit log.
            </p>
            <Link href="/organizer/scoring" className="text-xs font-bold text-tealAccent hover:underline flex items-center gap-1 pt-2 font-display">
              <span>Open scoring pad</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Featured Local Tournament Showcase */}
        <div className="bg-surface dark:bg-surface rounded-3xl p-6 sm:p-8 border border-line shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase text-brand dark:text-lime bg-surface-alt px-3 py-1 rounded-full border border-line">
              LOCAL TOURNAMENTS
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-ink font-display mt-2">
              Run your own local tournament
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted font-normal">
              Create a tournament, add your teams and score matches ball by ball - everything saves on this device.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/organizer"
              className="bg-brand text-white hover:bg-brand-hover dark:bg-lime dark:text-canvas dark:hover:bg-lime-hover font-bold text-xs px-5 py-2.5 rounded-full transition shadow-xs flex items-center gap-2 btn-tactile"
            >
              <span>Manage Tournament</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
