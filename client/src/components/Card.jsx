import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hoverEffect = true,
  glow = false,
  glass = true,
  onClick,
  ...props
}) => {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-300 relative overflow-hidden';
  const glassStyles = glass ? 'bg-bmu-card/80 backdrop-blur-lg border border-slate-200' : 'bg-bmu-surface border border-slate-200/60';
  const hoverStyles = hoverEffect ? 'hover:border-slate-300 hover:-translate-y-1.5 hover:shadow-xl hover:bg-bmu-card' : '';
  const glowStyles = glow ? 'shadow-glow-bmu border-bmu-pink/30' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onClick={onClick}
      className={`${baseStyles} ${glassStyles} ${hoverStyles} ${glowStyles} ${className}`}
      {...props}
    >
      {/* Subtle top border gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};

export default Card;
