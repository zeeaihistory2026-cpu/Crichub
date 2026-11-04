import React from 'react';
import type { MatchScorecard } from '@/lib/live';

// Full innings scorecard (batting + bowling) rendered from the live feed,
// shared by the live match page and the curated result pages.
export default function ScorecardView({ data }: { data: MatchScorecard }) {
  if (data.innings.length === 0) return null;
  return (
    <div className="space-y-6">
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
    </div>
  );
}
