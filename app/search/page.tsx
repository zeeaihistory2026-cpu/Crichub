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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
          Search Results
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          {q ? `Showing results matching "${query}"` : 'Search across all cricket tools, news, matches, and players'}
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search CreaseGrid..."
          className="w-full bg-white text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-hidden focus:border-brand-500 transition shadow-xs text-navy font-semibold"
        />
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculators Results */}
        <div className="bg-white rounded-2xl p-5 border border-[#e5eaf2] shadow-xs space-y-3">
          <SectionHeader
            title={`Calculator Results (${foundTools.length})`}
            href="/tools"
            linkLabel="All tools"
          />
          {foundTools.length === 0 ? (
            <p className="text-xs text-slate-400">No matching calculators found.</p>
          ) : (
            <div className="space-y-2">
              {foundTools.map((t) => (
                <Link
                  key={t.id}
                  href={`/tools/${t.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-brand-50 transition border border-slate-100 group"
                >
                  <div className="flex items-center gap-2.5">
                    <Calculator className="w-4 h-4 text-brand-600" />
                    <div>
                      <div className="text-xs font-bold text-navy group-hover:text-brand-600 transition">
                        {t.name}
                      </div>
                      <div className="text-[11px] text-slate-400">{t.desc}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-0.5 transition" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* News Results */}
        <div className="bg-white rounded-2xl p-5 border border-[#e5eaf2] shadow-xs space-y-3">
          <SectionHeader
            title={`Article Results (${foundArticles.length})`}
            href="/news"
            linkLabel="All news"
          />
          {foundArticles.length === 0 ? (
            <p className="text-xs text-slate-400">No matching news articles found.</p>
          ) : (
            <div className="space-y-2">
              {foundArticles.map((a) => (
                <Link
                  key={a.id}
                  href={`/news/${a.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-brand-50 transition border border-slate-100 group"
                >
                  <div>
                    <div className="text-xs font-bold text-navy group-hover:text-brand-600 transition">
                      {a.title}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {a.category} · {a.minutes} min read
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-0.5 transition" />
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
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <span className="font-bold text-navy">Global Search</span>
        </div>

        <Suspense fallback={<div className="p-8 text-center text-slate-400 text-xs">Loading search...</div>}>
          <SearchResultsContent />
        </Suspense>
      </main>
      <PublicFooter />
    </>
  );
}
