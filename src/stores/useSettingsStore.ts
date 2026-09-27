import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RestaurantSettings {
  restaurantName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  currency: string;
  currencySymbol: string;
  taxRate: number; // e.g. 8.25
  deliveryFee: number; // in cents, e.g. 399 ($3.99)
  freeDeliveryThreshold: number; // in cents, e.g. 3500 ($35.00)
  businessHours: string;
  announcementActive: boolean;
  announcementText: string;
  announcementLink: string;
  instagramHandle: string;
  facebookUrl: string;
  twitterUrl: string;
  // Brand Logo enhancements
  logoUrl?: string; // Data URL (base64) or image URL
  logoDisplayMode?: 'mark_and_text' | 'logo_only' | 'badge_icon';
  logoHeight?: number; // pixel height, e.g. 40
  logoSubtext?: string; // e.g. "Est. 2018 · NYC"
}

const DEFAULT_SETTINGS: RestaurantSettings = {
  restaurantName: 'BURGER CRAFT',
  tagline: 'Artisan Dry-Aged Smash & Craft Burgers',
  phone: '+1 (212) 555-0192',
  email: 'hello@burgercraftnyc.com',
  address: '428 Lexington Ave, New York, NY 10017',
  currency: 'USD',
  currencySymbol: '$',
  taxRate: 8.25,
  deliveryFee: 399,
  freeDeliveryThreshold: 3500,
  businessHours: 'Monday - Sunday: 11:00 AM - 11:00 PM',
  announcementActive: false,
  announcementText: 'USE CODE SMASH20 FOR 20% OFF ALL ONLINE ORDERS OVER $25',
  announcementLink: '/deals',
  instagramHandle: '@burgercraftnyc',
  facebookUrl: 'https://facebook.com',
  twitterUrl: 'https://x.com',
  logoUrl: '',
  logoDisplayMode: 'mark_and_text',
  logoHeight: 40,
  logoSubtext: 'Est. 2018 · NYC',
};

interface SettingsState {
  settings: RestaurantSettings;
  updateSettings: (updates: Partial<RestaurantSettings>) => void;
  setLogo: (logoUrl: string, options?: Partial<RestaurantSettings>) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      updateSettings: (updates) => {
        set((state) => ({ settings: { ...state.settings, ...updates } }));
      },
      setLogo: (logoUrl, options = {}) => {
        set((state) => ({
          settings: {
            ...state.settings,
            logoUrl,
            ...options,
          },
        }));
      },
      resetSettings: () => set({ settings: DEFAULT_SETTINGS }),
    }),
    {
      name: 'burger-craft-settings',
    }
  )
);

