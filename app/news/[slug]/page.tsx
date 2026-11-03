'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { SEED_ARTICLES } from '@/data/seed-data';
import { getLocalState, saveLocalState } from '@/lib/supabase';
import { Share2, Bookmark, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = SEED_ARTICLES.find((a) => a.id === params.slug) || SEED_ARTICLES[0];
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const state = getLocalState();
    setIsSaved(state.userPreferences.favoriteArticles.includes(article.id));
  }, [article.id]);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const toggleSave = () => {
    const state = getLocalState();
    const current = state.userPreferences.favoriteArticles;
    const updated = current.includes(article.id)
      ? current.filter((x) => x !== article.id)
      : [...current, article.id];
    saveLocalState({
      userPreferences: {
        ...state.userPreferences,
        favoriteArticles: updated,
      },
    });
    const nextSaved = updated.includes(article.id);
    setIsSaved(nextSaved);
    triggerToast(nextSaved ? 'Article saved to My Cricket library!' : 'Article removed from saved stories.');
  };

  const handleShare = async () => {
    if (typeof window !== 'undefined') {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        triggerToast('Article link copied to clipboard!');
        setTimeout(() => setCopied(false), 2500);
      } catch {
        triggerToast('Link copied to clipboard!');
      }
    }
  };

  const relatedArticles = SEED_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-body transition-colors duration-200">
      <PublicHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Toast Alert */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 z-50 bg-surface dark:bg-surface-alt text-ink px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-line animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {toastMsg}
          </div>
        )}

        {/* Breadcrumb */}
        <div className="text-xs text-ink-muted flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-tealAccent">Home</Link>
          <span>/</span>
          <Link href="/news" className="hover:text-tealAccent">News</Link>
          <span>/</span>
          <span className="font-bold text-ink font-display truncate max-w-xs">{article.title}</span>
        </div>

        {/* Article Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Reading Column (8 Cols) */}
          <article className="lg:col-span-8 bg-surface rounded-3xl p-6 sm:p-10 border border-line shadow-xs space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-tealAccent dark:text-lime bg-surface-alt px-2.5 py-0.5 rounded-full border border-line">
                {article.category} · EDITORIAL
              </span>

              <h1 className="text-2xl sm:text-4xl font-black text-ink font-display tracking-tightest leading-[1.12]">
                {article.title}
              </h1>

              <p className="text-sm sm:text-base text-ink-muted font-medium leading-relaxed">
                {article.summary}
              </p>

              {/* Byline & Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 pb-4 border-y border-line text-xs text-ink-muted">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand to-canvas text-white font-mono font-bold text-xs flex items-center justify-center shadow-2xs">
                    CG
                  </span>
                  <div>
                    <div className="font-bold text-ink font-display">{article.author}</div>
                    <div className="text-[10px] text-ink-muted font-mono">
                      {article.date} · {article.minutes} min read
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="px-3.5 py-1.5 rounded-xl border border-line hover:bg-surface-alt text-ink font-bold text-xs flex items-center gap-1.5 transition btn-tactile shadow-2xs"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copied ? 'Link Copied!' : 'Share'}</span>
                  </button>

                  <button
                    onClick={toggleSave}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border shadow-2xs btn-tactile ${
                      isSaved
                        ? 'bg-surface-alt text-tealAccent dark:text-lime border-tealAccent/30'
                        : 'border-line hover:bg-surface-alt text-ink'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-tealAccent dark:fill-lime' : ''}`} />
                    <span>{isSaved ? 'Saved in Library' : 'Save Story'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Key Highlights Card */}
            {article.highlights && article.highlights.length > 0 && (
              <div className="bg-surface-alt rounded-2xl p-5 border border-line space-y-3">
                <div className="text-xs font-mono font-bold uppercase text-tealAccent dark:text-lime tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>KEY STRATEGIC TAKEAWAYS</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-ink font-medium">
                  {article.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-tealAccent dark:text-lime font-bold mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Body Content */}
            <div className="space-y-4 text-sm sm:text-base text-ink/90 leading-relaxed font-normal">
              {article.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              <h2 className="text-lg sm:text-xl font-extrabold text-ink font-display pt-4">What happens next?</h2>
              <p>
                CreaseGrid connects every editorial insight with the underlying match telemetry, player records, and qualification scenario models. Readers can follow players to receive tactical alerts or explore how this announcement affects team standing paths.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-line flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/news"
                className="text-xs font-bold text-ink-muted hover:text-ink flex items-center gap-1 btn-tactile"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> <span>Back to News Index</span>
              </Link>
              <Link
                href="/qualification"
                className="text-xs font-bold text-tealAccent dark:text-lime hover:underline flex items-center gap-1 btn-tactile"
              >
                <span>Explore Qualification Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>

          {/* Right Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-surface rounded-3xl p-6 border border-line shadow-xs space-y-3.5">
              <h3 className="text-sm font-extrabold text-ink font-display">Related Analysis</h3>
              <div className="space-y-3">
                {relatedArticles.map((rel) => (
                  <div key={rel.id} className="pb-3 border-b border-line last:border-b-0 last:pb-0">
                    <span className="text-[10px] font-mono font-bold uppercase text-tealAccent dark:text-lime bg-surface-alt px-2 py-0.5 rounded border border-line">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-bold text-ink font-display hover:text-tealAccent transition mt-1.5 leading-snug">
                      <Link href={`/news/${rel.id}`}>{rel.title}</Link>
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface rounded-3xl p-6 border border-line shadow-xs space-y-3">
              <h3 className="text-sm font-extrabold text-ink font-display">Useful Tools For This Story</h3>
              <div className="space-y-2">
                <Link
                  href="/tools/net-run-rate"
                  className="block p-3.5 rounded-2xl bg-surface-alt hover:bg-surface text-xs font-bold text-ink border border-line interactive-card font-display"
                >
                  Net Run Rate (NRR) Calculator
                </Link>
                <Link
                  href="/qualification"
                  className="block p-3.5 rounded-2xl bg-surface-alt hover:bg-surface text-xs font-bold text-ink border border-line interactive-card font-display"
                >
                  Qualification Scenario Lab
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
