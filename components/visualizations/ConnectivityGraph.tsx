"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Server, Database, Cloud, Shield, Activity, Lock, GitBranch, X, Sparkles, Plus, Play, RefreshCw } from "lucide-react";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type NodeType = 'core' | 'cloud' | 'db' | 'service' | 'security';

interface Node {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  icon: any;
  status: 'online' | 'offline' | 'healing';
}

export const ConnectivityGraph = () => {
  const { data: mesh, mutate } = useSWR('/api/system/mesh', fetcher, { refreshInterval: 5000 });
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isHealing, setIsHealing] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const nodes: Node[] = [
    { id: 'infragem', label: 'SurasOS Core', type: 'core', x: 50, y: 50, icon: Activity, status: 'online' },
    { id: 'github', label: 'GitHub', type: 'cloud', x: 50, y: 10, icon: Cloud, status: mesh?.infragem?.github === 'connected' ? 'online' : 'offline' },
    { id: 'cloudflare', label: 'Cloudflare', type: 'cloud', x: 80, y: 10, icon: Cloud, status: mesh?.infragem?.cloudflare === 'connected' ? 'online' : 'offline' },
    { id: 'vault', label: 'Vaultwarden', type: 'security', x: 20, y: 30, icon: Lock, status: mesh?.infragem?.vault === 'connected' ? 'online' : 'offline' },
    { id: 'gitea', label: 'Gitea', type: 'service', x: 20, y: 70, icon: GitBranch, status: mesh?.infragem?.gitea === 'connected' ? 'online' : 'offline' },
    { id: 'dockge', label: 'Dockge', type: 'service', x: 80, y: 70, icon: Server, status: mesh?.infragem?.dockge === 'connected' ? 'online' : 'offline' },
    { id: 'automation', label: 'Activepieces', type: 'service', x: 50, y: 90, icon: Server, status: mesh?.infragem?.automation === 'connected' ? 'online' : 'offline' },
    { id: 'ollama', label: 'Ollama AI', type: 'service', x: 70, y: 90, icon: Sparkles, status: mesh?.infragem?.ollama === 'connected' ? 'online' : 'offline' },
    { id: 'qdrant', label: 'Vector DB', type: 'db', x: 85, y: 50, icon: Database, status: mesh?.infragem?.qdrant === 'connected' ? 'online' : 'offline' },
    { id: 'home-assistant', label: 'Home Engine', type: 'core', x: 20, y: 90, icon: Activity, status: mesh?.infragem?.['home-assistant'] === 'connected' ? 'online' : 'offline' },
    
    // Ghost Nodes (Neural Extensions)
    { id: 'silverbullet', label: 'AI Wiki', type: 'service', x: 10, y: 10, icon: GitBranch, status: 'offline' },
    { id: 'stirling', label: 'PDF Lab', type: 'service', x: 10, y: 30, icon: Shield, status: 'offline' },
    { id: 'actual', label: 'Finance', type: 'service', x: 10, y: 50, icon: Database, status: 'offline' },
  ];

  const handleHeal = async (nodeId: string) => {
    setIsHealing(nodeId);
    setAiAnalysis("AI analyzing neural pathways...");
    try {
        const res = await fetch(`/api/ai/analyze?container=${nodeId}`);
        const data = await res.json();
        setAiAnalysis(data.response || "No critical failures detected in logs.");
    } catch (e) {
        setAiAnalysis("Neural link to AI Core failed.");
    } finally {
        setIsHealing(null);
    }
  };

  // 2. Define Connections based on Mesh Data
  // Default to false/disconnected if no data
  const isConnected = (from: string, to: string) => {
      if (!mesh) return false;
      return mesh[from]?.[to] === 'connected' || mesh[to]?.[from] === 'connected';
  };

  const edges = [
    { from: 'github', to: 'infragem', active: isConnected('infragem', 'github') },
    { from: 'infragem', to: 'gitea', active: isConnected('infragem', 'gitea') },
    { from: 'infragem', to: 'dockge', active: isConnected('infragem', 'dockge') },
    { from: 'vault', to: 'infragem', active: isConnected('infragem', 'vault') },
    { from: 'cloudflare', to: 'infragem', active: isConnected('infragem', 'cloudflare') },
    { from: 'infragem', to: 'automation', active: isConnected('infragem', 'automation') },
    { from: 'infragem', to: 'ollama', active: isConnected('infragem', 'ollama') },
    { from: 'infragem', to: 'home-assistant', active: isConnected('infragem', 'home-assistant') },
    { from: 'infragem', to: 'qdrant', active: isConnected('infragem', 'qdrant') },
  ];

  return (
    <div className="w-full h-full relative bg-[#020617] overflow-hidden rounded-[40px] border border-white/5 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#020617] to-[#020617]" />
      
      {/* SVG Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {edges.map((edge, i) => {
          const start = nodes.find(n => n.id === edge.from);
          const end = nodes.find(n => n.id === edge.to);
          if (!start || !end) return null;
          return (
            <g key={`${edge.from}-${edge.to}`}>
              <line
                x1={`${start.x}%`} y1={`${start.y}%`} x2={`${end.x}%`} y2={`${end.y}%`}
                stroke={edge.active ? "#1e293b" : "#450a0a"} strokeWidth="2"
                strokeDasharray={edge.active ? "0" : "5,5"}
              />
              {edge.active && (
                <motion.circle
                  r="2" fill="#818CF8"
                  animate={{ cx: [`${start.x}%`, `${end.x}%`], cy: [`${start.y}%`, `${end.y}%`] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const Icon = node.icon;
        const isSelected = selectedNode?.id === node.id;
        const healing = isHealing === node.id;

        return (
          <motion.div
            key={node.id}
            onClick={() => { setSelectedNode(node); setAiAnalysis(null); }}
            className={cn(
              "absolute flex flex-col items-center justify-center p-4 rounded-2xl border backdrop-blur-md transition-all cursor-pointer z-20",
              node.status === 'offline' ? "text-red-400 bg-red-500/5 border-red-500/20" : "text-indigo-300 bg-white/5 border-white/10",
              isSelected && "ring-2 ring-indigo-500 border-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.3)]",
              healing && "animate-pulse border-purple-500 text-purple-400"
            )}
            style={{ left: `${node.x}%`, top: `${node.y}%`, x: "-50%", y: "-50%" }}
            whileHover={{ scale: 1.05 }}
          >
            <Icon className={cn("w-6 h-6 mb-2", healing && "animate-spin")} />
            <span className="text-[10px] font-bold tracking-widest uppercase">{node.label}</span>
            {node.status === 'online' && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#10b981]" />}
          </motion.div>
        );
      })}

      {/* Diagnostics Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="absolute right-6 top-6 bottom-6 w-80 bg-black/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 z-50 flex flex-col gap-6 shadow-2xl"
          >
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold tracking-widest uppercase text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-indigo-400" /> Diagnostics
                </h3>
                <button onClick={() => setSelectedNode(null)} className="p-1 hover:bg-white/5 rounded-full transition-colors">
                    <X className="w-4 h-4 text-gray-500" />
                </button>
            </div>

            <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Target</div>
                    <div className="text-white font-mono text-xs">{selectedNode.label}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Status</div>
                    <div className={cn("text-xs font-bold uppercase", selectedNode.status === 'online' ? "text-emerald-400" : "text-red-400")}>
                        {selectedNode.status}
                    </div>
                </div>
            </div>

            {selectedNode.status === 'offline' && (
                <button 
                    onClick={() => handleHeal(selectedNode.id)}
                    disabled={!!isHealing}
                    className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] disabled:opacity-50"
                >
                    {isHealing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    INITIATE AI REPAIR
                </button>
            )}

            {aiAnalysis && (
                <div className="flex-1 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-4 overflow-y-auto font-mono text-[10px] leading-relaxed text-indigo-200">
                    <div className="flex items-center gap-2 mb-2 text-indigo-400 border-b border-indigo-500/20 pb-2">
                        <Sparkles className="w-3 h-3" /> QWEN INSIGHT
                    </div>
                    {aiAnalysis}
                </div>
            )}

            <div className="mt-auto grid grid-cols-2 gap-3">
                <button className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 text-[10px] font-bold text-gray-400 flex items-center justify-center gap-2 transition-all">
                    <Play className="w-3 h-3" /> RESTART
                </button>
                <button className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 text-[10px] font-bold text-gray-400 flex items-center justify-center gap-2 transition-all">
                    <Terminal className="w-3 h-3" /> LOGS
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Add Button */}
      <button className="absolute bottom-8 right-8 w-12 h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all active:scale-90 group">
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Legend */}
      <div className="absolute bottom-8 left-8 bg-black/40 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/5 pointer-events-none">
        <div className="flex items-center gap-3 text-[9px] font-bold text-gray-500 tracking-widest uppercase">
            <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Healthy</div>
            <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Fractured</div>
        </div>
      </div>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
