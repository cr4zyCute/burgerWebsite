import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Star, Sparkles, Award } from 'lucide-react';
import { CmsSection, HeroContent } from '../../types';
import { HeroPaperStack } from './HeroPaperStack';

interface HeroSectionProps {
  section: CmsSection<HeroContent>;
  isEditable?: boolean;
  onSelectElement?: (field: string) => void;
  selectedField?: string | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  section,
  isEditable = false,
  onSelectElement,
  selectedField,
}) => {
  const content: HeroContent = {
    badge: section.content?.badge || 'CRAFTED FRESH DAILY',
    headline: section.content?.headline || 'REAL DRY-AGED SMASH BURGERS.',
    description:
      section.content?.description ||
      'Hand-pressed on 450° cast iron for that legendary crispy lace crust. Made with 100% grass-fed Angus beef, house-baked brioche, and secret craft sauce.',
    primaryCtaText: section.content?.primaryCtaText || 'Order Online Now',
    primaryCtaLink: section.content?.primaryCtaLink || '/menu',
    secondaryCtaText: section.content?.secondaryCtaText || 'Build Your Own Burger',
    secondaryCtaLink: section.content?.secondaryCtaLink || '/build-your-burger',
    imageUrl:
      section.content?.imageUrl ||
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
    imageAlt: section.content?.imageAlt || 'The Double Smash King with melted cheese on toasted brioche',
    slides: section.content?.slides,
    backgroundColor: section.content?.backgroundColor || '#121212',
    textColor: section.content?.textColor || '#FAF8F3',
    statsValue: section.content?.statsValue || '4.9 ★',
    statsLabel: section.content?.statsLabel || 'Over 2,400 Verified Reviews',
    bgStyle: section.content?.bgStyle || 'dark-grill',
    bgImageUrl: section.content?.bgImageUrl || '/images/hero-restaurant-bg.jpg',
    bgOverlayOpacity: section.content?.bgOverlayOpacity ?? 88,
  };

  const isDarkTheme = content.bgStyle === 'dark-grill';
  const isParchmentTheme = content.bgStyle === 'warm-craft';

  const getEditableClass = (field: string) => {
    if (!isEditable) return '';
    const isSelected = selectedField === field;
    return `cursor-pointer transition-all duration-150 ${
      isSelected
        ? 'outline-2 outline-[#E9B949] outline-dashed bg-[#E9B949]/20'
        : 'hover:outline-1 hover:outline-[#E9B949] hover:outline-dashed'
    }`;
  };

  // Split headline for rich styling if it contains "SMASH BURGERS."
  const renderStyledHeadline = (text: string) => {
    if (text.includes('SMASH BURGERS.')) {
      const parts = text.split('SMASH BURGERS.');
      return (
        <>
          {parts[0]}
          <span className="text-[#E9B949] drop-shadow-[0_2px_14px_rgba(233,185,73,0.35)]">
            SMASH BURGERS.
          </span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <section
      className="relative overflow-hidden border-b-4 border-[#171717] min-h-[calc(100dvh-5rem)] flex items-center py-10 sm:py-14 lg:py-16"
      style={{
        backgroundColor: isDarkTheme ? '#121212' : isParchmentTheme ? '#FAF8F3' : content.backgroundColor,
      }}
    >
      {/* 1. BACKGROUND LAYERS */}
      {/* A. Atmospheric Dark Grillhouse Background */}
      {isDarkTheme && (
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          {/* Base Photography Background */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{ backgroundImage: `url('${content.bgImageUrl || '/images/hero-restaurant-bg.jpg'}')` }}
          />

          {/* Deep Cinematic Contrast Gradients */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C]/98 via-[#141414]/90 to-[#121212]/80"
            style={{ opacity: (content.bgOverlayOpacity ?? 88) / 100 }}
          />

          {/* Subtle Warm Amber Spotlight behind burger */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_48%,rgba(233,185,73,0.22)_0%,transparent_60%)]" />

          {/* Fiery ember glow in bottom corner */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,rgba(168,45,36,0.18)_0%,transparent_45%)]" />

          {/* Subtle tactile grid matrix */}
          <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#FAF8F3_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Faint Architectural Heritage Typography Watermark */}
          <div className="absolute -bottom-8 left-6 text-[120px] font-display font-black uppercase text-white/[0.03] select-none tracking-widest leading-none pointer-events-none hidden xl:block">
            CRAFT BURGER
          </div>
        </div>
      )}

      {/* B. Warm Craft Parchment Background */}
      {isParchmentTheme && (
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-craft-parchment.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F3]/95 via-[#FAF8F3]/90 to-[#FAF8F3]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(233,185,73,0.2)_0%,transparent_60%)]" />
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
      )}

      {/* C. Clean Architectural Grid Background */}
      {!isDarkTheme && !isParchmentTheme && (
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <div className="absolute inset-0 bg-[#FAF8F3]" />
          <div className="absolute inset-0 opacity-8 bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_45%,rgba(233,185,73,0.18)_0%,transparent_55%)]" />
        </div>
      )}

      {/* 2. FOREGROUND CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={`inline-flex items-center gap-2 px-3 py-1 bg-[#E9B949] text-[#171717] font-display font-extrabold uppercase text-xs md:text-sm tracking-[0.2em] border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] ${getEditableClass(
                'badge'
              )}`}
              onClick={() => isEditable && onSelectElement?.('badge')}
            >
              <Flame className="w-4 h-4 text-[#A82D24] stroke-[2.5]" />
              <span>{content.badge}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`text-fluid-hero font-black font-display uppercase tracking-tight ${
                isDarkTheme ? 'text-[#FAF8F3]' : 'text-[#171717]'
              } ${getEditableClass('headline')}`}
              onClick={() => isEditable && onSelectElement?.('headline')}
            >
              {renderStyledHeadline(content.headline)}
            </motion.h1>

            {/* Persuasive Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16, ease: 'easeOut' }}
              className={`text-base sm:text-lg md:text-xl font-body max-w-xl leading-relaxed ${
                isDarkTheme ? 'text-[#E5DFD3]/90' : 'text-[#77736E]'
              } ${getEditableClass('description')}`}
              onClick={() => isEditable && onSelectElement?.('description')}
            >
              {content.description}
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1"
            >
              <div
                className={`w-full sm:w-auto ${getEditableClass('primaryCta')}`}
                onClick={() => isEditable && onSelectElement?.('primaryCta')}
              >
                <Link
                  to={content.primaryCtaLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#A82D24] hover:bg-[#8C231B] text-white font-display font-black uppercase text-base sm:text-lg md:text-xl px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-white sm:border-white shadow-[4px_4px_0px_0px_#E9B949] hover:shadow-[2px_2px_0px_0px_#E9B949] hover:translate-x-[1px] hover:translate-y-[1px] transition-all min-h-[44px]"
                >
                  <span>{content.primaryCtaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div
                className={`w-full sm:w-auto ${getEditableClass('secondaryCta')}`}
                onClick={() => isEditable && onSelectElement?.('secondaryCta')}
              >
                <Link
                  to={content.secondaryCtaLink}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 font-display font-black uppercase text-base sm:text-lg md:text-xl px-6 sm:px-7 py-3.5 sm:py-4 border-2 transition-all min-h-[44px] ${
                    isDarkTheme
                      ? 'bg-white/10 hover:bg-[#FAF8F3] hover:text-[#171717] text-white border-white backdrop-blur-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
                      : 'bg-transparent hover:bg-[#171717] hover:text-white text-[#171717] border-[#171717]'
                  }`}
                >
                  <span>{content.secondaryCtaText}</span>
                </Link>
              </div>
            </motion.div>

            {/* Social Proof / Stats Strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.32, ease: 'easeOut' }}
              className={`flex items-center gap-3 pt-2 sm:pt-3 max-w-md ${getEditableClass(
                'stats'
              )}`}
              onClick={() => isEditable && onSelectElement?.('stats')}
            >
              <div className="flex items-center gap-1 text-[#E9B949]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-[#E9B949]" />
                ))}
              </div>
              <div
                className={`text-xs md:text-sm font-body ${
                  isDarkTheme ? 'text-[#FAF8F3]' : 'text-[#171717]'
                }`}
              >
                <strong className="font-display font-black text-base mr-1 text-[#E9B949]">
                  {content.statsValue}
                </strong>
                <span className={isDarkTheme ? 'text-[#E5DFD3]/80' : 'text-[#77736E]'}>
                  {content.statsLabel}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Image Column (5 cols) - Interactive Paper-Swap Burger Deck */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <HeroPaperStack
              slides={content.slides}
              fallbackImageUrl={content.imageUrl}
              fallbackImageAlt={content.imageAlt}
              isEditable={isEditable}
              onSelectElement={onSelectElement}
              selectedField={selectedField}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
