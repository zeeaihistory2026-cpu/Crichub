'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import TeamFlag from '@/components/ui/TeamFlag';
import { REAL_MATCHES } from '@/data/recent-matches';

interface LiveMatchItem {
  id: string;
  slug: string;
  type: 'live' | 'upcoming' | 'completed';
  badge: string;
  badgeType: 'live' | 'upcoming' | 'completed';
  series: string;
  teamA: {
    code: string;
    score?: string;
    overs?: string;
  };
  teamB: {
    code: string;
    score?: string;
    overs?: string;
  };
  statusText: string;
  highlightStatus?: boolean;
}

const MATCHES: LiveMatchItem[] = REAL_MATCHES.map((m) => {
  const split = (raw: string) => {
    const mm = raw.match(/^(.*?)\s*(\(.*\))?$/);
    return { score: mm?.[1], overs: mm?.[2] };
  };
  const a = split(m.teamAScore);
  const b = split(m.teamBScore);
  return {
    id: m.id,
    slug: m.slug,
    type: 'completed' as const,
    badge: 'RESULT',
    badgeType: 'completed' as const,
    series: `${m.format} - ${m.detail}`,
    teamA: { code: m.teamACode, score: a.score, overs: a.overs },
    teamB: { code: m.teamBCode, score: b.score, overs: b.overs },
    statusText: m.result ?? '',
    highlightStatus: false,
  };
});

export default function LiveMatchRibbon() {
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'results'>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const filteredMatches = MATCHES.filter((m) => {
    if (filter === 'all') return true;
    if (filter === 'live') return m.type === 'live';
    if (filter === 'upcoming') return m.type === 'upcoming';
    if (filter === 'results') return m.type === 'completed';
    return true;
  });

  return (
    <section className="w-full">
      {/* Top Header Bar with Filter Tabs and Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Live Indicator Heading */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alert opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-alert" />
            </span>
            <span className="text-sm sm:text-base font-extrabold font-display text-ink tracking-tight">
              Live Cricket Matches
            </span>
            </span>
          </div>

          {/* Filter Pills matching Image 2 */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-surface-alt border border-line">
            {[
              { id: 'all', label: `All (${REAL_MATCHES.length})` },
              { id: 'results', label: 'Results' },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as typeof filter)}
                  className={`px-3 py-1 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight transition-all btn-tactile ${
                    active
                      ? 'bg-brand text-white dark:bg-lime dark:text-canvas font-bold shadow-2xs'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: View All Matches & Carousel Controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <Link
            href="/matches"
            className="text-xs sm:text-[13px] font-bold font-display text-tealAccent hover:underline flex items-center gap-1 group transition"
          >
            <span>View All Matches</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
          </Link>

          {/* Prev/Next Navigation Controls */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full bg-surface border border-line flex items-center justify-center text-ink-muted hover:text-ink hover:border-tealAccent transition shadow-2xs btn-tactile"
              aria-label="Previous match"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full bg-surface border border-line flex items-center justify-center text-ink-muted hover:text-ink hover:border-tealAccent transition shadow-2xs btn-tactile"
              aria-label="Next match"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Match Cards */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch gap-4 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory"
      >
        {filteredMatches.map((match) => {
          const isLive = match.badgeType === 'live';
          const isUpcoming = match.badgeType === 'upcoming';

          return (
            <Link
              key={match.id}
              href={`/matches/${match.slug}`}
              className="snap-start shrink-0 w-[310px] sm:w-[350px] lg:w-[370px] bg-surface dark:bg-surface rounded-2xl p-4 sm:p-5 border border-line hover:border-tealAccent/60 shadow-xs hover:shadow-cardHover transition-all duration-200 group flex flex-col justify-between interactive-card"
            >
              {/* Card Top Row: Badge + Series */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider shrink-0 ${
                      isLive
                        ? 'bg-alert text-white shadow-2xs'
                        : isUpcoming
                        ? 'bg-sky-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-ink'
                    }`}
                  >
                    {isLive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                    <span>{match.badge}</span>
                  </span>
                  <span className="text-xs font-medium text-ink-muted truncate">
                    {match.series}
                  </span>
                </div>
              </div>

              {/* Card Center: Team Scores / Matchup */}
              {isUpcoming ? (
                /* Upcoming Match Layout */
                <div className="py-2.5 flex items-center justify-around gap-4 border-y border-line/60 my-1">
                  <div className="flex items-center gap-2.5">
                    <TeamFlag code={match.teamA.code} size={28} />
                    <span className="text-xs sm:text-sm font-bold font-display text-ink tracking-tight">
                      {match.teamA.code}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-ink-muted uppercase">vs</span>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs sm:text-sm font-bold font-display text-ink tracking-tight">
                      {match.teamB.code}
                    </span>
                    <TeamFlag code={match.teamB.code} size={28} />
                  </div>
                </div>
              ) : (
                /* Live / Completed Match Layout */
                <div className="grid grid-cols-2 gap-3 py-2.5 border-y border-line/60 my-1">
                  {/* Team A */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <TeamFlag code={match.teamA.code} size={28} />
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold font-display text-ink truncate">
                        {match.teamA.code}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-ink tabular-nums font-mono score-num">
                        {match.teamA.score}{' '}
                        <span className="text-[11px] font-normal text-ink-muted">
                          {match.teamA.overs}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Team B */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <TeamFlag code={match.teamB.code} size={28} />
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold font-display text-ink truncate">
                        {match.teamB.code}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-ink tabular-nums font-mono score-num">
                        {match.teamB.score}{' '}
                        <span className="text-[11px] font-normal text-ink-muted">
                          {match.teamB.overs}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Card Bottom: Match Status Note with Left Accent Bar */}
              <div className="pt-2 flex items-center justify-between text-[11px] sm:text-xs text-ink-muted">
                <div className="flex items-center gap-2 min-w-0">
                  {match.highlightStatus && (
                    <span className="w-1 h-3 rounded-full bg-emerald-500 shrink-0" />
                  )}
                  <span className="truncate group-hover:text-ink transition font-medium">
                    {match.statusText}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
