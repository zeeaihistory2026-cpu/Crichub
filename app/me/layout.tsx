import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'My Cricket · CreaseGrid',
  description: 'Your cricket home - followed players, saved comparisons and reading, stored on your device.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
