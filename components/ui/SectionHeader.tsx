import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkLabel?: string;
  subtitle?: string;
  badge?: string;
}

export default function SectionHeader({
  title,
  href,
  linkLabel = 'View all',
  subtitle,
  badge,
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-extrabold text-navy font-display tracking-tightest">
            {title}
          </h2>
          {badge && (
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200/80 px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5 font-normal">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group transition shrink-0"
        >
          <span>{linkLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
        </Link>
      )}
    </div>
  );
}
