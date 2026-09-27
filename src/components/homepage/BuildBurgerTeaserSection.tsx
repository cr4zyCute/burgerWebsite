import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sliders, CheckCircle2 } from 'lucide-react';
import { CmsSection } from '../../types';

interface BuildBurgerTeaserSectionProps {
  section: CmsSection;
  isEditable?: boolean;
  onSelectElement?: (field: string) => void;
  selectedField?: string | null;
}

export const BuildBurgerTeaserSection: React.FC<BuildBurgerTeaserSectionProps> = ({
  section,
  isEditable,
  onSelectElement,
  selectedField,
}) => {
  const tagline = section.content?.tagline || 'CUSTOM CREATIONS';
  const heading = section.content?.heading || 'DESIGN YOUR MASTERPIECE';
  const description =
    section.content?.description ||
    'Take command of the grill. Choose your patty blend, artisan bun, aged cheeses, fire-roasted toppings, and signature sauces in our interactive builder.';
  const ctaText = section.content?.ctaText || 'Start Customizing Now';
  const imageUrl =
    section.content?.imageUrl ||
    'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=85';

  return (
    <section className="py-20 bg-[#FAF8F3] border-b-2 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border-4 border-[#171717] shadow-[10px_10px_0px_0px_#171717] p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block bg-[#E9B949] text-[#171717] font-display font-extrabold uppercase text-xs tracking-[0.2em] px-3 py-1 border border-[#171717]">
              {tagline}
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-[#171717] leading-[0.95]">
              {heading}
            </h2>

            <p className="text-base sm:text-lg font-body text-[#77736E] leading-relaxed">
              {description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm font-bold font-body text-[#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#A82D24]" />
                <span>3 Gourmet Patty Blends</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold font-body text-[#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#A82D24]" />
                <span>4 Freshly Baked Buns</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold font-body text-[#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#A82D24]" />
                <span>6 Farmstead Aged Cheeses</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold font-body text-[#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#A82D24]" />
                <span>8 Chef-Crafted Sauces</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/build-your-burger"
                className="inline-flex items-center gap-3 bg-[#A82D24] hover:bg-[#8C231B] text-white font-display font-black uppercase text-xl px-8 py-4 border-2 border-[#171717] shadow-[4px_4px_0px_0px_#171717] transition-all"
              >
                <Sliders className="w-5 h-5 text-[#E9B949]" />
                <span>{ctaText}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative border-2 border-[#171717] overflow-hidden bg-[#F5F0E6]">
              <img
                src={imageUrl}
                alt="Custom burger ingredients"
                className="w-full h-auto object-cover aspect-square"
              />
              <div className="absolute top-4 right-4 bg-[#171717] text-white px-3 py-1 font-display font-bold text-xs uppercase tracking-wider">
                9-Step Customizer
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
