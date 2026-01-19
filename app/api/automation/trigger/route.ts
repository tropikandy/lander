import { NextResponse } from 'next/server';
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { intentId } = body;

  console.log(`[AUDIT] User ${session.user?.name} triggered intent: ${intentId}`);

  // TODO: In production, fetch the Webhook URL from the Activepieces config or DB
  // const webhookUrl = getWebhookForIntent(intentId);
  // await fetch(webhookUrl, { method: 'POST' });

  return NextResponse.json({ success: true, message: `Intent ${intentId} activated` });
}
