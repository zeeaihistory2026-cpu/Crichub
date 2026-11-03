'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { SEED_BABAR_AZAM } from '@/data/seed-data';
import { getLocalState, saveLocalState } from '@/lib/supabase';
import { Heart, ArrowRight, CheckCircle2, BarChart2, Shield, Sparkles } from 'lucide-react';

export default function PlayerProfilePage() {
  const [selectedFormat, setSelectedFormat] = useState<'T20I' | 'ODI' | 'Test'>('T20I');
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'career' | 'form' | 'bio'>('overview');

  const player = SEED_BABAR_AZAM;
  const stats = player.formats[selectedFormat];

  useEffect(() => {
    const state = getLocalState();
    setIsFollowing(state.userPreferences.followingPlayers.includes('babar'));
  }, []);

  const toggleFollow = () => {
    const state = getLocalState();
    const current = state.userPreferences.followingPlayers;
    const updated = current.includes('babar')
      ? current.filter((x) => x !== 'babar')
      : [...current, 'babar'];
    saveLocalState({
      userPreferences: {
        ...state.userPreferences,
        followingPlayers: updated,
      },
    });
    setIsFollowing(updated.includes('babar'));
  };

  return (
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link href="/stats" className="hover:text-brand-600">Players</Link>
          <span>/</span>
          <span className="font-bold text-navy font-display">{player.name}</span>
        </div>

        {/* Identity Masthead Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-xs">
            <Image
              src={player.coverImage}
              alt={player.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-2 flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                VERIFIED PROFILE · SAMPLE DATA
              </span>
              <span className="text-xs text-slate-400 font-mono">ICC Top Tier Record</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-navy font-display tracking-tightest flex items-center justify-center md:justify-start gap-2">
              <span>{player.name}</span>
              <CheckCircle2 className="w-6 h-6 text-brand-600 shrink-0" />
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {player.flag} {player.country} · {player.role} · {player.battingStyle} · {player.bowlingStyle}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={toggleFollow}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs btn-tactile ${
                  isFollowing
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'bg-brand-600 text-white hover:bg-brand-700'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isFollowing ? 'fill-rose-600' : ''}`} />
                <span>{isFollowing ? 'Following Player' : 'Follow Player'}</span>
              </button>

              <Link
                href="/compare"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 btn-tactile"
              >
                <BarChart2 className="w-3.5 h-3.5 text-brand-600" />
                <span>Compare in Lab</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Format Selector Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            {(['T20I', 'ODI', 'Test'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-4 py-1.5 rounded-xl text-xs font-black transition btn-tactile ${
                  selectedFormat === fmt
                    ? 'bg-navy text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Showing career metrics across <b>{selectedFormat}</b> matches
          </div>
        </div>

        {/* 5 Headline Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: 'Matches', val: stats.matches },
            { label: 'Total Runs', val: stats.runs.toLocaleString() },
            { label: 'Batting Average', val: stats.avg.toFixed(2) },
            { label: 'Strike Rate', val: stats.sr.toFixed(1) },
            { label: 'Centuries / 50s', val: `${stats.centuries} / ${stats.fifties}` },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 text-center shadow-card interactive-card"
            >
              <div className="text-2xl sm:text-3xl font-black text-navy font-display tabular-nums tracking-tightest">
                {item.val}
              </div>
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Format Performance Bars */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-4">
            <h3 className="text-sm font-extrabold text-navy font-display">Performance Benchmark Scale</h3>
            <div className="space-y-4">
              {[
                { label: 'Runs Scored', val: stats.runs, max: 6000 },
                { label: 'Batting Average', val: stats.avg, max: 60 },
                { label: 'Strike Rate', val: stats.sr, max: 150 },
                { label: 'Fifties', val: stats.fifties, max: 40 },
              ].map((row) => (
                <div key={row.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="font-display">{row.label}</span>
                    <span className="tabular-nums font-mono text-navy font-black">{row.val}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden flex">
                    <div
                      className="bg-brand-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (row.val / row.max) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Innings Log */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-3">
            <h3 className="text-sm font-extrabold text-navy font-display">Recent Innings Log</h3>
            <div className="space-y-2.5">
              {player.recentInnings.map((inn, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 interactive-card"
                >
                  <div>
                    <div className="text-xs font-bold text-navy font-display">vs {inn.opponent}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {inn.format} · {inn.fours} fours, {inn.sixes} sixes
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-navy tabular-nums font-mono">
                      {inn.runs}{' '}
                      <span className="text-[10px] text-slate-400 font-normal">({inn.balls}b)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
