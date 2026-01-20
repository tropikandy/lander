'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Bot, Send, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AICortex() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setResponse(null); // Clear previous response
    
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      const data = await res.json();
      
      if (data.error) {
        setResponse(`Error: ${data.error}`);
      } else {
        setResponse(data.response);
      }
    } catch (e) {
      setResponse("System Error: Failed to reach AI Core.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="col-span-1 md:col-span-2 row-span-2 flex flex-col relative overflow-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -z-10" />
      
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" /> 
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI CORTEX</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4">
        {/* Output Area */}
        <div className="flex-1 bg-slate-900/50 rounded-lg p-4 border border-white/5 overflow-y-auto min-h-[200px] text-xs font-mono">
          {!response && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center text-text-muted gap-2 opacity-50">
              <Bot className="w-8 h-8" />
              <span>Awaiting DevOps Instructions...</span>
            </div>
          )}
          
          {isLoading && (
            <div className="flex items-center gap-2 text-purple-400 animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating solution...</span>
            </div>
          )}
          
          {response && (
            <div className="whitespace-pre-wrap text-slate-300">
              {response}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="Ask Qwen to generate config..."
            disabled={isLoading}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-12 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors disabled:opacity-50"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-md transition-colors disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
