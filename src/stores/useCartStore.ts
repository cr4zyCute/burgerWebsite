import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, SelectedModifier, FulfillmentType } from '../types';
import { SEED_PROMOTIONS } from '../db/seed-data';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  fulfillmentType: FulfillmentType;
  selectedBranch: string;
  appliedCoupon: string | null;
  discountAmount: number;
  tipAmount: number; // in cents
  
  // Actions
  addItem: (product: Product, quantity?: number, modifiers?: SelectedModifier[], specialInstructions?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  setFulfillmentType: (type: FulfillmentType) => void;
  setSelectedBranch: (branch: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  setTipAmount: (amount: number) => void;

  // Computed values
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        {
          id: 'default-cart-item-1',
          productId: 'prod-1',
          product: {
            id: 'prod-1',
            name: 'The Double Smash King',
            slug: 'the-double-smash-king',
            category: 'burgers',
            price: 1450,
            description: 'Two 100% dry-aged Angus beef patties smashed crispy, double American sharp cheddar, caramelized onions, house pickles, and signature craft smash sauce.',
            imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85',
            galleryImages: [],
            ingredients: ['Angus Beef', 'Cheddar'],
            allergens: ['Dairy', 'Gluten'],
            dietary: ['chef-choice'],
            isAvailable: true,
            isFeatured: true,
            isBestSeller: true,
            salesCount: 1420,
            rating: 4.9,
            reviewCount: 382,
          },
          quantity: 1,
          selectedModifiers: [
            { groupId: 'bun-choice', groupName: 'Bun Style', optionId: 'opt-brioche', optionName: 'Classic Butter Toasted Brioche', price: 0 },
            { groupId: 'add-ons', groupName: 'Add Extra Goodies', optionId: 'opt-bacon', optionName: 'Thick Applewood Smoked Bacon', price: 250 },
          ],
          unitPrice: 1700, // 1450 + 250
          totalPrice: 1700,
        },
        {
          id: 'default-cart-item-2',
          productId: 'prod-5',
          product: {
            id: 'prod-5',
            name: 'Hand-Cut Parmesan Truffle Fries',
            slug: 'hand-cut-parmesan-truffle-fries',
            category: 'sides',
            price: 675,
            description: 'Double-fried Idaho Russet potatoes tossed in white truffle oil and Parmigiano Reggiano.',
            imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=85',
            galleryImages: [],
            ingredients: ['Potatoes', 'Truffle Oil'],
            allergens: ['Dairy'],
            dietary: ['vegetarian', 'gluten-free'],
            isAvailable: true,
            isFeatured: true,
            isBestSeller: true,
            salesCount: 2310,
            rating: 4.9,
            reviewCount: 512,
          },
          quantity: 1,
          selectedModifiers: [],
          unitPrice: 675,
          totalPrice: 675,
        }
      ],
      isDrawerOpen: false,
      fulfillmentType: 'delivery',
      selectedBranch: 'Downtown Flagship & Grill',
      appliedCoupon: null,
      discountAmount: 0,
      tipAmount: 300, // $3.00 default tip

      addItem: (product, quantity = 1, modifiers = [], specialInstructions) => {
        const modifierTotal = modifiers.reduce((acc, mod) => acc + mod.price, 0);
        const unitPrice = product.price + modifierTotal;
        const totalPrice = unitPrice * quantity;

        const newItem: CartItem = {
          id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          productId: product.id,
          product,
          quantity,
          selectedModifiers: modifiers,
          specialInstructions,
          unitPrice,
          totalPrice,
        };

        set((state) => ({
          items: [...state.items, newItem],
          isDrawerOpen: true,
        }));
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === itemId) {
              return {
                ...item,
                quantity,
                totalPrice: item.unitPrice * quantity,
              };
            }
            return item;
          }),
        }));
      },

      clearCart: () => {
        set({ items: [], appliedCoupon: null, discountAmount: 0 });
      },

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      setFulfillmentType: (type) => set({ fulfillmentType: type }),
      setSelectedBranch: (branch) => set({ selectedBranch: branch }),

      applyCoupon: (code) => {
        const cleanCode = code.trim().toUpperCase();
        const found = SEED_PROMOTIONS.find(
          (p) => p.code.toUpperCase() === cleanCode && p.isActive
        );

        if (!found) {
          return { success: false, message: 'Invalid or expired coupon code' };
        }

        const subtotal = get().getSubtotal();
        if (subtotal < found.minOrderAmount) {
          return {
            success: false,
            message: `Minimum order amount for ${found.code} is $${(found.minOrderAmount / 100).toFixed(2)}`,
          };
        }

        let discount = 0;
        if (found.discountType === 'percentage') {
          discount = Math.round((subtotal * found.discountValue) / 100);
          if (found.maxDiscount && discount > found.maxDiscount) {
            discount = found.maxDiscount;
          }
        } else {
          discount = found.discountValue;
        }

        set({ appliedCoupon: found.code, discountAmount: discount });
        return { success: true, message: `Applied ${found.code}: Saved $${(discount / 100).toFixed(2)}!` };
      },

      removeCoupon: () => set({ appliedCoupon: null, discountAmount: 0 }),
      setTipAmount: (amount) => set({ tipAmount: amount }),

      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.totalPrice, 0);
      },

      getDeliveryFee: () => {
        const state = get();
        if (state.fulfillmentType === 'pickup') return 0;
        const subtotal = state.getSubtotal();
        // Free delivery over $35.00
        if (subtotal >= 3500 || subtotal === 0) return 0;
        return 399; // $3.99
      },

      getTax: () => {
        const subtotal = get().getSubtotal();
        const discount = get().discountAmount;
        const taxable = Math.max(0, subtotal - discount);
        // 8.25% standard tax
        return Math.round(taxable * 0.0825);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().discountAmount;
        const deliveryFee = get().getDeliveryFee();
        const tax = get().getTax();
        const tip = get().tipAmount;

        return Math.max(0, subtotal - discount) + deliveryFee + tax + tip;
      },

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'burger-craft-cart',
    }
  )
);
