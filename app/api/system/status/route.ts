import { NextResponse } from 'next/server';
import si from 'systeminformation';

export const dynamic = 'force-dynamic'; // Ensure real-time data

export async function GET() {
  try {
    const [cpu, mem, fs] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.fsSize()
    ]);

    // Calculate primary disk usage (usually mounted on /)
    const rootDisk = fs.find(d => d.mount === '/') || fs[0];

    return NextResponse.json({
      cpu: {
        load: Math.round(cpu.currentLoad),
        cores: cpu.cpus.length
      },
      memory: {
        total: mem.total,
        used: mem.active,
        free: mem.available,
        percent: Math.round((mem.active / mem.total) * 100)
      },
      disk: {
        total: rootDisk?.size || 0,
        used: rootDisk?.used || 0,
        percent: Math.round(rootDisk?.use || 0)
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('System Info Error:', error);
    return NextResponse.json({ error: 'Failed to fetch system metrics' }, { status: 500 });
  }
}
