import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'mustard' | 'charcoal' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-display font-extrabold uppercase tracking-wider rounded-[2px] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A82D24] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

    const variantStyles = {
      primary: 'bg-[#A82D24] text-white hover:bg-[#8C231B] border border-[#A82D24]',
      secondary: 'bg-transparent text-[#171717] hover:bg-[#171717] hover:text-white border border-[#171717]',
      mustard: 'bg-[#E9B949] text-[#171717] hover:bg-[#D3A43B] border border-[#E9B949]',
      charcoal: 'bg-[#171717] text-white hover:bg-[#2A2A2A] border border-[#171717]',
      ghost: 'bg-transparent text-[#171717] hover:bg-[#F5F0E6] border border-transparent',
      danger: 'bg-[#A82D24] text-white hover:bg-[#7A1D16] border border-[#A82D24]',
    };

    const sizeStyles = {
      sm: 'text-xs md:text-sm px-3 py-1.5 gap-1.5',
      md: 'text-sm md:text-base px-5 py-2.5 gap-2',
      lg: 'text-base md:text-lg px-7 py-3.5 gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          icon && <span className="flex-shrink-0">{icon}</span>
        )}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
