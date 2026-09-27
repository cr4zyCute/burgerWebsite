import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CmsSection, SectionType } from '../types';
import { INITIAL_CMS_SECTIONS } from '../db/seed-data';

interface CmsState {
  publishedSections: CmsSection[];
  draftSections: CmsSection[];
  selectedSectionId: string | null;
  selectedField: string | null;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  isDirty: boolean;
  history: CmsSection[][];
  historyIndex: number;

  // Actions
  selectSection: (id: string | null, field?: string | null) => void;
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  updateSectionContent: (id: string, partialContent: Record<string, any>) => void;
  reorderSection: (index: number, direction: 'up' | 'down') => void;
  toggleSectionVisibility: (id: string) => void;
  duplicateSection: (id: string) => void;
  deleteSection: (id: string) => void;
  addSection: (type: SectionType) => void;
  saveDraft: () => void;
  publishChanges: () => void;
  discardDraft: () => void;
  undo: () => void;
  redo: () => void;
  resetToDefault: () => void;
}

export const useCmsStore = create<CmsState>()(
  persist(
    (set, get) => ({
      publishedSections: INITIAL_CMS_SECTIONS,
      draftSections: INITIAL_CMS_SECTIONS,
      selectedSectionId: 'sec-hero',
      selectedField: 'headline',
      previewDevice: 'desktop',
      isDirty: false,
      history: [INITIAL_CMS_SECTIONS],
      historyIndex: 0,

      selectSection: (id, field = null) => {
        set({ selectedSectionId: id, selectedField: field });
      },

      setPreviewDevice: (device) => {
        set({ previewDevice: device });
      },

      updateSectionContent: (id, partialContent) => {
        const { draftSections, history, historyIndex } = get();
        const updated = draftSections.map((sec) => {
          if (sec.id === id) {
            return {
              ...sec,
              content: {
                ...sec.content,
                ...partialContent,
              },
            };
          }
          return sec;
        });

        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(updated);

        set({
          draftSections: updated,
          isDirty: true,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      reorderSection: (index, direction) => {
        const { draftSections } = get();
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= draftSections.length) return;

        const updated = [...draftSections];
        const [moved] = updated.splice(index, 1);
        updated.splice(targetIndex, 0, moved);

        set({ draftSections: updated, isDirty: true });
      },

      toggleSectionVisibility: (id) => {
        const { draftSections } = get();
        const updated = draftSections.map((sec) =>
          sec.id === id ? { ...sec, isVisible: !sec.isVisible } : sec
        );
        set({ draftSections: updated, isDirty: true });
      },

      duplicateSection: (id) => {
        const { draftSections } = get();
        const index = draftSections.findIndex((s) => s.id === id);
        if (index === -1) return;

        const source = draftSections[index];
        const clone: CmsSection = {
          ...source,
          id: `sec-${Date.now()}`,
          title: `${source.title} (Copy)`,
          content: JSON.parse(JSON.stringify(source.content)),
        };

        const updated = [...draftSections];
        updated.splice(index + 1, 0, clone);
        set({ draftSections: updated, isDirty: true, selectedSectionId: clone.id });
      },

      deleteSection: (id) => {
        const { draftSections } = get();
        const updated = draftSections.filter((s) => s.id !== id);
        set({
          draftSections: updated,
          isDirty: true,
          selectedSectionId: updated.length > 0 ? updated[0].id : null,
        });
      },

      addSection: (type) => {
        const { draftSections } = get();
        const defaultTitles: Record<SectionType, string> = {
          announcement: 'Announcement Bar',
          hero: 'Hero Section',
          categories: 'Categories Showcase',
          signature_burgers: 'Signature Burgers',
          promo_feature: 'Promotional Feature',
          why_choose_us: 'Why Choose Us',
          best_sellers: 'Best Sellers',
          build_burger: 'Build Your Burger',
          brand_story: 'Brand Heritage Story',
          reviews: 'Customer Reviews',
          locations: 'Restaurant Locations',
          newsletter: 'Newsletter Subscription',
          social_gallery: 'Instagram / Social Gallery',
          footer: 'Footer Information',
        };

        const newSection: CmsSection = {
          id: `sec-${Date.now()}`,
          type,
          title: defaultTitles[type] || 'New Section',
          isVisible: true,
          content: {}, // section renderers have robust fallbacks
        };

        set({
          draftSections: [...draftSections, newSection],
          isDirty: true,
          selectedSectionId: newSection.id,
        });
      },

      saveDraft: () => {
        set({ isDirty: false });
      },

      publishChanges: () => {
        const { draftSections } = get();
        set({
          publishedSections: JSON.parse(JSON.stringify(draftSections)),
          isDirty: false,
        });
      },

      discardDraft: () => {
        const { publishedSections } = get();
        set({
          draftSections: JSON.parse(JSON.stringify(publishedSections)),
          isDirty: false,
        });
      },

      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
          const prev = history[historyIndex - 1];
          set({
            draftSections: prev,
            historyIndex: historyIndex - 1,
            isDirty: true,
          });
        }
      },

      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
          const next = history[historyIndex + 1];
          set({
            draftSections: next,
            historyIndex: historyIndex + 1,
            isDirty: true,
          });
        }
      },

      resetToDefault: () => {
        set({
          publishedSections: INITIAL_CMS_SECTIONS,
          draftSections: INITIAL_CMS_SECTIONS,
          selectedSectionId: 'sec-hero',
          isDirty: false,
        });
      },
    }),
    {
      name: 'burger-craft-cms',
    }
  )
);
