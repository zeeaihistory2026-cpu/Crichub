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
    blue: 'bg-brand-50 text-brand-600 border border-brand-200/80',
    cyan: 'bg-cyan-50 text-cyan-600 border border-cyan-200/80',
    violet: 'bg-purple-50 text-purple-600 border border-purple-200/80',
    amber: 'bg-amber-50 text-amber-600 border border-amber-200/80',
    red: 'bg-rose-50 text-rose-600 border border-rose-200/80',
    emerald: 'bg-emerald-50 text-emerald-600 border border-emerald-200/80',
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-card hover:shadow-cardHover hover:border-slate-300 transition-all duration-200 flex flex-col justify-between interactive-card group">
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
                ? 'text-rose-700 bg-rose-50 border border-rose-200'
                : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
            }`}
          >
            {isNegative ? (
              <TrendingDown className="w-3 h-3 text-rose-600" />
            ) : (
              <TrendingUp className="w-3 h-3 text-emerald-600" />
            )}
            {change}
          </span>
        )}
      </div>

      <div>
        <div className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tightest font-display tabular-nums">
          {value}
        </div>
        <div className="text-xs font-semibold text-slate-700 mt-1 tracking-tight">{title}</div>
        {context && (
          <div className="text-[11px] text-slate-400 mt-0.5 font-normal tracking-normal">{context}</div>
        )}
      </div>
    </div>
  );
}
