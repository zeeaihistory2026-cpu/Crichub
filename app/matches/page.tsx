import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { REAL_MATCHES, RESULTS_UPDATED_LABEL } from '@/data/recent-matches';
import { getCurrentMatches, liveFeedConfigured } from '@/lib/live';
import { Target, Trophy } from 'lucide-react';

export const revalidate = 120;

export const metadata: Metadata = {
  title: 'Match Centre · Latest Results · CreaseGrid',
  description:
    'Latest verified international cricket results on CreaseGrid — updated from published reports, with no demo scores.',
};

export default async function MatchesPage() {
  const liveMatches = (await getCurrentMatches()).filter((m) => m.state === 'live');
  const feedOn = liveFeedConfigured();
  return (
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <span className="font-bold text-navy">Match Centre</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Latest Results · Updated {RESULTS_UPDATED_LABEL}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mt-1">
              Match Centre
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-2xl">
              {feedOn
                ? 'Live scores from the connected feed, plus recent international results verified from published reports.'
                : 'Recent international results, verified from published reports. A live scores feed is not connected yet, so this page shows completed results only - never demo scores.'}
            </p>
          </div>

          <Link
            href="/tools/required-run-rate"
            className="bg-brand-50 text-brand-600 hover:bg-brand-100 font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 border border-brand-200 self-start sm:self-auto"
          >
            <Target className="w-3.5 h-3.5" />
            Chase Calculator
          </Link>
        </div>

        {liveMatches.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-sm font-extrabold font-display text-ink flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-alert animate-pulse"></span>
              Live Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveMatches.map((m) => (
                <Link
                  key={m.id}
                  href={`/matches/live/${m.id}`}
                  className="bg-surface rounded-3xl p-5 border border-alert/40 shadow-card interactive-card space-y-3 block"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-alert px-2 py-0.5 rounded-full">
                      Live - {m.matchType}
                    </span>
                    <span className="text-[11px] font-mono text-ink-muted">{m.venue}</span>
                  </div>
                  <div className="space-y-1.5">
                    {m.teams.map((t, i) => {
                      const inn = m.score.filter((x) => x.inning.toLowerCase().startsWith(t.name.toLowerCase()));
                      const last = inn[inn.length - 1];
                      return (
                        <div key={t.name} className="flex items-center justify-between gap-3">
                          <span className="text-sm font-bold text-ink font-display">{t.name}</span>
                          <span className="text-sm font-black text-ink tabular-nums font-mono">
                            {last ? `${last.r}/${last.w} (${last.o} ov)` : '-'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-xs font-bold text-tealAccent">{m.status}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REAL_MATCHES.map((m) => (
            <Link
              key={m.id}
              href={`/matches/${m.slug}`}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-card interactive-card space-y-3 block"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                  {m.format} · Final result
                </span>
                {m.dateLabel && (
                  <span className="text-[11px] font-mono text-slate-400">{m.dateLabel}</span>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-navy font-display flex items-center gap-2">
                    <span className="text-base">{m.teamAFlag}</span> {m.teamA}
                  </span>
                  <span className="text-sm font-black text-navy tabular-nums font-mono">{m.teamAScore}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-navy font-display flex items-center gap-2">
                    <span className="text-base">{m.teamBFlag}</span> {m.teamB}
                  </span>
                  <span className="text-sm font-black text-navy tabular-nums font-mono">{m.teamBScore}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <Trophy className="w-3.5 h-3.5" />
                {m.result}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {m.series} · {m.venue}
              </div>
            </Link>
          ))}
        </div>

        <p className="text-[11px] text-slate-400 font-mono">
          Results compiled from published reports (ESPNcricinfo, Cricbuzz, CricketWorld).
          {feedOn ? ' Live scores are provided by the connected CricAPI feed.' : ' Fixtures and live scores will appear here when a licensed feed is connected.'}
        </p>
      </main>
      <PublicFooter />
    </>
  );
}
