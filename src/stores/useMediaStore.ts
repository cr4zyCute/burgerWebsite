import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MediaAsset } from '../types';
import { SEED_MEDIA_ASSETS } from '../db/seed-data';

interface MediaState {
  assets: MediaAsset[];
  addAsset: (asset: Omit<MediaAsset, 'id' | 'createdAt' | 'usageCount'>) => MediaAsset;
  updateAsset: (id: string, updates: Partial<MediaAsset>) => void;
  deleteAsset: (id: string) => { success: boolean; message: string };
  searchAssets: (query: string, category?: string) => MediaAsset[];
}

export const useMediaStore = create<MediaState>()(
  persist(
    (set, get) => ({
      assets: SEED_MEDIA_ASSETS,

      addAsset: (data) => {
        const newAsset: MediaAsset = {
          ...data,
          id: `media-${Date.now()}`,
          createdAt: new Date().toISOString(),
          usageCount: 0,
        };
        set((state) => ({ assets: [newAsset, ...state.assets] }));
        return newAsset;
      },

      updateAsset: (id, updates) => {
        set((state) => ({
          assets: state.assets.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        }));
      },

      deleteAsset: (id) => {
        const asset = get().assets.find((a) => a.id === id);
        if (!asset) {
          return { success: false, message: 'Asset not found' };
        }
        if (asset.usageCount > 0) {
          return {
            success: false,
            message: `Cannot delete asset: actively used in ${asset.usageCount} location(s). Replace it first.`,
          };
        }
        set((state) => ({
          assets: state.assets.filter((a) => a.id !== id),
        }));
        return { success: true, message: 'Asset deleted from media library.' };
      },

      searchAssets: (query, category) => {
        return get().assets.filter((a) => {
          const matchesQuery =
            !query ||
            a.fileName.toLowerCase().includes(query.toLowerCase()) ||
            a.altText.toLowerCase().includes(query.toLowerCase());
          const matchesCat = !category || category === 'all' || a.category === category;
          return matchesQuery && matchesCat;
        });
      },
    }),
    {
      name: 'burger-craft-media',
    }
  )
);
