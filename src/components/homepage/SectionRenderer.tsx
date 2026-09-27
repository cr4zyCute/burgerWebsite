import React from 'react';
import { motion } from 'framer-motion';
import { CmsSection } from '../../types';
import { HeroSection } from './HeroSection';
import { CategoriesSection } from './CategoriesSection';
import { SignatureBurgersSection } from './SignatureBurgersSection';
import { PromoBannerSection } from './PromoBannerSection';
import { WhyChooseUsSection } from './WhyChooseUsSection';
import { BestSellersSection } from './BestSellersSection';
import { BuildBurgerTeaserSection } from './BuildBurgerTeaserSection';
import { BrandStorySection } from './BrandStorySection';
import { ReviewsSection } from './ReviewsSection';
import { LocationsSection } from './LocationsSection';
import { NewsletterSection } from './NewsletterSection';
import { SocialGallerySection } from './SocialGallerySection';

interface SectionRendererProps {
  section: CmsSection;
  isEditable?: boolean;
  onSelectElement?: (field: string) => void;
  selectedField?: string | null;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  isEditable = false,
  onSelectElement,
  selectedField,
}) => {
  if (!section.isVisible) return null;

  const renderContent = () => {
    switch (section.type) {
      case 'hero':
        return (
          <HeroSection
            section={section}
            isEditable={isEditable}
            onSelectElement={onSelectElement}
            selectedField={selectedField}
          />
        );
      case 'categories':
        return (
          <CategoriesSection
            section={section}
            isEditable={isEditable}
            onSelectElement={onSelectElement}
            selectedField={selectedField}
          />
        );
      case 'signature_burgers':
        return (
          <SignatureBurgersSection
            section={section}
            isEditable={isEditable}
            onSelectElement={onSelectElement}
            selectedField={selectedField}
          />
        );
      case 'promo_feature':
        return (
          <PromoBannerSection
            section={section}
            isEditable={isEditable}
            onSelectElement={onSelectElement}
            selectedField={selectedField}
          />
        );
      case 'why_choose_us':
        return (
          <WhyChooseUsSection
            section={section}
            isEditable={isEditable}
            onSelectElement={onSelectElement}
            selectedField={selectedField}
          />
        );
      case 'best_sellers':
        return (
          <BestSellersSection
            section={section}
            isEditable={isEditable}
            onSelectElement={onSelectElement}
            selectedField={selectedField}
          />
        );
      case 'build_burger':
        return (
          <BuildBurgerTeaserSection
            section={section}
            isEditable={isEditable}
            onSelectElement={onSelectElement}
            selectedField={selectedField}
          />
        );
      case 'brand_story':
        return (
          <BrandStorySection
            section={section}
            isEditable={isEditable}
            onSelectElement={onSelectElement}
            selectedField={selectedField}
          />
        );
      case 'reviews':
        return (
          <ReviewsSection
            section={section}
            isEditable={isEditable}
            onSelectElement={onSelectElement}
            selectedField={selectedField}
          />
        );
      case 'locations':
        return (
          <LocationsSection
            section={section}
            isEditable={isEditable}
            onSelectElement={onSelectElement}
            selectedField={selectedField}
          />
        );
      case 'newsletter':
        return (
          <NewsletterSection
            section={section}
            isEditable={isEditable}
            onSelectElement={onSelectElement}
            selectedField={selectedField}
          />
        );
      case 'social_gallery':
        return (
          <SocialGallerySection
            section={section}
            isEditable={isEditable}
            onSelectElement={onSelectElement}
            selectedField={selectedField}
          />
        );
      default:
        return null;
    }
  };

  const content = renderContent();
  if (!content) return null;

  if (isEditable || section.type === 'hero') {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {content}
    </motion.div>
  );
};
