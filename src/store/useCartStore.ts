// Global Cart Store powered by Zustand with localStorage persistence

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, GrindOption } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, grindOption?: GrindOption) => void;
  removeItem: (productId: number, grindOption?: GrindOption) => void;
  updateQuantity: (productId: number, quantity: number, grindOption?: GrindOption) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product: Product, quantity = 1, grindOption = 'Whole Bean') => {
        if (!product.inStock || quantity <= 0) return;

        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.grindOption === grindOption
          );

          if (existingIndex >= 0) {
            const next = [...state.items];
            const current = next[existingIndex];
            next[existingIndex] = {
              ...current,
              quantity: current.quantity + quantity,
            };
            return { items: next };
          }

          return {
            items: [...state.items, { product, quantity, grindOption }],
          };
        });
      },

      removeItem: (productId: number, grindOption) => {
        set((state) => ({
          items: state.items.filter((item) => {
            if (grindOption !== undefined) {
              return !(item.product.id === productId && item.grindOption === grindOption);
            }
            return item.product.id !== productId;
          }),
        }));
      },

      updateQuantity: (productId: number, quantity: number, grindOption) => {
        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter((item) => {
              if (grindOption !== undefined) {
                return !(item.product.id === productId && item.grindOption === grindOption);
              }
              return item.product.id !== productId;
            }),
          }));
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            const isMatch =
              item.product.id === productId &&
              (grindOption === undefined || item.grindOption === grindOption);
            if (isMatch) {
              return { ...item, quantity };
            }
            return item;
          }),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'bodren_cart_store_v2',
    }
  )
);
