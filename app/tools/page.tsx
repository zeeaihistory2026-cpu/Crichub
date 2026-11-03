'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { SEED_TOOLS } from '@/data/seed-data';
import { Calculator, Search, ArrowRight, Trophy } from 'lucide-react';

export default function ToolsPage() {
  const [selectedCat, setSelectedCat] = useState('All Tools');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All Tools', 'Match Calculators', 'Player Analysis', 'Tournament Tools'];

  const filteredTools = SEED_TOOLS.filter((t) => {
    const matchesCat = selectedCat === 'All Tools' || t.category === selectedCat;
    const matchesSearch = !searchQuery || `${t.name} ${t.desc}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-body transition-colors duration-200">
      <PublicHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-9 pb-16 space-y-7">
        {/* Breadcrumb */}
        <div className="text-xs text-ink-muted flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-tealAccent">Home</Link>
          <span>/</span>
          <span className="font-bold text-ink font-display">Tools</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-tealAccent uppercase tracking-wider">
              MATHEMATICALLY VALIDATED SUITE
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-ink font-display tracking-tight mt-1">
              Cricket Tools &amp; Calculators
            </h1>
            <p className="text-xs sm:text-sm text-ink-muted mt-1 font-normal">
              Twelve working calculators built with integer legal-ball precision and transparent worked examples.
            </p>
          </div>

          <Link
            href="/qualification"
            className="bg-brand text-white hover:bg-brand-hover dark:bg-lime dark:text-canvas dark:hover:bg-lime-hover font-bold text-xs px-5 py-2.5 rounded-full transition shadow-xs flex items-center gap-2 self-start sm:self-auto btn-tactile"
          >
            <Trophy className="w-4 h-4 text-amber-300 dark:text-canvas" />
            <span>Open Qualification Lab</span>
          </Link>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition shrink-0 btn-tactile ${
                  selectedCat === cat
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
              placeholder="Search calculator (e.g. NRR, target)..."
              className="w-full bg-surface text-ink text-xs pl-10 pr-4 py-2.5 rounded-full border border-line outline-hidden focus:border-tealAccent transition placeholder:text-ink-muted font-medium"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((t) => (
            <Link
              key={t.id}
              href={`/tools/${t.id}`}
              className="bg-surface dark:bg-surface rounded-2xl p-6 border border-line hover:border-tealAccent/60 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group interactive-card"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-surface-alt border border-line text-tealAccent flex items-center justify-center group-hover:scale-105 transition shadow-2xs">
                    <Calculator className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-mono font-bold text-ink-muted uppercase tracking-wider bg-surface-alt px-2.5 py-1 rounded-full border border-line">
                    {t.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-ink font-display group-hover:text-tealAccent transition">
                  {t.name}
                </h3>
                <p className="text-xs text-ink-muted mt-2 leading-relaxed font-normal">{t.desc}</p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-line flex items-center justify-between text-xs font-bold text-tealAccent">
                <span className="font-mono text-[11px] font-medium text-ink-muted">Formula &amp; Calculator</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition font-display">
                  Launch <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Signature Qualification Lab Banner */}
        <div className="bg-gradient-to-r from-[#0B513E] to-[#06392C] dark:from-[#122B34] dark:to-[#0A1A22] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl border border-tealAccent/25 dark:border-line">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase text-lime tracking-wider">
              SIGNATURE FLAGSHIP SIMULATOR
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display tracking-tight">
              Qualification Lab
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
              Model complex tournament outcomes, points distributions, and NRR tie-breaks under official playing conditions and all-out rules.
            </p>
          </div>
          <Link
            href="/qualification"
            className="bg-lime hover:bg-lime-hover text-canvas font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] flex items-center gap-2 self-start sm:self-auto shrink-0 btn-tactile"
          >
            <span>Launch Lab</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
