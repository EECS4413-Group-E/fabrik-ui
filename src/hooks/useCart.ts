import { useAuth } from './useAuth.ts';
import { useQuery } from '@tanstack/react-query';
import { cartStorage } from '../cartStorage.ts';
import { fetchCart } from '../Api.ts';

export const useCart = () => {
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: ['cart', isLoggedIn ? 'server' : 'local'],
    queryFn: () => (isLoggedIn ? fetchCart() : Promise.resolve(cartStorage.getLocal())),
  });
};
