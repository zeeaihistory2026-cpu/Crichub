'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains('dark');
    setIsDark(hasDarkClass);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('creasegrid-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('creasegrid-theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-surface-alt border border-line" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 rounded-full flex items-center justify-center text-ink-muted hover:text-ink bg-surface dark:bg-surface-alt border border-line hover:border-accent transition shadow-2xs btn-tactile"
      aria-label={isDark ? 'Switch to Bright Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Bright Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Moon className="w-4 h-4 text-lime fill-lime/20" />
      ) : (
        <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
      )}
    </button>
  );
}

