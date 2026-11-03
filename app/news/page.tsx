'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import SectionHeader from '@/components/ui/SectionHeader';
import { SEED_ARTICLES } from '@/data/seed-data';
import { Search, ArrowRight, Calendar, Newspaper, Sparkles, TrendingUp, Clock } from 'lucide-react';

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
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <span className="font-bold text-navy font-display">News & Analysis</span>
        </div>

        {/* Editorial Masthead */}
        <section className="bg-gradient-to-r from-navy via-navy-deep to-brand-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-navy-border">
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-mono font-bold uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5" />
              <span>CREASEGRID EDITORIAL DESK</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tightest">
              Cricket News & Analysis
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Clear reporting, tactical explainers, and statistical narratives originating in Pakistan and across the cricket world — text-first, zero noise.
            </p>
          </div>
        </section>

        {/* Categories & Search Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setDisplayCount(6);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 btn-tactile ${
                  selectedCategory === cat
                    ? 'bg-navy text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news & explainers..."
              className="w-full bg-white text-xs pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 outline-hidden focus:border-brand-500 transition text-navy font-medium"
            />
          </div>
        </div>

        {/* Newsroom Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Article Stream (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {visibleArticles.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 text-slate-500 shadow-card">
                <Newspaper className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="text-base font-bold text-navy font-display">No articles found</h3>
                <p className="text-xs text-slate-400 mt-1">Try selecting another category or clear search terms.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All News');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-brand-50 text-brand-600 font-bold text-xs hover:bg-brand-100 transition btn-tactile"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              visibleArticles.map((art) => (
                <article
                  key={art.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-brand-300 shadow-card hover:shadow-cardHover transition flex flex-col justify-between group interactive-card"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                        {art.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{art.region}</span>
                    </div>

                    <h2 className="text-base sm:text-lg font-black text-navy font-display group-hover:text-brand-600 transition leading-snug">
                      <Link href={`/news/${art.id}`}>{art.title}</Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed font-normal">
                      {art.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-4 pt-3.5 border-t border-slate-100 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {art.date} · {art.minutes} min read
                    </span>
                    <Link
                      href={`/news/${art.id}`}
                      className="text-brand-600 font-bold hover:underline flex items-center gap-1 font-sans"
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
                  className="px-5 py-2.5 rounded-xl bg-white text-navy font-bold text-xs border border-slate-200 hover:bg-slate-50 shadow-xs transition btn-tactile"
                >
                  Load More Stories
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Top Stories */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-3.5">
              <h3 className="text-sm font-extrabold text-navy font-display">Top Read Stories</h3>
              <div className="space-y-3">
                {SEED_ARTICLES.slice(0, 4).map((a, idx) => (
                  <div key={a.id} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-navy font-display hover:text-brand-600 transition leading-snug">
                      <Link href={`/news/${a.id}`}>{a.title}</Link>
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* News Explained */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-3">
              <h3 className="text-sm font-extrabold text-navy font-display flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Editorial Explainers</span>
              </h3>
              <p className="text-xs text-slate-500 font-normal">
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
                    className="block p-3 rounded-2xl bg-slate-50/80 hover:bg-brand-50 text-xs font-semibold text-slate-700 hover:text-brand-600 transition border border-slate-100 interactive-card"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-3">
              <h3 className="text-sm font-extrabold text-navy font-display">Trending Topics</h3>
              <div className="flex flex-wrap gap-1.5">
                {['#PakistanCricket', '#PSL2026', '#T20WorldCup', '#BabarAzam', '#NetRunRate', '#PCB'].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono font-semibold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-600 transition cursor-pointer"
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
    </>
  );
}
