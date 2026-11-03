import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { MatchSummary } from '@/types';
import TeamFlag from '@/components/ui/TeamFlag';

interface MatchTileProps {
  match: MatchSummary;
}

export default function MatchTile({ match }: MatchTileProps) {
  const isLive = match.status.includes('LIVE');
  const isInProgress = match.status.includes('PROGRESS');

  return (
    <Link
      href={`/matches/${match.slug}`}
      className="bg-surface dark:bg-surface rounded-2xl p-3.5 sm:p-4 border border-line hover:border-tealAccent/60 shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-between gap-3 shrink-0 w-72 sm:w-80 group interactive-card"
    >
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center gap-2">
          <span
            className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1.5 ${
              isLive
                ? 'bg-alert text-white font-extrabold shadow-2xs'
                : isInProgress
                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                : 'bg-surface-alt text-ink-muted border border-line'
            }`}
          >
            {isLive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
            {isLive ? 'LIVE' : match.status.split('·')[0].trim()}
          </span>
          <span className="text-[11px] font-medium text-ink-muted truncate">
            {match.detail.split('·')[0].trim()}
          </span>
        </div>

        <div className="text-xs font-bold text-ink flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-display">
            <TeamFlag code={match.teamACode} size={18} />
            <span className="tracking-tight">{match.teamACode}</span>
          </span>
          <span className="text-ink-muted font-normal text-[10px] uppercase font-mono">vs</span>
          <span className="flex items-center gap-1.5 font-display">
            <span className="tracking-tight">{match.teamBCode}</span>
            <TeamFlag code={match.teamBCode} size={18} />
          </span>
        </div>
      </div>

      <div className="text-right shrink-0">
        <div className="text-xs font-bold text-ink tabular-nums font-mono">
          {match.teamAScore}
        </div>
        <div className="text-[10px] text-ink-muted tabular-nums font-mono mt-0.5">
          {match.teamBScore || 'Yet to bat'}
        </div>
      </div>

      <div className="w-7 h-7 rounded-xl bg-surface-alt border border-line flex items-center justify-center text-ink-muted group-hover:text-tealAccent group-hover:translate-x-0.5 transition shrink-0">
        <ChevronRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}
