import { create } from 'zustand';
import { CartItem, Customer } from '../types';

interface Store {
  cart: CartItem[];
  customer: Customer | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  setCustomer: (customer: Customer) => void;
  clearCart: () => void;
}

export const useStore = create<Store>((set, get) => ({
  cart: [],
  customer: null,
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.service.id === item.service.id
      );
      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.service.id === item.service.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (serviceId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.service.id !== serviceId),
    })),
  updateQuantity: (serviceId, quantity) =>
    set((state) => {
      if (quantity === 0) {
        return {
          cart: state.cart.filter((item) => item.service.id !== serviceId),
        };
      }
      return {
        cart: state.cart.map((item) =>
          item.service.id === serviceId ? { ...item, quantity } : item
        ),
      };
    }),
  setCustomer: (customer) => set({ customer }),
  clearCart: () => set({ cart: [], customer: null }),
}))

