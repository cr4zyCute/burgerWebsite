import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CmsSection, PromoFeatureContent } from '../../types';

interface PromoBannerSectionProps {
  section: CmsSection<PromoFeatureContent>;
  isEditable?: boolean;
  onSelectElement?: (field: string) => void;
  selectedField?: string | null;
}

export const PromoBannerSection: React.FC<PromoBannerSectionProps> = ({
  section,
  isEditable,
  onSelectElement,
  selectedField,
}) => {
  const content: PromoFeatureContent = {
    tag: section.content?.tag || 'LIMITED TIME VALUE MEAL',
    headline: section.content?.headline || 'THE DOUBLE SMASH FEAST COMBO',
    description:
      section.content?.description ||
      'The Double Smash King, large Hand-Cut Truffle Fries, and any craft beverage. Save $3.55 compared to ordering à la carte.',
    discountBadge: section.content?.discountBadge || 'SAVE $3.55',
    ctaText: section.content?.ctaText || 'Order Combo Meal ($20.95)',
    ctaLink: section.content?.ctaLink || '/menu',
    imageUrl:
      section.content?.imageUrl ||
      'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1000&q=85',
  };

  const getEditableClass = (field: string) => {
    if (!isEditable) return '';
    return selectedField === field
      ? 'outline-2 outline-dashed outline-[#E9B949] p-1'
      : 'hover:outline-1 hover:outline-dashed hover:outline-white';
  };

  return (
    <section className="bg-[#171717] text-[#FAF8F3] py-16 md:py-20 border-b-4 border-[#A82D24] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Image */}
          <div className="lg:col-span-6">
            <div
              className={`relative border-4 border-[#FAF8F3] shadow-[8px_8px_0px_0px_#A82D24] overflow-hidden ${getEditableClass(
                'imageUrl'
              )}`}
              onClick={() => isEditable && onSelectElement?.('imageUrl')}
            >
              <img
                src={content.imageUrl}
                alt={content.headline}
                className="w-full h-auto aspect-[16/10] object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#E9B949] text-[#171717] px-3 py-1 font-display font-black text-sm uppercase tracking-wider border border-[#171717]">
                {content.discountBadge}
              </div>
            </div>
          </div>

          {/* Copy and CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 bg-[#A82D24] text-white font-display font-extrabold uppercase text-xs tracking-[0.2em] border border-[#FAF8F3]/20 ${getEditableClass(
                'tag'
              )}`}
              onClick={() => isEditable && onSelectElement?.('tag')}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E9B949]" />
              <span>{content.tag}</span>
            </div>

            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-white leading-none ${getEditableClass(
                'headline'
              )}`}
              onClick={() => isEditable && onSelectElement?.('headline')}
            >
              {content.headline}
            </h2>

            <p
              className={`text-base sm:text-lg font-body text-[#FAF8F3]/80 leading-relaxed ${getEditableClass(
                'description'
              )}`}
              onClick={() => isEditable && onSelectElement?.('description')}
            >
              {content.description}
            </p>

            <div
              className={getEditableClass('cta')}
              onClick={() => isEditable && onSelectElement?.('cta')}
            >
              <Link
                to={content.ctaLink}
                className="inline-flex items-center gap-3 bg-[#E9B949] hover:bg-[#D3A43B] text-[#171717] font-display font-black uppercase text-xl px-8 py-4 border-2 border-white shadow-[4px_4px_0px_0px_#FFFFFF] transition-all"
              >
                <span>{content.ctaText}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
