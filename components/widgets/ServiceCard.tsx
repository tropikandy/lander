'use client';

import { ServiceStatus } from '@/lib/types/services';
import { cn } from '@/lib/utils';
import { Activity, AlertCircle, Sparkles, Loader2, ExternalLink, ShieldCheck, Zap, Database, Globe } from 'lucide-react';
import { useState } from 'react';

const BRAND_COLORS: Record<string, string> = {
    'plex': 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/20',
    'gitea': 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/20',
    'vaultwarden': 'from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/20',
    'infragem': 'from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/20',
    'activepieces': 'from-pink-500/20 to-pink-600/5 text-pink-400 border-pink-500/20',
    'silverbullet': 'from-sky-500/20 to-sky-600/5 text-sky-400 border-sky-500/20',
    'stirling-pdf': 'from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/20',
    'actual-budget': 'from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/20',
    'ollama': 'from-violet-500/20 to-violet-600/5 text-violet-400 border-violet-500/20',
    'home-assistant': 'from-blue-400/20 to-blue-500/5 text-blue-300 border-blue-400/20',
};

const DEFAULT_COLOR = 'from-slate-500/10 to-slate-600/5 text-slate-400 border-white/10';

export function ServiceCard({ service }: { service: ServiceStatus }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAIInsight = async (e: React.MouseEvent) => {
    e.preventDefault();
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

  const getServiceUrl = (name: string) => {
    const mapping: Record<string, string> = {
        'silverbullet': 'wiki.suras.org',
        'stirling-pdf': 'pdf.suras.org',
        'actual-budget': 'money.suras.org',
        'home-assistant': 'home.suras.org',
        'gem-landing': 'suras.org',
        'infragem': 'infra.suras.org',
        'activepieces': 'automation.suras.org',
        'gitea': 'git.suras.org',
        'vaultwarden': 'vault.suras.org'
    };
    const domain = mapping[name.toLowerCase()] || `${name.toLowerCase()}.suras.org`;
    return `https://${domain}`;
  };

  const brandStyle = BRAND_COLORS[service.name.toLowerCase()] || DEFAULT_COLOR;
  const isRunning = service.status === 'running';

  return (
    <div className={cn(
        "group relative flex flex-col p-5 rounded-3xl border transition-all duration-500 bg-gradient-to-br hover:shadow-[0_0_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 overflow-hidden",
        brandStyle,
        !isRunning && "grayscale opacity-80"
    )}>
      {/* Background Decorative Blur */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-current opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.08] transition-opacity" />

      {/* Top Header: Icon & Status */}
      <div className="flex justify-between items-start mb-6">
        <div className="p-2.5 rounded-2xl bg-black/20 border border-white/5 shadow-inner">
            <Zap className="w-5 h-5" />
        </div>
        
        <div className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-tighter uppercase border backdrop-blur-md",
            isRunning ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"
        )}>
            {isRunning ? (
                <>
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    LIVE
                </>
            ) : (
                <>
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    OFFLINE
                </>
            )}
        </div>
      </div>

      {/* Center: Title & Image */}
      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-current transition-colors">
            {service.name.replace(/-/g, ' ')}
        </h3>
        <p className="text-[10px] font-mono opacity-50 truncate max-w-[180px]">
            {service.image.split('/').pop()}
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[10px] font-medium opacity-40">
            <Activity className="w-3 h-3" />
            {service.uptime || '---'}
        </div>

        <div className="flex items-center gap-2">
            <button 
                onClick={handleAIInsight}
                disabled={isAnalyzing}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all disabled:opacity-50"
                title="Neural Analysis"
            >
                {isAnalyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            </button>
            
            <a 
                href={getServiceUrl(service.name)}
                target="_blank"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                title="Launch Instance"
            >
                <ExternalLink className="w-3.5 h-3.5" />
            </a>
        </div>
      </div>
    </div>
  );
}