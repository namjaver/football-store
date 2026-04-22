"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size, color, quantity = 1) => {
        const key = `${product.id}-${size}-${color}`;
        const items = get().items;
        const existing = items.find((i) => i.key === key);
        if (existing) {
          set({
            items: items.map((i) =>
              i.key === key ? { ...i, quantity: i.quantity + quantity } : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                key,
                product,
                size,
                color,
                quantity,
              },
            ],
          });
        }
      },

      removeItem: (key) =>
        set({ items: get().items.filter((i) => i.key !== key) }),

      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.key !== key) });
        } else {
          set({
            items: get().items.map((i) =>
              i.key === key ? { ...i, quantity } : i
            ),
          });
        }
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      get totalItems() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },

      get totalPrice() {
        return get().items.reduce((sum, i) => {
          const price = i.product.salePrice ?? i.product.price;
          return sum + price * i.quantity;
        }, 0);
      },
    }),
    { name: "football-store-cart" }
  )
);
