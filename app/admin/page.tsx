import React from 'react';
import type { Metadata } from 'next';
import AdminPanel from '@/components/AdminPanel';
import { getDbCounts } from '@/lib/data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin · CreaseGrid',
  description: 'CreaseGrid command center — real database counts and content operations.',
};

export default async function AdminPage() {
  const counts = await getDbCounts();
  return <AdminPanel counts={counts} />;
}
