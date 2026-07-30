import { createFileRoute } from '@tanstack/react-router';
import UserPage from './-components/UserPage';
import { currentUserQueryOptions } from '../queries';

export const Route = createFileRoute('/user')({
  staticData: {
    hideChat: true,
  },
  component: UserPage,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(currentUserQueryOptions());
  },
});
