import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CmsSection } from '../../types';
import { useProductStore } from '../../stores/useProductStore';
import { ProductCard } from '../products/ProductCard';
import { SectionHeading } from '../ui/SectionHeading';

interface SignatureBurgersSectionProps {
  section: CmsSection;
  isEditable?: boolean;
  onSelectElement?: (field: string) => void;
  selectedField?: string | null;
}

export const SignatureBurgersSection: React.FC<SignatureBurgersSectionProps> = ({
  section,
  isEditable,
  onSelectElement,
  selectedField,
}) => {
  const { getFeaturedProducts } = useProductStore();
  const featured = getFeaturedProducts().slice(0, 4);

  const tagline = section.content?.tagline || 'CHEF SELECTIONS';
  const heading = section.content?.heading || 'OUR SIGNATURE CREATIONS';
  const description =
    section.content?.description ||
    'Every burger is ground fresh in-house every single morning and pressed to sizzling perfection.';

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
          <SectionHeading tagline={tagline} heading={heading} description={description} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-[#171717] hover:bg-[#A82D24] text-white font-display font-extrabold uppercase text-lg px-8 py-3.5 border-2 border-[#171717] transition-colors"
          >
            <span>View Full 24-Item Menu</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
