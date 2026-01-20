"use client";

import { Search, Menu, Mouse, Globe, ArrowRight } from "lucide-react";
import { TopographicWave } from "./TopographicWave";
import { useState } from "react";
import { motion } from "framer-motion";

export const LandingHero = ({ onEnter }: { onEnter: (query?: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleEnter = () => {
    onEnter(searchQuery);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 p-8 flex items-center justify-center overflow-hidden">
      {/* Main Card Container */}
      <div className="relative w-full max-w-7xl h-full max-h-[900px] bg-black rounded-[40px] shadow-2xl overflow-hidden flex flex-col border border-white/10">
        
        {/* Header */}
        <header className="flex justify-between items-center p-8 z-10">
          {/* Logo */}
          <div className="flex items-center gap-2 text-white font-bold text-xl tracking-wider">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-full" />
            </div>
            SURAS<span className="font-light">OS</span>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex gap-8 text-xs font-medium text-gray-400 tracking-widest">
            <a href="#" className="hover:text-white transition-colors">ABOUT</a>
            <a href="#" className="hover:text-white transition-colors">DOWNLOAD</a>
            <a href="#" className="hover:text-white transition-colors">PRICING</a>
            <a href="#" className="hover:text-white transition-colors">FEATURES</a>
            <a href="#" className="hover:text-white transition-colors">CONTACT</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => handleEnter()}
              className="bg-[#4F46E5] hover:bg-[#4338ca] text-white px-8 py-2 rounded-full text-xs font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(79,70,229,0.5)]"
            >
              SIGN IN
            </button>
            <Menu className="text-white w-6 h-6 cursor-pointer" />
          </div>
        </header>

        {/* Hero Content */}
        <main className="flex-1 relative flex items-center px-16">
          
          {/* Left Side: Text & Search */}
          <div className="w-1/2 z-10 space-y-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-8xl font-bold text-white tracking-tight"
            >
              Welcome.
            </motion.h1>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.2 }}
              className="relative max-w-md"
            >
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white" />
              </div>
              <input
                type="text"
                className="w-full bg-transparent border border-gray-600 text-white text-sm rounded-full py-4 pl-6 pr-12 focus:outline-none focus:border-white transition-colors"
                placeholder="Find a service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
              />
            </motion.div>

            {/* Buttons */}
            <div className="flex gap-6 pt-4">
              <button 
                onClick={() => handleEnter()}
                className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
              >
                Free Trial
              </button>
              <button className="border border-gray-600 hover:border-white text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all">
                see more
              </button>
            </div>
          </div>

          {/* Right Side: Visuals */}
          <div className="absolute right-0 top-0 bottom-0 w-3/5">
            <TopographicWave />
            
            {/* Info Card Overlay */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute right-24 top-1/2 -translate-y-1/2 w-64 text-right"
            >
              <div className="flex justify-end mb-4">
                 <Globe className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-3xl text-white font-light mb-4">
                Autonomous Ops.
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                SURAS OS leverages local AI to monitor, heal, and optimize your cloud infrastructure. Real-time drift detection and automated recovery keep your services running 24/7.
              </p>
            </motion.div>
          </div>
        </main>

        {/* Footer / Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
          <Mouse className="w-5 h-5" />
        </div>
        
        <div className="absolute bottom-8 flex justify-center w-full">
            <div className="bg-[#1a1a1a] rounded-full px-6 py-2 flex items-center gap-2 border border-white/10">
                <Globe className="w-4 h-4 text-white" />
                <span className="text-white text-sm">suras.org</span>
            </div>
        </div>

      </div>
    </div>
  );
};
