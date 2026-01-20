'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Terminal, Network, RefreshCw, Shield, Loader2, ExternalLink, Activity } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const ACTIONS = [
  { id: 'nav_infra', name: 'InfraGem Console', icon: ExternalLink, desc: 'Deep management', color: 'text-indigo-400' },
  { id: 'nav_map', name: 'Connectivity Map', icon: Network, desc: 'View topology', color: 'text-sky-400' },
  { id: 'git_sync', name: 'Git Sync', icon: Terminal, desc: 'Reconcile state', color: 'text-emerald-400' },
  { id: 'security_audit', name: 'Drift Audit', icon: Shield, desc: 'Scan for changes', color: 'text-amber-400' },
];

export function OpsActions() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleTrigger = async (id: string) => {
    if (id === 'nav_infra') {
        window.open('https://infra.suras.org', '_blank');
        return;
    }
    if (id === 'nav_map') {
        router.push('/map');
        return;
    }

    setLoadingId(id);
    setStatusMsg(null);
    
    try {
        const res = await fetch('/api/services/control', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: id })
        });
        const data = await res.json();
        
        if (data.success) {
            setStatusMsg(data.message || "Action successful");
        } else {
            setStatusMsg(`Error: ${data.error || "Action failed"}`);
        }
    } catch (e) {
        setStatusMsg("System Error: Management API unreachable");
    } finally {
        setLoadingId(null);
    }
  };

  return (
    <Card className="col-span-1 md:col-span-2 flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-text-dim" /> OPERATIONS
          </div>
          {statusMsg && (
            <div className="text-[10px] font-mono text-primary animate-pulse bg-primary/5 px-2 py-0.5 rounded border border-primary/20">
                {statusMsg}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-3">
          {ACTIONS.map((action) => {
            const Icon = action.icon;
            const isLoading = loadingId === action.id;
            
            return (
              <button
                key={action.id}
                disabled={isLoading}
                onClick={() => handleTrigger(action.id)}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-lg border border-transparent transition-all duration-200 group text-left",
                  "hover:bg-card-hover hover:border-border cursor-pointer",
                  "bg-slate-800/50"
                )}
              >
                <div className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-md transition-colors bg-slate-700/50",
                    isLoading ? "text-primary" : action.color
                )}>
                   {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Icon className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-sm font-medium text-text-main group-hover:text-white transition-colors">
                    {action.name}
                  </div>
                  <div className="text-[11px] text-text-muted">{action.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-text-muted font-mono uppercase tracking-widest">
            <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-emerald-500" />
                Management Link Active
            </div>
            <span>v0.2.1-stable</span>
        </div>
      </CardContent>
    </Card>
  );
}