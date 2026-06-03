import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}
interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem & any) => void;
  removeFromCart: (itemId: any) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (cartItem) => cartItem.id === item.id,
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((cartItem) =>
                cartItem.id === item.id
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + 1,
                    }
                  : cartItem,
              ),
            };
          } else {
            return {
              cartItems: [
                ...state.cartItems,
                { ...item, quantity: item.quantity || 1 },
              ],
            };
          }
        }),
      removeFromCart: (itemId) => {
        set((state) => ({
          cartItems: state.cartItems
            .map((cartItem) =>
              cartItem.id === itemId
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem,
            )
            .filter((cartItem) => cartItem.quantity > 0),
        }));
      },
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);

export default useCartStore;
