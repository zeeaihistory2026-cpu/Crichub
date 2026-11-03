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

export default function AdminDashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Analysis');
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [activeMonthHover, setActiveMonthHover] = useState<number | null>(11);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [articles, setArticles] = useState<ArticleItem[]>([
    {
      id: '1',
      title: 'Pakistan announces squad for New Zealand T20 series',
      byline: 'Editorial Desk · 4 min read',
      category: 'Pakistan',
      status: 'Published',
      views: '38.4K',
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
      views: '24.1K',
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

  const chartPoints = [
    { month: 'Dec', views: '2.8M', x: 14, y: 155 },
    { month: 'Jan', views: '3.1M', x: 72, y: 141 },
    { month: 'Feb', views: '3.0M', x: 130, y: 148 },
    { month: 'Mar', views: '3.6M', x: 188, y: 115 },
    { month: 'Apr', views: '3.5M', x: 246, y: 120 },
    { month: 'May', views: '3.9M', x: 304, y: 100 },
    { month: 'Jun', views: '3.7M', x: 362, y: 113 },
    { month: 'Jul', views: '4.2M', x: 420, y: 83 },
    { month: 'Aug', views: '4.1M', x: 478, y: 86 },
    { month: 'Sep', views: '4.6M', x: 536, y: 51 },
    { month: 'Oct', views: '4.4M', x: 594, y: 63 },
    { month: 'Nov', views: '4.93M', x: 652, y: 27 },
  ];

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
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-ink bg-surface border border-line hover:bg-surface-alt transition flex items-center gap-1.5 shadow-xs btn-tactile"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View website</span>
          </Link>
          <button
            onClick={() => setModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-brand hover:bg-brand-hover dark:bg-lime dark:text-canvas transition flex items-center gap-1.5 shadow-xs btn-tactile"
          >
            <Plus className="w-4 h-4" />
            <span>New article</span>
          </button>
        </>
      }
    >
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-surface dark:bg-surface-alt text-ink px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-line animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* 5 KPI Cards Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
        <StatCard
          icon={Eye}
          iconColor="blue"
          title="Page views"
          value="4.93M"
          change="+18.7%"
          context="vs last 30 days"
        />
        <StatCard
          icon={Users}
          iconColor="cyan"
          title="Monthly active users"
          value="48,291"
          change="+12.5%"
          context="vs last 30 days"
        />
        <StatCard
          icon={Newspaper}
          iconColor="violet"
          title="Published articles"
          value="2,846"
          change="+8.3%"
          context="vs last 30 days"
        />
        <StatCard
          icon={Trophy}
          iconColor="amber"
          title="Managed tournaments"
          value="186"
          change="+14.2%"
          context="vs last 30 days"
        />
        <StatCard
          icon={Calculator}
          iconColor="blue"
          title="Tools launched"
          value="89"
          change="+5.6%"
          context="vs last 30 days"
        />
      </section>

      {/* Main Grid: Left 8 Cols, Right 4 Cols */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Stack (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Audience Growth Chart Panel */}
          <div className="bg-surface rounded-3xl p-5 sm:p-6 border border-line shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-ink font-display">Audience Growth</h2>
                <div className="text-xs text-ink-muted mt-0.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand dark:bg-lime"></span>
                  <span className="font-mono">Page views trajectory</span>
                </div>
              </div>
              <span className="text-xs text-ink-muted font-mono font-bold bg-surface-alt px-2.5 py-1 rounded-xl border border-line">
                Last 12 months
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-ink font-display tabular-nums tracking-tightest">
                4,932,110
              </span>
              <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                +18.7%
              </span>
              <span className="text-xs text-ink-muted">
                {activeMonthHover !== null
                  ? `Selected: ${chartPoints[activeMonthHover].month} (${chartPoints[activeMonthHover].views} views)`
                  : 'Hover over data points to inspect month metrics'}
              </span>
            </div>

            {/* SVG Curve Chart */}
            <div className="relative pt-2">
              <svg
                className="w-full h-44 sm:h-52 overflow-visible"
                viewBox="0 0 670 198"
                role="img"
                aria-label="Audience growth across the last 12 months"
              >
                <defs>
                  <linearGradient id="adminGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop stopColor="#0B513E" stopOpacity="0.25" />
                    <stop offset="1" stopColor="#0B513E" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M14 38H652M14 83H652M14 128H652M14 176H652" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 6" />
                <path
                  d="M 14 155 L 72 141 L 130 148 L 188 115 L 246 120 L 304 100 L 362 113 L 420 83 L 478 86 L 536 51 L 594 63 L 652 27 L 652 176 L 14 176 Z"
                  fill="url(#adminGrad)"
                />
                <path
                  d="M 14 155 L 72 141 L 130 148 L 188 115 L 246 120 L 304 100 L 362 113 L 420 83 L 478 86 L 536 51 L 594 63 L 652 27"
                  fill="none"
                  stroke="#48DAC0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3.6"
                />
                {chartPoints.map((pt, i) => (
                  <circle
                    key={pt.month}
                    cx={pt.x}
                    cy={pt.y}
                    r={activeMonthHover === i ? 6.5 : 4.5}
                    fill={activeMonthHover === i ? '#48DAC0' : 'var(--surface)'}
                    stroke="#48DAC0"
                    strokeWidth="3"
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setActiveMonthHover(i)}
                  />
                ))}
              </svg>
              <div className="flex justify-between text-[11px] text-ink-muted font-mono font-semibold pt-2">
                {chartPoints.map((pt, i) => (
                  <span
                    key={pt.month}
                    className={`cursor-pointer transition ${activeMonthHover === i ? 'text-tealAccent dark:text-lime font-bold' : ''}`}
                    onClick={() => setActiveMonthHover(i)}
                  >
                    {pt.month}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Latest Newsroom Activity Table */}
          <div className="bg-surface rounded-3xl p-5 sm:p-6 border border-line shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-ink font-display flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-tealAccent" />
                Latest Newsroom Activity
              </h2>
              <Link href="/news" className="text-xs font-bold text-tealAccent dark:text-lime hover:underline">
                All articles →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line text-ink-muted font-mono font-bold uppercase text-[10px] tracking-wider">
                    <th className="pb-3 pl-2">ARTICLE</th>
                    <th className="pb-3">CATEGORY</th>
                    <th className="pb-3">STATUS</th>
                    <th className="pb-3 text-right">VIEWS</th>
                    <th className="pb-3 text-right">UPDATED</th>
                    <th className="pb-3 text-right pr-2">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {articles.map((row) => (
                    <tr key={row.id} className="hover:bg-surface-alt/70 transition">
                      <td className="py-3 pl-2">
                        <div className="font-bold text-ink font-display">{row.title}</div>
                        <div className="text-[10px] text-ink-muted font-mono">{row.byline}</div>
                      </td>
                      <td className="py-3">
                        <span className="text-[10px] font-mono font-bold text-ink bg-surface-alt px-2 py-0.5 rounded-lg border border-line">
                          {row.category}
                        </span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                            row.status === 'Published'
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                              : row.status === 'In review'
                              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                              : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 text-right tabular-nums font-mono text-ink font-bold">
                        {row.views}
                      </td>
                      <td className="py-3 text-right text-ink-muted font-mono text-[11px]">
                        {row.updated}
                      </td>
                      <td className="py-3 text-right pr-2">
                        <button
                          onClick={() => triggerToast(`Managing article "${row.title}"`)}
                          className="p-1 rounded-lg hover:bg-surface-alt text-ink-muted hover:text-ink transition ml-auto"
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
          <div className="bg-surface rounded-3xl p-5 sm:p-6 border border-line shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-ink font-display">Editorial Workflow</h2>
              <span
                onClick={() => triggerToast('Opening full editorial moderation queue...')}
                className="text-xs font-bold text-tealAccent dark:text-lime hover:underline cursor-pointer"
              >
                Manage →
              </span>
            </div>

            {!alertDismissed && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileClock className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-ink font-display">12 stories need review</div>
                    <div className="text-[10px] text-ink-muted font-normal">Keep the editorial newsroom moving</div>
                  </div>
                </div>
                <button
                  onClick={() => setAlertDismissed(true)}
                  className="p-1 text-ink-muted hover:text-ink text-xs font-bold"
                  title="Dismiss alert"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-alt border border-line">
                <span className="flex items-center gap-2 font-semibold text-ink">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span> Published today
                </span>
                <strong className="text-ink tabular-nums font-mono text-sm">18</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-alt border border-line">
                <span className="flex items-center gap-2 font-semibold text-ink">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Pending review
                </span>
                <strong className="text-ink tabular-nums font-mono text-sm">12</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-alt border border-line">
                <span className="flex items-center gap-2 font-semibold text-ink">
                  <span className="w-2 h-2 rounded-full bg-line"></span> Scheduled
                </span>
                <strong className="text-ink tabular-nums font-mono text-sm">07</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-alt border border-line">
                <span className="flex items-center gap-2 font-semibold text-ink">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span> Drafts
                </span>
                <strong className="text-ink tabular-nums font-mono text-sm">34</strong>
              </div>
            </div>

            <button
              onClick={() => triggerToast('Editorial queue opened.')}
              className="w-full py-2.5 rounded-xl border border-line hover:bg-surface-alt text-xs font-bold text-ink transition flex items-center justify-center gap-1.5 btn-tactile"
            >
              <span>Open editorial queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Match Operations Live Monitoring */}
          <div className="bg-surface rounded-3xl p-5 sm:p-6 border border-line shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-ink font-display flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-alert" />
                Match Operations
              </h2>
              <Link href="/matches" className="text-xs font-bold text-tealAccent dark:text-lime hover:underline">
                Match center →
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-surface-alt border border-line space-y-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-alert">
                <span className="w-2 h-2 rounded-full bg-alert animate-pulse"></span>
                LIVE · LOCAL MATCH OPERATION
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-ink flex items-center gap-1.5 font-display">
                  <span>🏏</span> Lahore Strikers
                </span>
                <span className="font-mono font-bold text-ink tabular-nums">154/6 (18.4 ov)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-ink-muted flex items-center gap-1.5 font-display">
                  <span>🏏</span> City Warriors
                </span>
                <span className="font-mono text-ink-muted tabular-nums">168/7 (20.0 ov)</span>
              </div>
              <div className="text-[11px] text-ink-muted pt-2 border-t border-line font-medium">
                15 runs needed from 8 legal balls · Target 169
              </div>
            </div>

            <Link
              href="/organizer/scoring"
              className="w-full py-2.5 rounded-xl border border-line hover:bg-surface-alt text-xs font-bold text-ink transition flex items-center justify-center gap-1.5 btn-tactile"
            >
              <span>Open live scoring pad</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Actions Grid */}
          <div className="bg-surface rounded-3xl p-5 sm:p-6 border border-line shadow-xs space-y-3">
            <h2 className="text-base font-extrabold text-ink font-display flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setModalOpen(true)}
                className="p-3 rounded-2xl bg-surface-alt hover:bg-surface text-xs font-bold text-ink transition flex flex-col items-center gap-1 border border-line interactive-card"
              >
                <Newspaper className="w-4 h-4 text-tealAccent" />
                <span className="font-display">Write article</span>
              </button>
              <Link
                href="/organizer"
                className="p-3 rounded-2xl bg-surface-alt hover:bg-surface text-xs font-bold text-ink transition flex flex-col items-center gap-1 border border-line interactive-card"
              >
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="font-display">Add tournament</span>
              </Link>
              <Link
                href="/players"
                className="p-3 rounded-2xl bg-surface-alt hover:bg-surface text-xs font-bold text-ink transition flex flex-col items-center gap-1 border border-line interactive-card"
              >
                <Users className="w-4 h-4 text-tealAccent" />
                <span className="font-display">Add player</span>
              </Link>
              <Link
                href="/organizer/scoring"
                className="p-3 rounded-2xl bg-surface-alt hover:bg-surface text-xs font-bold text-ink transition flex flex-col items-center gap-1 border border-line interactive-card"
              >
                <Radio className="w-4 h-4 text-alert" />
                <span className="font-display">Update score</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* New Article Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateArticle}
            className="bg-surface rounded-3xl max-w-md w-full p-6 shadow-2xl border border-line space-y-4 animate-fade-in"
          >
            <div className="flex items-center justify-between pb-2 border-b border-line">
              <h3 className="text-lg font-extrabold text-ink font-display">Draft New Article</h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-ink-muted hover:text-ink text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-ink">Article Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Pakistan middle-overs spin strategy..."
                  className="w-full bg-surface-alt border border-line rounded-xl p-2.5 text-xs text-ink font-semibold mt-1 outline-hidden focus:border-brand focus:bg-surface transition"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-ink">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-surface-alt border border-line rounded-xl p-2.5 text-xs text-ink font-semibold mt-1 outline-hidden"
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
                className="px-4 py-2 rounded-xl text-xs font-bold text-ink-muted hover:bg-surface-alt transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-brand text-white hover:bg-brand-hover dark:bg-lime dark:text-canvas transition shadow-xs btn-tactile"
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
