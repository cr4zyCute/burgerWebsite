import React from 'react';
import { CmsSection } from '../../types';
import { useCmsStore } from '../../stores/useCmsStore';
import { useMediaStore } from '../../stores/useMediaStore';
import { Trash2, Copy, Eye, EyeOff, Image as ImageIcon, Sparkles } from 'lucide-react';

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

            {/* Image replacement */}
            <div>
              <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1 flex items-center justify-between">
                <span>Hero Food Photo</span>
                <span className="text-[10px] text-[#A82D24]">Authentic Photography</span>
              </label>
              <input
                type="text"
                value={content.imageUrl || ''}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5DFD3] font-mono text-[11px] mb-2"
                placeholder="Image URL"
              />
              {/* Media picker shortcuts */}
              <div className="flex gap-1.5 overflow-x-auto py-1">
                {assets.map((asset) => (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => {
                      handleChange('imageUrl', asset.url);
                      handleChange('imageAlt', asset.altText);
                    }}
                    className="w-12 h-12 border border-[#171717] flex-shrink-0 overflow-hidden hover:opacity-80 cursor-pointer"
                    title={asset.fileName}
                  >
                    <img src={asset.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
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
