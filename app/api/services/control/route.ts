import { NextResponse } from 'next/server';
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { id, action } = body;

  // In production, this would trigger:
  // docker.getContainer(id).restart()
  
  console.log(`[AUDIT] User ${session.user?.name} requested ${action} on service ${id}`);

  // Mock success
  return NextResponse.json({ success: true, message: `Service ${id} ${action}ed` });
}
