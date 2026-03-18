// store/useCartStore.js
import { create } from 'zustand';
import { getCartItems } from "@/action/server/cart";

export const useCartStore = create((set) => ({
  cartCount: 0,
  
  fetchCartCount: async (email) => {
    if (!email) return;
    try {
      const items = await getCartItems(email);
      const count = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
      set({ cartCount: count });
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  },

  incrementCart: (qty = 1) => set((state) => ({ cartCount: state.cartCount + qty })),
  
  setCartCount: (count) => set({ cartCount: count }),
}));