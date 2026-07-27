import { createRootRouteWithContext } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import RootComponent from './-components/RootComponent.tsx';

type RouterContext = {
  queryClient: QueryClient;
  isLoggedIn: boolean;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});
