import React from 'react';
import { InstagramIcon } from '../ui/SocialIcons';
import { CmsSection } from '../../types';
import { SectionHeading } from '../ui/SectionHeading';

interface SocialGallerySectionProps {
  section: CmsSection;
  isEditable?: boolean;
  onSelectElement?: (field: string) => void;
  selectedField?: string | null;
}

export const SocialGallerySection: React.FC<SocialGallerySectionProps> = ({
  section,
  isEditable,
  onSelectElement,
  selectedField,
}) => {
  const tagline = section.content?.tagline || '@BURGERCRAFTNYC';
  const heading = section.content?.heading || 'TAG US IN YOUR CRAFT CREATIONS';
  const images = section.content?.images || [
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
  ];

  return (
    <section className="py-20 bg-[#FAF8F3] border-b-2 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tagline={tagline}
          heading={heading}
          description="Follow our kitchen antics, seasonal drops, and fan burgers on Instagram."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {images.map((img: string, index: number) => (
            <a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square bg-[#171717] border-2 border-[#171717] overflow-hidden block"
            >
              <img
                src={img}
                alt={`Customer craft burger photo ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-[#171717]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <InstagramIcon className="w-6 h-6" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
