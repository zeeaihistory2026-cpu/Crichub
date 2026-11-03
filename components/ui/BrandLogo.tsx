import React from 'react';
import Link from 'next/link';

export default function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 group shrink-0 ${className}`} aria-label="CreaseGrid Home">
      {/* 3 Pillars / Wickets Vector Emblem matching Image 2 */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-alt border border-line flex items-center justify-center p-2 shadow-2xs group-hover:border-tealAccent/60 transition shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-5.5 sm:h-5.5" aria-hidden="true">
          {/* Stumps / Three Pillars */}
          <rect x="4" y="3" width="3" height="18" rx="1.5" className="fill-brand dark:fill-lime transition-colors" />
          <rect x="10.5" y="1.5" width="3" height="21" rx="1.5" className="fill-tealAccent dark:fill-tealAccent transition-colors" />
          <rect x="17" y="3" width="3" height="18" rx="1.5" className="fill-brand dark:fill-lime transition-colors" />
          {/* Bails Header Bar */}
          <rect x="2" y="1" width="20" height="2" rx="1" className="fill-lime dark:fill-lime/90 opacity-80" />
        </svg>
      </div>

      <div className="flex flex-col justify-center">
        <span className="font-display font-extrabold text-lg sm:text-xl tracking-tightest text-ink leading-none">
          Crease<span className="text-tealAccent dark:text-lime">Grid</span>
        </span>
        <span className="text-[10px] text-ink-muted font-medium tracking-tight leading-none mt-1 hidden sm:block">
          Cricket Intelligence Platform
        </span>
      </div>
    </Link>
  );
}
