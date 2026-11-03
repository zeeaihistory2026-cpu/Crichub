import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { getRecentMatch, REAL_MATCHES } from '@/data/recent-matches';
import { Trophy, MapPin, CalendarDays, Layers } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const match = getRecentMatch(params.slug);
  if (!match) return { title: 'Match not found · CreaseGrid' };
  return {
    title: `${match.teamA} vs ${match.teamB} · ${match.result} · CreaseGrid`,
    description: `${match.series}: ${match.teamA} ${match.teamAScore}, ${match.teamB} ${match.teamBScore}. ${match.result} at ${match.venue}.`,
  };
}

export default function MatchDetailPage({ params }: { params: { slug: string } }) {
  const match = getRecentMatch(params.slug);
  if (!match) notFound();

  const others = REAL_MATCHES.filter((m) => m.slug !== match.slug).slice(0, 3);

  return (
    <>
      <PublicHeader />
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link href="/matches" className="hover:text-brand-600">Match Centre</Link>
          <span>/</span>
          <span className="font-bold text-navy font-display">{match.short}</span>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
              {match.format} · Final result
            </span>
            <span className="text-[11px] font-mono text-slate-400">{match.series}</span>
          </div>

          <div className="space-y-3">
            {[
              { flag: match.teamAFlag, name: match.teamA, score: match.teamAScore },
              { flag: match.teamBFlag, name: match.teamB, score: match.teamBScore },
            ].map((t) => (
              <div key={t.name} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                <span className="text-base sm:text-lg font-bold text-navy font-display flex items-center gap-2.5">
                  <span className="text-2xl">{t.flag}</span> {t.name}
                </span>
                <span className="text-base sm:text-lg font-black text-navy tabular-nums font-mono">{t.score}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl px-4 py-3">
            <Trophy className="w-4 h-4 shrink-0" />
            <span className="text-sm font-bold">{match.result}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {match.venue}
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Layers className="w-3.5 h-3.5 text-slate-400" /> {match.series}
            </div>
            {match.dateLabel && (
              <div className="flex items-center gap-2 text-slate-500">
                <CalendarDays className="w-3.5 h-3.5 text-slate-400" /> {match.dateLabel}
              </div>
            )}
          </div>

          {match.note && (
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-2xl p-4">
              {match.note}
            </p>
          )}

          <p className="text-[11px] text-slate-400 font-mono">
            Result recorded from published reports. CreaseGrid does not publish ball-by-ball
            commentary or full scorecards for international matches.
          </p>
        </div>

        {others.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-extrabold text-navy font-display">More recent results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {others.map((m) => (
                <Link
                  key={m.id}
                  href={`/matches/${m.slug}`}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card interactive-card block"
                >
                  <div className="text-xs font-bold text-navy font-display">
                    {m.teamAFlag} {m.teamACode} vs {m.teamBCode} {m.teamBFlag}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-bold mt-1">{m.result}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{m.venue}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <PublicFooter />
    </>
  );
}
