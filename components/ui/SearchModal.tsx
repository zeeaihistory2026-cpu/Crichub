'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  X,
  Calculator,
  Newspaper,
  Radio,
  User,
  ArrowRight,
  Trophy,
} from 'lucide-react';
import { SEED_TOOLS, SEED_ARTICLES } from '@/data/seed-data';
import { REAL_MATCHES } from '@/data/recent-matches';
import { searchPlayers, initials, DbPlayer } from '@/lib/data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [playerResults, setPlayerResults] = useState<DbPlayer[]>([]);

  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) {
      setPlayerResults([]);
      return;
    }
    let cancelled = false;
    const t = setTimeout(async () => {
      const rows = await searchPlayers(term, 6, true);
      if (!cancelled) setPlayerResults(rows);
    }, 220);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingTools = SEED_TOOLS.filter(
    (t) => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
  ).slice(0, 4);

  const matchingArticles = SEED_ARTICLES.filter(
    (a) => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q)
  ).slice(0, 4);

  const matchingMatches = REAL_MATCHES.filter(
    (m) => m.name.toLowerCase().includes(q) || m.detail.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-fade-in">
      <div className="bg-surface dark:bg-surface rounded-2xl w-full max-w-2xl border border-line shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-line flex items-center gap-3">
          <Search className="w-5 h-5 text-tealAccent shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search players, calculators, tournaments, news (e.g., NRR, Babar, T20)..."
            className="w-full text-sm sm:text-base outline-hidden text-ink placeholder:text-ink-muted bg-transparent font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-alt transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-4 overflow-y-auto space-y-6">
          {!q ? (
            <div className="space-y-4">
              <div className="text-xs font-bold text-ink-muted uppercase tracking-wider">
                POPULAR SEARCHES
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/qualification"
                  onClick={onClose}
                  className="p-3 rounded-xl bg-surface-alt hover:border-tealAccent transition flex items-center gap-2 border border-line font-medium text-ink"
                >
                  <Trophy className="w-4 h-4 text-amber-500" /> Qualification Lab
                </Link>
                <Link
                  href="/tools/net-run-rate"
                  onClick={onClose}
                  className="p-3 rounded-xl bg-surface-alt hover:border-tealAccent transition flex items-center gap-2 border border-line font-medium text-ink"
                >
                  <Calculator className="w-4 h-4 text-tealAccent" /> NRR Calculator
                </Link>
                <Link
                  href="/players/babar-azam"
                  onClick={onClose}
                  className="p-3 rounded-xl bg-surface-alt hover:border-tealAccent transition flex items-center gap-2 border border-line font-medium text-ink"
                >
                  <User className="w-4 h-4 text-emerald-500" /> Babar Azam Profile
                </Link>
                <Link
                  href="/matches"
                  onClick={onClose}
                  className="p-3 rounded-xl bg-surface-alt hover:border-tealAccent transition flex items-center gap-2 border border-line font-medium text-ink"
                >
                  <Radio className="w-4 h-4 text-alert" /> Match Centre
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Calculators & Tools */}
              {matchingTools.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-2">
                    CALCULATORS &amp; TOOLS
                  </div>
                  <div className="space-y-1.5">
                    {matchingTools.map((t) => (
                      <Link
                        key={t.id}
                        href={`/tools/${t.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-alt group transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 rounded-lg bg-tealAccent/15 text-tealAccent">
                            <Calculator className="w-4 h-4" />
                          </span>
                          <div>
                            <div className="text-xs font-bold text-ink group-hover:text-tealAccent transition">
                              {t.name}
                            </div>
                            <div className="text-[11px] text-ink-muted">{t.desc}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-tealAccent group-hover:translate-x-0.5 transition" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* News & Stories */}
              {matchingArticles.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-2">
                    ARTICLES &amp; ANALYSIS
                  </div>
                  <div className="space-y-1.5">
                    {matchingArticles.map((a) => (
                      <Link
                        key={a.id}
                        href={`/news/${a.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-alt group transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 rounded-lg bg-lime/20 text-brand dark:text-lime">
                            <Newspaper className="w-4 h-4" />
                          </span>
                          <div>
                            <div className="text-xs font-bold text-ink group-hover:text-tealAccent transition">
                              {a.title}
                            </div>
                            <div className="text-[11px] text-ink-muted">
                              {a.category} · {a.minutes} min read
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-tealAccent group-hover:translate-x-0.5 transition" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Matches */}
              {matchingMatches.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-2">
                    MATCHES
                  </div>
                  <div className="space-y-1.5">
                    {matchingMatches.map((m) => (
                      <Link
                        key={m.id}
                        href={`/matches/${m.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-alt group transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 rounded-lg bg-alert/15 text-alert">
                            <Radio className="w-4 h-4" />
                          </span>
                          <div>
                            <div className="text-xs font-bold text-ink group-hover:text-tealAccent transition">
                              {m.name}
                            </div>
                            <div className="text-[11px] text-ink-muted">{m.detail}</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-ink tabular-nums">{m.teamAScore}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Players - live from the CreaseGrid database */}
              {playerResults.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-2">
                    PLAYERS
                  </div>
                  <div className="space-y-1.5">
                    {playerResults.map((p) => (
                      <Link
                        key={p.id}
                        href={`/players/${p.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-alt group transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-brand text-white dark:bg-lime dark:text-canvas font-bold text-[10px] flex items-center justify-center">
                            {initials(p.full_name)}
                          </span>
                          <div>
                            <div className="text-xs font-bold text-ink group-hover:text-tealAccent transition">
                              {p.full_name}
                            </div>
                            <div className="text-[11px] text-ink-muted capitalize">
                              {p.country_id.replace(/-/g, ' ')}
                              {p.playing_role ? ` - ${p.playing_role}` : ''}
                            </div>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono font-bold text-ink-muted">
                          {p.has_stats ? 'STATS' : 'PROFILE'}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {matchingTools.length === 0 && matchingArticles.length === 0 && matchingMatches.length === 0 && playerResults.length === 0 && (
                <div className="text-center py-8 text-ink-muted text-xs">
                  No matching results found for &ldquo;{query}&rdquo;.
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-surface-alt border-t border-line text-[11px] text-ink-muted flex items-center justify-between">
          <span>Press ESC to close</span>
          <span>CreaseGrid Cricket Knowledge Engine</span>
        </div>
      </div>
    </div>
  );
}
