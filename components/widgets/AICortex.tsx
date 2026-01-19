'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BrainCircuit, GitCommit, Workflow, CheckCircle2, Activity, Globe, ShieldCheck } from "lucide-react";

export function AICortex() {
  return (
    <Card className="col-span-1 md:row-span-2 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-text-dim" /> SYSTEM CORTEX
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-6">
        {/* Network Pulse (Cloudflared) */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-card-hover border border-border/50">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success">
                    <Globe className="w-4 h-4" />
                </div>
                <div>
                    <div className="text-xs font-medium text-text-main">Cloudflare Tunnel</div>
                    <div className="text-[10px] text-text-muted">Stockholm Edge • 24ms</div>
                </div>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_var(--color-success)] animate-pulse"></div>
        </div>

        {/* Vector Memory Stats */}
        <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-text-dim">
                <span>Qdrant Vector Index</span>
                <span className="text-primary font-mono">84,291</span>
            </div>
            <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-primary/70 w-[65%] rounded-full"></div>
            </div>
        </div>

        {/* Recent Automation Activity */}
        <div className="space-y-3 pt-2 border-t border-border">
           <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider flex items-center gap-2">
              <Workflow className="w-3 h-3" /> Automation Pulse
           </div>
           
           <div className="space-y-2">
               <div className="flex justify-between items-center p-2 rounded-md hover:bg-card-hover transition-colors group cursor-default">
                   <div className="flex items-center gap-2">
                       <CheckCircle2 className="w-3.5 h-3.5 text-success/80" />
                       <span className="text-xs text-text-secondary group-hover:text-text-main transition-colors">Daily Summary</span>
                   </div>
                   <span className="text-[10px] text-text-muted font-mono">10m ago</span>
               </div>
               <div className="flex justify-between items-center p-2 rounded-md hover:bg-card-hover transition-colors group cursor-default">
                   <div className="flex items-center gap-2">
                       <Activity className="w-3.5 h-3.5 text-primary/80 animate-pulse" />
                       <span className="text-xs text-text-secondary group-hover:text-text-main transition-colors">Repo Indexer</span>
                   </div>
                   <span className="text-[10px] text-primary font-mono">RUNNING</span>
               </div>
           </div>
        </div>

        {/* Security & Git */}
         <div className="flex items-center justify-between text-[11px] text-text-muted mt-auto pt-4 border-t border-border/40">
            <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-success" />
                <span>Vaultwarden Synced</span>
            </div>
            <div className="flex items-center gap-1.5">
                <GitCommit className="w-3 h-3" />
                <span className="font-mono opacity-70">main @ a7f3b2</span>
            </div>
         </div>
      </CardContent>
    </Card>
  );
}
