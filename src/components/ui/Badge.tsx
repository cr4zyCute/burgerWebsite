import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'red' | 'mustard' | 'charcoal' | 'cream' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'red',
  size = 'md',
  className,
}) => {
  const variantStyles = {
    red: 'bg-[#A82D24] text-white border border-[#A82D24]',
    mustard: 'bg-[#E9B949] text-[#171717] border border-[#E9B949]',
    charcoal: 'bg-[#171717] text-white border border-[#171717]',
    cream: 'bg-[#F5F0E6] text-[#70452D] border border-[#E5DFD3]',
    outline: 'bg-transparent text-[#171717] border border-[#171717]',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 tracking-wider',
    md: 'text-xs md:text-sm px-2.5 py-1 tracking-wider',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-bold uppercase rounded-[2px] font-display',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};
