import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import PlayerProfile from '@/components/PlayerProfile';
import { getPlayerBySlug, getPlayerStats, getCountries, countryName } from '@/lib/data';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const player = await getPlayerBySlug(params.slug);
  if (!player) return { title: 'Player not found · CreaseGrid' };
  const countries = await getCountries();
  const country = countryName(countries, player.country_id);
  return {
    title: `${player.full_name} · ${country} Career Stats · CreaseGrid`,
    description: `Career batting, bowling and fielding statistics for ${player.full_name} (${country}) across Tests, ODIs, T20Is, First-Class, List A and T20 cricket.`,
  };
}

export default async function PlayerSlugPage({ params }: { params: { slug: string } }) {
  const player = await getPlayerBySlug(params.slug);
  if (!player) notFound();
  const [stats, countries] = await Promise.all([getPlayerStats(player.id), getCountries()]);

  return (
    <>
      <PublicHeader />
      <PlayerProfile
        player={player}
        country={countryName(countries, player.country_id)}
        batting={stats.batting}
        bowling={stats.bowling}
        fielding={stats.fielding}
      />
      <PublicFooter />
    </>
  );
}
