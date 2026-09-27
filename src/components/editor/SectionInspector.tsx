import React from 'react';
import { CmsSection, HeroSlide } from '../../types';
import { useCmsStore } from '../../stores/useCmsStore';
import { useMediaStore } from '../../stores/useMediaStore';
import {
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Sparkles,
  Plus,
  ChevronUp,
  ChevronDown,
  Layers,
} from 'lucide-react';

const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'The Double Smash King with melted cheese on toasted brioche',
    badge: '🔥 450° Cast Iron Sizzle',
    label: '100% Certified Angus Beef',
  },
  {
    id: 'slide-2',
    imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Truffle Bacon Jam Burger',
    badge: '🥓 Smoked Applewood Bacon',
    label: 'House Truffle Aioli Jam',
  },
  {
    id: 'slide-3',
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Spicy Firehouse Smash Burger',
    badge: '🌶️ Nashville Hot Glaze',
    label: 'Crispy Fried Pickles & Slaw',
  },
  {
    id: 'slide-4',
    imageUrl: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Double Cheddar Deluxe',
    badge: '🧀 Wisconsin Sharp Cheddar',
    label: 'Artisan Potato Brioche Bun',
  },
];

interface SectionInspectorProps {
  section: CmsSection;
}

export const SectionInspector: React.FC<SectionInspectorProps> = ({ section }) => {
  const {
    updateSectionContent,
    toggleSectionVisibility,
    duplicateSection,
    deleteSection,
    selectedField,
  } = useCmsStore();

  const { assets } = useMediaStore();

  const handleChange = (key: string, value: any) => {
    updateSectionContent(section.id, { [key]: value });
  };

  const content = section.content || {};

  // Slides resolution for hero section
  const heroSlides: HeroSlide[] =
    content.slides && Array.isArray(content.slides) && content.slides.length > 0
      ? content.slides
      : content.imageUrl
      ? [
          {
            id: 'slide-1',
            imageUrl: content.imageUrl,
            imageAlt: content.imageAlt || 'Craft Burger',
            badge: '🔥 450° Cast Iron Sizzle',
            label: '100% Certified Angus Beef',
          },
          ...DEFAULT_HERO_SLIDES.slice(1),
        ]
      : DEFAULT_HERO_SLIDES;

  const handleUpdateSlide = (index: number, updatedFields: Partial<HeroSlide>) => {
    const updated = [...heroSlides];
    updated[index] = { ...updated[index], ...updatedFields };
    handleChange('slides', updated);
    if (index === 0) {
      if (updatedFields.imageUrl) handleChange('imageUrl', updatedFields.imageUrl);
      if (updatedFields.imageAlt) handleChange('imageAlt', updatedFields.imageAlt);
    }
  };

  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=85',
      imageAlt: 'Artisan Crafted Burger',
      badge: '✨ Special Edition',
      label: 'House Smoked & Seared',
    };
    handleChange('slides', [...heroSlides, newSlide]);
  };

  const handleRemoveSlide = (index: number) => {
    if (heroSlides.length <= 1) return;
    const updated = heroSlides.filter((_, i) => i !== index);
    handleChange('slides', updated);
    if (index === 0 && updated.length > 0) {
      handleChange('imageUrl', updated[0].imageUrl);
      handleChange('imageAlt', updated[0].imageAlt);
    }
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= heroSlides.length) return;
    const updated = [...heroSlides];
    const [removed] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, removed);
    handleChange('slides', updated);
    if (targetIndex === 0 || index === 0) {
      handleChange('imageUrl', updated[0].imageUrl);
      handleChange('imageAlt', updated[0].imageAlt);
    }
  };

  return (
    <div className="p-5 space-y-6">
      {/* Section Header Controls */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD3]">
        <div>
          <span className="text-[10px] font-bold uppercase font-display text-[#A82D24] tracking-wider">
            {section.type.replace('_', ' ')}
          </span>
          <h3 className="font-display font-black text-xl uppercase text-[#171717]">
            {section.title}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => toggleSectionVisibility(section.id)}
            className="p-1.5 hover:bg-[#E5DFD3] text-[#171717] transition-colors"
            title={section.isVisible ? 'Hide Section' : 'Show Section'}
          >
            {section.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-[#A82D24]" />}
          </button>
          <button
            onClick={() => duplicateSection(section.id)}
            className="p-1.5 hover:bg-[#E5DFD3] text-[#171717] transition-colors"
            title="Duplicate Section"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteSection(section.id)}
            className="p-1.5 hover:bg-[#A82D24] hover:text-white text-[#171717] transition-colors"
            title="Delete Section"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Inspector Form Fields based on section type */}
      <div className="space-y-4">
        {/* HERO INSPECTOR */}
        {section.type === 'hero' && (
          <>
            {/* Hero Background Atmosphere Selector */}
            <div className="bg-[#F5F0E6] p-3 border border-[#E5DFD3] space-y-2.5">
              <label className="block text-xs font-black uppercase font-display text-[#171717] flex items-center justify-between">
                <span>Hero Background Atmosphere</span>
                <span className="text-[10px] text-[#A82D24] font-mono">Theme fit</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleChange('bgStyle', 'dark-grill');
                    handleChange('bgImageUrl', '/images/hero-restaurant-bg.jpg');
                  }}
                  className={`p-2 border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                    (content.bgStyle || 'dark-grill') === 'dark-grill'
                      ? 'border-[#A82D24] bg-white ring-2 ring-[#A82D24]'
                      : 'border-[#CCCCCC] bg-white/70 hover:border-[#171717]'
                  }`}
                >
                  <span className="text-xs font-display font-black uppercase text-[#171717]">
                    🔥 Dark Grillhouse
                  </span>
                  <span className="text-[10px] text-[#77736E] font-body line-clamp-1">
                    Warm Edison glow &amp; smoke
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleChange('bgStyle', 'warm-craft');
                    handleChange('bgImageUrl', '/images/hero-craft-parchment.jpg');
                  }}
                  className={`p-2 border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                    content.bgStyle === 'warm-craft'
                      ? 'border-[#A82D24] bg-white ring-2 ring-[#A82D24]'
                      : 'border-[#CCCCCC] bg-white/70 hover:border-[#171717]'
                  }`}
                >
                  <span className="text-xs font-display font-black uppercase text-[#171717]">
                    📜 Warm Parchment
                  </span>
                  <span className="text-[10px] text-[#77736E] font-body line-clamp-1">
                    Craft paper &amp; grill texture
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleChange('bgStyle', 'artisan-grid');
                    handleChange('bgImageUrl', '');
                  }}
                  className={`p-2 border text-left flex flex-col gap-1 transition-all cursor-pointer col-span-2 ${
                    content.bgStyle === 'artisan-grid'
                      ? 'border-[#A82D24] bg-white ring-2 ring-[#A82D24]'
                      : 'border-[#CCCCCC] bg-white/70 hover:border-[#171717]'
                  }`}
                >
                  <span className="text-xs font-display font-black uppercase text-[#171717]">
                    📐 Architectural Dot Grid
                  </span>
                  <span className="text-[10px] text-[#77736E] font-body">
                    Light cream base with subtle craft matrix and amber flare
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Badge Tagline
              </label>
              <input
                type="text"
                value={content.badge || ''}
                onChange={(e) => handleChange('badge', e.target.value)}
                className={`w-full px-3 py-2 text-sm bg-white border ${
                  selectedField === 'badge' ? 'border-[#A82D24] ring-1 ring-[#A82D24]' : 'border-[#E5DFD3]'
                } font-body`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Headline
              </label>
              <textarea
                rows={2}
                value={content.headline || ''}
                onChange={(e) => handleChange('headline', e.target.value)}
                className={`w-full px-3 py-2 text-sm bg-white border ${
                  selectedField === 'headline' ? 'border-[#A82D24] ring-1 ring-[#A82D24]' : 'border-[#E5DFD3]'
                } font-display font-black uppercase text-base`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={content.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                className={`w-full px-3 py-2 text-sm bg-white border ${
                  selectedField === 'description' ? 'border-[#A82D24] ring-1 ring-[#A82D24]' : 'border-[#E5DFD3]'
                } font-body`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Primary CTA Text
                </label>
                <input
                  type="text"
                  value={content.primaryCtaText || ''}
                  onChange={(e) => handleChange('primaryCtaText', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5DFD3]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Primary Link
                </label>
                <input
                  type="text"
                  value={content.primaryCtaLink || ''}
                  onChange={(e) => handleChange('primaryCtaLink', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5DFD3]"
                />
              </div>
            </div>

            {/* HERO PAPER-SWAP BURGER DECK (MULTIPLE IMAGES) */}
            <div
              className={`p-3 border-2 transition-all ${
                selectedField === 'slides' || selectedField === 'image'
                  ? 'border-[#E9B949] bg-[#FAF8F3] ring-2 ring-[#E9B949]/50'
                  : 'border-[#171717] bg-[#FAF8F3]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#A82D24]" />
                  <label className="text-xs font-black uppercase font-display text-[#171717]">
                    Paper-Swap Burger Cards ({heroSlides.length})
                  </label>
                </div>
                <span className="text-[10px] bg-[#E9B949] text-[#171717] px-1.5 py-0.5 font-display font-black uppercase shadow-[1px_1px_0px_0px_#171717]">
                  Interactive Deck
                </span>
              </div>
              <p className="text-[11px] text-[#77736E] font-body mb-3">
                Visitors can drag or tap to flip through these stacked paper burger cards on the homepage hero.
              </p>

              {/* Cards List */}
              <div className="space-y-3">
                {heroSlides.map((slide, sIdx) => (
                  <div
                    key={slide.id || sIdx}
                    className="p-2.5 bg-white border border-[#171717] shadow-[2px_2px_0px_0px_#171717] space-y-2"
                  >
                    {/* Card Header & Controls */}
                    <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-1.5">
                      <span className="text-[11px] font-display font-black uppercase text-[#171717] flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-[#171717] text-[#FAF8F3] inline-flex items-center justify-center text-[9px] font-bold">
                          {sIdx + 1}
                        </span>
                        Card #{sIdx + 1}
                        {sIdx === 0 && (
                          <span className="text-[9px] bg-[#A82D24] text-white px-1 py-0.2 uppercase font-bold tracking-wider">
                            Cover Card
                          </span>
                        )}
                      </span>
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          disabled={sIdx === 0}
                          onClick={() => handleMoveSlide(sIdx, 'up')}
                          className="p-1 hover:bg-[#E5DFD3] disabled:opacity-25 disabled:hover:bg-transparent text-[#171717] transition-opacity"
                          title="Move Card Up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={sIdx === heroSlides.length - 1}
                          onClick={() => handleMoveSlide(sIdx, 'down')}
                          className="p-1 hover:bg-[#E5DFD3] disabled:opacity-25 disabled:hover:bg-transparent text-[#171717] transition-opacity"
                          title="Move Card Down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={heroSlides.length <= 1}
                          onClick={() => handleRemoveSlide(sIdx)}
                          className="p-1 hover:bg-[#A82D24] hover:text-white text-[#77736E] disabled:opacity-25 disabled:hover:bg-transparent transition-colors ml-1"
                          title="Delete Card"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Preview Thumbnail + URL Input */}
                    <div className="flex gap-2 items-start">
                      <div className="w-14 h-14 border border-[#171717] bg-[#171717] flex-shrink-0 overflow-hidden shadow-[2px_2px_0px_0px_#A82D24]">
                        <img
                          src={slide.imageUrl}
                          alt={slide.imageAlt || ''}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80';
                          }}
                        />
                      </div>
                      <div className="flex-1 space-y-1.5 min-w-0">
                        <div>
                          <label className="text-[9px] font-bold uppercase font-display text-[#77736E] block mb-0.5">
                            Image URL
                          </label>
                          <input
                            type="text"
                            value={slide.imageUrl}
                            onChange={(e) => handleUpdateSlide(sIdx, { imageUrl: e.target.value })}
                            className="w-full px-2 py-1 text-xs bg-white border border-[#E5DFD3] font-mono text-[10px]"
                            placeholder="https://..."
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold uppercase font-display text-[#77736E] block mb-0.5">
                            Alt / Caption Description
                          </label>
                          <input
                            type="text"
                            value={slide.imageAlt || ''}
                            onChange={(e) => handleUpdateSlide(sIdx, { imageAlt: e.target.value })}
                            className="w-full px-2 py-1 text-xs bg-white border border-[#E5DFD3] text-[10px]"
                            placeholder="e.g. Double Smash with Melted Cheddar"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Asset Library Selector for this card */}
                    {assets.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[9px] uppercase font-bold text-[#77736E] block mb-1">
                          Select from Media Library:
                        </span>
                        <div className="flex gap-1.5 overflow-x-auto pb-1">
                          {assets.map((asset) => (
                            <button
                              key={asset.id}
                              type="button"
                              onClick={() =>
                                handleUpdateSlide(sIdx, {
                                  imageUrl: asset.url,
                                  imageAlt: asset.altText || asset.fileName,
                                })
                              }
                              className={`w-9 h-9 border flex-shrink-0 overflow-hidden hover:opacity-80 transition-all ${
                                slide.imageUrl === asset.url
                                  ? 'border-[#A82D24] ring-2 ring-[#A82D24]'
                                  : 'border-[#171717]'
                              }`}
                              title={asset.fileName}
                            >
                              <img src={asset.url} alt="" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Floating Stamps & Labels */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-[#E5DFD3]/60">
                      <div>
                        <label className="text-[9px] font-bold uppercase font-display text-[#171717] block mb-0.5">
                          Top Badge Stamp
                        </label>
                        <input
                          type="text"
                          value={slide.badge || ''}
                          onChange={(e) => handleUpdateSlide(sIdx, { badge: e.target.value })}
                          placeholder="e.g. 🔥 450° Cast Iron Sizzle"
                          className="w-full px-1.5 py-1 text-xs bg-[#FAF8F3] border border-[#E5DFD3] text-[10px]"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase font-display text-[#171717] block mb-0.5">
                          Bottom Quality Tag
                        </label>
                        <input
                          type="text"
                          value={slide.label || ''}
                          onChange={(e) => handleUpdateSlide(sIdx, { label: e.target.value })}
                          placeholder="e.g. 100% Certified Angus Beef"
                          className="w-full px-1.5 py-1 text-xs bg-[#FAF8F3] border border-[#E5DFD3] text-[10px]"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Card Button */}
                <button
                  type="button"
                  onClick={handleAddSlide}
                  className="w-full py-2 border-2 border-dashed border-[#171717] hover:border-[#A82D24] bg-white hover:bg-[#FAF8F3] text-[#171717] hover:text-[#A82D24] font-display font-black text-xs uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Burger Card</span>
                </button>
              </div>
            </div>

            {/* Background Color Solid Tokens */}
            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Background Palette (Solid Colors Only)
              </label>
              <div className="flex gap-2">
                {[
                  { name: 'Off-White', color: '#FAF8F3', text: '#171717' },
                  { name: 'Warm Cream', color: '#F5F0E6', text: '#171717' },
                  { name: 'Charcoal', color: '#171717', text: '#FAF8F3' },
                  { name: 'Deep Red', color: '#A82D24', text: '#FFFFFF' },
                ].map((palette) => (
                  <button
                    key={palette.color}
                    type="button"
                    onClick={() => {
                      handleChange('backgroundColor', palette.color);
                      handleChange('textColor', palette.text);
                    }}
                    style={{ backgroundColor: palette.color }}
                    className={`w-8 h-8 border-2 ${
                      content.backgroundColor === palette.color ? 'border-[#E9B949] ring-2 ring-[#171717]' : 'border-[#171717]'
                    } cursor-pointer`}
                    title={palette.name}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* PROMO FEATURE INSPECTOR */}
        {section.type === 'promo_feature' && (
          <>
            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Promo Tag
              </label>
              <input
                type="text"
                value={content.tag || ''}
                onChange={(e) => handleChange('tag', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5DFD3]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Headline
              </label>
              <input
                type="text"
                value={content.headline || ''}
                onChange={(e) => handleChange('headline', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#E5DFD3] font-display font-black uppercase"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Discount Badge
              </label>
              <input
                type="text"
                value={content.discountBadge || ''}
                onChange={(e) => handleChange('discountBadge', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5DFD3]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={content.ctaText || ''}
                onChange={(e) => handleChange('ctaText', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5DFD3]"
              />
            </div>
          </>
        )}

        {/* GENERIC HEADLINE / TAGLINE EDITING FOR OTHER SECTIONS */}
        {(section.type === 'categories' ||
          section.type === 'signature_burgers' ||
          section.type === 'why_choose_us' ||
          section.type === 'best_sellers' ||
          section.type === 'brand_story' ||
          section.type === 'reviews' ||
          section.type === 'locations' ||
          section.type === 'newsletter') && (
          <>
            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Tagline / Eyebrow
              </label>
              <input
                type="text"
                value={content.tagline || content.eyebrow || ''}
                onChange={(e) => handleChange(content.eyebrow !== undefined ? 'eyebrow' : 'tagline', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5DFD3]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={content.heading || content.title || ''}
                onChange={(e) => handleChange(content.title !== undefined ? 'title' : 'heading', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#E5DFD3] font-display font-black uppercase"
              />
            </div>
            {content.description !== undefined && (
              <div>
                <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={content.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E5DFD3] font-body"
                />
              </div>
            )}
          </>
        )}
      </div>

      <div className="pt-4 border-t border-[#E5DFD3] bg-[#F5F0E6] p-3 text-[11px] text-[#77736E] font-body">
        All changes apply directly to the live preview canvas in real-time. Remember to click <strong>Publish</strong> on the top bar to push to the live customer website.
      </div>
    </div>
  );
};
