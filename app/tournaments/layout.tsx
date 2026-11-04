import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Tournaments & Points Tables · CreaseGrid',
  description: 'Cricket tournament hubs with points tables, fixtures and qualification scenarios.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
