import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductCategory } from '../types';
import { SEED_PRODUCTS } from '../db/seed-data';

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'salesCount' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleAvailability: (id: string) => void;
  toggleFeatured: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: ProductCategory) => Product[];
  getFeaturedProducts: () => Product[];
  getBestSellers: () => Product[];
  resetProducts: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: SEED_PRODUCTS,

      addProduct: (newProductData) => {
        const newProduct: Product = {
          ...newProductData,
          id: `prod-${Date.now()}`,
          salesCount: 0,
          rating: 5.0,
          reviewCount: 1,
        };
        set((state) => ({ products: [newProduct, ...state.products] }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      toggleAvailability: (id) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, isAvailable: !p.isAvailable } : p
          ),
        }));
      },

      toggleFeatured: (id) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
          ),
        }));
      },

      getProductBySlug: (slug) => {
        return get().products.find((p) => p.slug === slug);
      },

      getProductById: (id) => {
        return get().products.find((p) => p.id === id);
      },

      getProductsByCategory: (category) => {
        return get().products.filter((p) => p.category === category);
      },

      getFeaturedProducts: () => {
        return get().products.filter((p) => p.isFeatured && p.isAvailable);
      },

      getBestSellers: () => {
        return [...get().products]
          .filter((p) => p.isAvailable)
          .sort((a, b) => b.salesCount - a.salesCount)
          .slice(0, 4);
      },

      resetProducts: () => {
        set({ products: SEED_PRODUCTS });
      },
    }),
    {
      name: 'burger-craft-products',
    }
  )
);
