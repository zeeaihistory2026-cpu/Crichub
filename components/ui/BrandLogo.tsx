import React from 'react';
import Link from 'next/link';

export default function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group shrink-0 ${className}`}>
      {/* 3 Green Pillars / Wickets Crease Icon */}
      <div className="w-8 h-8 rounded-xl bg-surface dark:bg-surface-alt border border-line flex items-center justify-center gap-0.5 shadow-2xs group-hover:border-lime transition p-1.5 shrink-0">
        <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-brand to-tealAccent group-hover:from-lime group-hover:to-tealAccent transition"></span>
        <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-lime to-brand group-hover:from-tealAccent group-hover:to-lime transition"></span>
        <span className="w-1.5 h-4.5 rounded-full bg-gradient-to-b from-brand to-tealAccent group-hover:from-lime group-hover:to-tealAccent transition"></span>
      </div>

      <div className="flex flex-col">
        <span className="font-display font-black text-xl tracking-tight text-ink flex items-center leading-none">
          Crease<span className="text-[#087D6C] dark:text-lime">Grid</span>
        </span>
        <span className="text-[10px] text-ink-muted font-semibold tracking-tight leading-none mt-1 hidden sm:block">
          Cricket Intelligence Platform
        </span>
      </div>
    </Link>
  );
}

