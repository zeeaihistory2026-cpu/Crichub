import { redirect } from 'next/navigation';

// Canonical fan dashboard lives at /me; this route is kept as an alias.
export default function MyCricketAlias() {
  redirect('/me');
}
