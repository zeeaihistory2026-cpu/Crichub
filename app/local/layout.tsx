import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Local Tournaments · CreaseGrid',
  description: 'Run your own local cricket tournament with fixtures, points tables and scorecards.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
