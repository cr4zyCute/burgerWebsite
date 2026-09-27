import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = 'md',
  className,
}) => {
  const isSm = size === 'sm';

  return (
    <div
      className={cn(
        'inline-flex items-center border border-[#171717] bg-[#FAF8F3]',
        isSm ? 'h-8' : 'h-10',
        className
      )}
    >
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className={cn(
          'flex items-center justify-center text-[#171717] hover:bg-[#F5F0E6] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer',
          isSm ? 'w-8 h-8' : 'w-10 h-10'
        )}
        aria-label="Decrease quantity"
      >
        <Minus className={isSm ? 'w-3 h-3' : 'w-4 h-4'} />
      </button>

      <span
        className={cn(
          'text-center font-bold font-display text-[#171717] select-none',
          isSm ? 'w-8 text-sm' : 'w-10 text-base'
        )}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className={cn(
          'flex items-center justify-center text-[#171717] hover:bg-[#F5F0E6] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer',
          isSm ? 'w-8 h-8' : 'w-10 h-10'
        )}
        aria-label="Increase quantity"
      >
        <Plus className={isSm ? 'w-3 h-3' : 'w-4 h-4'} />
      </button>
    </div>
  );
};
