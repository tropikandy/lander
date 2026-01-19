"use client";

import { motion } from "framer-motion";

export const TopographicWave = () => {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-80 pointer-events-none">
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" /> {/* Indigo */}
            <stop offset="50%" stopColor="#818CF8" /> {/* Violet */}
            <stop offset="100%" stopColor="#22D3EE" /> {/* Cyan */}
          </linearGradient>
        </defs>
        
        {/* Concentric deformed circles to mimic topography */}
        {[...Array(15)].map((_, i) => (
          <motion.path
            key={i}
            d={`
              M 250, 250
              m -${20 + i * 15}, 0
              a ${20 + i * 15},${20 + i * 15} 0 1,0 ${40 + i * 30},0
              a ${20 + i * 15},${20 + i * 15} 0 1,0 -${40 + i * 30},0
            `}
            stroke="url(#neonGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0.3, 0.6, 0.3],
              d: [
                `M 250, 250 m -${20 + i * 15}, 0 a ${20 + i * 15},${20 + i * 15} 0 1,0 ${40 + i * 30},0 a ${20 + i * 15},${20 + i * 15} 0 1,0 -${40 + i * 30},0`,
                `M 250, 250 m -${22 + i * 16}, 5 a ${18 + i * 14},${22 + i * 16} 0 1,0 ${44 + i * 32},0 a ${18 + i * 14},${22 + i * 16} 0 1,0 -${44 + i * 32},0`,
                `M 250, 250 m -${20 + i * 15}, 0 a ${20 + i * 15},${20 + i * 15} 0 1,0 ${40 + i * 30},0 a ${20 + i * 15},${20 + i * 15} 0 1,0 -${40 + i * 30},0`
              ]
            }}
            transition={{ 
              duration: 5 + i * 0.2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </svg>
    </div>
  );
};
