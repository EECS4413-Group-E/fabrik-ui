import { createFileRoute } from "@tanstack/react-router";
import UserPage from "./-components/UserPage";
import { userQueryOptions } from "../queries";

export const Route = createFileRoute("/user")({
  component: UserPage,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(
      userQueryOptions("8ecf8276-e555-41cc-b2ba-e42353dc72b4"),
    );
  },
});
