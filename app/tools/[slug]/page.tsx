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
} from '@/lib/cricket-math';
import { Calculator, RotateCcw, Copy, Check, ArrowRight, Info, Trophy } from 'lucide-react';

interface PageProps {
  params: { slug: string };
}

export default function ToolDetailPage({ params }: PageProps) {
  const tool = SEED_TOOLS.find((t) => t.id === params.slug);
  if (!tool) {
    notFound();
  }

  const initialValues: Record<string, string> = {};
  tool.fields.forEach((f) => {
    initialValues[f.key] = f.default;
  });

  const [formValues, setFormValues] = useState<Record<string, string>>(initialValues);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const executeCalculation = (vals: Record<string, string>) => {
    try {
      let res;
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
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-body transition-colors duration-200">
      <PublicHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-9 pb-16 space-y-7">
        {/* Breadcrumb */}
        <div className="text-xs text-ink-muted flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-tealAccent">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-tealAccent">Tools</Link>
          <span>/</span>
          <span className="font-bold text-ink font-display">{tool.name}</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-tealAccent bg-surface-alt px-3 py-1 rounded-full border border-line">
              {tool.category} · VERIFIED CRICKET ARITHMETIC
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink font-display tracking-tight mt-2">
              {tool.name}
            </h1>
            <p className="text-xs sm:text-sm text-ink-muted mt-1 font-normal">{tool.desc}</p>
          </div>

          <Link
            href="/tools"
            className="text-xs font-bold text-ink-muted hover:text-ink flex items-center gap-1 self-start sm:self-auto btn-tactile"
          >
            <span>← All 12 Calculators</span>
          </Link>
        </div>

        {/* Calculator Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs Column (7 Cols) */}
          <div className="lg:col-span-7 bg-surface dark:bg-surface rounded-3xl p-6 sm:p-8 border border-line shadow-xs space-y-6">
            <div>
              <h2 className="text-base font-bold text-ink font-display">Enter Match Values</h2>
              <p className="text-xs text-ink-muted mt-1 font-normal">
                Results calculate automatically. Overs are formatted in standard cricket notation (e.g. 17.4 means 17 overs and 4 legal deliveries).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tool.fields.map((f) => (
                <div key={f.key} className="space-y-1.5">
                  <label htmlFor={f.key} className="text-xs font-bold text-ink font-display">
                    {f.label}
                  </label>
                  <input
                    id={f.key}
                    type="text"
                    value={formValues[f.key] || ''}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    placeholder={f.default}
                    className="w-full bg-surface-alt rounded-xl px-4 py-2.5 text-xs sm:text-sm border border-line text-ink font-bold font-mono outline-hidden focus:border-tealAccent transition"
                  />
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => executeCalculation(formValues)}
                className="bg-brand text-white hover:bg-brand-hover dark:bg-lime dark:text-canvas dark:hover:bg-lime-hover font-bold text-xs px-5 py-2.5 rounded-full transition shadow-xs flex items-center gap-1.5 btn-tactile"
              >
                <Calculator className="w-4 h-4" />
                <span>Recalculate</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="bg-surface-alt hover:border-tealAccent border border-line text-ink font-bold text-xs px-4 py-2.5 rounded-full transition flex items-center gap-1.5 btn-tactile"
              >
                <RotateCcw className="w-3.5 h-3.5 text-ink-muted" />
                <span>Reset Defaults</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                disabled={!result || Boolean(result.error)}
                className="bg-surface-alt hover:border-tealAccent border border-line text-ink font-bold text-xs px-4 py-2.5 rounded-full transition flex items-center gap-1.5 btn-tactile disabled:opacity-40"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-ink-muted" />}
                <span>{copied ? 'Copied Result!' : 'Copy Math'}</span>
              </button>
            </div>

            {/* Formula Explainer */}
            <div className="pt-5 border-t border-line space-y-2.5">
              <div className="text-xs font-bold text-ink font-display flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-tealAccent" />
                <span>Official Cricket Arithmetic Formula</span>
              </div>
              <div className="p-4 rounded-2xl bg-surface-alt border border-line font-mono text-xs text-ink font-semibold">
                {tool.formula}
              </div>
              <p className="text-[11px] text-ink-muted font-normal leading-relaxed">{tool.workedExample}</p>
            </div>
          </div>

          {/* Result Card Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-r from-[#0B513E] to-[#06392C] dark:from-[#122B34] dark:to-[#0A1A22] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-tealAccent/25 dark:border-line space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-lime bg-white/10 px-3 py-1 rounded-full border border-white/15">
                  CALCULATED OUTPUT
                </span>
                <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              </div>

              {result && (
                <div className="space-y-2 pt-2">
                  <div
                    className={`text-4xl sm:text-6xl font-black tracking-tightest tabular-nums font-mono ${
                      result.error ? 'text-rose-300 text-2xl sm:text-3xl' : 'text-white'
                    }`}
                  >
                    {result.answer}
                  </div>
                  <div className="text-xs uppercase font-mono font-bold text-lime tracking-wider">
                    {result.unit}
                  </div>
                  <div className="pt-3 text-xs text-slate-200 dark:text-slate-300 leading-relaxed border-t border-white/15 font-normal">
                    {result.detail}
                  </div>
                </div>
              )}
            </div>

            {/* Cross-Link Card */}
            <div className="bg-surface dark:bg-surface rounded-3xl p-6 border border-line shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-ink font-display">Need Tournament Impact?</h3>
              </div>
              <p className="text-xs text-ink-muted font-normal leading-relaxed">
                Use our signature Qualification Lab to see how this exact run rate or margin changes your team&apos;s table standings in real time.
              </p>
              <Link
                href="/qualification"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-tealAccent hover:underline transition"
              >
                <span>Launch Qualification Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
