import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addCartItem,
  clearCart,
  loginUser,
  registerUser,
  removeCartItem,
  updateCartItemQuantity,
} from "./Api";

import { queryKeys } from "./queries";
import { tokenStore } from "./tokenStore";

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