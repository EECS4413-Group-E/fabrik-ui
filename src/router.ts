import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: { queryClient },
});
