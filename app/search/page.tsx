'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import SectionHeader from '@/components/ui/SectionHeader';
import { SEED_ARTICLES, SEED_TOOLS, SEED_MATCHES } from '@/data/seed-data';
import { Search, ArrowRight, Calculator, Newspaper, Radio } from 'lucide-react';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const q = query.toLowerCase().trim();

  const foundArticles = SEED_ARTICLES.filter(
    (a) => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q)
  );

  const foundTools = SEED_TOOLS.filter(
    (t) => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
  );

  const foundMatches = SEED_MATCHES.filter(
    (m) => m.name.toLowerCase().includes(q) || m.detail.toLowerCase().includes(q)
  );

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-display">
          Search Results
        </h1>
        <p className="text-xs sm:text-sm text-ink-muted mt-0.5">
          {q ? `Showing results matching "${query}"` : 'Search across all cricket tools, news, matches, and players'}
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl">
        <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search CreaseGrid..."
          className="w-full bg-surface text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-line outline-hidden focus:border-tealAccent transition shadow-xs text-ink font-semibold"
        />
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculators Results */}
        <div className="bg-surface rounded-2xl p-5 border border-line shadow-xs space-y-3">
          <SectionHeader
            title={`Calculator Results (${foundTools.length})`}
            href="/tools"
            linkLabel="All tools"
          />
          {foundTools.length === 0 ? (
            <p className="text-xs text-ink-muted font-mono">No matching calculators found.</p>
          ) : (
            <div className="space-y-2">
              {foundTools.map((t) => (
                <Link
                  key={t.id}
                  href={`/tools/${t.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-alt hover:bg-surface transition border border-line group interactive-card"
                >
                  <div className="flex items-center gap-2.5">
                    <Calculator className="w-4 h-4 text-tealAccent dark:text-lime" />
                    <div>
                      <div className="text-xs font-bold text-ink group-hover:text-tealAccent transition font-display">
                        {t.name}
                      </div>
                      <div className="text-[11px] text-ink-muted">{t.desc}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-tealAccent group-hover:translate-x-0.5 transition" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* News Results */}
        <div className="bg-surface rounded-2xl p-5 border border-line shadow-xs space-y-3">
          <SectionHeader
            title={`Article Results (${foundArticles.length})`}
            href="/news"
            linkLabel="All news"
          />
          {foundArticles.length === 0 ? (
            <p className="text-xs text-ink-muted font-mono">No matching articles found.</p>
          ) : (
            <div className="space-y-2">
              {foundArticles.map((a) => (
                <Link
                  key={a.id}
                  href={`/news/${a.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-alt hover:bg-surface transition border border-line group interactive-card"
                >
                  <div className="flex items-center gap-2.5">
                    <Newspaper className="w-4 h-4 text-tealAccent dark:text-lime" />
                    <div>
                      <div className="text-xs font-bold text-ink group-hover:text-tealAccent transition font-display">
                        {a.title}
                      </div>
                      <div className="text-[11px] text-ink-muted line-clamp-1">{a.summary}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-tealAccent group-hover:translate-x-0.5 transition" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Match Center Results */}
        <div className="bg-surface rounded-2xl p-5 border border-line shadow-xs space-y-3 lg:col-span-2">
          <SectionHeader
            title={`Match Results (${foundMatches.length})`}
            href="/matches"
            linkLabel="All matches"
          />
          {foundMatches.length === 0 ? (
            <p className="text-xs text-ink-muted font-mono">No matching matches found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {foundMatches.map((m) => (
                <Link
                  key={m.id}
                  href="/matches"
                  className="p-3.5 rounded-xl bg-surface-alt hover:bg-surface border border-line flex items-center justify-between group interactive-card"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-alert animate-pulse" />
                      <span className="text-xs font-bold text-ink font-display">{m.name}</span>
                    </div>
                    <div className="text-[11px] text-ink-muted mt-1">{m.detail}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-tealAccent group-hover:translate-x-0.5 transition" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-body transition-colors duration-200">
      <PublicHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="text-xs font-mono text-ink-muted">Loading results...</div>}>
          <SearchResultsContent />
        </Suspense>
      </main>
      <PublicFooter />
    </div>
  );
}
