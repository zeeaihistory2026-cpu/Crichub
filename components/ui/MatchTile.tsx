import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { MatchSummary } from '@/types';

interface MatchTileProps {
  match: MatchSummary;
}

export default function MatchTile({ match }: MatchTileProps) {
  const isLive = match.status.includes('LIVE');
  const isInProgress = match.status.includes('PROGRESS');

  return (
    <Link
      href={`/matches/${match.slug}`}
      className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-card hover:shadow-cardHover hover:border-brand-300 transition-all duration-200 flex items-center justify-between gap-3 shrink-0 w-72 sm:w-80 group interactive-card"
    >
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center gap-2">
          <span
            className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1.5 ${
              isLive
                ? 'bg-rose-50 text-rose-600 border border-rose-200 font-extrabold'
                : isInProgress
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {isLive && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 live-pulse-glow"></span>}
            {isLive ? 'LIVE' : match.status.split('·')[0].trim()}
          </span>
          <span className="text-[11px] font-medium text-slate-400 truncate">
            {match.detail.split('·')[0].trim()}
          </span>
        </div>

        <div className="text-xs font-bold text-navy flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-display">
            <span className="text-sm">{match.teamAFlag}</span>
            <span className="tracking-tight">{match.teamACode}</span>
          </span>
          <span className="text-slate-300 font-normal text-[10px] uppercase font-mono">vs</span>
          <span className="flex items-center gap-1.5 font-display">
            <span className="tracking-tight">{match.teamBCode}</span>
            <span className="text-sm">{match.teamBFlag}</span>
          </span>
        </div>
      </div>

      <div className="text-right shrink-0">
        <div className="text-xs font-bold text-navy tabular-nums font-mono">
          {match.teamAScore}
        </div>
        <div className="text-[10px] text-slate-400 tabular-nums font-mono mt-0.5">
          {match.teamBScore || 'Yet to bat'}
        </div>
      </div>

      <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 group-hover:translate-x-0.5 transition shrink-0">
        <ChevronRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}
