'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />; // Avoid hydration mismatch
  }

  const themes = [
    { id: 'obsidian', icon: Moon, label: 'Obsidian' },
    { id: 'ceramic', icon: Sun, label: 'Ceramic' },
    { id: 'cosmic', icon: Sparkles, label: 'Cosmic' },
  ];

  return (
    <div className="flex items-center bg-card border border-border rounded-full p-1 gap-1">
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.id || (theme === 'system' && t.id === 'obsidian'); // Default fallback
        
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={cn(
              "p-1.5 rounded-full transition-all duration-300 relative",
              isActive ? "text-primary" : "text-text-muted hover:text-text-dim"
            )}
            title={t.label}
          >
            {isActive && (
              <span className="absolute inset-0 bg-card-hover rounded-full shadow-sm animate-in fade-in zoom-in duration-200"></span>
            )}
            <Icon className="w-3.5 h-3.5 relative z-10" />
          </button>
        );
      })}
    </div>
  );
}
