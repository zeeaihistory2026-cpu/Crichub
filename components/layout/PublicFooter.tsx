import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Heart } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-navy-deep text-slate-300 pt-16 pb-12 border-t border-navy-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-navy flex items-center justify-center text-white font-mono font-black text-base shadow-sm shadow-brand-500/20 group-hover:shadow-glow transition-all">
                C
              </span>
              <span className="font-display font-black text-2xl tracking-tightest text-white">
                Crease<span className="text-brand-400">Grid</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-normal">
              Global cricket intelligence, advanced tournament calculators, and local tournament operations originating in Pakistan. Built for analysts, fans, and organizers who demand mathematical precision over generic clone scoreboards.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="px-3 py-1 rounded-full bg-slate-800/90 text-[11px] font-mono font-bold text-emerald-400 border border-slate-700/80 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MCC Laws Compliant</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                🇵🇰 Lahore & Karachi Origination
              </span>
            </div>
          </div>

          {/* Column 1: Cricket Intelligence */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Intelligence
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link href="/matches" className="hover:text-white transition">Match Centre</Link></li>
              <li><Link href="/tournaments" className="hover:text-white transition">Tournaments & PSL</Link></li>
              <li><Link href="/players" className="hover:text-white transition">Player Directory</Link></li>
              <li><Link href="/stats" className="hover:text-white transition">Stats & Records</Link></li>
              <li><Link href="/compare" className="hover:text-white transition">Player Comparison Lab</Link></li>
            </ul>
          </div>

          {/* Column 2: Calculators & Tools */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Tools & Scenarios
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="/qualification" className="text-brand-400 hover:text-brand-300 font-bold transition flex items-center gap-1">
                  <span>Qualification Lab</span>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </Link>
              </li>
              <li><Link href="/tools/net-run-rate" className="hover:text-white transition">Net Run Rate (NRR)</Link></li>
              <li><Link href="/tools/required-run-rate" className="hover:text-white transition">Required Run Rate</Link></li>
              <li><Link href="/tools/run-rate" className="hover:text-white transition">Run Rate Calculator</Link></li>
              <li><Link href="/tools" className="hover:text-white transition">Browse All 12 Tools</Link></li>
            </ul>
          </div>

          {/* Column 3: Dashboards & Operations */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Dashboards
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link href="/admin" className="hover:text-white transition">Super Admin Console</Link></li>
              <li><Link href="/organizer" className="hover:text-white transition">Tournament Organizer</Link></li>
              <li><Link href="/organizer/scoring" className="hover:text-white transition">Ball-by-Ball Scorer</Link></li>
              <li><Link href="/me" className="hover:text-white transition">My Cricket (Fan Space)</Link></li>
              <li><Link href="/local" className="hover:text-white transition">Local Cricket Network</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-mono">
          <p>© 2026 CreaseGrid. All rights reserved. Precision sports architecture.</p>
          <div className="flex flex-wrap items-center gap-6">
            <span>Integer Legal-Ball Overs</span>
            <span>Deterministic NRR Formulas</span>
            <span>Supabase Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
