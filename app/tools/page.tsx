'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import SectionHeader from '@/components/ui/SectionHeader';
import { SEED_TOOLS } from '@/data/seed-data';
import { Calculator, Search, ArrowRight, Trophy, Zap, Shield, Target, Sparkles } from 'lucide-react';

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
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <span className="font-bold text-navy font-display">Tools</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider">
              MATHEMATICALLY VALIDATED SUITE
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-navy font-display tracking-tightest mt-1">
              Cricket Tools & Calculators
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-normal">
              Twelve working calculators built with integer legal-ball precision and transparent worked examples.
            </p>
          </div>

          <Link
            href="/qualification"
            className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 self-start sm:self-auto btn-tactile"
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>Open Qualification Lab</span>
          </Link>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 btn-tactile ${
                  selectedCat === cat
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
              placeholder="Search calculator (e.g. NRR, target)..."
              className="w-full bg-white text-xs pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 outline-hidden focus:border-brand-500 transition text-navy font-medium"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((t) => (
            <Link
              key={t.id}
              href={`/tools/${t.id}`}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card hover:border-brand-300 hover:shadow-cardHover transition flex flex-col justify-between group interactive-card"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="w-9 h-9 rounded-xl bg-blue-50 text-brand-600 flex items-center justify-center group-hover:scale-110 transition shadow-2xs">
                    <Calculator className="w-4.5 h-4.5" />
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                    {t.category}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-navy font-display group-hover:text-brand-600 transition">
                  {t.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal">{t.desc}</p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-600">
                <span className="font-mono text-[11px] font-semibold text-slate-400">Formula & Calculator</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition">
                  Launch <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Signature Tool Promo Banner */}
        <div className="bg-gradient-to-r from-navy via-navy-deep to-brand-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl border border-navy-border">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-300 tracking-wider">
              SIGNATURE FLAGSHIP SIMULATOR
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-tightest">
              Qualification Lab
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
              Model complex tournament outcomes, points distributions, and NRR tie-breaks under official MCC playing condition all-out rules.
            </p>
          </div>
          <Link
            href="/qualification"
            className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition shadow-xs flex items-center gap-2 self-start sm:self-auto shrink-0 btn-tactile"
          >
            <span>Launch Lab</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
