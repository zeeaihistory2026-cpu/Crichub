import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Cricket Tools & Calculators · CreaseGrid',
  description: 'Free cricket calculators: net run rate, Duckworth-Lewis, strike rate, follow-on and more.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
