import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CmsSection } from '../../types';
import { SectionHeading } from '../ui/SectionHeading';

interface CategoriesSectionProps {
  section: CmsSection;
  isEditable?: boolean;
  onSelectElement?: (field: string) => void;
  selectedField?: string | null;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  section,
  isEditable,
  onSelectElement,
  selectedField,
}) => {
  const tagline = section.content?.tagline || 'CURATED SELECTIONS';
  const heading = section.content?.heading || 'EXPLORE OUR CRAFT MENU';

  const categories = [
    {
      id: 'burgers',
      name: 'Smash Burgers',
      count: '6 Items',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      description: 'Hand-pressed Angus patties on seasoned cast iron.',
    },
    {
      id: 'chicken',
      name: 'Crispy Chicken',
      count: '4 Items',
      imageUrl: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80',
      description: 'Buttermilk-brined 24-hr fried chicken breasts & thighs.',
    },
    {
      id: 'sides',
      name: 'Hand-Cut Sides',
      count: '5 Items',
      imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
      description: 'Double-fried Idaho russet truffle fries & beer-battered rings.',
    },
    {
      id: 'combos',
      name: 'Feast Combos',
      count: '3 Bundles',
      imageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80',
      description: 'Burger, large side, and drink bundled at a discount.',
    },
    {
      id: 'drinks',
      name: 'Custard Shakes',
      count: '4 Flavors',
      imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
      description: 'Spun thick with organic Madagascar vanilla custard.',
    },
    {
      id: 'desserts',
      name: 'Bakery Sweets',
      count: '2 Items',
      imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
      description: 'Warm salted caramel tarts and chocolate ganache treats.',
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/menu?category=${cat.id}`}
              className="group relative bg-[#FFFFFF] border-2 border-[#171717] overflow-hidden hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-1 transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#F5F0E6] relative border-b-2 border-[#171717]">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 bg-[#171717] text-white font-display font-bold text-xs uppercase px-2.5 py-1 tracking-wider border border-white">
                  {cat.count}
                </span>
              </div>

              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-[#171717] group-hover:text-[#A82D24] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#77736E] font-body mt-1">
                    {cat.description}
                  </p>
                </div>
                <div className="w-9 h-9 bg-[#F5F0E6] group-hover:bg-[#A82D24] group-hover:text-white border border-[#171717] flex items-center justify-center text-[#171717] transition-colors flex-shrink-0 ml-3">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
