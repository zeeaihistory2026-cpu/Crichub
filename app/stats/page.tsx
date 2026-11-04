import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import SectionHeader from '@/components/ui/SectionHeader';
import { BarChart2, Target, Trophy, ArrowRight, GitCompare } from 'lucide-react';
import { topBatting, topBowling, getCountries, countryName, LeaderRow } from '@/lib/data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Cricket Stats & Records · CreaseGrid',
  description:
    'All-time cricket records from the CreaseGrid database: most Test and ODI runs, most wickets, and career leaderboards across formats.',
};

function LeaderTable({
  title,
  rows,
  kind,
  countries,
}: {
  title: string;
  rows: LeaderRow[];
  kind: 'runs' | 'wkts';
  countries: Awaited<ReturnType<typeof getCountries>>;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#e5eaf2] shadow-xs">
      <SectionHeader title={title} href="/players" linkLabel="Browse all players" />
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
              <th className="pb-3 pl-2">#</th>
              <th className="pb-3">Player</th>
              <th className="pb-3">Country</th>
              <th className="pb-3 text-right">{kind === 'runs' ? 'Runs' : 'Wickets'}</th>
              <th className="pb-3 text-right">Matches</th>
              <th className="pb-3 text-right pr-2">Average</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, i) => (
              <tr key={row.players?.id || i} className="hover:bg-slate-50 transition">
                <td className="py-3 pl-2 font-bold text-slate-400">{i + 1}</td>
                <td className="py-3 font-bold text-navy">
                  {row.players ? (
                    <Link href={`/players/${row.players.id}`} className="hover:text-brand-600">
                      {row.players.display_name || row.players.full_name}
                    </Link>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="py-3 text-slate-600">
                  {row.players ? countryName(countries, row.players.country_id) : '—'}
                </td>
                <td className="py-3 text-right font-black text-navy tabular-nums font-mono">
                  {(kind === 'runs' ? row.runs : row.wkts)?.toLocaleString() ?? '—'}
                </td>
                <td className="py-3 text-right tabular-nums font-mono text-slate-600">
                  {row.matches?.toLocaleString() ?? '—'}
                </td>
                <td className="py-3 text-right pr-2 font-mono text-[11px] tabular-nums text-emerald-600 font-bold">
                  {row.average !== null && row.average !== undefined ? row.average.toFixed(2) : '—'}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-slate-400">
                  Records are being loaded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function StatsPage() {
  const [testRuns, testWkts, odiRuns, odiWkts, countries] = await Promise.all([
    topBatting('test', 10),
    topBowling('test', 10),
    topBatting('odi', 10),
    topBowling('odi', 10),
    getCountries(),
  ]);

  return (
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <span className="font-bold text-navy">Stats & Records</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              Cricket Stats & Records Explorer
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              All-time leaderboards from the live CreaseGrid database — published career aggregates,
              refreshed in verified batches. Coverage: Test figures to end of 2019; ODI figures to
              March 2025 for the major teams (end of 2019 for the rest); IPL complete through 2026.
            </p>
          </div>

          <Link
            href="/compare"
            className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
          >
            <GitCompare className="w-4 h-4" />
            <span>Player Comparison Lab</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: BarChart2,
              title: 'Batting Records',
              desc: 'Most runs, centuries, batting averages, and milestone strike rates.',
              href: '/players?stats=1',
            },
            {
              icon: Target,
              title: 'Bowling Records',
              desc: 'Best bowling figures, career wickets, five-wicket hauls, and economy.',
              href: '/players?stats=1',
            },
            {
              icon: Trophy,
              title: 'Player Directory',
              desc: 'Every profile in the database — internationals worldwide plus Pakistan domestic.',
              href: '/players',
            },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="bg-white rounded-2xl p-5 border border-[#e5eaf2] shadow-xs hover:border-brand-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-navy">{cat.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{cat.desc}</p>
                </div>
                <Link
                  href={cat.href}
                  className="mt-4 text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
                >
                  Explore records <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LeaderTable title="Most Test Runs · All Time" rows={testRuns} kind="runs" countries={countries} />
          <LeaderTable title="Most Test Wickets · All Time" rows={testWkts} kind="wkts" countries={countries} />
          <LeaderTable title="Most ODI Runs · All Time" rows={odiRuns} kind="runs" countries={countries} />
          <LeaderTable title="Most ODI Wickets · All Time" rows={odiWkts} kind="wkts" countries={countries} />
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
