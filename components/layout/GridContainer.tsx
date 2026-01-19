import React from 'react';
import { cn } from '@/lib/utils';

export function GridContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <main className={cn("container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6", className)}>
      {children}
    </main>
  );
}
