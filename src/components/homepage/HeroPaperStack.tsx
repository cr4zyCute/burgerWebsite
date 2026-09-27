import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, Sparkles, Layers, RotateCcw } from 'lucide-react';
import { HeroSlide } from '../../types';

interface HeroPaperStackProps {
  slides?: HeroSlide[];
  fallbackImageUrl: string;
  fallbackImageAlt: string;
  isEditable?: boolean;
  onSelectElement?: (field: string) => void;
  selectedField?: string | null;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'The Double Smash King with melted cheese on toasted brioche',
    badge: '🔥 450° Cast Iron Sizzle',
    label: '100% Certified Angus Beef',
  },
  {
    id: 'slide-2',
    imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Truffle Bacon Jam Burger',
    badge: '🥓 Smoked Applewood Bacon',
    label: 'House Truffle Aioli Jam',
  },
  {
    id: 'slide-3',
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Spicy Firehouse Smash Burger',
    badge: '🌶️ Nashville Hot Glaze',
    label: 'Crispy Fried Pickles & Slaw',
  },
  {
    id: 'slide-4',
    imageUrl: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Double Cheddar Deluxe',
    badge: '🧀 Wisconsin Sharp Cheddar',
    label: 'Artisan Potato Brioche Bun',
  },
];

export const HeroPaperStack: React.FC<HeroPaperStackProps> = ({
  slides,
  fallbackImageUrl,
  fallbackImageAlt,
  isEditable = false,
  onSelectElement,
  selectedField,
}) => {
  // Use custom slides if provided and non-empty, otherwise default stack
  const activeSlides: HeroSlide[] =
    slides && slides.length > 0
      ? slides
      : fallbackImageUrl
      ? [
          {
            id: 'fallback',
            imageUrl: fallbackImageUrl,
            imageAlt: fallbackImageAlt,
            badge: '🔥 450° Cast Iron Sizzle',
            label: '100% Certified Angus Beef',
          },
          ...DEFAULT_SLIDES.slice(1),
        ]
      : DEFAULT_SLIDES;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isHovered, setIsHovered] = useState(false);

  // Safe index clamping if slides count changes in admin
  useEffect(() => {
    if (currentIndex >= activeSlides.length) {
      setCurrentIndex(0);
    }
  }, [activeSlides.length, currentIndex]);

  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  // Stack paper rotation angles for tactile physical paper feel
  const rotations = [-2.5, 2, -1.5, 2.5];

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];
  const nextSlide = activeSlides[(currentIndex + 1) % activeSlides.length];
  const thirdSlide = activeSlides[(currentIndex + 2) % activeSlides.length];

  const isSelected = selectedField === 'slides' || selectedField === 'image';

  return (
    <div
      className={`relative w-full max-w-md lg:max-w-none select-none ${
        isEditable
          ? `cursor-pointer transition-all ${
              isSelected
                ? 'outline-2 outline-[#E9B949] outline-dashed bg-[#E9B949]/10'
                : 'hover:outline-1 hover:outline-[#E9B949] hover:outline-dashed'
            }`
          : ''
      }`}
      onClick={() => isEditable && onSelectElement?.('slides')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Golden Backlight Glow Halo */}
      <div className="absolute -inset-6 bg-[#E9B949]/25 blur-3xl rounded-full -z-20 pointer-events-none" />

      {/* STACK CONTAINER */}
      <div className="relative aspect-[4/3] sm:aspect-[1/1] max-h-[460px] w-full">
        {/* 3. Third Card in background (bottom of paper stack) */}
        {activeSlides.length > 2 && (
          <div
            style={{
              transform: `rotate(${rotations[(currentIndex + 2) % rotations.length]}deg) scale(0.92) translateY(14px)`,
            }}
            className="absolute inset-0 bg-[#EFE9DC] border-4 border-[#171717] shadow-[4px_4px_0px_0px_#171717] rounded-[2px] -z-10 transition-transform duration-300 overflow-hidden opacity-75"
          >
            <img
              src={thirdSlide.imageUrl}
              alt=""
              className="w-full h-full object-cover grayscale-25"
            />
          </div>
        )}

        {/* 2. Second Card in stack (middle paper layer) */}
        {activeSlides.length > 1 && (
          <div
            style={{
              transform: `rotate(${rotations[(currentIndex + 1) % rotations.length]}deg) scale(0.96) translateY(8px)`,
            }}
            className="absolute inset-0 bg-[#FAF8F3] border-4 border-[#171717] shadow-[6px_6px_0px_0px_#A82D24] rounded-[2px] -z-5 transition-transform duration-300 overflow-hidden opacity-90"
          >
            <img
              src={nextSlide.imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* 1. Active Top Card (Framer Motion Animated Swap Page) */}
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentSlide.id + '-' + currentIndex}
            custom={direction}
            initial={{
              x: direction === 'next' ? 120 : -120,
              y: -15,
              rotate: direction === 'next' ? 12 : -12,
              opacity: 0,
              scale: 0.94,
            }}
            animate={{
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 280,
                damping: 24,
                mass: 0.8,
              },
            }}
            exit={{
              x: direction === 'next' ? -180 : 180,
              y: -25,
              rotate: direction === 'next' ? -18 : 18,
              opacity: 0,
              scale: 0.9,
              transition: { duration: 0.28, ease: 'easeIn' },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -40) handleNext();
              else if (info.offset.x > 40) handlePrev();
            }}
            onClick={(e) => {
              // Click to swap to next card
              if (!isEditable) {
                e.stopPropagation();
                handleNext();
              }
            }}
            className="absolute inset-0 bg-[#171717] border-4 border-[#E9B949] shadow-[10px_10px_0px_0px_#A82D24] sm:shadow-[14px_14px_0px_0px_#A82D24] rounded-[2px] overflow-hidden cursor-grab active:cursor-grabbing group z-10"
          >
            {/* Top image */}
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.imageAlt || 'Craft Burger'}
              className="w-full h-full object-cover block group-hover:scale-103 transition-transform duration-500 pointer-events-none"
            />

            {/* Top Right Floating Badge */}
            {currentSlide.badge && (
              <div className="absolute top-3 right-3 bg-[#E9B949] text-[#171717] px-2.5 sm:px-3 py-1 font-display font-black text-[10px] sm:text-xs uppercase tracking-wider border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] rotate-2 pointer-events-none">
                {currentSlide.badge}
              </div>
            )}

            {/* Bottom Left Quality Label Tag */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-[#171717] text-[#FAF8F3] px-3 py-1.5 font-display font-bold text-[11px] sm:text-xs uppercase tracking-wider border border-[#E9B949] flex items-center gap-1.5 shadow-[3px_3px_0px_0px_#171717] pointer-events-none">
              <Award className="w-3.5 h-3.5 text-[#E9B949] flex-shrink-0" />
              <span>{currentSlide.label || '100% Certified Angus Beef'}</span>
            </div>

            {/* Bottom Right "Flip Page" Tap Hint */}
            <div className="absolute bottom-3 right-3 bg-[#171717]/80 text-[#E9B949] text-[9px] font-display font-black uppercase tracking-widest px-2 py-1 rounded-[2px] border border-[#E9B949]/40 backdrop-blur-sm pointer-events-none hidden sm:block">
              Tap Card to Flip ↻
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* SWAP CONTROLS & PAGINATION BAR */}
      <div className="mt-4 flex items-center justify-between gap-2 px-1">
        {/* Pagination Dots & Paper Stack counter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#171717] px-2.5 py-1 border border-[#E9B949]/50 shadow-[2px_2px_0px_0px_#171717]">
            <Layers className="w-3 h-3 text-[#E9B949]" />
            <span className="font-display font-black text-[11px] uppercase tracking-wider text-white">
              Menu Card {currentIndex + 1} / {activeSlides.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {activeSlides.map((s, idx) => (
              <button
                key={s.id + idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDirection(idx > currentIndex ? 'next' : 'prev');
                  setCurrentIndex(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex
                    ? 'bg-[#E9B949] w-6 border border-[#171717]'
                    : 'bg-white/40 hover:bg-white'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Previous / Next Arrow Flippers */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="p-2 bg-[#171717] text-white hover:bg-[#A82D24] border border-[#E5DFD3]/40 shadow-[2px_2px_0px_0px_#171717] transition-all active:translate-y-0.5 cursor-pointer rounded-[2px]"
            title="Previous Burger Card"
            aria-label="Previous Burger Card"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3]" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="p-2 bg-[#A82D24] text-white hover:bg-[#8C231B] border border-[#FAF8F3] shadow-[2px_2px_0px_0px_#171717] transition-all active:translate-y-0.5 cursor-pointer rounded-[2px]"
            title="Next Burger Card (Swap)"
            aria-label="Next Burger Card (Swap)"
          >
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
