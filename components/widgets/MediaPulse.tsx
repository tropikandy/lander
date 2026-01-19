'use client';

import useSWR from 'swr';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Play, Pause, Download, Film } from "lucide-react";
import { MediaItem } from '@/lib/types/media';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function MediaPulse() {
  const { data, isLoading } = useSWR('/api/media/status', fetcher, {
    refreshInterval: 5000 // Poll every 5 seconds
  });

  const nowPlaying: MediaItem | null = data?.nowPlaying;
  const downloads: MediaItem[] = data?.downloads || [];

  return (
    <Card className="col-span-1 md:row-span-2 h-full flex flex-col border-primary/20 overflow-hidden relative">
      <CardHeader className="z-10 relative">
        <CardTitle className="flex items-center gap-2">
          <Play className="w-4 h-4" /> MEDIA PULSE
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4 z-10 relative">
        {/* NOW PLAYING SECTION */}
        <div className="flex-1 min-h-[140px] rounded-lg bg-black/40 border border-white/5 relative overflow-hidden group">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs animate-pulse">
              Scanning streams...
            </div>
          ) : nowPlaying ? (
            <>
              {/* Background Art with Gradient Fade */}
              {nowPlaying.art && (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700"
                  style={{ backgroundImage: `url(${nowPlaying.art})` }}
                ></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                 <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold bg-primary text-black px-1.5 py-0.5 rounded">
                      {nowPlaying.user?.toUpperCase()} WATCHING
                    </span>
                    {nowPlaying.state === 'playing' ? (
                      <span className="text-[10px] text-green-400 flex items-center gap-1">
                        <Play className="w-3 h-3 fill-current" /> PLAYING
                      </span>
                    ) : (
                      <span className="text-[10px] text-yellow-400 flex items-center gap-1">
                         <Pause className="w-3 h-3 fill-current" /> PAUSED
                      </span>
                    )}
                 </div>
                 <h3 className="font-bold text-lg leading-tight text-white drop-shadow-md">{nowPlaying.title}</h3>
                 <p className="text-sm text-gray-300 drop-shadow-md">{nowPlaying.subtitle}</p>
                 
                 {/* Progress Bar */}
                 <div className="w-full h-1 bg-white/20 rounded-full mt-3 overflow-hidden">
                    <div 
                      className="h-full bg-primary shadow-[0_0_10px_var(--primary)] transition-all duration-1000"
                      style={{ width: `${nowPlaying.progress}%` }}
                    ></div>
                 </div>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
               <Film className="w-8 h-8 mb-2 opacity-20" />
               <span className="text-xs">NO ACTIVE STREAM</span>
            </div>
          )}
        </div>
        
        {/* DOWNLOADS SECTION */}
        <div className="space-y-3">
           <div className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
              <Download className="w-3 h-3" /> INCOMING
           </div>
           
           {isLoading ? (
             <div className="h-8 bg-secondary/30 rounded animate-pulse"></div>
           ) : downloads.length > 0 ? (
             downloads.map((item) => (
               <div key={item.id} className="text-xs flex flex-col gap-1 p-2 rounded bg-secondary/20 border border-white/5">
                  <div className="flex justify-between w-full">
                    <span className="font-medium text-white truncate max-w-[70%]">{item.title}</span>
                    <span className="text-primary font-mono">{item.progress}%</span>
                  </div>
                  <div className="w-full h-0.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-green-500/80" style={{ width: `${item.progress}%` }}></div>
                  </div>
               </div>
             ))
           ) : (
             <div className="text-[10px] text-muted-foreground italic">Queue empty</div>
           )}
        </div>
      </CardContent>
    </Card>
  );
}
