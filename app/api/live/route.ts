import { NextResponse } from 'next/server';
import { getLiveRibbonItems } from '@/lib/live';

// Returns normalized live/upcoming ribbon items. The provider key stays
// server-side; when no key is configured this returns an empty list and
// the ribbon keeps showing verified recent results.
export async function GET() {
  const live = await getLiveRibbonItems();
  return NextResponse.json(
    { live },
    { headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=60' } },
  );
}
