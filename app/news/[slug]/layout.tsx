import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SEED_ARTICLES } from '@/data/seed-data';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = SEED_ARTICLES.find((a) => a.id === params.slug);
  if (!article) return { title: 'Cricket News · CreaseGrid' };
  return {
    title: `${article.title} · CreaseGrid`,
    description: article.summary,
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
