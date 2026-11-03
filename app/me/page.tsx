'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardShell from '@/components/layout/DashboardShell';
import StatCard from '@/components/ui/StatCard';
import { getLocalState, saveLocalState } from '@/lib/supabase';
import { SEED_ARTICLES } from '@/data/seed-data';
import {
  Heart,
  Bookmark,
  CalendarDays,
  Bell,
  ArrowRight,
  Calculator,
  SlidersHorizontal,
  Plus,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

export default function FanDashboardPage() {
  const [newsTab, setNewsTab] = useState<'for-you' | 'latest' | 'analysis'>('for-you');
  const [isFollowingMatch, setIsFollowingMatch] = useState(true);
  const [favoriteArticles, setFavoriteArticles] = useState<string[]>([]);
  const [followingTeams, setFollowingTeams] = useState<string[]>(['Pakistan', 'India', 'Lahore Qalandars']);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const state = getLocalState();
    setFavoriteArticles(state.userPreferences.favoriteArticles);
    setFollowingTeams(state.userPreferences.followingTeams);
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const filteredNews = SEED_ARTICLES.filter((a) => {
    if (newsTab === 'analysis') return a.category === 'Analysis' || a.category === 'Explainer';
    if (newsTab === 'latest') return true;
    return a.region === 'Pakistan' || a.category === 'Breaking';
  });

  return (
    <DashboardShell
      role="user"
      eyebrow="YOUR CRICKET SPACE"
      title="Good morning, Ayaan ✳"
      subtitle="All the cricket you follow, with less noise and more of what matters."
      actions={
        <>
          <button
            onClick={() => triggerToast('Feed preferences customized.')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-ink bg-surface border border-line hover:bg-surface-alt transition flex items-center gap-1.5 shadow-xs btn-tactile"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Customize feed</span>
          </button>
          <Link
            href="/tournaments"
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-brand hover:bg-brand-hover dark:bg-lime dark:text-canvas transition flex items-center gap-1.5 shadow-xs btn-tactile"
          >
            <Plus className="w-4 h-4" />
            <span>Follow a team</span>
          </Link>
        </>
      }
    >
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-surface dark:bg-surface-alt text-ink px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-line animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Followed Match Hero Card */}
      <section className="bg-gradient-to-r from-brand via-[#0B513E] to-[#06392C] dark:from-[#122B34] dark:via-[#0E232B] dark:to-[#0A1A22] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-line mb-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>LIVE TELEMETRY TRACKER</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1 font-display">
              Pakistan vs New Zealand
            </h2>
            <p className="text-xs text-slate-200 font-normal">
              3rd T20 · Gaddafi Stadium, Lahore · Final Overs Thriller
            </p>
          </div>

          <button
            onClick={() => {
              setIsFollowingMatch(!isFollowingMatch);
              triggerToast(isFollowingMatch ? 'Match unfollowed from dashboard' : 'Match pinned to dashboard alerts!');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border shadow-xs btn-tactile ${
              isFollowingMatch
                ? 'bg-lime text-canvas border-lime'
                : 'bg-white/10 text-slate-200 border-white/20 hover:bg-white/20'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>{isFollowingMatch ? 'Following Live' : 'Follow Match'}</span>
          </button>
        </div>

        {/* Scores Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center py-4 border-y border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🇵🇰</span>
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                PAKISTAN (CHASING)
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white tabular-nums font-mono">
                142/4 <span className="text-sm text-slate-300 font-normal">(16.2 ov)</span>
              </div>
            </div>
          </div>

          <div className="text-center bg-black/20 p-3.5 rounded-2xl border border-white/10 backdrop-blur-xs space-y-1">
            <div className="text-xs font-mono font-extrabold text-lime">
              Need 35 runs from 22 legal balls
            </div>
            <div className="text-[11px] text-slate-200 flex items-center justify-center gap-2 font-mono">
              <span>Required: <strong>9.55 RPO</strong></span>
              <span>·</span>
              <span>Current: <strong>8.69 RPO</strong></span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 text-right">
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                NEW ZEALAND (1ST INN)
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white tabular-nums font-mono">
                176/6 <span className="text-sm text-slate-300 font-normal">(20.0 ov)</span>
              </div>
            </div>
            <span className="text-3xl">🇳🇿</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-200 pt-1">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-[11px]">Real-time legal deliveries synced</span>
          </span>
          <Link
            href="/matches/pak-vs-nz-3rd-t20"
            className="text-lime hover:underline font-bold flex items-center gap-1 transition"
          >
            <span>Open Match Centre</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 4 Fan KPI Widgets */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard
          icon={Heart}
          iconColor="red"
          title="Followed Teams"
          value={followingTeams.length}
          context="Pakistan, India, Qalandars"
        />
        <StatCard
          icon={Bookmark}
          iconColor="violet"
          title="Saved Articles"
          value="7"
          context="Read offline anytime"
        />
        <StatCard
          icon={CalendarDays}
          iconColor="blue"
          title="Upcoming Matches"
          value="4"
          context="Next 7 days"
        />
        <StatCard
          icon={Calculator}
          iconColor="amber"
          title="Scenarios Tested"
          value="12"
          context="Qualification Lab"
        />
      </section>

      {/* 2-Column Fan Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Personalized News Feed (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-surface rounded-3xl p-6 border border-line shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-line">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-tealAccent" />
                <h2 className="text-base font-extrabold text-ink font-display">Curated Stories</h2>
              </div>

              {/* News Tabs */}
              <div className="flex items-center gap-1 bg-surface-alt p-1 rounded-xl border border-line">
                {[
                  { id: 'for-you', label: 'For You' },
                  { id: 'latest', label: 'Latest' },
                  { id: 'analysis', label: 'Analysis' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setNewsTab(tab.id as any)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition btn-tactile ${
                      newsTab === tab.id
                        ? 'bg-brand text-white dark:bg-lime dark:text-canvas shadow-xs'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredNews.map((article) => (
                <div
                  key={article.id}
                  className="p-4 rounded-2xl bg-surface-alt border border-line transition flex items-start justify-between gap-3 group interactive-card"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-tealAccent dark:text-lime bg-surface px-2 py-0.5 rounded border border-line">
                        {article.category}
                      </span>
                      <span className="text-[10px] font-mono text-ink-muted">
                        {article.stamp} · {article.minutes} min
                      </span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-ink font-display group-hover:text-tealAccent transition leading-snug">
                      <Link href={`/news/${article.id}`}>{article.title}</Link>
                    </h3>
                    <p className="text-xs text-ink-muted line-clamp-1 font-normal">
                      {article.summary}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-ink-muted group-hover:text-tealAccent shrink-0 mt-2 transition" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Followed Teams & Quick Tools (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Followed Teams Widget */}
          <div className="bg-surface rounded-3xl p-6 border border-line shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-ink font-display">Teams You Follow</h2>
              <Link href="/tournaments" className="text-xs font-bold text-tealAccent dark:text-lime hover:underline">
                Explore all →
              </Link>
            </div>

            <div className="space-y-2">
              {[
                { name: 'Pakistan', flag: '🇵🇰', rank: '#2 T20I Ranking', next: 'Nov 5 vs NZ' },
                { name: 'India', flag: '🇮🇳', rank: '#1 T20I Ranking', next: 'Nov 4 vs SA' },
                { name: 'Lahore Qalandars', flag: '🦁', rank: 'PSL Champions', next: 'PSL 2026 Season' },
              ].map((team) => (
                <div
                  key={team.name}
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface-alt border border-line"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{team.flag}</span>
                    <div>
                      <div className="text-xs font-bold text-ink font-display">{team.name}</div>
                      <div className="text-[10px] text-ink-muted font-mono">{team.rank}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-ink bg-surface px-2 py-0.5 rounded-lg border border-line">
                    {team.next}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Player of Interest Spotlight */}
          <div className="bg-surface rounded-3xl p-6 border border-line shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-ink font-display">Player Watchlist</h2>
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-500 bg-surface-alt px-2 py-0.5 rounded-full border border-line">
                ACTIVE
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-alt border border-line flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏏</span>
                <div>
                  <div className="text-xs font-bold text-ink font-display">Babar Azam</div>
                  <div className="text-[10px] text-ink-muted font-mono">T20I Avg: 40.48 · SR: 129.1</div>
                </div>
              </div>
              <Link
                href="/players"
                className="text-xs font-bold text-tealAccent dark:text-lime hover:underline flex items-center gap-1"
              >
                <span>Stats</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
