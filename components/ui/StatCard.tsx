import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  iconColor?: 'blue' | 'cyan' | 'violet' | 'amber' | 'red' | 'emerald';
  title: string;
  value: string | number;
  change?: string;
  context?: string;
  isNegative?: boolean;
}

export default function StatCard({
  icon: Icon,
  iconColor = 'blue',
  title,
  value,
  change,
  context,
  isNegative = false,
}: StatCardProps) {
  const colorMap = {
    blue: 'bg-tealAccent/15 text-tealAccent border border-tealAccent/30',
    cyan: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30',
    violet: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30',
    amber: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30',
    red: 'bg-alert/15 text-alert border border-alert/30',
    emerald: 'bg-lime/20 text-brand dark:text-lime border border-brand/30 dark:border-lime/40',
  };

  return (
    <div className="bg-surface dark:bg-surface rounded-2xl p-4 sm:p-5 border border-line hover:border-tealAccent/60 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between interactive-card group">
      <div className="flex items-center justify-between mb-3.5">
        <span
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs ${colorMap[iconColor]}`}
        >
          <Icon className="w-4.5 h-4.5" />
        </span>
        {change && (
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1 tabular-nums ${
              isNegative
                ? 'text-alert bg-alert/10 border border-alert/20'
                : 'text-emerald-600 dark:text-lime bg-lime/10 border border-lime/30'
            }`}
          >
            {isNegative ? (
              <TrendingDown className="w-3 h-3 text-alert" />
            ) : (
              <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-lime" />
            )}
            {change}
          </span>
        )}
      </div>

      <div>
        <div className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-display tabular-nums">
          {value}
        </div>
        <div className="text-xs font-semibold text-ink mt-1 tracking-tight">{title}</div>
        {context && (
          <div className="text-[11px] text-ink-muted mt-0.5 font-normal tracking-normal">{context}</div>
        )}
      </div>
    </div>
  );
}
