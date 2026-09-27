import React from 'react';
import { CmsSection } from '../../types';
import { useProductStore } from '../../stores/useProductStore';
import { ProductCard } from '../products/ProductCard';
import { SectionHeading } from '../ui/SectionHeading';

interface BestSellersSectionProps {
  section: CmsSection;
  isEditable?: boolean;
  onSelectElement?: (field: string) => void;
  selectedField?: string | null;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  section,
  isEditable,
  onSelectElement,
  selectedField,
}) => {
  const { getBestSellers } = useProductStore();
  const bestSellers = getBestSellers();

  const tagline = section.content?.tagline || 'CROWD FAVORITES';
  const heading = section.content?.heading || 'TOP ORDERED ITEMS THIS WEEK';

  return (
    <section className="py-20 bg-[#F5F0E6] border-b-2 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          onClick={() => isEditable && onSelectElement?.('heading')}
          className={
            isEditable && selectedField === 'heading'
              ? 'outline-2 outline-dashed outline-[#A82D24] p-2'
              : ''
          }
        >
          <SectionHeading
            tagline={tagline}
            heading={heading}
            description="Our most popular signature items ranked strictly by real completed customer orders."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
