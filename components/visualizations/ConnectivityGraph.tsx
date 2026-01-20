"use client";

import { motion } from "framer-motion";
import { Server, Database, Cloud, Shield, Activity, Lock, GitBranch } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Type definitions for our graph
type NodeType = 'core' | 'cloud' | 'db' | 'service' | 'security';

interface Node {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  icon: any;
  status: 'online' | 'offline' | 'warning';
}

interface Edge {
  from: string;
  to: string;
  active: boolean;
  status?: 'connected' | 'disconnected';
}

export const ConnectivityGraph = () => {
  const { data: mesh } = useSWR('/api/system/mesh', fetcher, { refreshInterval: 5000 });
  
  // 1. Define Nodes (Topological Layout)
  const nodes: Node[] = [
    { id: 'infragem', label: 'InfraGem Core', type: 'core', x: 50, y: 50, icon: Activity, status: 'online' },
    
    // Cloud / External
    { id: 'github', label: 'GitHub', type: 'cloud', x: 50, y: 10, icon: Cloud, status: mesh?.infragem?.github === 'connected' ? 'online' : 'offline' },
    { id: 'cloudflare', label: 'Cloudflare', type: 'cloud', x: 80, y: 10, icon: Cloud, status: mesh?.infragem?.cloudflare === 'connected' ? 'online' : 'offline' },
    
    // Security / Auth
    { id: 'vault', label: 'Vaultwarden', type: 'security', x: 20, y: 30, icon: Lock, status: mesh?.infragem?.vault === 'connected' ? 'online' : 'offline' },
    
    // DevOps
    { id: 'gitea', label: 'Gitea', type: 'service', x: 20, y: 70, icon: GitBranch, status: mesh?.infragem?.gitea === 'connected' ? 'online' : 'offline' },
    { id: 'dockge', label: 'Dockge', type: 'service', x: 80, y: 70, icon: Server, status: mesh?.infragem?.dockge === 'connected' ? 'online' : 'offline' },
    
    // Automation
    { id: 'automation', label: 'Automation', type: 'service', x: 50, y: 90, icon: Server, status: mesh?.infragem?.automation === 'connected' ? 'online' : 'offline' },
    { id: 'ollama', label: 'Ollama', type: 'service', x: 70, y: 90, icon: Activity, status: mesh?.infragem?.ollama === 'connected' ? 'online' : 'offline' },
    
    // Local Home
    { id: 'home-assistant', label: 'Home Engine', type: 'core', x: 20, y: 90, icon: Activity, status: mesh?.infragem?.['home-assistant'] === 'connected' ? 'online' : 'offline' },
  ];

  // 2. Define Connections based on Mesh Data
  // Default to false/disconnected if no data
  const isConnected = (from: string, to: string) => {
      if (!mesh) return false;
      return mesh[from]?.[to] === 'connected' || mesh[to]?.[from] === 'connected';
  };

  const edges: Edge[] = [
    { from: 'github', to: 'infragem', active: isConnected('infragem', 'github') },
    { from: 'infragem', to: 'gitea', active: isConnected('infragem', 'gitea') },
    { from: 'infragem', to: 'dockge', active: isConnected('infragem', 'dockge') },
    { from: 'vault', to: 'infragem', active: isConnected('infragem', 'vault') },
    { from: 'cloudflare', to: 'infragem', active: isConnected('infragem', 'cloudflare') },
    { from: 'infragem', to: 'automation', active: isConnected('infragem', 'automation') },
    { from: 'infragem', to: 'ollama', active: isConnected('infragem', 'ollama') },
    { from: 'infragem', to: 'home-assistant', active: isConnected('infragem', 'home-assistant') },
  ];

  return (
    <div className="w-full h-full relative bg-[#020617] overflow-hidden rounded-3xl border border-white/5 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#020617] to-[#020617]" />
      
      {/* SVG Layer for Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0" />
            <stop offset="50%" stopColor="#818CF8" stopOpacity="1" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {edges.map((edge, i) => {
          const start = nodes.find(n => n.id === edge.from);
          const end = nodes.find(n => n.id === edge.to);
          if (!start || !end) return null;

          return (
            <g key={`${edge.from}-${edge.to}`}>
              {/* Base Line - Red if inactive, Slate if active but waiting, Greenish if flowing */}
              <line
                x1={`${start.x}%`}
                y1={`${start.y}%`}
                x2={`${end.x}%`}
                y2={`${end.y}%`}
                stroke={edge.active ? "#1e293b" : "#450a0a"} 
                strokeWidth="2"
                strokeDasharray={edge.active ? "0" : "5,5"}
              />
              
              {/* Active Data Packet Animation */}
              {edge.active && (
                <motion.circle
                  r="3"
                  fill="#818CF8"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ 
                    cx: [`${start.x}%`, `${end.x}%`],
                    cy: [`${start.y}%`, `${end.y}%`]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes Layer */}
      {nodes.map((node) => {
        const Icon = node.icon;
        
        // Dynamic color based on status
        let colorClass = 'text-slate-400 bg-slate-500/10 border-slate-500/50';
        if (node.status === 'offline') {
            colorClass = 'text-red-400 bg-red-500/10 border-red-500/50';
        } else if (node.type === 'core') {
            colorClass = 'text-indigo-400 bg-indigo-500/10 border-indigo-500/50';
        } else if (node.type === 'cloud') {
            colorClass = 'text-sky-400 bg-sky-500/10 border-sky-500/50';
        } else if (node.type === 'security') {
            colorClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/50';
        }

        return (
          <motion.div
            key={node.id}
            className={`absolute flex flex-col items-center justify-center p-4 rounded-xl border backdrop-blur-sm shadow-xl cursor-pointer ${colorClass}`}
            style={{ 
              left: `${node.x}%`, 
              top: `${node.y}%`,
              x: "-50%",
              y: "-50%"
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="relative">
              <Icon className="w-8 h-8 mb-2" />
              {node.status === 'online' && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              )}
              {node.status === 'offline' && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </div>
            <span className="text-xs font-bold tracking-widest">{node.label}</span>
            <span className="text-[10px] opacity-60 uppercase">{node.type}</span>
          </motion.div>
        );
      })}
      
      {/* Legend / Status Overlay */}
      <div className="absolute bottom-8 left-8 bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10">
        <h3 className="text-sm font-bold text-white mb-2">SYSTEM TOPOLOGY</h3>
        <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Active Connections</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <div className="w-2 h-2 rounded-full bg-red-900 border border-red-500" />
            <span>Disconnected / Error</span>
        </div>
      </div>
    </div>
  );
};
