'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, Calculator, Newspaper, Radio, Trophy, User, ArrowRight } from 'lucide-react';
import { SEED_ARTICLES, SEED_MATCHES, SEED_TOOLS, SEED_BABAR_AZAM } from '@/data/seed-data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingTools = SEED_TOOLS.filter(
    (t) => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
  ).slice(0, 4);

  const matchingArticles = SEED_ARTICLES.filter(
    (a) => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q)
  ).slice(0, 4);

  const matchingMatches = SEED_MATCHES.filter(
    (m) => m.name.toLowerCase().includes(q) || m.detail.toLowerCase().includes(q)
  );

  const isBabarMatch = q && 'babar azam pakistan batter'.includes(q);

  return (
    <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search players, calculators, tournaments, news (e.g., NRR, Babar, T20)..."
            className="w-full text-sm sm:text-base outline-hidden text-navy placeholder-slate-400 font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-navy hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-4 overflow-y-auto space-y-6">
          {!q ? (
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                POPULAR SEARCHES
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/qualification"
                  onClick={onClose}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-600 transition flex items-center gap-2 border border-slate-100 font-medium"
                >
                  <Trophy className="w-4 h-4 text-brand-600" /> Qualification Lab
                </Link>
                <Link
                  href="/tools/net-run-rate"
                  onClick={onClose}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-600 transition flex items-center gap-2 border border-slate-100 font-medium"
                >
                  <Calculator className="w-4 h-4 text-blue-600" /> NRR Calculator
                </Link>
                <Link
                  href="/players/babar-azam"
                  onClick={onClose}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-600 transition flex items-center gap-2 border border-slate-100 font-medium"
                >
                  <User className="w-4 h-4 text-emerald-600" /> Babar Azam Profile
                </Link>
                <Link
                  href="/matches"
                  onClick={onClose}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-600 transition flex items-center gap-2 border border-slate-100 font-medium"
                >
                  <Radio className="w-4 h-4 text-red-600" /> Live Match Centre
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Calculators & Tools */}
              {matchingTools.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    CALCULATORS & TOOLS
                  </div>
                  <div className="space-y-1.5">
                    {matchingTools.map((t) => (
                      <Link
                        key={t.id}
                        href={`/tools/${t.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-50 group transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 rounded-lg bg-blue-50 text-brand-600">
                            <Calculator className="w-4 h-4" />
                          </span>
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
                </div>
              )}

              {/* News & Stories */}
              {matchingArticles.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    ARTICLES & ANALYSIS
                  </div>
                  <div className="space-y-1.5">
                    {matchingArticles.map((a) => (
                      <Link
                        key={a.id}
                        href={`/news/${a.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-50 group transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                            <Newspaper className="w-4 h-4" />
                          </span>
                          <div>
                            <div className="text-xs font-bold text-navy group-hover:text-brand-600 transition">
                              {a.title}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {a.category} · {a.minutes} min read
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-0.5 transition" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Matches */}
              {matchingMatches.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    MATCHES
                  </div>
                  <div className="space-y-1.5">
                    {matchingMatches.map((m) => (
                      <Link
                        key={m.id}
                        href={`/matches/${m.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-50 group transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 rounded-lg bg-red-50 text-red-600">
                            <Radio className="w-4 h-4" />
                          </span>
                          <div>
                            <div className="text-xs font-bold text-navy group-hover:text-brand-600 transition">
                              {m.name}
                            </div>
                            <div className="text-[11px] text-slate-400">{m.detail}</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-navy tabular-nums">{m.teamAScore}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Player Profile Match */}
              {isBabarMatch && (
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    PLAYERS
                  </div>
                  <Link
                    href="/players/babar-azam"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 group transition border border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">
                        BA
                      </span>
                      <div>
                        <div className="text-xs font-bold text-navy group-hover:text-brand-600 transition flex items-center gap-1">
                          {SEED_BABAR_AZAM.name} <span className="text-brand-600">✓</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {SEED_BABAR_AZAM.country} · {SEED_BABAR_AZAM.role}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>
              )}

              {matchingTools.length === 0 && matchingArticles.length === 0 && matchingMatches.length === 0 && !isBabarMatch && (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No matching results found for &ldquo;{query}&rdquo;.
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Press ESC to close</span>
          <span>CreaseGrid Cricket Knowledge Engine</span>
        </div>
      </div>
    </div>
  );
}

