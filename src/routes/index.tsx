import { createFileRoute } from "@tanstack/react-router";
import HomePage from "./-components/HomePage";
import { listingsQueryOptions } from "../queries";

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(listingsQueryOptions());
  },
});
