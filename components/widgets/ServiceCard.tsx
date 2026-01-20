import { ServiceStatus } from '@/lib/types/services';
import { cn } from '@/lib/utils';
import { Activity, AlertCircle, CheckCircle2, PauseCircle, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';

export function ServiceCard({ service }: { service: ServiceStatus }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAIInsight = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnalyzing(true);
    try {
        const res = await fetch(`/api/ai/analyze?container=${service.name}`);
        const data = await res.json();
        alert(`AI Insight for ${service.name}:\n\n${data.response || data.error}`);
    } catch (err) {
        alert("Failed to reach AI Core.");
    } finally {
        setIsAnalyzing(false);
    }
  };

  const statusColor = {
    running: 'text-emerald-400',
    stopped: 'text-slate-500',
    error: 'text-red-400',
  }[service.status] || 'text-slate-400';

  return (
    <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200 border border-transparent hover:border-white/5 cursor-default relative overflow-hidden">
      <div className="flex items-center gap-3">
        <div className={cn(
            "w-1.5 h-1.5 rounded-full transition-colors",
            service.status === 'running' ? "bg-emerald-500/50" : "bg-slate-700"
        )}></div>
        <div>
          <div className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors capitalize">{service.name}</div>
          <div className="text-[10px] text-slate-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 group-hover:translate-y-0 duration-300">
             {service.uptime ? `Uptime: ${service.uptime}` : 'Offline'}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
            onClick={handleAIInsight}
            disabled={isAnalyzing}
            className={cn(
                "p-1.5 rounded-md bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 transition-all opacity-0 group-hover:opacity-100",
                isAnalyzing && "animate-pulse opacity-100",
                service.status === 'error' && "opacity-100 bg-red-500/10 text-red-400"
            )}
            title="Get AI Insight"
        >
            {isAnalyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
        </button>

        <div className={cn("text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-slate-900 border border-white/5", statusColor)}>
            {service.status}
        </div>
      </div>
    </div>
  );
}