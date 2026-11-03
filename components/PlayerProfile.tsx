'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DbPlayer,
  BattingRow,
  BowlingRow,
  FieldingRow,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  initials,
} from '@/lib/data';
import { getLocalState, saveLocalState } from '@/lib/supabase';
import { Heart, CheckCircle2, BarChart2 } from 'lucide-react';

interface Props {
  player: DbPlayer;
  country: string;
  batting: BattingRow[];
  bowling: BowlingRow[];
  fielding: FieldingRow[];
}

function fmt(n: number | null | undefined, digits = 0): string {
  if (n === null || n === undefined) return '—';
  return digits > 0 ? n.toFixed(digits) : Math.round(n).toLocaleString();
}

export default function PlayerProfile({ player, country, batting, bowling, fielding }: Props) {
  const categories = useMemo(() => {
    const present = new Set<string>();
    batting.forEach((b) => present.add(b.category));
    bowling.forEach((b) => present.add(b.category));
    return CATEGORY_ORDER.filter((c) => present.has(c));
  }, [batting, bowling]);

  const [selected, setSelected] = useState<string>(categories[0] || 'test');
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const state = getLocalState();
    setIsFollowing(state.userPreferences.followingPlayers.includes(player.id));
  }, [player.id]);

  const toggleFollow = () => {
    const state = getLocalState();
    const current = state.userPreferences.followingPlayers;
    const updated = current.includes(player.id)
      ? current.filter((x) => x !== player.id)
      : [...current, player.id];
    saveLocalState({
      userPreferences: { ...state.userPreferences, followingPlayers: updated },
    });
    setIsFollowing(updated.includes(player.id));
  };

  const bat = batting.find((b) => b.category === selected) || null;
  const bowl = bowling.find((b) => b.category === selected) || null;
  const field = fielding.find((f) => f.category === selected) || null;

  const dobYear = player.dob ? new Date(player.dob).getFullYear() : null;
  const activeLabel =
    player.active_from && player.active_to
      ? `${player.active_from}–${player.active_to}`
      : player.active_from
        ? `from ${player.active_from}`
        : null;

  const headline = bat
    ? [
        { label: 'Matches', val: fmt(bat.matches) },
        { label: 'Total Runs', val: fmt(bat.runs) },
        { label: 'Batting Average', val: fmt(bat.average, 2) },
        { label: 'Strike Rate', val: fmt(bat.strike_rate, 1) },
        { label: 'Centuries / 50s', val: `${fmt(bat.hundreds)} / ${fmt(bat.fifties)}` },
      ]
    : bowl
      ? [
          { label: 'Matches', val: fmt(bowl.matches) },
          { label: 'Wickets', val: fmt(bowl.wkts) },
          { label: 'Bowling Average', val: fmt(bowl.average, 2) },
          { label: 'Economy', val: fmt(bowl.economy, 2) },
          { label: '5-Wicket Hauls', val: fmt(bowl.five_w) },
        ]
      : [];

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumb */}
      <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <Link href="/players" className="hover:text-brand-600">Players</Link>
        <span>/</span>
        <span className="font-bold text-navy font-display">{player.full_name}</span>
      </div>

      {/* Identity Masthead Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card flex flex-col md:flex-row items-center gap-6">
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl shrink-0 bg-navy text-white flex items-center justify-center border border-slate-200 shadow-xs">
          <span className="text-4xl sm:text-5xl font-black font-display tracking-tightest">
            {initials(player.full_name)}
          </span>
        </div>

        <div className="space-y-2 flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
              Career Profile
            </span>
            {activeLabel && (
              <span className="text-xs text-slate-400 font-mono">Active {activeLabel}</span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-navy font-display tracking-tightest flex items-center justify-center md:justify-start gap-2">
            <span>{player.full_name}</span>
            <CheckCircle2 className="w-6 h-6 text-brand-600 shrink-0" />
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {country}
            {player.playing_role ? ` · ${player.playing_role}` : ''}
            {player.batting_style ? ` · ${player.batting_style}` : ''}
            {player.bowling_style ? ` · ${player.bowling_style}` : ''}
          </p>
          {(player.dob || player.birthplace) && (
            <p className="text-xs text-slate-400 font-medium">
              {player.dob
                ? `Born ${new Date(player.dob).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}${dobYear ? '' : ''}`
                : ''}
              {player.birthplace ? ` · ${player.birthplace}` : ''}
            </p>
          )}

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              onClick={toggleFollow}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs btn-tactile ${
                isFollowing
                  ? 'bg-rose-50 text-rose-600 border border-rose-200'
                  : 'bg-brand-600 text-white hover:bg-brand-700'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFollowing ? 'fill-rose-600' : ''}`} />
              <span>{isFollowing ? 'Following Player' : 'Follow Player'}</span>
            </button>

            <Link
              href={`/compare?a=${player.id}`}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 btn-tactile"
            >
              <BarChart2 className="w-3.5 h-3.5 text-brand-600" />
              <span>Compare in Lab</span>
            </Link>
          </div>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card text-center space-y-2">
          <h3 className="text-sm font-extrabold text-navy font-display">Career statistics being compiled</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            This player is in the CreaseGrid database; published career aggregates for them have not
            been loaded yet. Statistics are added in verified batches — never estimated or invented.
          </p>
        </div>
      ) : (
        <>
          {/* Format Selector Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelected(cat)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-black transition btn-tactile ${
                    selected === cat
                      ? 'bg-navy text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {CATEGORY_LABELS[cat] || cat}
                </button>
              ))}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Career metrics · <b>{CATEGORY_LABELS[selected] || selected}</b>
            </div>
          </div>

          {/* Headline Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {headline.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 text-center shadow-card interactive-card"
              >
                <div className="text-2xl sm:text-3xl font-black text-navy font-display tabular-nums tracking-tightest">
                  {item.val}
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Batting Table */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-3">
              <h3 className="text-sm font-extrabold text-navy font-display">
                Batting · {CATEGORY_LABELS[selected] || selected}
              </h3>
              {bat ? (
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                  {[
                    ['Matches', fmt(bat.matches)],
                    ['Innings', fmt(bat.innings)],
                    ['Not Outs', fmt(bat.not_outs)],
                    ['Runs', fmt(bat.runs)],
                    [
                      'Highest Score',
                      bat.high_score !== null
                        ? `${bat.high_score}${bat.high_score_not_out ? '*' : ''}`
                        : '—',
                    ],
                    ['Average', fmt(bat.average, 2)],
                    ['Balls Faced', fmt(bat.balls_faced)],
                    ['Strike Rate', fmt(bat.strike_rate, 2)],
                    ['Hundreds', fmt(bat.hundreds)],
                    ['Fifties', fmt(bat.fifties)],
                    ['Fours', fmt(bat.fours)],
                    ['Sixes', fmt(bat.sixes)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between border-b border-slate-100 py-1.5">
                      <span className="text-slate-500 font-medium">{k}</span>
                      <span className="font-black text-navy tabular-nums font-mono">{v}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No batting record in this category.</p>
              )}
              {field && (
                <p className="text-[11px] text-slate-400 font-mono pt-1">
                  Fielding: {fmt(field.catches)} catches · {fmt(field.stumpings)} stumpings
                </p>
              )}
            </div>

            {/* Bowling Table */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-3">
              <h3 className="text-sm font-extrabold text-navy font-display">
                Bowling · {CATEGORY_LABELS[selected] || selected}
              </h3>
              {bowl ? (
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                  {[
                    ['Matches', fmt(bowl.matches)],
                    ['Innings', fmt(bowl.innings)],
                    ['Balls', fmt(bowl.balls)],
                    ['Runs Conceded', fmt(bowl.runs)],
                    ['Wickets', fmt(bowl.wkts)],
                    ['Best (Innings)', bowl.best_innings || '—'],
                    ['Best (Match)', bowl.best_match || '—'],
                    ['Average', fmt(bowl.average, 2)],
                    ['Economy', fmt(bowl.economy, 2)],
                    ['Strike Rate', fmt(bowl.strike_rate, 1)],
                    ['4-Wicket Hauls', fmt(bowl.four_w)],
                    ['5-Wicket Hauls', fmt(bowl.five_w)],
                    ['10-Wicket Matches', fmt(bowl.ten_w)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between border-b border-slate-100 py-1.5">
                      <span className="text-slate-500 font-medium">{k}</span>
                      <span className="font-black text-navy tabular-nums font-mono">{v}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No bowling record in this category.</p>
              )}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 font-mono">
            Source: published career aggregates. Figures refresh in verified batches after series
            and tournaments.
          </p>
        </>
      )}
    </main>
  );
}
