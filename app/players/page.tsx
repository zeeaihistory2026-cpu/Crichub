import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { listPlayers, getCountries, countryName, initials, DbPlayer } from '@/lib/data';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Players Directory · CreaseGrid',
  description:
    'Browse the CreaseGrid player database: career profiles and statistics for international and Pakistan domestic cricketers from 1970 to today.',
};

const PAGE_SIZE = 60;

function PlayerCard({ player, country }: { player: DbPlayer; country: string }) {
  return (
    <Link
      href={`/players/${player.id}`}
      className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card interactive-card flex items-center gap-3"
    >
      <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center shrink-0">
        <span className="text-sm font-black font-display">{initials(player.full_name)}</span>
      </div>
      <div className="min-w-0">
        <div className="text-sm font-bold text-navy font-display truncate">{player.full_name}</div>
        <div className="text-[11px] text-slate-500 truncate">
          {country}
          {player.playing_role ? ` · ${player.playing_role}` : ''}
        </div>
        <div className="text-[10px] font-mono text-slate-400">
          {player.has_stats ? 'Career stats available' : 'Profile'}
          {player.dob ? ` · b. ${new Date(player.dob).getFullYear()}` : ''}
        </div>
      </div>
    </Link>
  );
}

export default async function PlayersDirectoryPage({
  searchParams,
}: {
  searchParams: { q?: string; country?: string; page?: string; stats?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10) || 1);
  const statsOnly = searchParams.stats === '1';
  const [result, countries] = await Promise.all([
    listPlayers({
      q: searchParams.q,
      country: searchParams.country,
      statsOnly,
      page,
      pageSize: PAGE_SIZE,
    }),
    getCountries(),
  ]);
  const totalPages = Math.max(1, Math.ceil(result.total / PAGE_SIZE));

  const pageLink = (p: number) => {
    const sp = new URLSearchParams();
    if (searchParams.q) sp.set('q', searchParams.q);
    if (searchParams.country) sp.set('country', searchParams.country);
    if (statsOnly) sp.set('stats', '1');
    sp.set('page', String(p));
    return `/players?${sp.toString()}`;
  };

  return (
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <span className="font-bold text-navy font-display">Players</span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight font-display">
            Player Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {result.total.toLocaleString()} players in the database · internationals worldwide plus
            Pakistan domestic, 1970 to today.
          </p>
        </div>

        <form method="GET" className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="q"
              defaultValue={searchParams.q || ''}
              placeholder="Search by player name…"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-400"
            />
          </div>
          <select
            name="country"
            defaultValue={searchParams.country || ''}
            className="py-2.5 px-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-brand-400"
          >
            <option value="">All countries</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-600 px-1">
            <input type="checkbox" name="stats" value="1" defaultChecked={statsOnly} className="w-4 h-4" />
            With career stats
          </label>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition btn-tactile"
          >
            Search
          </button>
        </form>

        {result.players.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card text-center">
            <p className="text-sm font-bold text-navy">No players match that search.</p>
            <p className="text-xs text-slate-500 mt-1">Try a different spelling or clear the filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {result.players.map((p) => (
              <PlayerCard key={p.id} player={p} country={countryName(countries, p.country_id)} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pt-2">
            {page > 1 ? (
              <Link href={pageLink(page - 1)} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 btn-tactile">
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </Link>
            ) : null}
            <span className="text-xs font-mono text-slate-500">
              Page {page} of {totalPages.toLocaleString()}
            </span>
            {page < totalPages ? (
              <Link href={pageLink(page + 1)} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 btn-tactile">
                Next <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            ) : null}
          </div>
        )}
      </main>
      <PublicFooter />
    </>
  );
}
