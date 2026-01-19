'use client';

import useSWR from 'swr';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Cpu } from "lucide-react";
import { Sparkline } from "@/components/ui/Sparkline";
import { useState, useEffect } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function SystemMetrics() {
  const { data, error, isLoading } = useSWR('/api/system/status', fetcher, {
    refreshInterval: 2000
  });

  // Mock History for Sparklines (In real app, we'd store this state or fetch history)
  const [history, setHistory] = useState<number[]>(new Array(20).fill(10));
  
  useEffect(() => {
    if (data?.cpu?.load) {
      setHistory(prev => [...prev.slice(1), data.cpu.load]);
    }
  }, [data]);

  const cpuLoad = isLoading ? 0 : data?.cpu?.load || 0;
  const memPercent = isLoading ? 0 : data?.memory?.percent || 0;
  
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-text-dim" /> SYSTEM RESOURCES
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* CPU */}
        <div className="space-y-2">
           <div className="flex justify-between items-end">
              <span className="text-xs font-medium text-text-dim">Processor Load</span>
              <span className="text-2xl font-semibold text-text-main tabular-nums tracking-tight">
                {isLoading ? '...' : `${cpuLoad}%`}
              </span>
           </div>
           
           <div className="h-10 w-full">
             <Sparkline data={history} />
           </div>
        </div>
        
        {/* RAM */}
        <div className="space-y-2 pt-2 border-t border-border">
           <div className="flex justify-between items-end">
              <span className="text-xs font-medium text-text-dim">Memory Usage</span>
              <span className="text-sm font-semibold text-text-main">{isLoading ? '...' : `${memPercent}%`}</span>
           </div>
           <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-primary/80 h-full transition-all duration-700 ease-out rounded-full" 
                style={{ width: `${memPercent}%` }}
              ></div>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
