import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Qualification Lab · CreaseGrid',
  description: 'Work out exactly what your team needs to qualify - net run rate scenarios and points permutations.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
