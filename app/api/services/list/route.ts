import { NextResponse } from 'next/server';
import { ServiceStatus } from '@/lib/types/services';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Connect to InfraGem internal API
    const res = await fetch('http://infragem:9999/api/state', {
      next: { revalidate: 10 },
      cache: 'no-store'
    });
    
    if (!res.ok) {
        throw new Error(`InfraGem API error: ${res.status}`);
    }

    const state = await res.json();
    const containers = state.containers || [];

    const services: ServiceStatus[] = containers.map((c: any) => {
      let group = 'Other';
      const name = c.name.toLowerCase();

      if (['sonarr', 'radarr', 'prowlarr', 'plex', 'jellyfin', 'overseerr'].some(k => name.includes(k))) {
        group = 'Media';
      } else if (['automation', 'activepieces', 'webhook', 'n8n'].some(k => name.includes(k))) {
        group = 'Automation';
      } else if (['dockge', 'portainer', 'gitea', 'vaultwarden', 'infragem', 'cloudflared'].some(k => name.includes(k))) {
        group = 'Core';
      } else if (['uptime-kuma', 'grafana', 'prometheus'].some(k => name.includes(k))) {
        group = 'Monitoring';
      }

      // Format uptime (e.g., "Up 2 hours") -> "2h"
      let uptime = c.status.replace('Up ', '').split(' ')[0];
      if (uptime.includes('hours')) uptime = uptime.replace('hours', 'h');
      if (uptime.includes('minutes')) uptime = uptime.replace('minutes', 'm');
      if (uptime.includes('days')) uptime = uptime.replace('days', 'd');

      // Extract ports
      const ports = c.ports ? c.ports.map((p: any) => p.host_port).filter(Boolean) : [];

      return {
        id: c.id,
        name: c.name,
        group,
        image: c.image,
        status: c.state === 'running' ? 'running' : 'stopped',
        uptime: uptime,
        ports: ports
      };
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Failed to fetch services from InfraGem:', error);
    // Fallback to empty list or error state, don't break UI
    return NextResponse.json({ services: [] });
  }
}