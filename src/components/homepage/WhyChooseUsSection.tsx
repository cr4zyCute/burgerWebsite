import React from 'react';
import { Flame, Beef, Wheat, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';
import { CmsSection } from '../../types';
import { SectionHeading } from '../ui/SectionHeading';

interface WhyChooseUsSectionProps {
  section: CmsSection;
  isEditable?: boolean;
  onSelectElement?: (field: string) => void;
  selectedField?: string | null;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
  section,
  isEditable,
  onSelectElement,
  selectedField,
}) => {
  const tagline = section.content?.tagline || 'THE CRAFT PHILOSOPHY';
  const heading = section.content?.heading || 'UNCOMPROMISING QUALITY IN EVERY DETAIL';

  const defaultItems = [
    {
      id: 'why-1',
      icon: Flame,
      title: 'Cast-Iron Smashed',
      description: 'Pressed with 30 lbs of force on 450° cast iron for the crunchiest caramelized lace crust.',
    },
    {
      id: 'why-2',
      icon: Beef,
      title: '28-Day Dry-Aged Angus',
      description: 'Custom triple blend of brisket, chuck, and short rib from upstate New York family farms.',
    },
    {
      id: 'why-3',
      icon: Wheat,
      title: 'Artisan Brioche Buns',
      description: 'Baked fresh every morning with pure grade-A European butter. Pillowy, toasted, and rich.',
    },
    {
      id: 'why-4',
      icon: Clock,
      title: 'Cooked Strictly to Order',
      description: 'Never pre-cooked, never under heat lamps. Seared fresh within minutes of your ticket.',
    },
    {
      id: 'why-5',
      icon: ShieldCheck,
      title: 'Zero Artificial Additives',
      description: 'No preservatives, no fillers, no high-fructose corn syrup in our signature sauces.',
    },
    {
      id: 'why-6',
      icon: HeartHandshake,
      title: 'Community First',
      description: 'Partnering with local bakeries, creamery churns, and sustainable regenerative agriculture.',
    },
  ];

  return (
    <section className="py-20 bg-[#FAF8F3] border-b-2 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          onClick={() => isEditable && onSelectElement?.('heading')}
          className={
            isEditable && selectedField === 'heading'
              ? 'outline-2 outline-dashed outline-[#A82D24] p-2'
              : ''
          }
        >
          <SectionHeading tagline={tagline} heading={heading} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-[#FFFFFF] border-2 border-[#171717] p-8 shadow-[4px_4px_0px_0px_#171717] flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[#F5F0E6] border-2 border-[#171717] flex items-center justify-center text-[#A82D24] mb-6">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-[#171717] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm font-body text-[#77736E] leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E5DFD3] flex items-center gap-1.5 text-[11px] font-bold uppercase font-display text-[#70452D]">
                  <span>Craft Standard Certified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
