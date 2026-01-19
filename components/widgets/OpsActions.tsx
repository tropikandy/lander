'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Terminal, Database, RefreshCw, Shield, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ACTIONS = [
  { id: 'backup_system', name: 'Backup System', icon: Database, desc: 'Snapshot config' },
  { id: 'restart_stacks', name: 'Reload Stacks', icon: RefreshCw, desc: 'Restart containers' },
  { id: 'git_sync', name: 'Git Sync', icon: Terminal, desc: 'Pull latest' },
  { id: 'security_audit', name: 'Security Audit', icon: Shield, desc: 'Scan vulnerabilities' },
];

export function OpsActions() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleTrigger = async (id: string) => {
    setLoadingId(id);
    try {
        await fetch('/api/services/control', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: id })
        });
    } catch (e) {
        console.error("Action failed", e);
    } finally {
        // Minimum loading time for UX
        setTimeout(() => setLoadingId(null), 500);
    }
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-text-dim" /> OPERATIONS
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                  "bg-slate-800/50" // Subtle background
                )}
              >
                <div className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-md transition-colors",
                    "bg-slate-700/50 text-text-dim group-hover:text-primary group-hover:bg-primary/10"
                )}>
                   {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Icon className="w-4 h-4" />}
                </div>
                <div>
                  <div className={cn("text-sm font-medium transition-colors text-text-main")}>
                    {action.name}
                  </div>
                  <div className="text-[11px] text-text-muted">{action.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}