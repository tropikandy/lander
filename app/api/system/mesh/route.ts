import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await fetch('http://infragem:9999/api/health/mesh', {
      next: { revalidate: 5 },
      cache: 'no-store'
    });
    
    if (!res.ok) {
        throw new Error('Failed to fetch mesh status');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Mesh Status Error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
