import { NextResponse } from 'next/server';
import { MockMediaAdapter } from '@/lib/adapters/media-mock';

// In the future, we swap this for RealMediaAdapter based on ENV
const adapter = new MockMediaAdapter();

export const dynamic = 'force-dynamic';

export async function GET() {
  const [nowPlaying, downloads] = await Promise.all([
    adapter.getNowPlaying(),
    adapter.getDownloads()
  ]);

  return NextResponse.json({
    nowPlaying,
    downloads
  });
}
