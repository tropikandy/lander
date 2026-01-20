import { ConnectivityGraph } from "@/components/visualizations/ConnectivityGraph";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MapPage() {
  return (
    <div className="w-full h-screen bg-black p-8 flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/" 
          className="p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">System Connectivity</h1>
            <p className="text-xs text-gray-400">Real-time service mesh visualization</p>
        </div>
      </div>
      
      <div className="flex-1">
        <ConnectivityGraph />
      </div>
    </div>
  );
}
