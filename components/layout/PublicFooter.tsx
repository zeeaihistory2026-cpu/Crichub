import React from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/ui/BrandLogo';
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-surface dark:bg-surface border-t border-line text-ink-muted pt-14 pb-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-line">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo />
            <p className="text-xs text-ink-muted max-w-sm leading-relaxed font-normal">
              Global cricket intelligence, advanced tournament calculators, and local tournament operations originating in Pakistan. Built for analysts, fans, and organizers who demand mathematical precision over generic scoreboards.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="px-3 py-1 rounded-full bg-surface-alt text-[11px] font-mono font-bold text-tealAccent border border-line flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MCC Laws Compliant</span>
              </span>
              <span className="text-xs text-ink-muted font-mono">
                🇵🇰 Lahore &amp; Karachi Origination
              </span>
            </div>
          </div>

          {/* Column 1: Intelligence */}
          <div>
            <h4 className="text-xs font-mono font-bold text-ink uppercase tracking-wider mb-3.5">
              Intelligence
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/matches" className="hover:text-ink transition">Match Centre</Link></li>
              <li><Link href="/tournaments" className="hover:text-ink transition">Tournaments &amp; Standings</Link></li>
              <li><Link href="/players" className="hover:text-ink transition">Player Directory</Link></li>
              <li><Link href="/stats" className="hover:text-ink transition">Stats &amp; Records</Link></li>
              <li><Link href="/compare" className="hover:text-ink transition">Player Comparison Lab</Link></li>
            </ul>
          </div>

          {/* Column 2: Calculators & Scenarios */}
          <div>
            <h4 className="text-xs font-mono font-bold text-ink uppercase tracking-wider mb-3.5">
              Tools &amp; Scenarios
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/qualification" className="text-tealAccent dark:text-lime font-bold transition flex items-center gap-1">
                  <span>Qualification Lab</span>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </Link>
              </li>
              <li><Link href="/tools/net-run-rate" className="hover:text-ink transition">Net Run Rate (NRR)</Link></li>
              <li><Link href="/tools/required-run-rate" className="hover:text-ink transition">Required Run Rate</Link></li>
              <li><Link href="/tools/run-rate" className="hover:text-ink transition">Run Rate Calculator</Link></li>
              <li><Link href="/tools" className="hover:text-ink transition">Browse All 12 Tools</Link></li>
            </ul>
          </div>

          {/* Column 3: Dashboards */}
          <div>
            <h4 className="text-xs font-mono font-bold text-ink uppercase tracking-wider mb-3.5">
              Platform &amp; Leagues
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/organizer" className="hover:text-ink transition">Tournament Organizer</Link></li>
              <li><Link href="/organizer/scoring" className="hover:text-ink transition">Ball-by-Ball Scorer</Link></li>
              <li><Link href="/local" className="hover:text-ink transition">Local Cricket Network</Link></li>
              <li><Link href="/me" className="hover:text-ink transition">Profile &amp; My Cricket</Link></li>
              <li><Link href="/news" className="hover:text-ink transition">Editorial &amp; Analysis</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-3 font-mono">
          <p>© 2026 CreaseGrid. All rights reserved. Precision sports architecture.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>Deterministic NRR</span>
            <span>•</span>
            <span>Tabular Numerals</span>
            <span>•</span>
            <span>Light &amp; Dark Theme</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
