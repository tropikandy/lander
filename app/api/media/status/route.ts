import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await fetch('http://infragem:9999/api/state', { cache: 'no-store' });
    if (!res.ok) throw new Error('InfraGem API down');
    
    const state = await res.json();
    const containers = state.containers || [];

    const sonarr = containers.find((c: any) => c.name.includes('sonarr'));
    const radarr = containers.find((c: any) => c.name.includes('radarr'));
    const plex = containers.find((c: any) => c.name.includes('plex'));

    // Map to MediaItem structure
    const nowPlaying = plex && plex.state === 'running' ? {
        id: 'plex-status',
        title: 'Plex Media Server',
        subtitle: 'Library Standby',
        state: 'playing',
        user: 'System',
        progress: 100,
        art: null
    } : null;

    const downloads = [];
    if (sonarr && sonarr.state === 'running') {
        downloads.push({ id: 'sonarr', title: 'Sonarr (TV)', progress: 100, state: 'idle' });
    }
    if (radarr && radarr.state === 'running') {
        downloads.push({ id: 'radarr', title: 'Radarr (Movies)', progress: 100, state: 'idle' });
    }

    return NextResponse.json({
      nowPlaying,
      downloads
    });
  } catch (error) {
    return NextResponse.json({ nowPlaying: null, downloads: [] });
  }
}
