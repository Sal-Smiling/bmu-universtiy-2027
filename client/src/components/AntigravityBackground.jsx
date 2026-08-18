import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const AntigravityBackground = () => {
  // Generate soft tech node particles sitting along grid lines
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 8 + 4,
      top: `${Math.floor(Math.random() * 20) * 5}%`,
      left: `${Math.floor(Math.random() * 20) * 5}%`,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Soft Ambient Light Glows behind the grid */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-gradient-radial from-rose-100/80 via-blue-50/50 to-transparent rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-100/50 via-blue-100/40 to-transparent rounded-full blur-[100px]"
      />

      <motion.div
        animate={{
          x: [0, -60, 50, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.9, 1.25, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-20 -right-20 w-[550px] h-[550px] bg-gradient-to-bl from-rose-100/60 via-pink-100/40 to-transparent rounded-full blur-[100px]"
      />

      {/* 📐 CRISP TECHNOLOGY GRID PATTERN (Matching Uploaded Image) */}
      <div 
        className="absolute inset-0 opacity-70 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" 
      />
      
      {/* Subtle secondary finer grid for authentic tech/engineering feel */}
      <div 
        className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:0.875rem_0.875rem]" 
      />

      {/* Floating Tech Dots / Nodes (Like the pink dot in screenshot) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: p.top,
            left: p.left,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          className={`absolute rounded-full shadow-sm ${
            p.id % 3 === 0 
              ? 'bg-bmu-red shadow-[0_0_8px_rgba(255,77,133,0.6)]' 
              : p.id % 3 === 1 
              ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' 
              : 'bg-slate-400'
          }`}
        />
      ))}
    </div>
  );
};

export default AntigravityBackground;
