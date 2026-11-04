import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Search · CreaseGrid',
  description: 'Search 15,000+ player profiles, teams and articles on CreaseGrid.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
