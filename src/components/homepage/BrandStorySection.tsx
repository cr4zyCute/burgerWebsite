import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CmsSection } from '../../types';

interface BrandStorySectionProps {
  section: CmsSection;
  isEditable?: boolean;
  onSelectElement?: (field: string) => void;
  selectedField?: string | null;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({
  section,
  isEditable,
  onSelectElement,
  selectedField,
}) => {
  const eyebrow = section.content?.eyebrow || 'SINCE 2018';
  const title =
    section.content?.title ||
    'ROOTED IN PASSION FOR AUTHENTIC AMERICAN DINER HERITAGE';
  const p1 =
    section.content?.paragraph1 ||
    'We started Burger Craft with one simple obsession: burgers were meant to be made with real, honest craftsmanship rather than industrial speed.';
  const p2 =
    section.content?.paragraph2 ||
    'We partnered directly with sustainable family pastures in upstate New York, commissioned custom cast iron grills, and spent eight months perfecting our bun recipe. The result is pure, unadulterated flavor.';
  const stat1Num = section.content?.stat1Number || '100%';
  const stat1Lbl = section.content?.stat1Label || 'Grass-Fed Angus Beef';
  const stat2Num = section.content?.stat2Number || '28-Day';
  const stat2Lbl = section.content?.stat2Label || 'Dry-Aged Precision';
  const imageUrl =
    section.content?.imageUrl ||
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85';

  return (
    <section className="py-20 bg-[#F5F0E6] border-b-2 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="relative border-4 border-[#171717] shadow-[8px_8px_0px_0px_#171717] overflow-hidden">
              <img
                src={imageUrl}
                alt="Burger Craft restaurant interior and grill"
                className="w-full h-auto aspect-[4/3] object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-[#A82D24] text-white px-3 py-1 font-display font-extrabold text-sm uppercase tracking-wider">
                Our Lexington Flagship
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block bg-[#171717] text-[#E9B949] font-display font-extrabold uppercase text-xs tracking-[0.2em] px-3 py-1 border border-[#171717]">
              {eyebrow}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tight text-[#171717] leading-[0.95]">
              {title}
            </h2>

            <p className="text-base font-body text-[#77736E] leading-relaxed">
              {p1}
            </p>
            <p className="text-base font-body text-[#77736E] leading-relaxed">
              {p2}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E5DFD3]">
              <div className="bg-[#FFFFFF] p-4 border-2 border-[#171717]">
                <span className="block font-display font-black text-3xl sm:text-4xl text-[#A82D24] leading-none mb-1">
                  {stat1Num}
                </span>
                <span className="text-xs uppercase font-bold font-display text-[#171717]">
                  {stat1Lbl}
                </span>
              </div>
              <div className="bg-[#FFFFFF] p-4 border-2 border-[#171717]">
                <span className="block font-display font-black text-3xl sm:text-4xl text-[#A82D24] leading-none mb-1">
                  {stat2Num}
                </span>
                <span className="text-xs uppercase font-bold font-display text-[#171717]">
                  {stat2Lbl}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-display font-extrabold uppercase text-lg text-[#171717] hover:text-[#A82D24] underline underline-offset-4 transition-colors"
              >
                <span>Read Full Restaurant History</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
