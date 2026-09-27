import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Monitor,
  Tablet,
  Smartphone,
  Check,
  UploadCloud,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Plus,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useCmsStore } from '../../stores/useCmsStore';
import { SectionRenderer } from '../homepage/SectionRenderer';
import { SectionInspector } from './SectionInspector';
import { HeaderLogoInspector } from './HeaderLogoInspector';
import { BrandLogo } from '../common/BrandLogo';
import { SectionType } from '../../types';

export const VisualHomepageEditor: React.FC = () => {
  const {
    draftSections,
    selectedSectionId,
    selectedField,
    previewDevice,
    isDirty,
    selectSection,
    setPreviewDevice,
    reorderSection,
    toggleSectionVisibility,
    addSection,
    saveDraft,
    publishChanges,
    discardDraft,
    undo,
    redo,
    historyIndex,
    history,
  } = useCmsStore();

  const [publishSuccess, setPublishSuccess] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [leftDockOpen, setLeftDockOpen] = useState(true);
  const [rightDockOpen, setRightDockOpen] = useState(true);

  const selectedSection = draftSections.find((s) => s.id === selectedSectionId);

  const handlePublish = () => {
    publishChanges();
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 2500);
  };

  const handleSelectSection = (id: string, field?: string) => {
    selectSection(id, field);
    // On smaller screens, automatically open inspector when an element/section is clicked
    if (window.innerWidth < 1280) {
      setRightDockOpen(true);
    }
  };

  const availableSectionTypes: { type: SectionType; label: string }[] = [
    { type: 'hero', label: 'Hero Banner' },
    { type: 'categories', label: 'Categories Showcase' },
    { type: 'signature_burgers', label: 'Signature Burgers' },
    { type: 'promo_feature', label: 'Promotional Feature' },
    { type: 'why_choose_us', label: 'Why Choose Us' },
    { type: 'best_sellers', label: 'Best Sellers' },
    { type: 'build_burger', label: 'Build Your Burger Teaser' },
    { type: 'brand_story', label: 'Brand Heritage Story' },
    { type: 'reviews', label: 'Customer Reviews' },
    { type: 'locations', label: 'Restaurant Locations' },
    { type: 'newsletter', label: 'Newsletter Subscription' },
    { type: 'social_gallery', label: 'Social / Instagram Gallery' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#1E1E1E] text-[#FAF8F3] overflow-hidden select-none">
      {/* 1. TOP TOOLBAR */}
      <header className="h-14 bg-[#171717] border-b-2 border-[#333333] px-3 sm:px-4 flex items-center justify-between z-30 flex-shrink-0 gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            to="/admin"
            className="touch-target flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#2A2A2A] hover:bg-[#A82D24] text-white text-xs font-display font-bold uppercase tracking-wider transition-colors border border-[#444444]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <div className="hidden sm:block h-5 w-[1px] bg-[#333333]" />

          {/* Panel toggles for responsive viewports */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLeftDockOpen(!leftDockOpen)}
              className={`p-1.5 border transition-colors cursor-pointer text-xs font-display uppercase font-bold flex items-center gap-1 ${
                leftDockOpen
                  ? 'bg-[#A82D24] text-white border-[#A82D24]'
                  : 'bg-[#262626] text-white/70 border-[#333333] hover:text-white'
              }`}
              title="Toggle Sections Dock"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sections</span>
            </button>
            <button
              onClick={() => setRightDockOpen(!rightDockOpen)}
              className={`p-1.5 border transition-colors cursor-pointer text-xs font-display uppercase font-bold flex items-center gap-1 ${
                rightDockOpen
                  ? 'bg-[#A82D24] text-white border-[#A82D24]'
                  : 'bg-[#262626] text-white/70 border-[#333333] hover:text-white'
              }`}
              title="Toggle Inspector"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Inspector</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <span className="font-display font-black text-sm uppercase tracking-tight text-white truncate">
              Homepage CMS
            </span>
            {isDirty ? (
              <span className="text-[10px] bg-[#E9B949] text-[#171717] font-extrabold px-1.5 py-0.2 border border-[#171717]">
                Draft
              </span>
            ) : (
              <span className="text-[10px] bg-[#2A2A2A] text-white/70 font-bold px-1.5 py-0.2 border border-[#444444]">
                Live
              </span>
            )}
          </div>
        </div>

        {/* Center: Device toggles and Undo/Redo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 bg-[#262626] p-1 border border-[#333333]">
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="p-1.5 hover:bg-[#333333] disabled:opacity-30 disabled:hover:bg-transparent text-white transition-colors cursor-pointer"
              title="Undo"
            >
              <Undo2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </button>
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 hover:bg-[#333333] disabled:opacity-30 disabled:hover:bg-transparent text-white transition-colors cursor-pointer"
              title="Redo"
            >
              <Redo2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 bg-[#262626] p-1 border border-[#333333]">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`p-1.5 transition-colors cursor-pointer ${
                previewDevice === 'desktop'
                  ? 'bg-[#A82D24] text-white'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Desktop View (100%)"
            >
              <Monitor className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice('tablet')}
              className={`p-1.5 transition-colors cursor-pointer ${
                previewDevice === 'tablet'
                  ? 'bg-[#A82D24] text-white'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`p-1.5 transition-colors cursor-pointer ${
                previewDevice === 'mobile'
                  ? 'bg-[#A82D24] text-white'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Mobile View (375px)"
            >
              <Smartphone className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Discard */}
          {isDirty && (
            <button
              onClick={discardDraft}
              className="hidden md:inline-flex px-2.5 py-1.5 text-xs font-display uppercase font-bold text-white/70 hover:text-white hover:bg-[#2A2A2A] transition-colors border border-[#444444] cursor-pointer"
            >
              Discard
            </button>
          )}

          {/* Save Draft */}
          <button
            onClick={saveDraft}
            disabled={!isDirty}
            className="px-2.5 sm:px-3 py-1.5 bg-[#2A2A2A] hover:bg-[#3A3A3A] disabled:opacity-40 text-white text-xs font-display font-bold uppercase tracking-wider transition-colors border border-[#444444] cursor-pointer"
          >
            Draft
          </button>

          {/* Publish */}
          <button
            onClick={handlePublish}
            className={`px-3 sm:px-4 py-1.5 font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border ${
              publishSuccess
                ? 'bg-green-700 text-white border-green-600'
                : 'bg-[#A82D24] hover:bg-[#8C231B] text-white border-[#A82D24]'
            }`}
          >
            {publishSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Live!</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Publish</span>
              </>
            )}
          </button>

          {/* View Live */}
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 bg-[#2A2A2A] hover:bg-[#333333] text-white border border-[#444444] transition-colors"
            title="View Live Customer Website"
          >
            <ExternalLink className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </Link>
        </div>
      </header>
      {/* 2. MAIN WORKSPACE (LEFT DOCK + CENTER CANVAS + RIGHT INSPECTOR) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile backdrop for docks */}
        {(leftDockOpen || rightDockOpen) && (
          <div
            className="fixed inset-0 bg-black/60 z-30 xl:hidden"
            onClick={() => {
              setLeftDockOpen(false);
              setRightDockOpen(false);
            }}
            aria-hidden="true"
          />
        )}

        {/* LEFT DOCK: Sections List & Ordering */}
        {leftDockOpen && (
          <aside className="fixed inset-y-14 left-0 z-40 xl:static w-72 bg-[#171717] border-r border-[#333333] flex flex-col justify-between flex-shrink-0 shadow-2xl xl:shadow-none">
            <div className="p-3 border-b border-[#333333] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#E9B949]" />
                <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">
                  Sections Layout ({draftSections.length})
                </h3>
              </div>

              <div className="flex items-center gap-1">
                <div className="relative">
                  <button
                    onClick={() => setShowAddMenu(!showAddMenu)}
                    className="p-1 bg-[#A82D24] hover:bg-[#8C231B] text-white rounded-[2px] transition-colors cursor-pointer"
                    title="Add Section"
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                  {showAddMenu && (
                    <div className="absolute left-0 mt-2 w-56 bg-[#262626] border-2 border-[#171717] shadow-xl z-50 py-1 max-h-80 overflow-y-auto">
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-[#FAF8F3]/60 font-display border-b border-[#333333]">
                        Choose Section to Insert
                      </div>
                      {availableSectionTypes.map((item) => (
                        <button
                          key={item.type}
                          onClick={() => {
                            addSection(item.type);
                            setShowAddMenu(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-display uppercase font-bold text-white hover:bg-[#A82D24] transition-colors block cursor-pointer"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setLeftDockOpen(false)}
                  className="xl:hidden p-1 text-white/60 hover:text-white cursor-pointer"
                  aria-label="Close sections dock"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Section Items */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {/* Pinned Header & Brand Logo */}
              <div
                onClick={() => handleSelectSection('header-brand-logo')}
                className={`p-2.5 border transition-all cursor-pointer flex items-center justify-between gap-2 mb-2 rounded-[2px] ${
                  selectedSectionId === 'header-brand-logo'
                    ? 'bg-[#A82D24] text-white border-[#A82D24] shadow-[2px_2px_0px_0px_#171717]'
                    : 'bg-[#262626] text-[#E9B949] border-[#444444] hover:border-[#E9B949]'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Sparkles className="w-4 h-4 text-[#E9B949] flex-shrink-0" />
                  <span className="font-display font-black text-xs uppercase truncate">
                    Header &amp; Brand Logo
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase bg-black/50 px-1.5 py-0.5 rounded text-white/90 font-bold">
                  Brand
                </span>
              </div>

              {draftSections.map((sec, idx) => {
                const isSelected = sec.id === selectedSectionId;
                return (
                  <div
                    key={sec.id}
                    onClick={() => handleSelectSection(sec.id)}
                    className={`p-2.5 border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#A82D24] text-white border-[#A82D24] shadow-[2px_2px_0px_0px_#171717]'
                        : 'bg-[#222222] text-[#FAF8F3] border-[#333333] hover:border-[#666666]'
                    } ${!sec.isVisible ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-mono text-white/50">{idx + 1}</span>
                      <span className="font-display font-bold text-xs uppercase truncate">
                        {sec.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          reorderSection(idx, 'up');
                        }}
                        disabled={idx === 0}
                        className="p-1 hover:bg-black/30 disabled:opacity-20 cursor-pointer"
                        title="Move Up"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          reorderSection(idx, 'down');
                        }}
                        disabled={idx === draftSections.length - 1}
                        className="p-1 hover:bg-black/30 disabled:opacity-20 cursor-pointer"
                        title="Move Down"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSectionVisibility(sec.id);
                        }}
                        className="p-1 hover:bg-black/30 cursor-pointer"
                        title={sec.isVisible ? 'Hide' : 'Show'}
                      >
                        {sec.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 border-t border-[#333333] bg-[#141414] text-[11px] text-[#FAF8F3]/60 font-body">
              Click any section in the list or directly in the center preview to inspect and edit.
            </div>
          </aside>
        )}

        {/* CENTER: LIVE CANVAS PREVIEW */}
        <main className="flex-1 bg-[#2B2B2B] overflow-x-auto overflow-y-auto p-2 sm:p-6 md:p-8 flex justify-center">
          <div
            className={`transition-all duration-300 bg-[#FAF8F3] text-[#171717] min-h-full border-2 sm:border-4 border-[#171717] shadow-2xl relative ${
              previewDevice === 'desktop'
                ? 'w-full max-w-[1280px]'
                : previewDevice === 'tablet'
                ? 'w-[768px] min-w-[768px]'
                : 'w-[375px] min-w-[375px]'
            }`}
          >
            {/* Visual Editor Hint Overlay */}
            <div className="bg-[#171717] text-[#E9B949] text-center py-1 px-2 text-[10px] sm:text-[11px] font-display font-bold uppercase tracking-wider sticky top-0 z-20 border-b border-[#333333] truncate">
              Interactive CMS Preview · Click any text, button, or photo to edit live
            </div>

            {/* Interactive Site Header & Brand Logo on Canvas */}
            <div
              onClick={() => handleSelectSection('header-brand-logo')}
              className={`relative transition-all cursor-pointer bg-[#FAF8F3] border-b-2 border-[#171717] ${
                selectedSectionId === 'header-brand-logo'
                  ? 'ring-4 ring-[#A82D24] ring-offset-2 z-20'
                  : 'hover:ring-2 hover:ring-[#171717]/50'
              }`}
            >
              {/* Floating section tag */}
              {selectedSectionId === 'header-brand-logo' && (
                <div className="absolute top-2 left-2 z-30 bg-[#A82D24] text-white px-2.5 py-0.5 text-[10px] font-display font-bold uppercase tracking-wider shadow flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Active: Header &amp; Brand Logo</span>
                </div>
              )}

              <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between">
                <div className="group">
                  <BrandLogo variant="navbar" />
                </div>

                <div className="hidden md:flex items-center gap-6 font-display font-bold text-xs uppercase text-[#171717]/70">
                  <span>Menu</span>
                  <span>Deals</span>
                  <span>Build Burger</span>
                  <span>About</span>
                  <span>Locations</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-display font-black uppercase tracking-wider bg-[#171717] text-[#E9B949] px-2.5 py-1 border border-[#171717] hover:bg-[#A82D24] hover:text-white transition-colors">
                    Edit Brand Logo →
                  </span>
                </div>
              </div>
            </div>

            {/* Render all sections */}
            {draftSections.map((sec) => (
              <div
                key={sec.id}
                onClick={() => handleSelectSection(sec.id)}
                className={`relative transition-all ${
                  sec.id === selectedSectionId
                    ? 'ring-4 ring-[#A82D24] ring-offset-2 z-10'
                    : 'hover:ring-2 hover:ring-[#171717]/50'
                }`}
              >
                {/* Floating section tag */}
                {sec.id === selectedSectionId && (
                  <div className="absolute top-2 left-2 z-30 bg-[#A82D24] text-white px-2.5 py-0.5 text-[10px] font-display font-bold uppercase tracking-wider shadow">
                    Active Section: {sec.title}
                  </div>
                )}

                <SectionRenderer
                  section={sec}
                  isEditable={true}
                  onSelectElement={(field) => handleSelectSection(sec.id, field)}
                  selectedField={sec.id === selectedSectionId ? selectedField : null}
                />
              </div>
            ))}
          </div>
        </main>

        {/* RIGHT DOCK: Contextual Inspector */}
        {rightDockOpen && (
          <aside className="fixed inset-y-14 right-0 z-40 xl:static w-80 sm:w-96 bg-[#FAF8F3] text-[#171717] border-l-2 border-[#171717] overflow-y-auto flex-shrink-0 shadow-2xl xl:shadow-none">
            <div className="p-3 bg-[#F5F0E6] border-b border-[#E5DFD3] flex items-center justify-between xl:hidden">
              <span className="font-display font-bold text-xs uppercase text-[#171717]">
                Element Inspector
              </span>
              <button
                onClick={() => setRightDockOpen(false)}
                className="p-1 text-[#171717] hover:bg-[#A82D24] hover:text-white cursor-pointer"
                aria-label="Close inspector"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {selectedSectionId === 'header-brand-logo' ? (
              <HeaderLogoInspector />
            ) : selectedSection ? (
              <SectionInspector section={selectedSection} />
            ) : (
              <div className="p-8 text-center text-[#77736E]">
                <p className="text-sm font-body">Select a section or the Header &amp; Brand Logo to inspect and edit.</p>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
};
