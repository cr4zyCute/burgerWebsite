import React from 'react';
import { Star, Quote } from 'lucide-react';
import { CmsSection } from '../../types';
import { useReviewsStore } from '../../stores/useReviewsStore';
import { SectionHeading } from '../ui/SectionHeading';

interface ReviewsSectionProps {
  section: CmsSection;
  isEditable?: boolean;
  onSelectElement?: (field: string) => void;
  selectedField?: string | null;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  section,
  isEditable,
  onSelectElement,
  selectedField,
}) => {
  const { getApprovedReviews } = useReviewsStore();
  const reviews = getApprovedReviews().slice(0, 3);

  const tagline = section.content?.tagline || 'CUSTOMER VOICES';
  const heading = section.content?.heading || 'WHAT OUR GUESTS ARE SAYING';

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
          <SectionHeading
            tagline={tagline}
            heading={heading}
            description="Verified reviews from genuine in-store diners and online pickup guests."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FFFFFF] border-2 border-[#171717] p-8 shadow-[6px_6px_0px_0px_#171717] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#E9B949]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#E9B949]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#A82D24]/30" />
                </div>

                <p className="font-editorial italic text-[#171717] text-base leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5DFD3] flex items-center gap-3">
                {rev.avatarUrl ? (
                  <img
                    src={rev.avatarUrl}
                    alt={rev.customerName}
                    className="w-10 h-10 rounded-full border border-[#171717] object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#F5F0E6] border border-[#171717] flex items-center justify-center font-display font-bold text-sm">
                    {rev.customerName[0]}
                  </div>
                )}
                <div>
                  <h4 className="font-display font-black text-base uppercase text-[#171717]">
                    {rev.customerName}
                  </h4>
                  {rev.productName && (
                    <span className="text-[11px] text-[#A82D24] font-bold block uppercase font-display">
                      Ordered: {rev.productName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
