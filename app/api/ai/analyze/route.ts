import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: { container: string } }) {
  const { searchParams } = new URL(req.url);
  const container = searchParams.get('container');

  try {
    const res = await fetch(`http://infragem:9999/api/ai/analyze-logs/${container}`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) throw new Error('InfraGem API failure');
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to analyze' }, { status: 500 });
  }
}
