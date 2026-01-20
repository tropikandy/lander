import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { intentId } = body;

    let targetUrl = 'http://infragem:9999/api/drift';
    
    if (intentId === 'system_check') {
        targetUrl = 'http://infragem:9999/api/drift';
    } else if (intentId === 'media_sync') {
        targetUrl = 'http://infragem:9999/api/reconcile/execute';
    } else if (intentId === 'energy_save') {
        // Example: Scale down non-essential containers
        return NextResponse.json({ success: true, message: 'Energy mode enabled (Simulation)' });
    }

    const res = await fetch(targetUrl, { method: 'POST' });
    const data = await res.json();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'System Error' }, { status: 500 });
  }
}
