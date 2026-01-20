import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await fetch('http://infragem:9999/api/state', { cache: 'no-store' });
    if (!res.ok) throw new Error('InfraGem API down');
    
    const state = await res.json();
    const host = state.host || {};

    return NextResponse.json({
      cpu: {
        load: Math.round(host.cpu_percent || 0),
        cores: 4 // Oracle ARM A1 standard
      },
      memory: {
        percent: Math.round(host.memory_percent || 0),
        // Simplified for UI
      },
      disk: {
        percent: Math.round(host.disk_percent || 0)
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
