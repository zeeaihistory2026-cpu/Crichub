'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { SEED_ARTICLES } from '@/data/seed-data';
import { getLocalState, saveLocalState } from '@/lib/supabase';
import { Share2, Bookmark, CheckCircle2, ArrowLeft, ArrowRight, Calendar, User, Clock, Check } from 'lucide-react';

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
    <>
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Toast Alert */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 z-50 bg-navy text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {toastMsg}
          </div>
        )}

        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link href="/news" className="hover:text-brand-600">News</Link>
          <span>/</span>
          <span className="font-bold text-navy font-display truncate max-w-xs">{article.title}</span>
        </div>

        {/* Article Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Reading Column (8 Cols) */}
          <article className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                {article.category} · EDITORIAL
              </span>

              <h1 className="text-2xl sm:text-4xl font-black text-navy font-display tracking-tightest leading-[1.12]">
                {article.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                {article.summary}
              </p>

              {/* Byline & Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 pb-4 border-y border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-navy text-white font-mono font-bold text-xs flex items-center justify-center shadow-2xs">
                    CG
                  </span>
                  <div>
                    <div className="font-bold text-navy font-display">{article.author}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {article.date} · {article.minutes} min read
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition btn-tactile shadow-2xs"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copied ? 'Link Copied!' : 'Share'}</span>
                  </button>

                  <button
                    onClick={toggleSave}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border shadow-2xs btn-tactile ${
                      isSaved
                        ? 'bg-brand-50 text-brand-600 border-brand-200'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-brand-600' : ''}`} />
                    <span>{isSaved ? 'Saved in Library' : 'Save Story'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Key Highlights Card */}
            {article.highlights && article.highlights.length > 0 && (
              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100 space-y-3">
                <div className="text-xs font-mono font-bold uppercase text-brand-600 tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  <span>KEY STRATEGIC TAKEAWAYS</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                  {article.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-brand-600 font-bold mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Body Content */}
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {article.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              <h2 className="text-lg sm:text-xl font-extrabold text-navy font-display pt-4">What happens next?</h2>
              <p>
                CreaseGrid connects every editorial insight with the underlying match telemetry, player records, and qualification scenario models. Readers can follow players to receive tactical alerts or explore how this announcement affects team standing paths.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/news"
                className="text-xs font-bold text-slate-600 hover:text-navy flex items-center gap-1 btn-tactile"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> <span>Back to News Index</span>
              </Link>
              <Link
                href="/qualification"
                className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1 btn-tactile"
              >
                <span>Explore Qualification Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>

          {/* Right Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-3.5">
              <h3 className="text-sm font-extrabold text-navy font-display">Related Analysis</h3>
              <div className="space-y-3">
                {relatedArticles.map((rel) => (
                  <div key={rel.id} className="pb-3 border-b border-slate-100 last:border-b-0 last:pb-0">
                    <span className="text-[10px] font-mono font-bold uppercase text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-bold text-navy font-display hover:text-brand-600 transition mt-1.5 leading-snug">
                      <Link href={`/news/${rel.id}`}>{rel.title}</Link>
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-3">
              <h3 className="text-sm font-extrabold text-navy font-display">Useful Tools For This Story</h3>
              <div className="space-y-2">
                <Link
                  href="/tools/net-run-rate"
                  className="block p-3.5 rounded-2xl bg-slate-50/80 hover:bg-brand-50 text-xs font-bold text-navy border border-slate-100 interactive-card font-display"
                >
                  Net Run Rate (NRR) Calculator
                </Link>
                <Link
                  href="/qualification"
                  className="block p-3.5 rounded-2xl bg-slate-50/80 hover:bg-brand-50 text-xs font-bold text-navy border border-slate-100 interactive-card font-display"
                >
                  Qualification Scenario Lab
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
