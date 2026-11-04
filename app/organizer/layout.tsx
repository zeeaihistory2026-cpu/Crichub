import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Tournament Organizer · CreaseGrid',
  description: 'Create and manage a cricket tournament: teams, fixtures, scoring and standings.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
