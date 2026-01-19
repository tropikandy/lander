'use client';
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { Lock, Unlock, Zap } from 'lucide-react';

import { ThemeSwitcher } from '@/components/widgets/ThemeSwitcher';

export function OrbitBar() {
  const { data: session } = useSession();

  return (
    <header className="w-full h-16 flex items-center justify-between px-8 sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border transition-colors duration-500">
      {/* Brand */}
      <div className="flex items-center gap-3 group cursor-default">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
            <Zap className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
            <span className="font-semibold text-text-main tracking-tight">GemLanding</span>
            <span className="text-[10px] text-text-dim font-medium tracking-wide uppercase">Oracle System Control</span>
        </div>
      </div>
      
      {/* Context Pill (Center - Hidden on mobile) */}
      <div className="hidden md:flex items-center gap-6 text-xs text-text-dim">
        <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_var(--color-success)] animate-pulse"></span>
            <span>SYSTEM ONLINE</span>
        </div>
        <div className="w-px h-3 bg-border"></div>
        <div>REGION: EU-STOCKHOLM</div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        
        {session ? (
            <button onClick={() => signOut()} className="flex items-center gap-2 text-xs font-medium text-text-dim hover:text-error transition-colors px-3 py-1.5 rounded-md hover:bg-error/5">
                <Unlock className="w-3 h-3" />
                <span className="hidden sm:inline">LOGOUT</span>
            </button>
        ) : (
            <button onClick={() => signIn()} className="flex items-center gap-2 text-xs font-medium text-text-dim hover:text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-primary/5">
                <Lock className="w-3 h-3" />
                <span className="hidden sm:inline">ACCESS</span>
            </button>
        )}
      </div>
    </header>
  );
}
