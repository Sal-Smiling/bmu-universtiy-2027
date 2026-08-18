import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 relative overflow-hidden select-none focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-bmu-red via-[#FF2A6D] to-bmu-pink text-white shadow-glow-red hover:shadow-glow-bmu border border-slate-300',
    secondary: 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-900 border border-slate-200 backdrop-blur-md hover:border-slate-300',
    outline: 'bg-transparent text-white border border-bmu-pink/50 hover:border-bmu-pink hover:bg-bmu-pink/10 shadow-[0_0_15px_-5px_rgba(255,77,133,0.3)]',
    ghost: 'bg-transparent hover:bg-slate-100/80 text-slate-700 hover:text-slate-900',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      {...props}
    >
      {/* Shimmer Effect for primary button */}
      {variant === 'primary' && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-shimmer pointer-events-none" />
      )}

      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span className="relative z-10">{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </motion.button>
  );
};

export default Button;
