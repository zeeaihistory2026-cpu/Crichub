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
  Award,
  Bell,
  ArrowRight,
  Calculator,
  SlidersHorizontal,
  Plus,
  Sparkles,
  ChevronRight,
  Trophy,
  GitCompare,
  CheckCircle2,
  Clock,
  Radio,
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
      title="Your cricket home"
      subtitle="All the cricket you follow, with less noise and more of what matters."
      actions={
        <>
          <button
            onClick={() => triggerToast('Feed preferences customized.')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition flex items-center gap-1.5 shadow-xs btn-tactile"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Customize feed</span>
          </button>
          <Link
            href="/tournaments"
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition flex items-center gap-1.5 shadow-xs btn-tactile"
          >
            <Plus className="w-4 h-4" />
            <span>Follow a team</span>
          </Link>
        </>
      }
    >
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Followed Match Hero — honest empty state until a live feed is connected */}
      <section className="bg-gradient-to-r from-navy via-navy-deep to-brand-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-navy-border mb-6 space-y-3">
        <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 border border-white/20 text-[10px] font-mono font-bold uppercase tracking-wider">
          Live Match
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
          No live match pinned yet
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
          When a live scores feed is connected, matches you follow will appear here with real
          scores as they happen. Until then this space stays empty — no demo scores.
        </p>
        <Link
          href="/players"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-300 hover:text-white transition"
        >
          <span>Browse player profiles meanwhile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>

      {/* 4 Fan KPI Widgets */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard
          icon={Heart}
          iconColor="red"
          title="Followed Teams"
          value={followingTeams.length}
          context="Teams you follow"
        />
        <StatCard
          icon={Bookmark}
          iconColor="violet"
          title="Saved Articles"
          value={favoriteArticles.length}
          context="Saved from the newsroom"
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
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <h2 className="text-base font-extrabold text-navy font-display">Curated Stories</h2>
              </div>

              {/* News Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {[
                  { id: 'for-you', label: 'For You' },
                  { id: 'latest', label: 'Latest' },
                  { id: 'analysis', label: 'Analysis' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setNewsTab(tab.id as any)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      newsTab === tab.id
                        ? 'bg-white text-navy shadow-2xs'
                        : 'text-slate-500 hover:text-navy'
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
                  className="p-4 rounded-2xl bg-slate-50/80 hover:bg-brand-50/40 border border-slate-100 transition flex items-start justify-between gap-3 group interactive-card"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-brand-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {article.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {article.stamp} · {article.minutes} min
                      </span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-navy font-display group-hover:text-brand-600 transition leading-snug">
                      <Link href={`/news/${article.id}`}>{article.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 font-normal">
                      {article.summary}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 shrink-0 mt-2 transition" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Followed Teams & Quick Tools (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Followed Teams Widget */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-navy font-display">Teams You Follow</h2>
              <Link href="/tournaments" className="text-xs font-bold text-brand-600 hover:underline">
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
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{team.flag}</span>
                    <div>
                      <div className="text-xs font-bold text-navy font-display">{team.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{team.rank}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                    {team.next}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Player of Interest Spotlight */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-navy font-display">Player Watchlist</h2>
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ACTIVE
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏏</span>
                <div>
                  <div className="text-xs font-bold text-navy font-display">Babar Azam</div>
                  <div className="text-[10px] text-slate-400 font-mono">T20I Avg: 40.48 · SR: 129.1</div>
                </div>
              </div>
              <Link
                href="/players"
                className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
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
