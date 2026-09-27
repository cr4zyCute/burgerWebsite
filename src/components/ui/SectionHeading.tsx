import React from 'react';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  tagline?: string;
  heading: string;
  description?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tagline,
  heading,
  description,
  align = 'center',
  theme = 'light',
  className,
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'max-w-3xl mb-8 sm:mb-12 px-2 sm:px-0',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {tagline && (
        <span
          className={cn(
            'inline-block text-xs md:text-sm font-extrabold uppercase tracking-[0.2em] font-display mb-2 sm:mb-3 px-2.5 py-0.5 border border-current',
            isDark ? 'bg-[#A82D24] text-white border-[#A82D24]' : 'bg-[#E9B949] text-[#171717] border-[#171717]'
          )}
        >
          {tagline}
        </span>
      )}
      <h2
        className={cn(
          'text-fluid-section font-black font-display tracking-tight uppercase leading-[0.95]',
          isDark ? 'text-white' : 'text-[#171717]'
        )}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-body max-w-2xl mx-auto leading-relaxed',
            isDark ? 'text-[#FAF8F3]/80' : 'text-[#77736E]'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
