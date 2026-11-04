import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Cricket News · CreaseGrid',
  description: 'Cricket news, match reports and analysis from the CreaseGrid editorial desk.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
