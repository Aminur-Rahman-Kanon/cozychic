"use client";

import { create } from "zustand";

export type CartItem = {
  id: string;
  itemId: string;
  name: string;
  basePrice: number | null;
  quantity: number;
  finalLinePrice: number;
  notes?: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        const updatedQty = existing.quantity + item.quantity;
        const unitPrice = existing.finalLinePrice / existing.quantity;
        const updatedLine = unitPrice * updatedQty;
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: updatedQty, finalLinePrice: updatedLine }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
}));
