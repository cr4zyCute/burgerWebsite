import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Promotion } from '../types';
import { SEED_PROMOTIONS } from '../db/seed-data';

interface PromotionsState {
  promotions: Promotion[];
  addPromotion: (promo: Omit<Promotion, 'id' | 'timesUsed'>) => void;
  updatePromotion: (id: string, updates: Partial<Promotion>) => void;
  deletePromotion: (id: string) => void;
  toggleActive: (id: string) => void;
}

export const usePromotionsStore = create<PromotionsState>()(
  persist(
    (set) => ({
      promotions: SEED_PROMOTIONS,

      addPromotion: (data) => {
        const newPromo: Promotion = {
          ...data,
          id: `promo-${Date.now()}`,
          timesUsed: 0,
        };
        set((state) => ({ promotions: [newPromo, ...state.promotions] }));
      },

      updatePromotion: (id, updates) => {
        set((state) => ({
          promotions: state.promotions.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
      },

      deletePromotion: (id) => {
        set((state) => ({
          promotions: state.promotions.filter((p) => p.id !== id),
        }));
      },

      toggleActive: (id) => {
        set((state) => ({
          promotions: state.promotions.map((p) =>
            p.id === id ? { ...p, isActive: !p.isActive } : p
          ),
        }));
      },
    }),
    {
      name: 'burger-craft-promotions',
    }
  )
);
