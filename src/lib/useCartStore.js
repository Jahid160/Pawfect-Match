import { create } from 'zustand';
import { getCartItems } from "@/action/server/cart";

export const useCartStore = create((set) => ({
  cartCount: 0,
  
  fetchCartCount: async (email) => {
    if (!email) {
      set({ cartCount: 0 });
      return;
    }
    try {
      const items = await getCartItems(email);
      const count = items?.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0) || 0;
      set({ cartCount: count });
    } catch (error) {
      console.error("Error fetching cart count:", error);
      set({ cartCount: 0 });
    }
  },

  incrementCart: (qty = 1) => 
    set((state) => ({ cartCount: state.cartCount + Number(qty) })),

  decrementCart: (qty = 1) => 
    set((state) => ({ 
      cartCount: Math.max(0, state.cartCount - Number(qty)) 
    })),
  
  setCartCount: (count) => set({ cartCount: Math.max(0, Number(count)) }),

  clearCart: () => set({ cartCount: 0 }),
}));