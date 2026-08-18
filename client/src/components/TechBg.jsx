import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TechBg = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color palette matching the uploaded Plexus image (cyan, azure, sky blue)
    const colors = ['#0ea5e9', '#38bdf8', '#0284c7', '#60a5fa', '#00f0ff'];

    // Create particles with 3D depth of field effect
    const particleCount = Math.min(Math.floor((width * height) / 12000), 75);
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 3.5 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.6 + 0.4,
      glow: Math.random() > 0.4,
    }));

    // Connection distance threshold
    const maxDistance = 160;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update particle positions
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce gently off canvas edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      // Draw connecting plexus lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.45;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw particle nodes
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        if (p.glow) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-r from-sky-100 via-blue-50/40 to-white">
      {/* Soft Cyan/Azure ambient glow on left matching screenshot */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-20 -left-20 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-gradient-radial from-sky-300/50 via-cyan-200/30 to-transparent rounded-full blur-[100px]"
      />

      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-gradient-to-tr from-blue-300/40 via-sky-200/30 to-transparent rounded-full blur-[110px]"
      />

      {/* Clean White/Slate gradient transition to right */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />

      {/* 🎬 HTML5 Canvas rendering live Plexus Neural Network animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />
    </div>
  );
};

export default TechBg;
