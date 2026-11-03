'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { SEED_TOOLS } from '@/data/seed-data';
import {
  calculateRunRate,
  calculateRequiredRunRate,
  calculateNetRunRate,
  calculateBattingAverage,
  calculateBattingStrikeRate,
  calculateBowlingAverage,
  calculateBowlingEconomy,
  calculateBowlingStrikeRate,
  calculateOversToBalls,
  calculateTargetAndChase,
  calculateProjectedScore,
  calculatePartnership,
  CalcResult,
} from '@/lib/cricket-math';
import { Calculator, Copy, RotateCcw, Check, ArrowRight, Info, Trophy, CheckCircle2, AlertCircle } from 'lucide-react';

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export default function ToolDetailPage({ params }: ToolPageProps) {
  const tool = SEED_TOOLS.find((t) => t.id === params.slug) || SEED_TOOLS[0];

  // Initialize input state with default field values
  const [formValues, setFormValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    tool.fields.forEach((f) => {
      init[f.key] = f.default;
    });
    return init;
  });

  const [result, setResult] = useState<CalcResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Compute calculation
  const executeCalculation = (vals: Record<string, string>) => {
    try {
      let res: CalcResult;
      switch (tool.id) {
        case 'run-rate':
          res = calculateRunRate(vals.runs, vals.overs);
          break;
        case 'required-run-rate':
          res = calculateRequiredRunRate(vals.target, vals.runs, vals.overs, vals.limit);
          break;
        case 'net-run-rate':
          res = calculateNetRunRate(vals.scored, vals.faced, vals.conceded, vals.bowled);
          break;
        case 'batting-average':
          res = calculateBattingAverage(vals.runs, vals.innings, vals.notouts);
          break;
        case 'batting-strike-rate':
          res = calculateBattingStrikeRate(vals.runs, vals.balls);
          break;
        case 'bowling-average':
          res = calculateBowlingAverage(vals.conceded, vals.wickets);
          break;
        case 'bowling-economy':
          res = calculateBowlingEconomy(vals.conceded, vals.overs);
          break;
        case 'bowling-strike-rate':
          res = calculateBowlingStrikeRate(vals.balls, vals.wickets);
          break;
        case 'overs-converter':
          res = calculateOversToBalls(vals.overs);
          break;
        case 'target':
          res = calculateTargetAndChase(vals.opponent, vals.current);
          break;
        case 'projected-score':
          res = calculateProjectedScore(vals.runs, vals.overs, vals.limit);
          break;
        case 'partnership':
          res = calculatePartnership(vals.batterA, vals.batterB, vals.extras);
          break;
        default:
          res = calculateRunRate(vals.runs || 100, vals.overs || '20.0');
      }
      setResult(res);
    } catch (e: any) {
      setResult({
        answer: '—',
        unit: 'Check entries',
        detail: e.message || 'Calculation error',
        error: e.message,
      });
    }
  };

  useEffect(() => {
    executeCalculation(formValues);
  }, [tool.id]);

  const handleChange = (key: string, val: string) => {
    const updated = { ...formValues, [key]: val };
    setFormValues(updated);
    executeCalculation(updated);
  };

  const handleReset = () => {
    const resetVals: Record<string, string> = {};
    tool.fields.forEach((f) => {
      resetVals[f.key] = f.default;
    });
    setFormValues(resetVals);
    executeCalculation(resetVals);
  };

  const handleCopy = async () => {
    if (!result || result.error) return;
    const text = `${tool.name}: ${result.answer} ${result.unit}. ${result.detail}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-brand-600">Tools</Link>
          <span>/</span>
          <span className="font-bold text-navy font-display">{tool.name}</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
              {tool.category} · VERIFIED CRICKET ARITHMETIC
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-navy font-display tracking-tightest mt-1.5">
              {tool.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-normal">{tool.desc}</p>
          </div>

          <Link
            href="/tools"
            className="text-xs font-bold text-slate-600 hover:text-navy flex items-center gap-1 self-start sm:self-auto btn-tactile"
          >
            <span>← All 12 Calculators</span>
          </Link>
        </div>

        {/* Calculator Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs Column (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-6">
            <div>
              <h2 className="text-base font-extrabold text-navy font-display">Enter Match Values</h2>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                Results calculate automatically. Overs are formatted in standard cricket notation (e.g. 17.4 means 17 overs and 4 legal deliveries).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tool.fields.map((f) => (
                <div key={f.key} className="space-y-1">
                  <label htmlFor={f.key} className="text-xs font-bold text-slate-700 font-display">
                    {f.label}
                  </label>
                  <input
                    id={f.key}
                    type="text"
                    value={formValues[f.key] || ''}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    placeholder={f.default}
                    className="w-full bg-slate-50 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 text-navy font-bold font-mono outline-hidden focus:border-brand-500 focus:bg-white transition"
                  />
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => executeCalculation(formValues)}
                className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 btn-tactile"
              >
                <Calculator className="w-4 h-4" />
                <span>Recalculate</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 btn-tactile"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                disabled={!result || Boolean(result.error)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 btn-tactile disabled:opacity-40"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Result!' : 'Copy Math'}</span>
              </button>
            </div>

            {/* Formula Explainer */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="text-xs font-bold text-navy font-display flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-brand-600" />
                <span>Official Cricket Arithmetic Formula</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 font-mono text-xs text-navy font-semibold">
                {tool.formula}
              </div>
              <p className="text-[11px] text-slate-500 font-normal leading-relaxed">{tool.workedExample}</p>
            </div>
          </div>

          {/* Result Card Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-navy via-navy-deep to-brand-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-navy-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-brand-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                  CALCULATED OUTPUT
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 green-pulse-glow"></span>
              </div>

              {result && (
                <div className="space-y-2 pt-2">
                  <div
                    className={`text-4xl sm:text-6xl font-black tracking-tightest tabular-nums font-mono ${
                      result.error ? 'text-rose-400 text-2xl sm:text-3xl' : 'text-white'
                    }`}
                  >
                    {result.answer}
                  </div>
                  <div className="text-xs uppercase font-mono font-bold text-brand-300 tracking-wider">
                    {result.unit}
                  </div>
                  <div className="pt-3 text-xs text-slate-300 leading-relaxed border-t border-white/10 font-normal">
                    {result.detail}
                  </div>
                </div>
              )}
            </div>

            {/* Cross-Link Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-extrabold text-navy font-display">Need Tournament Impact?</h3>
              </div>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                Use our signature Qualification Lab to see how this exact run rate or margin changes your team's table standings.
              </p>
              <Link
                href="/qualification"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 transition"
              >
                <span>Launch Qualification Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
