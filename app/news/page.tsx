'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { SEED_ARTICLES } from '@/data/seed-data';
import { Search, ArrowRight, Newspaper, Sparkles, Clock } from 'lucide-react';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All News');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(6);

  const categories = [
    'All News',
    'Breaking',
    'Pakistan',
    'International',
    'PSL',
    'Women’s Cricket',
    'Domestic',
    'Analysis',
    'Explainer',
  ];

  const filteredArticles = SEED_ARTICLES.filter((a) => {
    const matchesCat = selectedCategory === 'All News' || a.category === selectedCategory || a.region === selectedCategory;
    const matchesSearch = !searchQuery || `${a.title} ${a.summary}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const visibleArticles = filteredArticles.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-body transition-colors duration-200">
      <PublicHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-9 pb-16 space-y-7">
        {/* Breadcrumb */}
        <div className="text-xs text-ink-muted flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-tealAccent">Home</Link>
          <span>/</span>
          <span className="font-bold text-ink font-display">News &amp; Analysis</span>
        </div>

        {/* Editorial Masthead */}
        <section className="bg-gradient-to-r from-[#0B513E] to-[#06392C] dark:from-[#122B34] dark:to-[#0A1A22] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-tealAccent/25 dark:border-line">
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-lime border border-white/15 text-xs font-mono font-bold uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5" />
              <span>CREASEGRID EDITORIAL DESK</span>
            </span>
            <h1 className="text-[30px] leading-[38px] sm:text-[40px] sm:leading-[48px] lg:text-[44px] lg:leading-[52px] font-extrabold text-white font-display tracking-tight">
              Cricket News &amp; Analysis
            </h1>
            <p className="text-sm sm:text-base text-slate-200 dark:text-slate-300 font-normal leading-relaxed">
              Clear reporting, tactical explainers, and statistical narratives originating in Pakistan and across the cricket world — text-first, zero noise.
            </p>
          </div>
        </section>

        {/* Categories & Search Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setDisplayCount(6);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition shrink-0 btn-tactile ${
                  selectedCategory === cat
                    ? 'bg-brand text-white dark:bg-lime dark:text-canvas font-bold shadow-xs'
                    : 'bg-surface text-ink-muted hover:text-ink hover:bg-surface-alt border border-line'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news & explainers..."
              className="w-full bg-surface text-ink text-xs pl-10 pr-4 py-2.5 rounded-full border border-line outline-hidden focus:border-tealAccent transition placeholder:text-ink-muted font-medium"
            />
          </div>
        </div>

        {/* Newsroom Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Article Stream (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {visibleArticles.length === 0 ? (
              <div className="bg-surface dark:bg-surface rounded-3xl p-12 text-center border border-line text-ink-muted shadow-xs">
                <Newspaper className="w-10 h-10 text-ink-muted/50 mx-auto mb-2" />
                <h3 className="text-base font-bold text-ink font-display">No articles found</h3>
                <p className="text-xs text-ink-muted mt-1">Try selecting another category or clear search terms.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All News');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 rounded-full bg-brand text-white dark:bg-lime dark:text-canvas font-bold text-xs transition btn-tactile"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              visibleArticles.map((art) => (
                <article
                  key={art.id}
                  className="bg-surface dark:bg-surface rounded-3xl p-6 border border-line hover:border-tealAccent/60 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group interactive-card"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-brand dark:text-lime bg-surface-alt px-2.5 py-0.5 rounded-full border border-line">
                        {art.category}
                      </span>
                      <span className="text-[11px] font-mono text-ink-muted">{art.region}</span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-ink font-display group-hover:text-tealAccent transition leading-snug">
                      <Link href={`/news/${art.id}`}>{art.title}</Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-ink-muted mt-2 leading-relaxed font-normal">
                      {art.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-ink-muted mt-4 pt-3.5 border-t border-line font-mono">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {art.date} · {art.minutes} min read
                    </span>
                    <Link
                      href={`/news/${art.id}`}
                      className="text-tealAccent font-bold hover:underline flex items-center gap-1 font-sans"
                    >
                      <span>Read article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </Link>
                  </div>
                </article>
              ))
            )}

            {filteredArticles.length > displayCount && (
              <div className="text-center pt-2">
                <button
                  onClick={() => setDisplayCount((c) => c + 4)}
                  className="px-6 py-2.5 rounded-full bg-surface-alt text-ink font-bold text-xs border border-line hover:border-tealAccent transition btn-tactile"
                >
                  Load More Stories
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Top Stories */}
            <div className="bg-surface dark:bg-surface rounded-3xl p-6 border border-line shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-ink font-display">Top Read Stories</h3>
              <div className="space-y-3">
                {SEED_ARTICLES.slice(0, 4).map((a, idx) => (
                  <div key={a.id} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-surface-alt text-ink font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-line">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-ink font-display hover:text-tealAccent transition leading-snug">
                      <Link href={`/news/${a.id}`}>{a.title}</Link>
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* News Explained */}
            <div className="bg-surface dark:bg-surface rounded-3xl p-6 border border-line shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-ink font-display flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Editorial Explainers</span>
              </h3>
              <p className="text-xs text-ink-muted font-normal">
                Understand the strategic significance and consequences of breaking developments.
              </p>
              <div className="space-y-2">
                {[
                  'What actually happened?',
                  'Why it matters to the team',
                  'Who is affected by the decision?',
                  'What happens next on the schedule?',
                ].map((item) => (
                  <Link
                    key={item}
                    href="/news/world-cup-explained"
                    className="block p-3 rounded-2xl bg-surface-alt hover:border-tealAccent text-xs font-semibold text-ink transition border border-line interactive-card"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-surface dark:bg-surface rounded-3xl p-6 border border-line shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-ink font-display">Trending Topics</h3>
              <div className="flex flex-wrap gap-1.5">
                {['#PakistanCricket', '#PSL2026', '#T20WorldCup', '#BabarAzam', '#NetRunRate', '#PCB'].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-surface-alt text-ink-muted hover:text-ink hover:border-tealAccent transition cursor-pointer border border-line"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
