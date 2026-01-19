import { ServiceStatus } from '@/lib/types/services';
import { cn } from '@/lib/utils';
import { Activity, AlertCircle, CheckCircle2, PauseCircle } from 'lucide-react';

export function ServiceCard({ service }: { service: ServiceStatus }) {
  const statusColor = {
    running: 'text-success',
    stopped: 'text-text-muted',
    error: 'text-error',
  }[service.status];

  return (
    <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-card-hover transition-all duration-200 border border-transparent hover:border-border/50 cursor-default">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary/50 transition-colors"></div>
        <div>
          <div className="text-sm font-medium text-text-secondary group-hover:text-text-main transition-colors">{service.name}</div>
          <div className="text-[10px] text-text-muted font-mono opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 group-hover:translate-y-0 duration-300">
             Uptime: {service.uptime}
          </div>
        </div>
      </div>
      
      <div className={cn("text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-slate-800", statusColor)}>
        {service.status}
      </div>
    </div>
  );
}