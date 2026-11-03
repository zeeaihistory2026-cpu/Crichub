import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { getMatchScorecard, liveFeedConfigured } from '@/lib/live';

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

            {data.innings.map((inn) => (
              <section key={inn.label} className="bg-surface rounded-3xl p-6 border border-line space-y-5">
                <h2 className="text-base font-extrabold text-ink font-display">
                  {inn.label}
                  {inn.totalText && <span className="text-tealAccent font-mono text-sm ml-2">{inn.totalText}</span>}
                </h2>

                {inn.batting.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-left text-ink-muted border-b border-line">
                          <th className="pb-2 pr-3">Batter</th>
                          <th className="pb-2 pr-3"></th>
                          <th className="pb-2 text-right">R</th>
                          <th className="pb-2 text-right">B</th>
                          <th className="pb-2 text-right">4s</th>
                          <th className="pb-2 text-right">6s</th>
                          <th className="pb-2 text-right">SR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line/60">
                        {inn.batting.map((b) => (
                          <tr key={b.name}>
                            <td className="py-2 pr-3 font-bold text-ink whitespace-nowrap">{b.name}</td>
                            <td className="py-2 pr-3 text-ink-muted">{b.dismissal}</td>
                            <td className="py-2 text-right font-mono font-bold text-ink">{b.r}</td>
                            <td className="py-2 text-right font-mono text-ink">{b.b}</td>
                            <td className="py-2 text-right font-mono text-ink">{b.fours}</td>
                            <td className="py-2 text-right font-mono text-ink">{b.sixes}</td>
                            <td className="py-2 text-right font-mono text-ink">{b.sr}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {inn.bowling.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-left text-ink-muted border-b border-line">
                          <th className="pb-2 pr-3">Bowler</th>
                          <th className="pb-2 text-right">O</th>
                          <th className="pb-2 text-right">M</th>
                          <th className="pb-2 text-right">R</th>
                          <th className="pb-2 text-right">W</th>
                          <th className="pb-2 text-right">Econ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line/60">
                        {inn.bowling.map((bw) => (
                          <tr key={bw.name}>
                            <td className="py-2 pr-3 font-bold text-ink whitespace-nowrap">{bw.name}</td>
                            <td className="py-2 text-right font-mono text-ink">{bw.o}</td>
                            <td className="py-2 text-right font-mono text-ink">{bw.m}</td>
                            <td className="py-2 text-right font-mono text-ink">{bw.r}</td>
                            <td className="py-2 text-right font-mono font-bold text-ink">{bw.w}</td>
                            <td className="py-2 text-right font-mono text-ink">{bw.eco}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </>
        )}
      </main>
      <PublicFooter />
    </>
  );
}
