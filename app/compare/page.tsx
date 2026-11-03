'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import {
  DbPlayer,
  BattingRow,
  BowlingRow,
  searchPlayers,
  getPlayerStatsClient,
  getPlayerBySlugClient,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  initials,
} from '@/lib/data';
import { GitCompare, Search, X } from 'lucide-react';

interface SideData {
  player: DbPlayer;
  batting: BattingRow[];
  bowling: BowlingRow[];
}

function PlayerPicker({
  label,
  side,
  onSelect,
  onClear,
}: {
  label: string;
  side: SideData | null;
  onSelect: (p: DbPlayer) => void;
  onClear: () => void;
}) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<DbPlayer[]>([]);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    timer.current = setTimeout(async () => {
      const rows = await searchPlayers(q, 8, true);
      setResults(rows);
      setOpen(true);
    }, 250);
  }, [q]);

  if (side) {
    return (
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-card flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-navy text-white flex items-center justify-center shrink-0">
          <span className="text-lg font-black font-display">{initials(side.player.full_name)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">{label}</div>
          <Link href={`/players/${side.player.id}`} className="text-base font-black text-navy font-display hover:text-brand-600 truncate block">
            {side.player.full_name}
          </Link>
          <div className="text-[11px] text-slate-500 truncate">{side.player.playing_role || 'Player'}</div>
        </div>
        <button onClick={onClear} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 btn-tactile" aria-label="Clear player">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-card relative">
      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">{label}</div>
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
          placeholder="Search any player…"
          className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-400"
        />
      </div>
      {open && results.length > 0 && (
        <div className="absolute left-5 right-5 top-full -mt-2 z-20 bg-white border border-slate-200 rounded-2xl shadow-card overflow-hidden">
          {results.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                onSelect(p);
                setOpen(false);
                setQ('');
              }}
              className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between gap-2"
            >
              <span className="text-sm font-bold text-navy truncate">{p.full_name}</span>
              <span className="text-[10px] font-mono text-slate-400 shrink-0">
                {p.has_stats ? 'STATS' : 'PROFILE'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function num(v: number | null | undefined, digits = 0): string {
  if (v === null || v === undefined) return '—';
  return digits > 0 ? v.toFixed(digits) : Math.round(v).toLocaleString();
}

export default function ComparePage() {
  const [a, setA] = useState<SideData | null>(null);
  const [b, setB] = useState<SideData | null>(null);
  const [category, setCategory] = useState<string>('test');

  const loadSide = async (p: DbPlayer, setter: (s: SideData | null) => void) => {
    const stats = await getPlayerStatsClient(p.id);
    setter({ player: p, batting: stats.batting, bowling: stats.bowling });
  };

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('a');
    if (slug) {
      getPlayerBySlugClient(slug).then((p) => {
        if (p) loadSide(p, setA);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sharedCategories = useMemo(() => {
    if (!a || !b) return CATEGORY_ORDER.slice(0, 3);
    const setA = new Set([...a.batting.map((x) => x.category), ...a.bowling.map((x) => x.category)]);
    const setB = new Set([...b.batting.map((x) => x.category), ...b.bowling.map((x) => x.category)]);
    const shared = CATEGORY_ORDER.filter((c) => setA.has(c) || setB.has(c));
    return shared.length ? shared : CATEGORY_ORDER.slice(0, 3);
  }, [a, b]);

  useEffect(() => {
    if (!sharedCategories.includes(category)) setCategory(sharedCategories[0]);
  }, [sharedCategories, category]);

  const metrics = useMemo(() => {
    if (!a || !b) return [];
    const batA = a.batting.find((x) => x.category === category);
    const batB = b.batting.find((x) => x.category === category);
    const bowlA = a.bowling.find((x) => x.category === category);
    const bowlB = b.bowling.find((x) => x.category === category);
    const rows: { metric: string; a: string; b: string }[] = [
      { metric: 'Matches', a: num(batA?.matches ?? bowlA?.matches), b: num(batB?.matches ?? bowlB?.matches) },
      { metric: 'Runs Scored', a: num(batA?.runs), b: num(batB?.runs) },
      { metric: 'Batting Average', a: num(batA?.average, 2), b: num(batB?.average, 2) },
      { metric: 'Strike Rate', a: num(batA?.strike_rate, 1), b: num(batB?.strike_rate, 1) },
      { metric: 'Centuries', a: num(batA?.hundreds), b: num(batB?.hundreds) },
      { metric: 'Fifties', a: num(batA?.fifties), b: num(batB?.fifties) },
      { metric: 'Wickets Taken', a: num(bowlA?.wkts), b: num(bowlB?.wkts) },
      { metric: 'Bowling Average', a: num(bowlA?.average, 2), b: num(bowlB?.average, 2) },
      { metric: 'Economy', a: num(bowlA?.economy, 2), b: num(bowlB?.economy, 2) },
      { metric: '5-Wicket Hauls', a: num(bowlA?.five_w), b: num(bowlB?.five_w) },
    ];
    return rows;
  }, [a, b, category]);

  return (
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link href="/stats" className="hover:text-brand-600">Stats</Link>
          <span>/</span>
          <span className="font-bold text-navy font-display">Player Comparison Lab</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight font-display">
              Player Comparison Lab
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Pick any two players from the database and compare real career numbers, format by format.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PlayerPicker label="Player A" side={a} onSelect={(p) => loadSide(p, setA)} onClear={() => setA(null)} />
          <PlayerPicker label="Player B" side={b} onSelect={(p) => loadSide(p, setB)} onClear={() => setB(null)} />
        </div>

        {a && b ? (
          <>
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
              {sharedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-black transition btn-tactile ${
                    category === cat
                      ? 'bg-navy text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {CATEGORY_LABELS[cat] || cat}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-navy font-black font-display">{a.player.display_name || a.player.full_name}</th>
                    <th className="text-center py-3 px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Metric</th>
                    <th className="text-right py-3 px-4 text-navy font-black font-display">{b.player.display_name || b.player.full_name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {metrics.map((row) => (
                    <tr key={row.metric} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-black text-navy tabular-nums font-mono">{row.a}</td>
                      <td className="py-3 px-2 text-center text-xs font-bold text-slate-500">{row.metric}</td>
                      <td className="py-3 px-4 text-right font-black text-navy tabular-nums font-mono">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Source: published career aggregates in the CreaseGrid database.
            </p>
          </>
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card text-center">
            <p className="text-sm font-bold text-navy">Choose two players to start comparing.</p>
            <p className="text-xs text-slate-500 mt-1">
              Search works across all 15,000+ profiles — try Tendulkar vs Ponting, or Wasim vs McGrath.
            </p>
          </div>
        )}
      </main>
      <PublicFooter />
    </>
  );
}
