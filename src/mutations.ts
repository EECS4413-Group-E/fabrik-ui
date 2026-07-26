import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  addCartItem,
  addWishlistItem,
  clearCart,
  loginUser,
  logoutUser,
  placeOrder,
  registerUser,
  removeCartItem,
  removeWishlistItem,
  replaceCart,
  updateCartItemQuantity,
  fetchSearchResults,
} from './Api';

import { queryKeys } from './queries';
import { useNavigate } from '@tanstack/react-router';
import type { Filter } from './models/Filter';
import { useAuth } from './hooks/useAuth.ts';
import { cartStorage } from './cartStorage.ts';
import { tokenStore } from './tokenStore.ts';

export const useRegisterMutation = () => {
  const { mutate } = useMutation({
    mutationFn: replaceCart,
    onSuccess: async () => {
      await cartStorage.clearLocal();
    },
  });

  return useMutation({
    mutationFn: registerUser,
    onSuccess: async (data) => {
      tokenStore.set(data.accessToken);
      const cart = cartStorage.getLocal();
      mutate(
        cart.map((item) => ({
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
        })),
      );
    },
  });
};

export const useLoginMutation = () => {
  const { mutate } = useMutation({
    mutationFn: replaceCart,
    onSuccess: async () => {
      await cartStorage.clearLocal();
    },
  });

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      tokenStore.set(data.accessToken);
      const cart = cartStorage.getLocal();
      if (cart.length) {
        mutate(
          cart.map((item) => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
          })),
        );
      }
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      tokenStore.set(null);
    },
  });
};

export const useAddCartItemMutation = () => {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuth();

  return useMutation({
    mutationFn: isLoggedIn ? addCartItem : cartStorage.addItem,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.cart(),
      });
    },
  });
};

export const useUpdateCartItemMutation = () => {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuth();

  return useMutation({
    mutationFn: isLoggedIn ? updateCartItemQuantity : cartStorage.updateQuantity,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.cart(),
      });
    },
  });
};

export const useRemoveCartItemMutation = () => {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuth();

  return useMutation({
    mutationFn: isLoggedIn ? removeCartItem : cartStorage.removeItem,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.cart(),
      });
    },
  });
};

export const useClearCartMutation = () => {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuth();

  return useMutation({
    mutationFn: isLoggedIn ? clearCart : cartStorage.clearLocal,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.cart(),
      });
    },
  });
};

export const useWishlistMutation = (isInWishlist: boolean, listingId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (isInWishlist) {
        return removeWishlistItem(listingId);
      }

      return addWishlistItem(listingId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.wishlist(),
      });
    },
  });
};

export const useRemoveWishlistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist() });
    },
  });
};

export const useCreateOrderMutation = () => {
  const navigate = useNavigate();
  const { mutate: clearCart } = useClearCartMutation();

  return useMutation({
    mutationFn: placeOrder,

    onSuccess: async (createdOrderId) => {
      try {
        clearCart();
      } finally {
        navigate({ to: '/orders/$orderId/confirm', params: { orderId: createdOrderId } });
      }
    },
  });
};

export const useSearchMutation = (keyword: string, filter: Filter) =>{
  return useMutation({
    mutationFn: () => {
      return fetchSearchResults(keyword, filter);
    }
  }); 
}
  