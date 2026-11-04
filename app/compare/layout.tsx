import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Player Comparison Lab · CreaseGrid',
  description: 'Compare any two cricketers head to head across Tests, ODIs, T20Is and leagues - career batting, bowling and fielding side by side.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
