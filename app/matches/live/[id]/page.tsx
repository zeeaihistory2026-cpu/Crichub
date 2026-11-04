import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { getMatchScorecard, liveFeedConfigured } from '@/lib/live';
import ScorecardView from '@/components/ScorecardView';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Live Match · CreaseGrid',
  description: 'Live cricket scorecard on CreaseGrid, powered by the connected CricAPI feed.',
};

export default async function LiveMatchPage({ params }: { params: { id: string } }) {
  const data = await getMatchScorecard(params.id);
  const feedOn = liveFeedConfigured();

  return (
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="text-xs text-ink-muted flex items-center gap-1.5">
          <Link href="/" className="hover:text-tealAccent">Home</Link>
          <span>/</span>
          <Link href="/matches" className="hover:text-tealAccent">Match Centre</Link>
          <span>/</span>
          <span className="font-bold text-ink">Live Match</span>
        </div>

        {!data ? (
          <div className="bg-surface rounded-3xl p-8 border border-line text-center space-y-2">
            <h1 className="text-xl font-extrabold text-ink font-display">Live scorecard unavailable</h1>
            <p className="text-sm text-ink-muted max-w-lg mx-auto">
              {feedOn
                ? 'This match could not be loaded from the live feed right now. It may have finished, or the feed is briefly unreachable.'
                : 'The live scores feed is not connected yet, so live scorecards are not available. The Match Centre shows verified recent results instead.'}
            </p>
            <Link href="/matches" className="inline-block text-xs font-bold text-tealAccent hover:underline pt-2">
              Back to Match Centre
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-surface rounded-3xl p-6 border border-line space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {data.match.state === 'live' && (
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-alert px-2 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Live
                  </span>
                )}
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-muted bg-surface-alt border border-line px-2 py-0.5 rounded-full">
                  {data.match.matchType}
                </span>
                <span className="text-[11px] font-mono text-ink-muted">{data.match.venue}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-ink font-display">{data.match.name}</h1>
              <div className="space-y-1.5">
                {data.match.teams.map((t) => {
                  const inn = data.match.score.filter((x) =>
                    x.inning.toLowerCase().startsWith(t.name.toLowerCase()),
                  );
                  const last = inn[inn.length - 1];
                  return (
                    <div key={t.name} className="flex items-center justify-between gap-3">
                      <span className="text-sm font-bold text-ink font-display">{t.name}</span>
                      <span className="text-sm font-black text-ink tabular-nums font-mono">
                        {last ? `${last.r}/${last.w} (${last.o} ov)` : 'Yet to bat'}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="text-sm font-bold text-tealAccent">{data.match.status}</div>
              <p className="text-[11px] text-ink-muted font-mono">
                Live data by CricAPI · this page refreshes about every minute.
              </p>
            </div>

            <ScorecardView data={data} />
          </>
        )}
      </main>
      <PublicFooter />
    </>
  );
}
