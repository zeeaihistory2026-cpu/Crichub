'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DashboardShell from '@/components/layout/DashboardShell';
import StatCard from '@/components/ui/StatCard';
import {
  Eye,
  Users,
  Newspaper,
  Trophy,
  Calculator,
  TrendingUp,
  FileClock,
  Radio,
  Zap,
  Plus,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  MoreVertical,
  CheckCircle2,
} from 'lucide-react';

interface ArticleItem {
  id: string;
  title: string;
  byline: string;
  category: string;
  status: 'Published' | 'In review' | 'Scheduled' | 'Draft';
  views: string;
  updated: string;
}

export interface DbCounts {
  players: number;
  withStats: number;
  statRows: number;
  countries: number;
  teams: number;
}

export default function AdminPanel({ counts }: { counts: DbCounts }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Analysis');
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [articles, setArticles] = useState<ArticleItem[]>([
    {
      id: '1',
      title: 'Pakistan announces squad for New Zealand T20 series',
      byline: 'Editorial Desk · 4 min read',
      category: 'Pakistan',
      status: 'Published',
      views: '—',
      updated: '2h ago',
    },
    {
      id: '2',
      title: 'How tournament qualification scenarios actually work',
      byline: 'Cricket Analysis · 7 min read',
      category: 'Explainers',
      status: 'In review',
      views: '—',
      updated: '5h ago',
    },
    {
      id: '3',
      title: 'PSL retention window: important dates and updates',
      byline: 'League Reporter · 3 min read',
      category: 'PSL',
      status: 'Scheduled',
      views: '—',
      updated: 'Yesterday',
    },
    {
      id: '4',
      title: 'Why dot-ball pressure can change a T20 innings',
      byline: 'Data Desk · 5 min read',
      category: 'Analysis',
      status: 'Published',
      views: '—',
      updated: 'Yesterday',
    },
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newArticle: ArticleItem = {
      id: String(Date.now()),
      title: newTitle.trim(),
      byline: 'Editorial Desk · Just now',
      category: newCategory,
      status: 'In review',
      views: '0',
      updated: 'Just now',
    };

    setArticles([newArticle, ...articles]);
    setModalOpen(false);
    setNewTitle('');
    triggerToast(`Article draft "${newArticle.title}" created in editorial queue.`);
  };


  return (
    <DashboardShell
      role="admin"
      eyebrow="CREASEGRID / COMMAND CENTER"
      title="Platform overview."
      subtitle="All your cricket content, matches, tools and community operations in one place."
      actions={
        <>
          <Link
            href="/"
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition flex items-center gap-1.5 shadow-xs btn-tactile"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View website</span>
          </Link>
          <button
            onClick={() => setModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition flex items-center gap-1.5 shadow-xs btn-tactile"
          >
            <Plus className="w-4 h-4" />
            <span>New article</span>
          </button>
        </>
      }
    >
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* KPI Cards — real database counts */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
        <StatCard
          icon={Users}
          iconColor="cyan"
          title="Players in database"
          value={counts.players.toLocaleString()}
          change=""
          context="profiles loaded"
        />
        <StatCard
          icon={Trophy}
          iconColor="amber"
          title="Players with career stats"
          value={counts.withStats.toLocaleString()}
          change=""
          context="verified aggregates"
        />
        <StatCard
          icon={Calculator}
          iconColor="blue"
          title="Career stat records"
          value={counts.statRows.toLocaleString()}
          change=""
          context="batting + bowling + fielding"
        />
        <StatCard
          icon={Newspaper}
          iconColor="violet"
          title="Countries covered"
          value={String(counts.countries)}
          change=""
          context="12 full members + associates"
        />
        <StatCard
          icon={Eye}
          iconColor="blue"
          title="Teams"
          value={String(counts.teams)}
          change=""
          context="national + Pakistan domestic"
        />
      </section>

      {/* Main Grid: Left 8 Cols, Right 4 Cols */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Stack (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Database Coverage Panel */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card space-y-3">
            <h2 className="text-base font-extrabold text-navy font-display">Database coverage</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              The stats database holds {counts.players.toLocaleString()} player profiles from{' '}
              {counts.countries} countries, with published career aggregates loaded for{' '}
              {counts.withStats.toLocaleString()} players ({counts.statRows.toLocaleString()} batting,
              bowling and fielding records). Coverage currently runs to the 2019 season; the
              2020–today refresh is in progress.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Audience analytics are not connected yet, so no traffic numbers are shown here —
              real figures only, never invented ones.
            </p>
          </div>

          {/* Latest Newsroom Activity Table */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-navy font-display flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-brand-600" />
                Latest Newsroom Activity
              </h2>
              <Link href="/news" className="text-xs font-bold text-brand-600 hover:underline">
                All articles →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-mono font-bold uppercase text-[10px] tracking-wider">
                    <th className="pb-3 pl-2">ARTICLE</th>
                    <th className="pb-3">CATEGORY</th>
                    <th className="pb-3">STATUS</th>
                    <th className="pb-3 text-right">VIEWS</th>
                    <th className="pb-3 text-right">UPDATED</th>
                    <th className="pb-3 text-right pr-2">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {articles.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 pl-2">
                        <div className="font-bold text-navy font-display">{row.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{row.byline}</div>
                      </td>
                      <td className="py-3">
                        <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                          {row.category}
                        </span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                            row.status === 'Published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : row.status === 'In review'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 text-right tabular-nums font-mono text-slate-700 font-bold">
                        {row.views}
                      </td>
                      <td className="py-3 text-right text-slate-400 font-mono text-[11px]">
                        {row.updated}
                      </td>
                      <td className="py-3 text-right pr-2">
                        <button
                          onClick={() => triggerToast(`Managing article "${row.title}"`)}
                          className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-navy transition ml-auto"
                          title="Article options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Stack (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Editorial Workflow */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-navy font-display">Editorial Workflow</h2>
              <span
                onClick={() => triggerToast('Opening full editorial moderation queue...')}
                className="text-xs font-bold text-brand-600 hover:underline cursor-pointer"
              >
                Manage →
              </span>
            </div>

            {!alertDismissed && (
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileClock className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-amber-900 font-display">12 stories need review</div>
                    <div className="text-[10px] text-amber-700 font-normal">Keep the editorial newsroom moving</div>
                  </div>
                </div>
                <button
                  onClick={() => setAlertDismissed(true)}
                  className="p-1 text-amber-600 hover:text-amber-900 text-xs font-bold"
                  title="Dismiss alert"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                <span className="flex items-center gap-2 font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span> Published today
                </span>
                <strong className="text-navy tabular-nums font-mono text-sm">18</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                <span className="flex items-center gap-2 font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Pending review
                </span>
                <strong className="text-navy tabular-nums font-mono text-sm">12</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                <span className="flex items-center gap-2 font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span> Scheduled
                </span>
                <strong className="text-navy tabular-nums font-mono text-sm">07</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                <span className="flex items-center gap-2 font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span> Drafts
                </span>
                <strong className="text-navy tabular-nums font-mono text-sm">34</strong>
              </div>
            </div>

            <button
              onClick={() => triggerToast('Editorial queue opened.')}
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition flex items-center justify-center gap-1.5 btn-tactile"
            >
              <span>Open editorial queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Match Operations Live Monitoring */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-navy font-display flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-rose-600" />
                Match Operations
              </h2>
              <Link href="/matches" className="text-xs font-bold text-brand-600 hover:underline">
                Match center →
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-rose-600">
                <span className="w-2 h-2 rounded-full bg-rose-600 live-pulse-glow"></span>
                LIVE · LOCAL MATCH OPERATION
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-navy flex items-center gap-1.5 font-display">
                  <span>🏏</span> Lahore Strikers
                </span>
                <span className="font-mono font-bold text-navy tabular-nums">154/6 (18.4 ov)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500 flex items-center gap-1.5 font-display">
                  <span>🏏</span> City Warriors
                </span>
                <span className="font-mono text-slate-500 tabular-nums">168/7 (20.0 ov)</span>
              </div>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200/70 font-medium">
                15 runs needed from 8 legal balls · Target 169
              </div>
            </div>

            <Link
              href="/organizer/scoring"
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition flex items-center justify-center gap-1.5 btn-tactile"
            >
              <span>Open live scoring pad</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Actions Grid */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card space-y-3">
            <h2 className="text-base font-extrabold text-navy font-display flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setModalOpen(true)}
                className="p-3 rounded-2xl bg-slate-50/80 hover:bg-brand-50 hover:text-brand-600 text-xs font-bold text-slate-700 transition flex flex-col items-center gap-1 border border-slate-100 interactive-card"
              >
                <Newspaper className="w-4 h-4 text-brand-600" />
                <span className="font-display">Write article</span>
              </button>
              <Link
                href="/organizer"
                className="p-3 rounded-2xl bg-slate-50/80 hover:bg-brand-50 hover:text-brand-600 text-xs font-bold text-slate-700 transition flex flex-col items-center gap-1 border border-slate-100 interactive-card"
              >
                <Trophy className="w-4 h-4 text-amber-600" />
                <span className="font-display">Add tournament</span>
              </Link>
              <Link
                href="/players"
                className="p-3 rounded-2xl bg-slate-50/80 hover:bg-brand-50 hover:text-brand-600 text-xs font-bold text-slate-700 transition flex flex-col items-center gap-1 border border-slate-100 interactive-card"
              >
                <Users className="w-4 h-4 text-blue-600" />
                <span className="font-display">Add player</span>
              </Link>
              <Link
                href="/organizer/scoring"
                className="p-3 rounded-2xl bg-slate-50/80 hover:bg-brand-50 hover:text-brand-600 text-xs font-bold text-slate-700 transition flex flex-col items-center gap-1 border border-slate-100 interactive-card"
              >
                <Radio className="w-4 h-4 text-rose-600" />
                <span className="font-display">Update score</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* New Article Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateArticle}
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-fade-in"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-lg font-extrabold text-navy font-display">Draft New Article</h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-navy text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Article Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Pakistan middle-overs spin strategy..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-navy font-semibold mt-1 outline-hidden focus:border-brand-500 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-navy font-semibold mt-1 outline-hidden"
                >
                  <option>Analysis</option>
                  <option>Breaking</option>
                  <option>Match Report</option>
                  <option>PSL</option>
                  <option>Explainers</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 transition shadow-xs btn-tactile"
              >
                Create Draft
              </button>
            </div>
          </form>
        </div>
      )}
    </DashboardShell>
  );
}
