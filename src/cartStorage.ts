import type {
  CartItem,
  RemoveCartItemRequest,
  UpdateCartItemQuantityRequest,
} from './models/CartItem';

const CART_STORAGE_KEY = 'fabrik_guest_cart';

export const cartStorage = {
  getLocal(): CartItem[] {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  setLocal(cart: CartItem[]) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // silently fail if localStorage unavailable
    }
  },

  async clearLocal() {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // silently fail
    }
  },

  async addItem(item: CartItem) {
    const cart = cartStorage.getLocal();
    const existingIndex = cart.findIndex(
      (c) => c.productId === item.productId && c.size === item.size,
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += item.quantity;
    } else {
      cart.push(item);
    }

    cartStorage.setLocal(cart);
  },

  async removeItem({ productId, size }: RemoveCartItemRequest) {
    const cart = cartStorage.getLocal();
    const filtered = cart.filter((item) => !(item.productId === productId && item.size === size));
    cartStorage.setLocal(filtered);
  },

  async updateQuantity({ productId, size, quantity }: UpdateCartItemQuantityRequest) {
    const cart = cartStorage.getLocal();
    const item = cart.find((c) => c.productId === productId && c.size === size);
    if (item) {
      if (quantity <= 0) {
        cartStorage.setLocal(cart.filter((c) => !(c.productId === productId && c.size === size)));
      } else {
        item.quantity = quantity;
        cartStorage.setLocal(cart);
      }
    }
  },
};
