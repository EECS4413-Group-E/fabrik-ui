import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  addCartItem,
  addWishlistItem,
  clearCart,
  loginUser,
  placeOrder,
  registerUser,
  removeCartItem,
  removeWishlistItem,
  updateCartItemQuantity,
} from './Api';

import { queryKeys } from './queries';
import { tokenStore } from './tokenStore';
import { useNavigate } from '@tanstack/react-router';

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      tokenStore.set(data.accessToken);
    },
  });

export const useLoginMutation = () =>
  useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      tokenStore.set(data.accessToken);
    },
  });

export const useAddCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.cart(),
      });
    },
  });
};

export const useUpdateCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.cart(),
      });
    },
  });
};

export const useRemoveCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.cart(),
      });
    },
  });
};

export const useClearCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
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
