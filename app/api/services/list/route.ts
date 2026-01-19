import { NextResponse } from 'next/server';
import { ServiceStatus } from '@/lib/types/services';

const MOCK_SERVICES: ServiceStatus[] = [
  // Infrastructure
  { id: 'dockge', name: 'Dockge', group: 'Core', image: 'louislam/dockge', status: 'running', uptime: '9d', ports: ['5001'] },
  { id: 'cloudflared', name: 'Tunnel', group: 'Core', image: 'cloudflare/cloudflared', status: 'running', uptime: '9d', ports: [] },
  { id: 'vaultwarden', name: 'Vault', group: 'Core', image: 'vaultwarden/server', status: 'running', uptime: '9d', ports: ['80'] },

  // Automation / Data
  { id: 'activepieces', name: 'Activepieces', group: 'Automation', image: 'activepieces/activepieces', status: 'running', uptime: '9d', ports: ['8080'] },
  { id: 'qdrant', name: 'Qdrant Vector', group: 'Automation', image: 'qdrant/qdrant', status: 'running', uptime: '9d', ports: ['6333'] },
  
  // Media (The "Ghost" App)
  { id: 'dispatcharr', name: 'Dispatcharr', group: 'Media', image: 'dispatcharr/app', status: 'error', uptime: '0m', ports: ['9191'] },
  
  // Example of a "Random App" added later
  { id: 'minecraft', name: 'Survival Server', group: 'Gaming', image: 'itzg/minecraft-server', status: 'stopped', uptime: '0m', ports: ['25565'] },
];

export async function GET() {
  return NextResponse.json({ services: MOCK_SERVICES });
}