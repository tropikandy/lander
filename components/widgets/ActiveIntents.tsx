'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Zap, Moon, Sun, Film, Loader2 } from "lucide-react";
import { AVAILABLE_INTENTS, AutomationIntent } from "@/lib/types/automation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Icons = {
  zap: Zap,
  moon: Moon,
  sun: Sun,
  film: Film,
};

export function ActiveIntents() {
  const { data: session } = useSession();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null); // Ideally fetched from server

  const handleTrigger = async (intent: AutomationIntent) => {
    if (!session) return; // Read-only for guests

    setLoadingId(intent.id);
    try {
      const res = await fetch('/api/automation/trigger', {
        method: 'POST',
        body: JSON.stringify({ intentId: intent.id }),
      });
      if (res.ok) {
        setActiveId(intent.id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Card className="col-span-1 md:col-span-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" /> ACTIVE INTENTS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {AVAILABLE_INTENTS.map((intent) => {
            const Icon = Icons[intent.icon];
            const isActive = activeId === intent.id;
            const isLoading = loadingId === intent.id;
            const isClickable = !!session;

            return (
              <button
                key={intent.id}
                disabled={!isClickable || isLoading}
                onClick={() => handleTrigger(intent)}
                className={cn(
                  "p-4 rounded bg-secondary/50 border border-white/5 flex items-center gap-3 text-left transition-all",
                  isClickable && "hover:bg-secondary hover:border-primary/30 active:scale-95 cursor-pointer",
                  isActive && "bg-primary/10 border-primary/50 ring-1 ring-primary/20",
                  !isClickable && "opacity-80 cursor-default"
                )}
              >
                <div className={cn("relative flex items-center justify-center w-8 h-8 rounded-full bg-black/40", intent.color)}>
                   {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Icon className="w-4 h-4" />}
                   {isActive && <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-md"></span>}
                </div>
                <div>
                  <div className="text-sm font-semibold">{intent.name}</div>
                  <div className="text-xs text-muted-foreground">{intent.description}</div>
                </div>
              </button>
            );
          })}
        </div>
        {!session && (
           <div className="mt-4 text-[10px] text-center text-muted-foreground uppercase tracking-widest opacity-50">
             Read Only Mode • Login to Trigger
           </div>
        )}
      </CardContent>
    </Card>
  );
}
