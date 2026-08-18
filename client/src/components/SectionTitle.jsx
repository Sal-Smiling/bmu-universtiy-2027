import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({
  badge,
  title,
  gradientTitle,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col max-w-3xl mb-12 ${alignStyles[align]} ${className}`}
    >
      {badge && (
        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-bmu-red/10 to-bmu-pink/10 border border-bmu-pink/20 text-xs font-semibold tracking-wider uppercase text-bmu-pink mb-4 inline-block shadow-[0_0_15px_-5px_rgba(255,77,133,0.3)]">
          {badge}
        </span>
      )}
      
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
        {title}{' '}
        {gradientTitle && (
          <span className="bg-gradient-to-r from-bmu-red via-[#FF2A6D] to-bmu-pink bg-clip-text text-transparent">
            {gradientTitle}
          </span>
        )}
      </h2>
      
      {subtitle && (
        <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
