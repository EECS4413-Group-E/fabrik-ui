
import { createFileRoute } from "@tanstack/react-router";
import WishlistPage from "./-components/WishListPage";
import { wishlistQueryOptions } from "../queries";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(wishlistQueryOptions());
  },
});