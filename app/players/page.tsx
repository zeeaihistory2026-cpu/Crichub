'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { SEED_BABAR_AZAM } from '@/data/seed-data';
import { getLocalState, saveLocalState } from '@/lib/supabase';
import { Heart, CheckCircle2, BarChart2 } from 'lucide-react';

export default function PlayerProfilePage() {
  const [selectedFormat, setSelectedFormat] = useState<'T20I' | 'ODI' | 'Test'>('T20I');
  const [isFollowing, setIsFollowing] = useState(false);

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
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-body transition-colors duration-200">
      <PublicHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Breadcrumb */}
        <div className="text-xs text-ink-muted flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-tealAccent">Home</Link>
          <span>/</span>
          <Link href="/stats" className="hover:text-tealAccent">Players</Link>
          <span>/</span>
          <span className="font-bold text-ink font-display">{player.name}</span>
        </div>

        {/* Identity Masthead Card */}
        <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-line shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border border-line shadow-xs">
            <Image
              src={player.coverImage}
              alt={player.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-2 flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-tealAccent dark:text-lime bg-surface-alt px-2.5 py-0.5 rounded-full border border-line">
                VERIFIED PROFILE · SAMPLE DATA
              </span>
              <span className="text-xs text-ink-muted font-mono">ICC Top Tier Record</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-ink font-display tracking-tightest flex items-center justify-center md:justify-start gap-2">
              <span>{player.name}</span>
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
            </h1>

            <p className="text-xs sm:text-sm text-ink-muted font-medium">
              {player.flag} {player.country} · {player.role} · {player.battingStyle} · {player.bowlingStyle}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={toggleFollow}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs btn-tactile ${
                  isFollowing
                    ? 'bg-rose-500/10 text-rose-500 border border-rose-500/30'
                    : 'bg-brand text-white hover:bg-brand-hover dark:bg-lime dark:text-canvas'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isFollowing ? 'fill-rose-500' : ''}`} />
                <span>{isFollowing ? 'Following Player' : 'Follow Player'}</span>
              </button>

              <Link
                href="/compare"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-surface-alt hover:bg-surface border border-line text-ink transition flex items-center gap-1.5 btn-tactile"
              >
                <BarChart2 className="w-3.5 h-3.5 text-tealAccent" />
                <span>Compare in Lab</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Format Selector Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-3">
          <div className="flex items-center gap-2">
            {(['T20I', 'ODI', 'Test'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-4 py-1.5 rounded-xl text-xs font-black transition btn-tactile ${
                  selectedFormat === fmt
                    ? 'bg-brand text-white dark:bg-lime dark:text-canvas shadow-xs font-bold'
                    : 'bg-surface text-ink-muted hover:text-ink hover:bg-surface-alt border border-line'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          <div className="text-xs text-ink-muted font-mono">
            Showing career metrics across <b className="text-ink">{selectedFormat}</b> matches
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
              className="bg-surface rounded-3xl p-5 border border-line text-center shadow-xs interactive-card"
            >
              <div className="text-2xl sm:text-3xl font-black text-ink font-display tabular-nums tracking-tightest">
                {item.val}
              </div>
              <div className="text-[10px] font-mono font-bold text-ink-muted uppercase tracking-wider mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Format Performance Bars */}
          <div className="bg-surface rounded-3xl p-6 border border-line shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-ink font-display">Performance Benchmark Scale</h3>
            <div className="space-y-4">
              {[
                { label: 'Runs Scored', val: stats.runs, max: 6000 },
                { label: 'Batting Average', val: stats.avg, max: 60 },
                { label: 'Strike Rate', val: stats.sr, max: 150 },
                { label: 'Fifties', val: stats.fifties, max: 40 },
              ].map((row) => (
                <div key={row.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-ink">
                    <span className="font-display">{row.label}</span>
                    <span className="tabular-nums font-mono text-ink font-black">{row.val}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-surface-alt overflow-hidden flex">
                    <div
                      className="bg-brand dark:bg-lime h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (row.val / row.max) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Innings Log */}
          <div className="bg-surface rounded-3xl p-6 border border-line shadow-xs space-y-3">
            <h3 className="text-sm font-extrabold text-ink font-display">Recent Innings Log</h3>
            <div className="space-y-2.5">
              {player.recentInnings.map((inn, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-alt border border-line interactive-card"
                >
                  <div>
                    <div className="text-xs font-bold text-ink font-display">vs {inn.opponent}</div>
                    <div className="text-[10px] text-ink-muted font-mono">
                      {inn.format} · {inn.fours} fours, {inn.sixes} sixes
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-ink tabular-nums font-mono">
                      {inn.runs}{' '}
                      <span className="text-[10px] text-ink-muted font-normal">({inn.balls}b)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
