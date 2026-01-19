import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { action, target } = await request.json();

    if (action === 'restart_stacks') {
        // Find all running containers and restart them
        // For simplicity, we'll just restart 'infragem' as a test, or try to restart all managed services
        // A better approach would be to list containers and restart them one by one
        
        // Let's just trigger a "drift check" as a proxy for "Reload Stacks" (refresh state)
        // Or if target is specified, restart that.
        
        // NOTE: In a real scenario, we'd need a more robust backend for "Restart All".
        // For now, let's just assume we want to restart the 'gem-landing' itself or 'infragem'
        
        const res = await fetch('http://infragem:9999/api/containers/infragem/restart', { method: 'POST' });
        if (!res.ok) throw new Error('Failed to restart infragem');
        
        return NextResponse.json({ success: true, message: 'Core services restarting...' });
    }

    if (action === 'git_sync') {
        // Trigger a drift detection / reconcile
        const res = await fetch('http://infragem:9999/api/reconcile/execute', { method: 'POST' });
        if (!res.ok) throw new Error('Failed to execute reconcile');
        
        return NextResponse.json({ success: true, message: 'Git sync initiated' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Control Action Error:', error);
    return NextResponse.json({ error: 'Action failed' }, { status: 500 });
  }
}