'use client';

import React from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { Users, Trophy, Calendar, Target, ArrowRight, ShieldCheck, Smartphone } from 'lucide-react';

export default function LocalCricketPage() {
  return (
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <span className="font-bold text-navy">Local Cricket</span>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-navy via-slate-900 to-navy text-white rounded-3xl p-6 sm:p-12 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              CLUBS · SCHOOLS · TAPE BALL · LOCAL LEAGUES
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Local Cricket, <br className="hidden sm:inline" />
              Made Simple.
            </h1>
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              Organize tournaments, register squads, generate fair fixtures, and score deliveries ball-by-ball on any smartphone. Elevate neighborhood cricket with verified records.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/organizer"
                className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition shadow-xs flex items-center gap-2"
              >
                <span>Open Organizer Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/organizer/scoring"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition border border-white/15 flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                <span>Try Mobile Scorer</span>
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center p-8 bg-white/5 rounded-3xl border border-white/10 shrink-0">
            <Trophy className="w-24 h-24 text-amber-400" />
          </div>
        </section>

        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#e5eaf2] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy">Create Tournaments</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Pick round-robin, knockout brackets, or custom rules. Configure overs per innings, bowling quotas, and tie-breakers without spreadsheets.
            </p>
            <Link href="/organizer" className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1 pt-2">
              Start tournament <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#e5eaf2] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy">Generate Fixtures</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Automated fair round-robin scheduling. Assign venues, ground slots, and umpires with zero duplicate dates or time conflicts.
            </p>
            <Link href="/organizer" className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1 pt-2">
              View fixtures <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#e5eaf2] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy">Score Every Ball</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Phone-first thumb scoring pad. Record legal runs, dots, wides, no-balls, wickets, and undo errors with an immutable audit log.
            </p>
            <Link href="/organizer/scoring" className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1 pt-2">
              Open scoring pad <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Featured Local Tournament Showcase */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e5eaf2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              ACTIVE DEMO TOURNAMENT
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-navy">
              City Champions Cup 2026
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              12 Registered Teams · T20 Format · 20 Overs · Lahore, Pakistan
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/organizer"
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5"
            >
              <span>Manage Tournament</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}

