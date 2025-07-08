'use client';

import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass' | 'neon';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  hover = false
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-300';
  
  const variantStyles = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm',
    gradient: 'bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700',
    glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 shadow-xl',
    neon: 'bg-gray-900 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
  };

  const hoverStyles = hover ? 'hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 cursor-pointer' : '';

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        hoverStyles,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
